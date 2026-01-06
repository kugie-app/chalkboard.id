import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getBillingRateType, setBillingRateType, BillingRateType } from '@/lib/settings';

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const billingRateType = await getBillingRateType();
    
    return NextResponse.json({ 
      billingRateType,
      availableTypes: ['hourly', 'per_minute']
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch billing settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { billingRateType } = await request.json();

    if (!billingRateType || !['hourly', 'per_minute'].includes(billingRateType)) {
      return NextResponse.json({ 
        error: 'Invalid billing rate type. Must be "hourly" or "per_minute"' 
      }, { status: 400 });
    }

    await setBillingRateType(billingRateType as BillingRateType);

    return NextResponse.json({ 
      message: 'Billing rate type updated successfully',
      billingRateType 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update billing settings' }, { status: 500 });
  }
}