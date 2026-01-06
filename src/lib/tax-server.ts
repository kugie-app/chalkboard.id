import { db } from '@/lib/db';
import { systemSettings } from '@/schema/settings';
import { eq } from 'drizzle-orm';
import type { TaxSettings } from './tax';

export async function getTaxSettings(): Promise<TaxSettings> {
  try {
    const settings = await db.select().from(systemSettings).where(
      eq(systemSettings.key, 'tax_settings')
    );

    if (settings.length > 0) {
      return JSON.parse(settings[0].value);
    }
  } catch (error) {
    console.error('Error fetching tax settings:', error);
  }

  // Default tax settings
  return {
    enabled: false,
    percentage: 11,
    name: 'PPN',
    applyToTables: false,
    applyToFnb: true
  };
}