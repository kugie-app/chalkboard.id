import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tables, tableSessions } from '@/schema/tables';
import { fnbOrders } from '@/schema/fnb';
import { eq, and } from 'drizzle-orm';
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
    const sessionId = parseInt(id);
    const body = await request.json();
    const { newTableId } = body;

    if (!newTableId) {
      return NextResponse.json({ 
        error: 'New table ID is required' 
      }, { status: 400 });
    }

    // Find the active session
    const currentSession = await db.select().from(tableSessions)
      .where(and(eq(tableSessions.id, sessionId), eq(tableSessions.status, 'active')))
      .limit(1);

    if (currentSession.length === 0) {
      return NextResponse.json({ 
        error: 'Active session not found' 
      }, { status: 404 });
    }

    const sessionData = currentSession[0];
    const oldTableId = sessionData.tableId;

    // Check if the new table exists and is available
    const newTable = await db.select().from(tables)
      .where(and(eq(tables.id, newTableId), eq(tables.isActive, true)))
      .limit(1);

    if (newTable.length === 0) {
      return NextResponse.json({ 
        error: 'Target table not found or not active' 
      }, { status: 404 });
    }

    if (newTable[0].status !== 'available') {
      return NextResponse.json({ 
        error: 'Target table is not available' 
      }, { status: 400 });
    }

    // Check if the old table exists
    const oldTable = await db.select().from(tables)
      .where(eq(tables.id, oldTableId))
      .limit(1);

    if (oldTable.length === 0) {
      return NextResponse.json({ 
        error: 'Current table not found' 
      }, { status: 404 });
    }

    // Update the session to point to the new table
    await db.update(tableSessions)
      .set({ tableId: newTableId })
      .where(eq(tableSessions.id, sessionId));

    // Update the old table status to available
    await db.update(tables)
      .set({ status: 'available', updatedAt: new Date() })
      .where(eq(tables.id, oldTableId));

    // Update the new table status to occupied
    await db.update(tables)
      .set({ status: 'occupied', updatedAt: new Date() })
      .where(eq(tables.id, newTableId));

    // Move any pending F&B orders from the old table to the new table
    await db.update(fnbOrders)
      .set({ tableId: newTableId })
      .where(and(
        eq(fnbOrders.tableId, oldTableId),
        eq(fnbOrders.status, 'pending')
      ));

    // Fetch the updated session
    const updatedSession = await db.select().from(tableSessions)
      .where(eq(tableSessions.id, sessionId))
      .limit(1);

    return NextResponse.json({
      ...updatedSession[0],
      oldTableId,
      newTableId,
      message: 'Session moved successfully'
    });
  } catch (error) {
    console.error('Error moving session:', error);
    return NextResponse.json({ error: 'Failed to move session' }, { status: 500 });
  }
}