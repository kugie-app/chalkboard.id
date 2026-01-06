import { NextResponse } from 'next/server';
import { getTaxSettings } from '@/lib/tax-server';

export async function GET() {
  try {
    const taxSettings = await getTaxSettings();
    return NextResponse.json(taxSettings);
  } catch (error) {
    console.error('Error fetching tax settings:', error);
    return NextResponse.json({ 
      enabled: false, 
      percentage: 11, 
      name: 'PPN', 
      applyToTables: false, 
      applyToFnb: true 
    });
  }
}