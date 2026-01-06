import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tables } from '@/schema/tables';
import { pricingPackages } from '@/schema/pricing-packages';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allTables = await db
      .select({
        id: tables.id,
        name: tables.name,
        status: tables.status,
        hourlyRate: tables.hourlyRate,
        perMinuteRate: tables.perMinuteRate,
        pricingPackageId: tables.pricingPackageId,
        isActive: tables.isActive,
        createdAt: tables.createdAt,
        updatedAt: tables.updatedAt,
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
      .from(tables)
      .leftJoin(pricingPackages, eq(tables.pricingPackageId, pricingPackages.id))
      .where(eq(tables.isActive, true));
    
    return NextResponse.json(allTables);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tables' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, status } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const newTable = await db.insert(tables).values({
      name,
      status: status || 'available',
      hourlyRate: '0.00', // Default value since tables now use pricing packages
      perMinuteRate: '0.00', // Default value since tables now use pricing packages
      isActive: true,
    }).returning();

    return NextResponse.json(newTable[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create table' }, { status: 500 });
  }
} 