import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { payments } from '@/schema/payments';
import { tableSessions, tables } from '@/schema/tables';
import { fnbOrders, fnbOrderItems, fnbItems, fnbCategories, staff } from '@/schema/fnb';
import { eq, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const sessionId = searchParams.get('sessionId');
    const orderId = searchParams.get('orderId');

    let paymentsList: any[];
    
    if (status) {
      paymentsList = await db.select().from(payments)
        .where(eq(payments.status, status))
        .orderBy(payments.createdAt);
    } else if (sessionId) {
      // Query tableSessions to find the paymentId, then get the payment
      const sessionWithPayment = await db.select({
        paymentId: tableSessions.paymentId
      }).from(tableSessions)
      .where(eq(tableSessions.id, parseInt(sessionId)))
      .limit(1);
      
      if (sessionWithPayment.length > 0 && sessionWithPayment[0].paymentId) {
        paymentsList = await db.select().from(payments)
          .where(eq(payments.id, sessionWithPayment[0].paymentId))
          .orderBy(payments.createdAt);
      } else {
        paymentsList = [];
      }
    } else if (orderId) {
      // Query fnbOrders to find the paymentId, then get the payment
      const orderWithPayment = await db.select({
        paymentId: fnbOrders.paymentId
      }).from(fnbOrders)
      .where(eq(fnbOrders.id, parseInt(orderId)))
      .limit(1);
      
      if (orderWithPayment.length > 0 && orderWithPayment[0].paymentId) {
        paymentsList = await db.select().from(payments)
          .where(eq(payments.id, orderWithPayment[0].paymentId))
          .orderBy(payments.createdAt);
      } else {
        paymentsList = [];
      }
    } else {
      paymentsList = await db.select().from(payments).orderBy(sql`${payments.createdAt} desc`);
    }

    // Fetch related data for each payment
    const paymentsWithRelations = await Promise.all(
      paymentsList.map(async (payment) => {
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
          .where(eq(tableSessions.paymentId, payment.id));

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
          .where(eq(fnbOrders.paymentId, payment.id));

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

        return {
          ...payment,
          tableSessions: relatedTableSessions,
          fnbOrders: fnbOrdersWithItems,
        };
      })
    );

    return NextResponse.json(paymentsWithRelations);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      customerName, 
      customerPhone, 
      tableAmount = 0, 
      fnbAmount = 0, 
      discountAmount = 0, 
      taxAmount = 0, 
      totalAmount, 
      paymentMethods = [], 
      staffId,
      // Legacy support for existing integrations
      sessionId, 
      orderId, 
      amount, 
      currency = 'IDR', 
      paymentMethod 
    } = body;

    // Support both new consolidated format and legacy format
    const finalTotalAmount = totalAmount || amount;
    const finalCustomerName = customerName || 'Walk-in Customer';
    
    if (!finalTotalAmount) {
      return NextResponse.json({ 
        error: 'Total amount is required' 
      }, { status: 400 });
    }

    // Generate transaction numbers
    const transactionNumber = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const midtransOrderId = `ORDER-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    // Create consolidated payment record
    const newPayment = await db.insert(payments).values({
      transactionNumber,
      customerName: finalCustomerName,
      customerPhone: customerPhone || null,
      tableAmount: tableAmount.toString(),
      fnbAmount: fnbAmount.toString(),
      discountAmount: discountAmount.toString(),
      taxAmount: taxAmount.toString(),
      totalAmount: finalTotalAmount.toString(),
      paymentMethods: JSON.stringify(paymentMethods.length > 0 ? paymentMethods : [{ type: paymentMethod || 'cash', amount: finalTotalAmount }]),
      staffId: staffId || null,
      status: 'pending',
      
      // Legacy Midtrans fields (for backward compatibility)
      transactionId,
      midtransOrderId,
      amount: finalTotalAmount.toString(),
      currency,
      paymentMethod: paymentMethod || 'cash',
      
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    const paymentId = newPayment[0].id;

    // Update reverse references if sessionId or orderId provided
    if (sessionId) {
      await db.update(tableSessions)
        .set({ paymentId })
        .where(eq(tableSessions.id, parseInt(sessionId)));
    }

    if (orderId) {
      await db.update(fnbOrders)
        .set({ paymentId })
        .where(eq(fnbOrders.id, parseInt(orderId)));
    }

    return NextResponse.json({
      ...newPayment[0],
      message: 'Payment created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
} 