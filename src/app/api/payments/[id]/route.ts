import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { payments } from '@/schema/payments';
import { tableSessions, tables } from '@/schema/tables';
import { fnbOrders, fnbOrderItems, fnbItems, fnbCategories, staff } from '@/schema/fnb';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const paymentId = parseInt(id);

    const payment = await db.select().from(payments).where(eq(payments.id, paymentId)).limit(1);

    if (payment.length === 0) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    const paymentData = payment[0];

    // Fetch table sessions related to this payment
    const relatedTableSessions = await db
      .select({
        id: tableSessions.id,
        tableId: tableSessions.tableId,
        tableName: tables.name,
        customerName: tableSessions.customerName,
        customerPhone: tableSessions.customerPhone,
        startTime: tableSessions.startTime,
        endTime: tableSessions.endTime,
        plannedDuration: tableSessions.plannedDuration,
        actualDuration: tableSessions.actualDuration,
        totalCost: tableSessions.totalCost,
        status: tableSessions.status,
        sessionRating: tableSessions.sessionRating,
        fnbOrderCount: tableSessions.fnbOrderCount,
      })
      .from(tableSessions)
      .leftJoin(tables, eq(tableSessions.tableId, tables.id))
      .where(eq(tableSessions.paymentId, paymentId));

    // Fetch F&B orders related to this payment
    const relatedFnbOrders = await db
      .select({
        id: fnbOrders.id,
        orderNumber: fnbOrders.orderNumber,
        tableId: fnbOrders.tableId,
        tableName: tables.name,
        customerName: fnbOrders.customerName,
        customerPhone: fnbOrders.customerPhone,
        subtotal: fnbOrders.subtotal,
        tax: fnbOrders.tax,
        total: fnbOrders.total,
        status: fnbOrders.status,
        staffId: fnbOrders.staffId,
        staffName: staff.name,
        notes: fnbOrders.notes,
        createdAt: fnbOrders.createdAt,
      })
      .from(fnbOrders)
      .leftJoin(tables, eq(fnbOrders.tableId, tables.id))
      .leftJoin(staff, eq(fnbOrders.staffId, staff.id))
      .where(eq(fnbOrders.paymentId, paymentId));

    // For each F&B order, fetch the order items
    const fnbOrdersWithItems = await Promise.all(
      relatedFnbOrders.map(async (order) => {
        const orderItems = await db
          .select({
            id: fnbOrderItems.id,
            itemId: fnbOrderItems.itemId,
            itemName: fnbItems.name,
            itemDescription: fnbItems.description,
            categoryName: fnbCategories.name,
            quantity: fnbOrderItems.quantity,
            unitPrice: fnbOrderItems.unitPrice,
            subtotal: fnbOrderItems.subtotal,
            unit: fnbItems.unit,
          })
          .from(fnbOrderItems)
          .leftJoin(fnbItems, eq(fnbOrderItems.itemId, fnbItems.id))
          .leftJoin(fnbCategories, eq(fnbItems.categoryId, fnbCategories.id))
          .where(eq(fnbOrderItems.orderId, order.id));

        return {
          ...order,
          items: orderItems,
        };
      })
    );

    const paymentWithRelations = {
      ...paymentData,
      tableSessions: relatedTableSessions,
      fnbOrders: fnbOrdersWithItems,
    };

    return NextResponse.json(paymentWithRelations);
  } catch (error) {
    console.error('Error fetching payment:', error);
    return NextResponse.json({ error: 'Failed to fetch payment' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const paymentId = parseInt(id);
    const body = await request.json();
    const { status: newStatus, midtransResponse, paymentMethod } = body;

    if (!newStatus) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const validStatuses = ['pending', 'success', 'failed', 'cancelled'];
    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json({ 
        error: 'Invalid status. Must be one of: pending, success, failed, cancelled' 
      }, { status: 400 });
    }

    const updateData: any = {
      status: newStatus,
      updatedAt: new Date(),
    };

    if (midtransResponse) {
      updateData.midtransResponse = midtransResponse;
    }

    if (paymentMethod) {
      updateData.paymentMethod = paymentMethod;
    }

    // Update the payment
    const updatedPayment = await db.update(payments)
      .set(updateData)
      .where(eq(payments.id, paymentId))
      .returning();

    if (updatedPayment.length === 0) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // If payment is marked as successful, update all related F&B orders to 'paid' status
    if (newStatus === 'success') {
      await db.update(fnbOrders)
        .set({ 
          status: 'paid',
        })
        .where(eq(fnbOrders.paymentId, paymentId));
    }
    
    // If payment is cancelled or failed, update F&B orders back to 'billed' status
    else if (newStatus === 'cancelled' || newStatus === 'failed') {
      await db.update(fnbOrders)
        .set({ 
          status: 'billed',
        })
        .where(eq(fnbOrders.paymentId, paymentId));
    }

    const result = updatedPayment[0];

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating payment:', error);
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 });
  }
} 