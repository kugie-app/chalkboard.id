import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fnbItems, fnbCategories, fnbOrderItems, fnbOrders } from '@/schema/fnb';
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

    const endDate = date ? new Date(date) : new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);

    // Get current stock levels with category information
    const stockLevels = await db.select({
      itemId: fnbItems.id,
      itemName: fnbItems.name,
      categoryId: fnbCategories.id,
      categoryName: fnbCategories.name,
      currentStock: fnbItems.stockQuantity,
      minStockLevel: fnbItems.minStockLevel,
      unit: fnbItems.unit,
      price: fnbItems.price,
      cost: fnbItems.cost,
      isActive: fnbItems.isActive,
      stockStatus: sql<string>`
        CASE 
          WHEN ${fnbItems.stockQuantity} = 0 THEN 'out_of_stock'
          WHEN ${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel} THEN 'low_stock'
          WHEN ${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel} * 2 THEN 'medium_stock'
          ELSE 'high_stock'
        END
      `,
      stockValue: sql<number>`${fnbItems.stockQuantity} * COALESCE(${fnbItems.cost}, ${fnbItems.price})`,
      daysUntilReorder: sql<number>`
        CASE 
          WHEN ${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel} THEN 0
          ELSE ${fnbItems.stockQuantity} - ${fnbItems.minStockLevel}
        END
      `,
    })
      .from(fnbItems)
      .innerJoin(fnbCategories, eq(fnbItems.categoryId, fnbCategories.id))
      .where(eq(fnbItems.isActive, true))
      .orderBy(sql`
        CASE 
          WHEN ${fnbItems.stockQuantity} = 0 THEN 1
          WHEN ${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel} THEN 2
          WHEN ${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel} * 2 THEN 3
          ELSE 4
        END
      `, fnbItems.name);

    // Get stock movement (consumption) in the period
    const stockMovement = await db.select({
      itemId: fnbItems.id,
      itemName: fnbItems.name,
      totalSold: sql<number>`COALESCE(SUM(${fnbOrderItems.quantity}), 0)`,
      totalRevenue: sql<number>`COALESCE(SUM(${fnbOrderItems.subtotal}), 0)`,
      avgDailyConsumption: sql<number>`COALESCE(SUM(${fnbOrderItems.quantity}), 0) / ${days}`,
      orderCount: sql<number>`COUNT(DISTINCT ${fnbOrderItems.orderId})`,
      firstOrderDate: sql<string>`MIN(${fnbOrders.createdAt})`,
      lastOrderDate: sql<string>`MAX(${fnbOrders.createdAt})`,
    })
      .from(fnbItems)
      .leftJoin(fnbOrderItems, eq(fnbItems.id, fnbOrderItems.itemId))
      .leftJoin(fnbOrders, eq(fnbOrderItems.orderId, fnbOrders.id))
      .where(
        and(
          eq(fnbItems.isActive, true),
          gte(fnbOrders.createdAt, startDate),
          lte(fnbOrders.createdAt, endDate)
        )
      )
      .groupBy(fnbItems.id, fnbItems.name)
      .orderBy(sql`COALESCE(SUM(${fnbOrderItems.quantity}), 0) DESC`);

    // Get stock alerts (low stock, out of stock)
    const stockAlerts = await db.select({
      itemId: fnbItems.id,
      itemName: fnbItems.name,
      categoryName: fnbCategories.name,
      currentStock: fnbItems.stockQuantity,
      minStockLevel: fnbItems.minStockLevel,
      alertType: sql<string>`
        CASE 
          WHEN ${fnbItems.stockQuantity} = 0 THEN 'OUT_OF_STOCK'
          WHEN ${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel} THEN 'LOW_STOCK'
          ELSE 'NORMAL'
        END
      `,
      urgency: sql<string>`
        CASE 
          WHEN ${fnbItems.stockQuantity} = 0 THEN 'HIGH'
          WHEN ${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel} THEN 'MEDIUM'
          ELSE 'LOW'
        END
      `,
      suggestedReorderQuantity: sql<number>`
        CASE 
          WHEN ${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel} THEN 
            ${fnbItems.minStockLevel} * 3 - ${fnbItems.stockQuantity}
          ELSE 0
        END
      `,
    })
      .from(fnbItems)
      .innerJoin(fnbCategories, eq(fnbItems.categoryId, fnbCategories.id))
      .where(
        and(
          eq(fnbItems.isActive, true),
          sql`${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel}`
        )
      )
      .orderBy(sql`
        CASE 
          WHEN ${fnbItems.stockQuantity} = 0 THEN 1
          WHEN ${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel} THEN 2
          ELSE 3
        END
      `, fnbItems.name);

    // Get category-wise stock summary
    const categoryStockSummary = await db.select({
      categoryId: fnbCategories.id,
      categoryName: fnbCategories.name,
      totalItems: sql<number>`COUNT(${fnbItems.id})`,
      outOfStockItems: sql<number>`COUNT(CASE WHEN ${fnbItems.stockQuantity} = 0 THEN 1 END)`,
      lowStockItems: sql<number>`COUNT(CASE WHEN ${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel} AND ${fnbItems.stockQuantity} > 0 THEN 1 END)`,
      normalStockItems: sql<number>`COUNT(CASE WHEN ${fnbItems.stockQuantity} > ${fnbItems.minStockLevel} THEN 1 END)`,
      totalStockValue: sql<number>`SUM(${fnbItems.stockQuantity} * COALESCE(${fnbItems.cost}, ${fnbItems.price}))`,
      avgStockLevel: sql<number>`AVG(${fnbItems.stockQuantity})`,
    })
      .from(fnbCategories)
      .innerJoin(fnbItems, eq(fnbCategories.id, fnbItems.categoryId))
      .where(
        and(
          eq(fnbItems.isActive, true),
          eq(fnbCategories.isActive, true)
        )
      )
      .groupBy(fnbCategories.id, fnbCategories.name)
      .orderBy(fnbCategories.name);

    // Get overall stock statistics
    const overallStats = await db.select({
      totalItems: sql<number>`COUNT(*)`,
      totalStockValue: sql<number>`SUM(${fnbItems.stockQuantity} * COALESCE(${fnbItems.cost}, ${fnbItems.price}))`,
      outOfStockItems: sql<number>`COUNT(CASE WHEN ${fnbItems.stockQuantity} = 0 THEN 1 END)`,
      lowStockItems: sql<number>`COUNT(CASE WHEN ${fnbItems.stockQuantity} <= ${fnbItems.minStockLevel} AND ${fnbItems.stockQuantity} > 0 THEN 1 END)`,
      normalStockItems: sql<number>`COUNT(CASE WHEN ${fnbItems.stockQuantity} > ${fnbItems.minStockLevel} THEN 1 END)`,
      avgStockLevel: sql<number>`AVG(${fnbItems.stockQuantity})`,
      totalCategories: sql<number>`COUNT(DISTINCT ${fnbItems.categoryId})`,
    })
      .from(fnbItems)
      .where(eq(fnbItems.isActive, true));

    return NextResponse.json({
      period: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        days
      },
      overallStats: overallStats[0] || {
        totalItems: 0,
        totalStockValue: 0,
        outOfStockItems: 0,
        lowStockItems: 0,
        normalStockItems: 0,
        avgStockLevel: 0,
        totalCategories: 0
      },
      stockLevels: stockLevels || [],
      stockMovement: stockMovement || [],
      stockAlerts: stockAlerts || [],
      categoryStockSummary: categoryStockSummary || [],
    });
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
} 