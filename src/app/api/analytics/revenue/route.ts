import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tables, tableSessions } from '@/schema/tables';
import { fnbOrders, fnbOrderItems, fnbItems } from '@/schema/fnb';
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
    const days = parseInt(searchParams.get('days') || '30');
    const period = searchParams.get('period') || 'daily'; // daily, weekly, monthly

    // Use consistent date handling - create dates properly for range
    const endDate = date ? new Date(date) : new Date();
    endDate.setHours(23, 59, 59, 999); // End of day
    
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0); // Start of day

    // We'll calculate the summary from daily data to ensure consistency

    // Get daily revenue trend - query table sessions
    const dailyTableRevenue = await db.select({
      date: sql<string>`DATE(${tableSessions.createdAt})`,
      tableRevenue: sql<number>`COALESCE(SUM(CAST(${tableSessions.totalCost} AS NUMERIC)), 0)`,
      sessions: sql<number>`COUNT(${tableSessions.id})`,
    })
      .from(tableSessions)
      .where(
        and(
          gte(tableSessions.createdAt, startDate),
          lte(tableSessions.createdAt, endDate)
        )
      )
      .groupBy(sql`DATE(${tableSessions.createdAt})`)
      .orderBy(sql`DATE(${tableSessions.createdAt})`);

    // Get daily F&B revenue
    const dailyFnbRevenue = await db.select({
      date: sql<string>`DATE(${fnbOrders.createdAt})`,
      fnbRevenue: sql<number>`COALESCE(SUM(CAST(${fnbOrders.total} AS NUMERIC)), 0)`,
      orders: sql<number>`COUNT(${fnbOrders.id})`,
    })
      .from(fnbOrders)
      .where(
        and(
          gte(fnbOrders.createdAt, startDate),
          lte(fnbOrders.createdAt, endDate)
        )
      )
      .groupBy(sql`DATE(${fnbOrders.createdAt})`)
      .orderBy(sql`DATE(${fnbOrders.createdAt})`);

    // Generate complete revenue data based on period
    const revenueData: {
      date: string;
      tableRevenue: number;
      fnbRevenue: number;
      totalRevenue: number;
      sessions: number;
      orders: number;
    }[] = [];
    
    if (period === 'daily') {
      // Generate daily data for exact number of days (days + 1 for inclusive range)
      for (let i = 0; i <= days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateStr = currentDate.toISOString().split('T')[0];
        
        const tableData = dailyTableRevenue.find(item => item.date === dateStr);
        const fnbData = dailyFnbRevenue.find(item => item.date === dateStr);
        
        const tableRevenue = Number(tableData?.tableRevenue || 0);
        const fnbRevenue = Number(fnbData?.fnbRevenue || 0);
        
        revenueData.push({
          date: dateStr,
          tableRevenue,
          fnbRevenue,
          totalRevenue: tableRevenue + fnbRevenue,
          sessions: Number(tableData?.sessions || 0),
          orders: Number(fnbData?.orders || 0),
        });
      }
    } else if (period === 'weekly') {
      // Group by week
      const weeklyData = new Map();
      
      // Process table revenue
      dailyTableRevenue.forEach(item => {
        const date = new Date(item.date);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
        const weekKey = weekStart.toISOString().split('T')[0];
        
        if (!weeklyData.has(weekKey)) {
          weeklyData.set(weekKey, { date: weekKey, tableRevenue: 0, fnbRevenue: 0, sessions: 0, orders: 0 });
        }
        
        const week = weeklyData.get(weekKey);
        week.tableRevenue += Number(item.tableRevenue);
        week.sessions += Number(item.sessions);
      });
      
      // Process F&B revenue
      dailyFnbRevenue.forEach(item => {
        const date = new Date(item.date);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = weekStart.toISOString().split('T')[0];
        
        if (!weeklyData.has(weekKey)) {
          weeklyData.set(weekKey, { date: weekKey, tableRevenue: 0, fnbRevenue: 0, sessions: 0, orders: 0 });
        }
        
        const week = weeklyData.get(weekKey);
        week.fnbRevenue += Number(item.fnbRevenue);
        week.orders += Number(item.orders);
      });
      
      // Convert to array and calculate totals
      weeklyData.forEach(week => {
        week.totalRevenue = week.tableRevenue + week.fnbRevenue;
        revenueData.push(week);
      });
      
      revenueData.sort((a, b) => a.date.localeCompare(b.date));
    } else if (period === 'monthly') {
      // Group by month
      const monthlyData = new Map();
      
      // Process table revenue
      dailyTableRevenue.forEach(item => {
        const date = new Date(item.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
        
        if (!monthlyData.has(monthKey)) {
          monthlyData.set(monthKey, { date: monthKey, tableRevenue: 0, fnbRevenue: 0, sessions: 0, orders: 0 });
        }
        
        const month = monthlyData.get(monthKey);
        month.tableRevenue += Number(item.tableRevenue);
        month.sessions += Number(item.sessions);
      });
      
      // Process F&B revenue
      dailyFnbRevenue.forEach(item => {
        const date = new Date(item.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
        
        if (!monthlyData.has(monthKey)) {
          monthlyData.set(monthKey, { date: monthKey, tableRevenue: 0, fnbRevenue: 0, sessions: 0, orders: 0 });
        }
        
        const month = monthlyData.get(monthKey);
        month.fnbRevenue += Number(item.fnbRevenue);
        month.orders += Number(item.orders);
      });
      
      // Convert to array and calculate totals
      monthlyData.forEach(month => {
        month.totalRevenue = month.tableRevenue + month.fnbRevenue;
        revenueData.push(month);
      });
      
      revenueData.sort((a, b) => a.date.localeCompare(b.date));
    }
    
    const dailyRevenue = revenueData;

    // Calculate summary from daily data to ensure consistency
    const summary = {
      tableRevenue: dailyRevenue.reduce((sum, day) => sum + day.tableRevenue, 0),
      fnbRevenue: dailyRevenue.reduce((sum, day) => sum + day.fnbRevenue, 0),
      totalRevenue: dailyRevenue.reduce((sum, day) => sum + day.totalRevenue, 0),
      tableSessions: dailyRevenue.reduce((sum, day) => sum + day.sessions, 0),
      fnbOrders: dailyRevenue.reduce((sum, day) => sum + day.orders, 0),
    };

    // Get revenue by table
    const tableRevenue = await db.select({
      tableId: tables.id,
      tableName: tables.name,
      totalRevenue: sql<number>`COALESCE(SUM(CAST(${tableSessions.totalCost} AS NUMERIC)), 0)`,
      totalSessions: sql<number>`COUNT(${tableSessions.id})`,
      avgRevenuePerSession: sql<number>`COALESCE(AVG(CAST(${tableSessions.totalCost} AS NUMERIC)), 0)`,
      totalHours: sql<number>`COALESCE(SUM(${tableSessions.actualDuration}), 0) / 60.0`,
      hourlyRate: tables.hourlyRate,
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
      .groupBy(tables.id, tables.name, tables.hourlyRate)
      .orderBy(sql`COALESCE(SUM(CAST(${tableSessions.totalCost} AS NUMERIC)), 0) DESC`);

    // Get payment method breakdown
    const paymentMethodBreakdown = await db.select({
      paymentMethod: sql<string>`COALESCE(${payments.paymentMethod}, 'Unknown')`,
      totalAmount: sql<number>`COALESCE(SUM(CAST(${payments.amount} AS NUMERIC)), 0)`,
      transactionCount: sql<number>`COUNT(${payments.id})`,
      successRate: sql<number>`
        CASE 
          WHEN COUNT(${payments.id}) > 0 THEN
            (COUNT(CASE WHEN ${payments.status} = 'success' THEN 1 END) * 100.0) / COUNT(${payments.id})
          ELSE 0
        END
      `,
    })
      .from(payments)
      .where(
        and(
          gte(payments.createdAt, startDate),
          lte(payments.createdAt, endDate)
        )
      )
      .groupBy(payments.paymentMethod)
      .orderBy(sql`COALESCE(SUM(CAST(${payments.amount} AS NUMERIC)), 0) DESC`);

    // Get top selling F&B items
    const topSellingItems = await db.select({
      itemId: fnbItems.id,
      itemName: fnbItems.name,
      totalQuantity: sql<number>`SUM(${fnbOrderItems.quantity})`,
      totalRevenue: sql<number>`SUM(CAST(${fnbOrderItems.subtotal} AS NUMERIC))`,
      avgPrice: sql<number>`AVG(CAST(${fnbOrderItems.unitPrice} AS NUMERIC))`,
      orderCount: sql<number>`COUNT(DISTINCT ${fnbOrderItems.orderId})`,
    })
      .from(fnbOrderItems)
      .innerJoin(fnbItems, eq(fnbOrderItems.itemId, fnbItems.id))
      .innerJoin(fnbOrders, eq(fnbOrderItems.orderId, fnbOrders.id))
      .where(
        and(
          gte(fnbOrders.createdAt, startDate),
          lte(fnbOrders.createdAt, endDate)
        )
      )
      .groupBy(fnbItems.id, fnbItems.name)
      .orderBy(sql`SUM(CAST(${fnbOrderItems.subtotal} AS NUMERIC)) DESC`)
      .limit(10);

    // Get hourly table revenue distribution
    const hourlyTableRevenue = await db.select({
      hour: sql<number>`EXTRACT(HOUR FROM ${tableSessions.startTime})`,
      tableRevenue: sql<number>`COALESCE(SUM(CAST(${tableSessions.totalCost} AS NUMERIC)), 0)`,
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

    // Get hourly F&B revenue distribution
    const hourlyFnbRevenue = await db.select({
      hour: sql<number>`EXTRACT(HOUR FROM ${fnbOrders.createdAt})`,
      fnbRevenue: sql<number>`COALESCE(SUM(CAST(${fnbOrders.total} AS NUMERIC)), 0)`,
    })
      .from(fnbOrders)
      .where(
        and(
          gte(fnbOrders.createdAt, startDate),
          lte(fnbOrders.createdAt, endDate)
        )
      )
      .groupBy(sql`EXTRACT(HOUR FROM ${fnbOrders.createdAt})`)
      .orderBy(sql`EXTRACT(HOUR FROM ${fnbOrders.createdAt})`);

    // Create complete hourly revenue data
    const completeHourlyRevenue = Array.from({ length: 24 }, (_, hour) => {
      const tableData = hourlyTableRevenue.find(h => h.hour === hour);
      const fnbData = hourlyFnbRevenue.find(h => h.hour === hour);
      const tableRevenue = Number(tableData?.tableRevenue || 0);
      const fnbRevenue = Number(fnbData?.fnbRevenue || 0);
      
      return {
        hour,
        tableRevenue,
        fnbRevenue,
        totalRevenue: tableRevenue + fnbRevenue,
      };
    });

    return NextResponse.json({
      period: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        days: Number(days)
      },
      summary,
      dailyRevenue: dailyRevenue,
      tableRevenue: (tableRevenue || []).map(table => ({
        ...table,
        totalRevenue: Number(table.totalRevenue || 0),
        totalSessions: Number(table.totalSessions || 0),
        avgRevenuePerSession: Number(table.avgRevenuePerSession || 0),
        totalHours: Number(table.totalHours || 0),
        hourlyRate: Number(table.hourlyRate || 0),
      })),
      paymentMethods: (paymentMethodBreakdown || []).map(method => ({
        ...method,
        totalAmount: Number(method.totalAmount || 0),
        transactionCount: Number(method.transactionCount || 0),
        successRate: Number(method.successRate || 0),
      })),
      topSellingItems: (topSellingItems || []).map(item => ({
        ...item,
        totalQuantity: Number(item.totalQuantity || 0),
        totalRevenue: Number(item.totalRevenue || 0),
        avgPrice: Number(item.avgPrice || 0),
        orderCount: Number(item.orderCount || 0),
      })),
      hourlyRevenue: completeHourlyRevenue,
    });
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    return NextResponse.json({ error: 'Failed to fetch revenue data' }, { status: 500 });
  }
} 