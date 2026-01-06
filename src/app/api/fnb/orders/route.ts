import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fnbOrders, fnbOrderItems, fnbItems, orderAnalytics } from '@/schema/fnb';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { payments } from '@/schema';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let orders;
    
    if (status) {
      orders = await db.select().from(fnbOrders)
        .where(eq(fnbOrders.status, status))
        .orderBy(fnbOrders.createdAt)
        .limit(limit ? parseInt(limit) : 100);
    } else {
      orders = await db.select().from(fnbOrders)
        .orderBy(fnbOrders.createdAt)
        .limit(limit ? parseInt(limit) : 100);
    }
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
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
      context, 
      customerName, 
      customerPhone, 
      tableId, 
      staffId, 
      subtotal, 
      tax, 
      total, 
      notes, 
      items 
    } = body;

    if (!customerName || !subtotal || !total || !items || items.length === 0 || !staffId) {
      return NextResponse.json({ 
        error: 'Customer name, subtotal, total, items, and staff ID are required' 
      }, { status: 400 });
    }

    // Validate context-specific requirements
    if (context === 'table_session' && !tableId) {
      return NextResponse.json({ 
        error: 'Table ID is required for table session orders' 
      }, { status: 400 });
    }

    // Generate order number with context prefix
    const contextPrefix = context === 'standalone' ? 'FNB' : 
                         context === 'waiting' ? 'DRAFT' : 'TABLE';
    const orderNumber = `${contextPrefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Determine order status based on context
    const orderStatus = context === 'waiting' ? 'draft' : 'pending';

    // Create order
    const newOrder = await db.insert(fnbOrders).values({
      orderNumber,
      customerName,
      customerPhone: customerPhone || null,
      tableId: tableId || null,
      staffId: parseInt(staffId),
      subtotal: subtotal.toString(),
      tax: tax?.toString() || '0',
      total: total.toString(),
      status: orderStatus,
      notes: notes || null,
    }).returning();

    const orderId = newOrder[0].id;

    // Create order items and update stock
    let totalItemCount = 0;
    for (const item of items) {
      const { itemId, quantity, unitPrice, subtotal: itemSubtotal } = item;

      // Add order item
      await db.insert(fnbOrderItems).values({
        orderId,
        itemId,
        quantity,
        unitPrice: unitPrice.toString(),
        subtotal: itemSubtotal.toString(),
      });

      totalItemCount += quantity;

      // Update stock quantity (only for non-draft orders to avoid premature stock reduction)
      if (orderStatus !== 'draft') {
        const currentItem = await db.select().from(fnbItems).where(eq(fnbItems.id, itemId)).limit(1);
        const currentStock = currentItem[0]?.stockQuantity || 0;
        const newStock = Math.max(0, currentStock - quantity);
        
        await db
          .update(fnbItems)
          .set({
            stockQuantity: newStock,
            updatedAt: new Date(),
          })
          .where(eq(fnbItems.id, itemId));
      }
    }

    // Create analytics record
    const orderDate = new Date();
    await db.insert(orderAnalytics).values({
      orderId,
      orderDate,
      dayOfWeek: orderDate.getDay(),
      hourOfDay: orderDate.getHours(),
      orderValue: total.toString(),
      itemCount: totalItemCount,
    });

    // If it's a standalone order, create a payment record automatically
    let paymentRecord = null;
    if (context === 'standalone') {
      const transactionNumber = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      
      // Create payment record for standalone order
      const newPayment = await db.insert(payments).values({
        transactionNumber,
        customerName,
        customerPhone: customerPhone || null,
        tableAmount: '0',
        fnbAmount: total.toString(),
        discountAmount: '0',
        taxAmount: tax?.toString() || '0',
        totalAmount: total.toString(),
        paymentMethods: JSON.stringify([{ type: 'cash', amount: total.toString() }]),
        staffId: parseInt(staffId),
        status: 'pending',
        
        // Legacy fields for compatibility
        transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        midtransOrderId: `ORDER-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        amount: total.toString(),
        currency: 'IDR',
        paymentMethod: 'cash',
        
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      paymentRecord = newPayment[0];

      // Link the order to the payment
      await db.update(fnbOrders)
        .set({ paymentId: paymentRecord.id, status: 'billed' })
        .where(eq(fnbOrders.id, orderId));
    }

    return NextResponse.json({
      ...newOrder[0],
      message: `${context === 'waiting' ? 'Draft order' : 'Order'} created successfully`,
      context,
      paymentRecord: paymentRecord ? {
        id: paymentRecord.id,
        transactionNumber: paymentRecord.transactionNumber,
        status: paymentRecord.status
      } : null
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
} 