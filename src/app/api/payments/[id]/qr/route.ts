import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { payments } from '@/schema/payments';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const paymentId = parseInt(id);

    const payment = await db.select().from(payments).where(eq(payments.id, paymentId)).limit(1);

    if (payment.length === 0) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    const paymentData = payment[0];
    
    // Generate QR code data (in a real implementation, this would integrate with Midtrans)
    const qrData = {
      orderId: paymentData.midtransOrderId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      transactionId: paymentData.transactionId,
      paymentUrl: `https://app.midtrans.com/snap/v1/transactions/${paymentData.midtransOrderId}/pay`,
      // For demo purposes, we'll use a simple QR code data structure
      qrString: `MIDTRANS|${paymentData.midtransOrderId}|${paymentData.amount}|${paymentData.currency}|${paymentData.transactionId}`,
    };

    return NextResponse.json({
      success: true,
      paymentId: paymentData.id,
      qrData,
      instructions: 'Scan this QR code with your mobile banking app or e-wallet to complete the payment.'
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
} 