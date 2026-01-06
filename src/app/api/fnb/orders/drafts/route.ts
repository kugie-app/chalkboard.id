import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fnbOrders, fnbOrderItems } from '@/schema/fnb';
import { eq, and, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const customerPhone = searchParams.get('customerPhone');

    // Build where conditions
    let whereConditions = eq(fnbOrders.status, 'draft');

    if (search) {
      whereConditions = and(
        whereConditions,
        sql`(${fnbOrders.customerName} ILIKE ${'%' + search + '%'} OR ${fnbOrders.orderNumber} ILIKE ${'%' + search + '%'})`
      ) as any;
    }

    if (customerPhone) {
      whereConditions = and(
        whereConditions,
        eq(fnbOrders.customerPhone, customerPhone)
      ) as any;
    }

    // Get draft orders with item count
    const draftOrders = await db
      .select({
        id: fnbOrders.id,
        orderNumber: fnbOrders.orderNumber,
        customerName: fnbOrders.customerName,
        customerPhone: fnbOrders.customerPhone,
        total: fnbOrders.total,
        notes: fnbOrders.notes,
        createdAt: fnbOrders.createdAt,
        itemCount: sql<number>`count(${fnbOrderItems.id})::int`
      })
      .from(fnbOrders)
      .leftJoin(fnbOrderItems, eq(fnbOrders.id, fnbOrderItems.orderId))
      .where(whereConditions)
      .groupBy(fnbOrders.id)
      .orderBy(fnbOrders.createdAt);

    return NextResponse.json(draftOrders);
  } catch (error) {
    console.error('Error fetching draft orders:', error);
    return NextResponse.json({ error: 'Failed to fetch draft orders' }, { status: 500 });
  }
} 