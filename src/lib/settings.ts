import { db } from '@/lib/db';
import { systemSettings } from '@/schema/settings';
import { eq } from 'drizzle-orm';

export type BillingRateType = 'hourly' | 'per_minute';

export async function getBillingRateType(): Promise<BillingRateType> {
  try {
    const setting = await db.select().from(systemSettings)
      .where(eq(systemSettings.key, 'billing_rate_type'))
      .limit(1);
    
    if (setting.length > 0) {
      return setting[0].value as BillingRateType;
    }
    
    // Default to hourly if not set
    return 'hourly';
  } catch (error) {
    console.error('Failed to get billing rate type:', error);
    return 'hourly';
  }
}

export async function setBillingRateType(type: BillingRateType): Promise<void> {
  try {
    const existingSetting = await db.select().from(systemSettings)
      .where(eq(systemSettings.key, 'billing_rate_type'))
      .limit(1);

    if (existingSetting.length > 0) {
      await db.update(systemSettings)
        .set({ 
          value: type,
          updatedAt: new Date() 
        })
        .where(eq(systemSettings.key, 'billing_rate_type'));
    } else {
      await db.insert(systemSettings).values({
        key: 'billing_rate_type',
        value: type,
        description: 'Determines whether billing is calculated per hour or per minute',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error('Failed to set billing rate type:', error);
    throw error;
  }
}