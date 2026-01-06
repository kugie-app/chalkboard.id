import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fnbOrders, fnbOrderItems, fnbItems } from '@/schema/fnb';
import { payments } from '@/schema/payments';
import { eq, and, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const orderId = parseInt(id);
    const body = await request.json();
    const { transactionId, staffId } = body;

    if (!transactionId || !staffId) {
      return NextResponse.json({ 
        error: 'Transaction ID and staff ID are required' 
      }, { status: 400 });
    }

    // Verify the order exists and is a draft
    const order = await db
      .select()
      .from(fnbOrders)
      .where(and(eq(fnbOrders.id, orderId), eq(fnbOrders.status, 'draft')))
      .limit(1);

    if (order.length === 0) {
      return NextResponse.json({ 
        error: 'Draft order not found' 
      }, { status: 404 });
    }

    // Verify the transaction exists and is pending
    const pendingTransaction = await db
      .select()
      .from(payments)
      .where(and(eq(payments.id, transactionId), eq(payments.status, 'pending')))
      .limit(1);

    if (pendingTransaction.length === 0) {
      return NextResponse.json({ 
        error: 'Pending transaction not found' 
      }, { status: 400 });
    }

    // Get order items to update stock
    const orderItems = await db
      .select()
      .from(fnbOrderItems)
      .where(eq(fnbOrderItems.orderId, orderId));

    // Update stock quantities (since draft orders don't reduce stock initially)
    for (const item of orderItems) {
      const currentItem = await db
        .select()
        .from(fnbItems)
        .where(eq(fnbItems.id, item.itemId))
        .limit(1);
      
      if (currentItem.length > 0) {
        const currentStock = currentItem[0].stockQuantity ?? 0;
        const newStock = Math.max(0, currentStock - item.quantity);
        
        await db
          .update(fnbItems)
          .set({
            stockQuantity: newStock,
            updatedAt: new Date(),
          })
          .where(eq(fnbItems.id, item.itemId));
      }
    }

    // Calculate order total for transaction update
    const orderTotal = parseFloat(order[0].total);
    const currentFnbAmount = parseFloat(pendingTransaction[0].fnbAmount || '0');
    const currentTotalAmount = parseFloat(pendingTransaction[0].totalAmount);
    
    // Update the order to assign it to the transaction and change status
    const updatedOrder = await db
      .update(fnbOrders)
      .set({
        paymentId: transactionId,
        status: 'billed', // Status for orders assigned to existing transactions
        staffId: staffId
      })
      .where(eq(fnbOrders.id, orderId))
      .returning();

    // Update the transaction's F&B amount and total amount
    await db
      .update(payments)
      .set({
        fnbAmount: (currentFnbAmount + orderTotal).toFixed(2),
        totalAmount: (currentTotalAmount + orderTotal).toFixed(2),
        updatedAt: new Date(),
      })
      .where(eq(payments.id, transactionId));

    return NextResponse.json({
      ...updatedOrder[0],
      message: 'Draft order successfully assigned to pending transaction',
      transactionNumber: pendingTransaction[0].transactionNumber,
      addedAmount: orderTotal
    });
  } catch (error) {
    console.error('Error assigning draft order to transaction:', error);
    return NextResponse.json({ error: 'Failed to assign draft order to transaction' }, { status: 500 });
  }
} 