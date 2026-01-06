import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { payments } from '@/schema/payments';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all pending transactions
    const pendingTransactions = await db
      .select({
        id: payments.id,
        transactionNumber: payments.transactionNumber,
        customerName: payments.customerName,
        customerPhone: payments.customerPhone,
        totalAmount: payments.totalAmount,
        tableAmount: payments.tableAmount,
        fnbAmount: payments.fnbAmount,
        status: payments.status,
        createdAt: payments.createdAt,
      })
      .from(payments)
      .where(eq(payments.status, 'pending'))
      .orderBy(payments.createdAt);

    return NextResponse.json(pendingTransactions);
  } catch (error) {
    console.error('Error fetching pending transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch pending transactions' }, { status: 500 });
  }
} 