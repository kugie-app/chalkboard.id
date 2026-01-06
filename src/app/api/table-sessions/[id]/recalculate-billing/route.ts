import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tables, tableSessions } from '@/schema/tables';
import { fnbOrders } from '@/schema/fnb';
import { payments } from '@/schema/payments';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

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
    const { actualDuration, durationType } = body;

    if (typeof actualDuration !== 'number' || !durationType) {
      return NextResponse.json({ 
        error: 'Actual duration and duration type are required' 
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

    // Get table rates for cost calculation
    const table = await db.select().from(tables).where(eq(tables.id, tableId)).limit(1);
    const tableData = table[0];
    
    let tableCost: number;
    let billingDetails: any;

    if (durationType === 'per_minute') {
      // Per-minute billing
      const perMinuteRate = tableData.perMinuteRate ? 
        parseFloat(tableData.perMinuteRate) : 
        parseFloat(tableData.hourlyRate) / 60;
      
      tableCost = actualDuration * perMinuteRate;
      
      billingDetails = {
        type: 'per_minute',
        rate: perMinuteRate,
        actualMinutes: actualDuration,
        billableMinutes: actualDuration
      };
    } else {
      // Hourly billing
      const hourlyRate = parseFloat(tableData.hourlyRate);
      const billableHours = Math.ceil(actualDuration / 60);
      tableCost = billableHours * hourlyRate;
      
      billingDetails = {
        type: 'hourly',
        rate: hourlyRate,
        actualMinutes: actualDuration,
        billableHours
      };
    }
    
    // Get F&B orders for this session
    const fnbOrdersForTable = await db.select().from(fnbOrders)
      .where(and(
        eq(fnbOrders.tableId, tableId),
        eq(fnbOrders.paymentId, sessionData.paymentId!)
      ));
    
    // Calculate total F&B cost
    const fnbTotalCost = fnbOrdersForTable.reduce((total, order) => {
      return total + parseFloat(order.total);
    }, 0);
    
    // Total cost = table cost + F&B cost
    const totalCost = tableCost + fnbTotalCost;

    // Update the session with new duration and cost
    const updatedSession = await db.update(tableSessions)
      .set({
        actualDuration,
        durationType,
        totalCost: totalCost.toFixed(2),
      })
      .where(eq(tableSessions.id, sessionId))
      .returning();

    // Update the associated payment record
    if (sessionData.paymentId) {
      await db.update(payments)
        .set({
          totalAmount: totalCost.toFixed(2),
          tableAmount: tableCost.toFixed(2),
          fnbAmount: fnbTotalCost.toFixed(2),
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
        totalCost,
        fnbOrders: fnbOrdersForTable
      },
      message: 'Billing recalculated successfully'
    });
  } catch (error) {
    console.error('Error recalculating billing:', error);
    return NextResponse.json({ error: 'Failed to recalculate billing' }, { status: 500 });
  }
}