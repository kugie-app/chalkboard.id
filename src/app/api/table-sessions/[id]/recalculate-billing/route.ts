import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tables, tableSessions } from '@/schema/tables';
import { pricingPackages } from '@/schema/pricing-packages';
import { fnbOrders } from '@/schema/fnb';
import { payments } from '@/schema/payments';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { getTaxSettings } from '@/lib/tax-server';
import { calculateTax } from '@/lib/tax';

export async function POST(
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
    const { actualDuration } = body;

    if (typeof actualDuration !== 'number') {
      return NextResponse.json({
        error: 'Actual duration is required'
      }, { status: 400 });
    }

    // Find the completed session
    const targetSession = await db.select().from(tableSessions)
      .where(and(eq(tableSessions.id, sessionId), eq(tableSessions.status, 'completed')))
      .limit(1);

    if (targetSession.length === 0) {
      return NextResponse.json({
        error: 'Completed session not found'
      }, { status: 404 });
    }

    const sessionData = targetSession[0];
    const tableId = sessionData.tableId;

    // Get pricing package for rates (mirrors end-session logic)
    let pricingPackage;
    if (sessionData.pricingPackageId) {
      const packageResult = await db.select().from(pricingPackages)
        .where(eq(pricingPackages.id, sessionData.pricingPackageId))
        .limit(1);
      pricingPackage = packageResult[0];
    }

    // Fallback to table rates
    const table = await db.select().from(tables).where(eq(tables.id, tableId)).limit(1);
    const tableData = table[0];

    // Derive billing type from package (locked to package)
    let durationType: string;
    if (pricingPackage) {
      durationType = pricingPackage.category;
    } else {
      durationType = sessionData.durationType || (tableData.perMinuteRate ? 'per_minute' : 'hourly');
    }

    let tableCost: number;
    let billingDetails: any;

    if (durationType === 'per_minute') {
      let perMinuteRate: number;
      if (pricingPackage?.perMinuteRate) {
        perMinuteRate = parseFloat(pricingPackage.perMinuteRate);
      } else {
        perMinuteRate = tableData.perMinuteRate ?
          parseFloat(tableData.perMinuteRate) :
          parseFloat(tableData.hourlyRate) / 60;
      }

      tableCost = actualDuration * perMinuteRate;

      billingDetails = {
        type: 'per_minute',
        rate: perMinuteRate,
        actualMinutes: actualDuration,
        billableMinutes: actualDuration,
        packageName: pricingPackage?.name
      };
    } else {
      let hourlyRate: number;
      if (pricingPackage?.hourlyRate) {
        hourlyRate = parseFloat(pricingPackage.hourlyRate);
      } else {
        hourlyRate = parseFloat(tableData.hourlyRate);
      }

      const billableHours = Math.ceil(actualDuration / 60);
      tableCost = billableHours * hourlyRate;

      billingDetails = {
        type: 'hourly',
        rate: hourlyRate,
        actualMinutes: actualDuration,
        billableHours,
        packageName: pricingPackage?.name
      };
    }

    // Get F&B orders for this table (pending or already linked to session's payment)
    let fnbOrdersForTable;
    if (sessionData.paymentId) {
      fnbOrdersForTable = await db.select().from(fnbOrders)
        .where(and(
          eq(fnbOrders.tableId, tableId),
          eq(fnbOrders.paymentId, sessionData.paymentId)
        ));
    } else {
      fnbOrdersForTable = await db.select().from(fnbOrders)
        .where(and(
          eq(fnbOrders.tableId, tableId),
          eq(fnbOrders.status, 'pending')
        ));
    }

    // Calculate total F&B cost
    const fnbTotalCost = fnbOrdersForTable.reduce((total, order) => {
      return total + parseFloat(order.total);
    }, 0);

    // Calculate tax
    const taxSettings = await getTaxSettings();
    const tableTax = calculateTax(tableCost, taxSettings, true);
    const fnbTax = calculateTax(fnbTotalCost, taxSettings, false);
    const totalTaxAmount = tableTax + fnbTax;
    const subtotal = tableCost + fnbTotalCost;
    const totalCost = subtotal + totalTaxAmount;

    // Update the session with new duration and cost
    const updatedSession = await db.update(tableSessions)
      .set({
        actualDuration,
        durationType,
        totalCost: totalCost.toFixed(2),
      })
      .where(eq(tableSessions.id, sessionId))
      .returning();

    // Update the associated payment record if it exists
    if (sessionData.paymentId) {
      await db.update(payments)
        .set({
          totalAmount: totalCost.toFixed(2),
          tableAmount: tableCost.toFixed(2),
          fnbAmount: fnbTotalCost.toFixed(2),
          taxAmount: totalTaxAmount.toFixed(2),
          updatedAt: new Date(),
        })
        .where(eq(payments.id, sessionData.paymentId));
    }

    return NextResponse.json({
      session: updatedSession[0],
      billing: {
        actualDuration,
        originalDuration: sessionData.originalDuration,
        billingDetails,
        tableCost,
        fnbTotalCost,
        subtotal,
        tableTax,
        fnbTax,
        totalTaxAmount,
        totalCost,
        fnbOrders: fnbOrdersForTable,
        taxSettings
      },
      message: 'Billing recalculated successfully'
    });
  } catch (error) {
    console.error('Error recalculating billing:', error);
    return NextResponse.json({ error: 'Failed to recalculate billing' }, { status: 500 });
  }
}
