import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fnbItems, fnbCategories } from '@/schema/fnb';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const items = await db.select({
      id: fnbItems.id,
      name: fnbItems.name,
      description: fnbItems.description,
      price: fnbItems.price,
      cost: fnbItems.cost,
      stockQuantity: fnbItems.stockQuantity,
      minStockLevel: fnbItems.minStockLevel,
      unit: fnbItems.unit,
      isActive: fnbItems.isActive,
      categoryId: fnbItems.categoryId,
      categoryName: fnbCategories.name,
      createdAt: fnbItems.createdAt,
      updatedAt: fnbItems.updatedAt,
    })
    .from(fnbItems)
    .leftJoin(fnbCategories, eq(fnbItems.categoryId, fnbCategories.id))
    .where(eq(fnbItems.isActive, true));

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      name, 
      description, 
      price, 
      cost, 
      stockQuantity = 0, 
      minStockLevel = 0, 
      unit = 'pcs', 
      categoryId, 
      isActive = true 
    } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ 
        error: 'Name, price, and category are required' 
      }, { status: 400 });
    }

    const newItem = await db.insert(fnbItems).values({
      name,
      description,
      price: price.toString(),
      cost: cost ? cost.toString() : null,
      stockQuantity,
      minStockLevel,
      unit,
      categoryId,
      isActive,
    }).returning();

    return NextResponse.json(newItem[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
} 