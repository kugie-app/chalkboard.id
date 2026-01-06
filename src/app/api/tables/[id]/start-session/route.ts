import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tables, tableSessions } from '@/schema/tables';
import { pricingPackages } from '@/schema/pricing-packages';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const tableId = parseInt(id);
    const body = await request.json();
    const { customerName, plannedDuration, mode = 'open', durationType = 'hourly', pricingPackageId } = body as { customerName: string; plannedDuration?: number; mode?: 'open' | 'planned'; durationType?: 'hourly' | 'per_minute'; pricingPackageId?: string };

    if (!customerName) {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
    }
    if (mode === 'planned' && (plannedDuration == null || Number.isNaN(Number(plannedDuration)))) {
      return NextResponse.json({ error: 'Planned duration is required for planned mode' }, { status: 400 });
    }
    if (!pricingPackageId) {
      return NextResponse.json({ error: 'Pricing package is required' }, { status: 400 });
    }

    // Fetch pricing package to determine duration type
    const pricingPackage = await db.select().from(pricingPackages)
      .where(eq(pricingPackages.id, pricingPackageId))
      .limit(1);

    if (pricingPackage.length === 0) {
      return NextResponse.json({ error: 'Pricing package not found' }, { status: 400 });
    }

    // Check if table exists and is available
    const table = await db.select().from(tables)
      .where(and(eq(tables.id, tableId), eq(tables.isActive, true)))
      .limit(1);

    if (table.length === 0) {
      return NextResponse.json({ error: 'Table not found' }, { status: 404 });
    }

    if (table[0].status !== 'available') {
      return NextResponse.json({ 
        error: 'Table is not available' 
      }, { status: 400 });
    }

    // Determine duration type based on pricing package category
    const sessionDurationType = pricingPackage[0].category === 'per_minute' ? 'per_minute' : 'hourly';

    // Start new session
    const newSession = await db.insert(tableSessions).values({
      tableId,
      customerName,
      startTime: new Date(),
      plannedDuration: mode === 'planned' ? parseInt(String(plannedDuration)) : 0,
      durationType: sessionDurationType,
      pricingPackageId,
      status: 'active',
    }).returning();

    // Update table status to occupied
    await db.update(tables)
      .set({ status: 'occupied', updatedAt: new Date() })
      .where(eq(tables.id, tableId));

    return NextResponse.json(newSession[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to start session' }, { status: 500 });
  }
} 