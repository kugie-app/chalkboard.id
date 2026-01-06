import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tables, tableSessions } from '@/schema/tables';
import { fnbOrders } from '@/schema/fnb';
import { payments } from '@/schema/payments';
import { eq, and, sql, gte, lte } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const days = parseInt(searchParams.get('days') || '7');

    const endDate = date ? new Date(date) : new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);

    // Get table utilization stats
    const tableStats = await db.select({
      totalTables: sql<number>`COUNT(DISTINCT ${tables.id})`,
      activeTables: sql<number>`COUNT(DISTINCT CASE WHEN ${tables.status} = 'occupied' THEN ${tables.id} END)`,
      availableTables: sql<number>`COUNT(DISTINCT CASE WHEN ${tables.status} = 'available' THEN ${tables.id} END)`,
    }).from(tables).where(eq(tables.isActive, true));

    // Get session stats for the period
    const sessionStats = await db.select({
      totalSessions: sql<number>`COUNT(*)`,
      completedSessions: sql<number>`COUNT(CASE WHEN ${tableSessions.status} = 'completed' THEN 1 END)`,
      activeSessions: sql<number>`COUNT(CASE WHEN ${tableSessions.status} = 'active' THEN 1 END)`,
      avgDuration: sql<number>`AVG(${tableSessions.actualDuration})`,
      totalRevenue: sql<number>`SUM(${tableSessions.totalCost})`,
    }).from(tableSessions)
      .where(
        and(
          gte(tableSessions.createdAt, startDate),
          lte(tableSessions.createdAt, endDate)
        )
      );

    // Get daily breakdown
    const dailyBreakdown = await db.select({
      date: sql<string>`DATE(${tableSessions.createdAt})`,
      sessions: sql<number>`COUNT(*)`,
      revenue: sql<number>`SUM(${tableSessions.totalCost})`,
      avgDuration: sql<number>`AVG(${tableSessions.actualDuration})`,
    }).from(tableSessions)
      .where(
        and(
          gte(tableSessions.createdAt, startDate),
          lte(tableSessions.createdAt, endDate)
        )
      )
      .groupBy(sql`DATE(${tableSessions.createdAt})`)
      .orderBy(sql`DATE(${tableSessions.createdAt})`);

    // Get F&B orders stats
    const fnbStats = await db.select({
      totalOrders: sql<number>`COUNT(*)`,
      totalRevenue: sql<number>`SUM(${fnbOrders.total})`,
      avgOrderValue: sql<number>`AVG(${fnbOrders.total})`,
    }).from(fnbOrders)
      .where(
        and(
          gte(fnbOrders.createdAt, startDate),
          lte(fnbOrders.createdAt, endDate)
        )
      );

    return NextResponse.json({
      period: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        days
      },
      tables: tableStats[0] || { totalTables: 0, activeTables: 0, availableTables: 0 },
      sessions: sessionStats[0] || { totalSessions: 0, completedSessions: 0, activeSessions: 0, avgDuration: 0, totalRevenue: 0 },
      fnb: fnbStats[0] || { totalOrders: 0, totalRevenue: 0, avgOrderValue: 0 },
      dailyBreakdown: dailyBreakdown || []
    });
  } catch (error) {
    console.error('Error fetching daily stats:', error);
    return NextResponse.json({ error: 'Failed to fetch daily stats' }, { status: 500 });
  }
} 