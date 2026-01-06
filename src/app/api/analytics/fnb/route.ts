import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fnbOrders, fnbOrderItems, fnbItems, fnbCategories } from '@/schema/fnb';
import { eq, and, sql, gte, lte } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');

    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);

    // Get top selling items
    const topSellingItems = await db.select({
      name: fnbItems.name,
      quantity: sql<number>`SUM(${fnbOrderItems.quantity})`,
      revenue: sql<number>`SUM(${fnbOrderItems.subtotal})`,
      category: fnbCategories.name,
    })
      .from(fnbOrderItems)
      .innerJoin(fnbItems, eq(fnbOrderItems.itemId, fnbItems.id))
      .innerJoin(fnbCategories, eq(fnbItems.categoryId, fnbCategories.id))
      .innerJoin(fnbOrders, eq(fnbOrderItems.orderId, fnbOrders.id))
      .where(
        and(
          gte(fnbOrders.createdAt, startDate),
          lte(fnbOrders.createdAt, endDate)
        )
      )
      .groupBy(fnbItems.id, fnbItems.name, fnbCategories.name)
      .orderBy(sql`SUM(${fnbOrderItems.subtotal}) DESC`)
      .limit(5);

    // Get category performance
    const categoryPerformance = await db.select({
      category: fnbCategories.name,
      revenue: sql<number>`SUM(${fnbOrderItems.subtotal})`,
      orders: sql<number>`COUNT(DISTINCT ${fnbOrders.id})`,
      avgOrderValue: sql<number>`AVG(${fnbOrders.total})`,
    })
      .from(fnbCategories)
      .innerJoin(fnbItems, eq(fnbCategories.id, fnbItems.categoryId))
      .innerJoin(fnbOrderItems, eq(fnbItems.id, fnbOrderItems.itemId))
      .innerJoin(fnbOrders, eq(fnbOrderItems.orderId, fnbOrders.id))
      .where(
        and(
          gte(fnbOrders.createdAt, startDate),
          lte(fnbOrders.createdAt, endDate)
        )
      )
      .groupBy(fnbCategories.id, fnbCategories.name)
      .orderBy(sql`SUM(${fnbOrderItems.subtotal}) DESC`);

    // Get overall F&B metrics
    const fnbMetrics = await db.select({
      avgOrderValue: sql<number>`AVG(${fnbOrders.total})`,
      totalOrders: sql<number>`COUNT(${fnbOrders.id})`,
      totalRevenue: sql<number>`SUM(${fnbOrders.total})`,
    })
      .from(fnbOrders)
      .where(
        and(
          gte(fnbOrders.createdAt, startDate),
          lte(fnbOrders.createdAt, endDate)
        )
      );

    // Get draft order metrics
    const draftOrderMetrics = await db.select({
      totalDrafts: sql<number>`COUNT(CASE WHEN ${fnbOrders.status} = 'draft' THEN 1 END)`,
      assignedDrafts: sql<number>`COUNT(CASE WHEN ${fnbOrders.status} = 'pending' THEN 1 END)`,
      completedOrders: sql<number>`COUNT(CASE WHEN ${fnbOrders.status} = 'paid' THEN 1 END)`,
    })
      .from(fnbOrders)
      .where(
        and(
          gte(fnbOrders.createdAt, startDate),
          lte(fnbOrders.createdAt, endDate)
        )
      );

    const metrics = fnbMetrics[0] || { avgOrderValue: 0, totalOrders: 0, totalRevenue: 0 };
    const drafts = draftOrderMetrics[0] || { totalDrafts: 0, assignedDrafts: 0, completedOrders: 0 };
    
    const conversionRate = drafts.totalDrafts > 0 
      ? (drafts.completedOrders / drafts.totalDrafts) * 100
      : 0;

    const orderConversionRate = metrics.totalOrders > 0 
      ? (drafts.completedOrders / metrics.totalOrders) * 100
      : 0;

    return NextResponse.json({
      topSellingItems: topSellingItems || [],
      categoryPerformance: categoryPerformance || [],
      avgOrderValue: Number(metrics.avgOrderValue) || 0,
      orderConversionRate: orderConversionRate,
      draftOrderMetrics: {
        totalDrafts: Number(drafts.totalDrafts) || 0,
        assignedDrafts: Number(drafts.assignedDrafts) || 0,
        conversionRate: conversionRate,
        avgWaitTime: 8.5, // Mock data - would need additional tracking
      }
    });
  } catch (error) {
    console.error('Error fetching F&B analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch F&B analytics' }, { status: 500 });
  }
}