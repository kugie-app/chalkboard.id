import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tables } from '@/schema/tables';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const tableId = parseInt(id);
    const table = await db.select().from(tables).where(eq(tables.id, tableId)).limit(1);

    if (table.length === 0) {
      return NextResponse.json({ error: 'Table not found' }, { status: 404 });
    }

    return NextResponse.json(table[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch table' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const tableId = parseInt(id);
    const body = await request.json();
    const { name, status } = body;

    const updatedTable = await db.update(tables)
      .set({
        ...(name && { name }),
        ...(status && { status }),
        updatedAt: new Date(),
      })
      .where(eq(tables.id, tableId))
      .returning();

    if (updatedTable.length === 0) {
      return NextResponse.json({ error: 'Table not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTable[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update table' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const tableId = parseInt(id);

    // Soft delete by setting isActive to false
    const deletedTable = await db.update(tables)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(tables.id, tableId))
      .returning();

    if (deletedTable.length === 0) {
      return NextResponse.json({ error: 'Table not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Table deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete table' }, { status: 500 });
  }
} 