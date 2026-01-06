import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tableSessions } from '@/schema/tables';
import { pricingPackages } from '@/schema/pricing-packages';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const tableId = parseInt(id);

    // Find active session for this table with pricing package information
    const activeSession = await db
      .select({
        id: tableSessions.id,
        tableId: tableSessions.tableId,
        customerName: tableSessions.customerName,
        customerPhone: tableSessions.customerPhone,
        startTime: tableSessions.startTime,
        endTime: tableSessions.endTime,
        plannedDuration: tableSessions.plannedDuration,
        actualDuration: tableSessions.actualDuration,
        originalDuration: tableSessions.originalDuration,
        durationType: tableSessions.durationType,
        pricingPackageId: tableSessions.pricingPackageId,
        totalCost: tableSessions.totalCost,
        status: tableSessions.status,
        paymentId: tableSessions.paymentId,
        staffId: tableSessions.staffId,
        sessionRating: tableSessions.sessionRating,
        fnbOrderCount: tableSessions.fnbOrderCount,
        createdAt: tableSessions.createdAt,
        // Include pricing package information
        pricingPackage: {
          id: pricingPackages.id,
          name: pricingPackages.name,
          description: pricingPackages.description,
          category: pricingPackages.category,
          hourlyRate: pricingPackages.hourlyRate,
          perMinuteRate: pricingPackages.perMinuteRate,
          isDefault: pricingPackages.isDefault,
          isActive: pricingPackages.isActive
        }
      })
      .from(tableSessions)
      .leftJoin(pricingPackages, eq(tableSessions.pricingPackageId, pricingPackages.id))
      .where(and(eq(tableSessions.tableId, tableId), eq(tableSessions.status, 'active')))
      .limit(1);

    if (activeSession.length === 0) {
      return NextResponse.json({ session: null });
    }

    return NextResponse.json({ session: activeSession[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch current session' }, { status: 500 });
  }
} 