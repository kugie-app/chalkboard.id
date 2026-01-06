import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fnbOrders, fnbOrderItems, fnbItems } from '@/schema/fnb';
import { tableSessions } from '@/schema/tables';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { sql } from 'drizzle-orm';

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
    const { tableId, staffId } = body;

    if (!tableId || !staffId) {
      return NextResponse.json({ 
        error: 'Table ID and staff ID are required' 
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

    // Verify the table has an active session
    const activeSession = await db
      .select()
      .from(tableSessions)
      .where(and(eq(tableSessions.tableId, tableId), eq(tableSessions.status, 'active')))
      .limit(1);

    if (activeSession.length === 0) {
      return NextResponse.json({ 
        error: 'No active session found for this table' 
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

    // Update the order to assign it to the table and change status
    const updatedOrder = await db
      .update(fnbOrders)
      .set({
        tableId: tableId,
        status: 'pending',
        staffId: staffId
      })
      .where(eq(fnbOrders.id, orderId))
      .returning();

    // Update the session's F&B order count
    await db
      .update(tableSessions)
      .set({
        fnbOrderCount: sql`${tableSessions.fnbOrderCount} + 1`
      })
      .where(eq(tableSessions.id, activeSession[0].id));

    return NextResponse.json({
      ...updatedOrder[0],
      message: 'Draft order successfully assigned to table'
    });
  } catch (error) {
    console.error('Error assigning draft order:', error);
    return NextResponse.json({ error: 'Failed to assign draft order' }, { status: 500 });
  }
} 