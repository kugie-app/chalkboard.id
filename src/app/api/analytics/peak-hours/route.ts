import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tableSessions } from '@/schema/tables';
import { fnbOrders } from '@/schema/fnb';
import { and, sql, gte, lte } from 'drizzle-orm';
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

    // Get hourly session distribution
    const hourlySessionData = await db.select({
      hour: sql<number>`EXTRACT(HOUR FROM ${tableSessions.startTime})`,
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
      .groupBy(sql`EXTRACT(HOUR FROM ${tableSessions.startTime})`)
      .orderBy(sql`EXTRACT(HOUR FROM ${tableSessions.startTime})`);

    // Get hourly F&B orders
    const hourlyFnbData = await db.select({
      hour: sql<number>`EXTRACT(HOUR FROM ${fnbOrders.createdAt})`,
      orders: sql<number>`COUNT(*)`,
      revenue: sql<number>`SUM(${fnbOrders.total})`,
    }).from(fnbOrders)
      .where(
        and(
          gte(fnbOrders.createdAt, startDate),
          lte(fnbOrders.createdAt, endDate)
        )
      )
      .groupBy(sql`EXTRACT(HOUR FROM ${fnbOrders.createdAt})`)
      .orderBy(sql`EXTRACT(HOUR FROM ${fnbOrders.createdAt})`);

    // Get day of week distribution
    const dayOfWeekData = await db.select({
      dayOfWeek: sql<number>`EXTRACT(DOW FROM ${tableSessions.startTime})`,
      dayName: sql<string>`TO_CHAR(${tableSessions.startTime}, 'Day')`,
      sessions: sql<number>`COUNT(*)`,
      revenue: sql<number>`SUM(${tableSessions.totalCost})`,
    }).from(tableSessions)
      .where(
        and(
          gte(tableSessions.createdAt, startDate),
          lte(tableSessions.createdAt, endDate)
        )
      )
      .groupBy(sql`EXTRACT(DOW FROM ${tableSessions.startTime}), TO_CHAR(${tableSessions.startTime}, 'Day')`)
      .orderBy(sql`EXTRACT(DOW FROM ${tableSessions.startTime})`);

    // Create complete hourly data (0-23 hours)
    const completeHourlyData = Array.from({ length: 24 }, (_, hour) => {
      const sessionData = hourlySessionData.find(h => h.hour === hour);
      const fnbData = hourlyFnbData.find(h => h.hour === hour);
      
      return {
        hour,
        sessions: sessionData?.sessions || 0,
        sessionRevenue: sessionData?.revenue || 0,
        avgDuration: sessionData?.avgDuration || 0,
        fnbOrders: fnbData?.orders || 0,
        fnbRevenue: fnbData?.revenue || 0,
        totalRevenue: (sessionData?.revenue || 0) + (fnbData?.revenue || 0),
      };
    });

    // Find peak hours
    const peakSessionHour = completeHourlyData.reduce((max, current) => 
      current.sessions > max.sessions ? current : max
    );

    const peakRevenueHour = completeHourlyData.reduce((max, current) => 
      current.totalRevenue > max.totalRevenue ? current : max
    );

    return NextResponse.json({
      period: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        days
      },
      hourlyData: completeHourlyData,
      dayOfWeekData: dayOfWeekData || [],
      peakHours: {
        sessions: peakSessionHour,
        revenue: peakRevenueHour,
      }
    });
  } catch (error) {
    console.error('Error fetching peak hours:', error);
    return NextResponse.json({ error: 'Failed to fetch peak hours' }, { status: 500 });
  }
} 