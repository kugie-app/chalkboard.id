import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fnbOrders, fnbOrderItems, fnbItems, fnbCategories, staff } from '@/schema/fnb';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const tableId = parseInt(id);

    if (isNaN(tableId)) {
      return NextResponse.json({ error: 'Invalid table ID' }, { status: 400 });
    }

    // Fetch pending F&B orders for this table
    const orders = await db
      .select({
        id: fnbOrders.id,
        orderNumber: fnbOrders.orderNumber,
        customerName: fnbOrders.customerName,
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
      .leftJoin(staff, eq(fnbOrders.staffId, staff.id))
      .where(
        and(
          eq(fnbOrders.tableId, tableId),
          eq(fnbOrders.status, 'pending')
        )
      )
      .orderBy(fnbOrders.createdAt);

    // For each order, fetch the order items
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
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

    return NextResponse.json(ordersWithItems);
  } catch (error) {
    console.error('Error fetching table orders:', error);
    return NextResponse.json({ error: 'Failed to fetch table orders' }, { status: 500 });
  }
} 