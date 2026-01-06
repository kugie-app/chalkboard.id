import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fnbItems } from '@/schema/fnb';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

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
    const itemId = parseInt(id);

    const body = await request.json();
    const { 
      name, 
      description, 
      price, 
      cost, 
      stockQuantity, 
      minStockLevel, 
      unit, 
      categoryId, 
      isActive 
    } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ 
        error: 'Name, price, and category are required' 
      }, { status: 400 });
    }

    const updatedItem = await db
      .update(fnbItems)
      .set({
        name,
        description,
        price: price.toString(),
        cost: cost ? cost.toString() : null,
        stockQuantity,
        minStockLevel,
        unit,
        categoryId,
        isActive,
        updatedAt: new Date(),
      })
      .where(eq(fnbItems.id, itemId))
      .returning();

    if (updatedItem.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const itemId = parseInt(id);

    const deletedItem = await db
      .delete(fnbItems)
      .where(eq(fnbItems.id, itemId))
      .returning();

    if (deletedItem.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
} 