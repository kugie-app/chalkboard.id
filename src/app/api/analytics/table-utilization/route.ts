import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tables, tableSessions } from '@/schema/tables';
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

    // Get table utilization by table
    const tableUtilization = await db.select({
      tableId: tables.id,
      tableName: tables.name,
      hourlyRate: tables.hourlyRate,
      currentStatus: tables.status,
      totalSessions: sql<number>`COUNT(${tableSessions.id})`,
      totalRevenue: sql<number>`COALESCE(SUM(${tableSessions.totalCost}), 0)`,
      totalHours: sql<number>`COALESCE(SUM(${tableSessions.actualDuration}), 0) / 60.0`,
      avgSessionDuration: sql<number>`COALESCE(AVG(${tableSessions.actualDuration}), 0)`,
      utilizationRate: sql<number>`
        CASE 
          WHEN COUNT(${tableSessions.id}) > 0 THEN
            (COALESCE(SUM(${tableSessions.actualDuration}), 0) / 60.0) / (${days} * 24.0) * 100
          ELSE 0
        END
      `,
    })
      .from(tables)
      .leftJoin(tableSessions, 
        and(
          eq(tables.id, tableSessions.tableId),
          gte(tableSessions.createdAt, startDate),
          lte(tableSessions.createdAt, endDate)
        )
      )
      .where(eq(tables.isActive, true))
      .groupBy(tables.id, tables.name, tables.hourlyRate, tables.status)
      .orderBy(sql`COALESCE(SUM(${tableSessions.totalCost}), 0) DESC`);

    // Get overall utilization stats
    const overallStats = await db.select({
      totalTables: sql<number>`COUNT(DISTINCT ${tables.id})`,
      activeTables: sql<number>`COUNT(DISTINCT CASE WHEN ${tables.status} = 'occupied' THEN ${tables.id} END)`,
      avgUtilization: sql<number>`
        CASE 
          WHEN COUNT(${tableSessions.id}) > 0 THEN
            AVG((COALESCE(${tableSessions.actualDuration}, 0) / 60.0) / (${days} * 24.0) * 100)
          ELSE 0
        END
      `,
      totalRevenue: sql<number>`COALESCE(SUM(${tableSessions.totalCost}), 0)`,
      totalHours: sql<number>`COALESCE(SUM(${tableSessions.actualDuration}), 0) / 60.0`,
    })
      .from(tables)
      .leftJoin(tableSessions, 
        and(
          eq(tables.id, tableSessions.tableId),
          gte(tableSessions.createdAt, startDate),
          lte(tableSessions.createdAt, endDate)
        )
      )
      .where(eq(tables.isActive, true));

    // Get hourly utilization pattern
    const hourlyUtilization = await db.select({
      hour: sql<number>`EXTRACT(HOUR FROM ${tableSessions.startTime})`,
      activeSessions: sql<number>`COUNT(*)`,
      avgUtilization: sql<number>`(COUNT(*) * 100.0) / (SELECT COUNT(*) FROM ${tables} WHERE ${tables.isActive} = true)`,
    })
      .from(tableSessions)
      .where(
        and(
          gte(tableSessions.createdAt, startDate),
          lte(tableSessions.createdAt, endDate)
        )
      )
      .groupBy(sql`EXTRACT(HOUR FROM ${tableSessions.startTime})`)
      .orderBy(sql`EXTRACT(HOUR FROM ${tableSessions.startTime})`);

    // Create complete hourly utilization data (0-23 hours)
    const completeHourlyUtilization = Array.from({ length: 24 }, (_, hour) => {
      const data = hourlyUtilization.find(h => h.hour === hour);
      return {
        hour,
        activeSessions: data?.activeSessions || 0,
        utilizationPercent: data?.avgUtilization || 0,
      };
    });

    return NextResponse.json({
      period: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        days
      },
      overallStats: overallStats[0] || { 
        totalTables: 0, 
        activeTables: 0, 
        avgUtilization: 0, 
        totalRevenue: 0, 
        totalHours: 0 
      },
      tableUtilization: tableUtilization || [],
      hourlyUtilization: completeHourlyUtilization,
    });
  } catch (error) {
    console.error('Error fetching table utilization:', error);
    return NextResponse.json({ error: 'Failed to fetch table utilization' }, { status: 500 });
  }
} 