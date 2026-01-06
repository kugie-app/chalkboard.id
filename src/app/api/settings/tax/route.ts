import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { systemSettings } from '@/schema/settings';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get tax settings
    const settings = await db.select().from(systemSettings).where(
      eq(systemSettings.key, 'tax_settings')
    );

    let taxSettings;
    if (settings.length > 0) {
      taxSettings = JSON.parse(settings[0].value);
    } else {
      // Default tax settings
      taxSettings = {
        enabled: false,
        percentage: 11,
        name: 'PPN',
        applyToTables: false,
        applyToFnb: true
      };
    }

    return NextResponse.json(taxSettings);
  } catch (error) {
    console.error('Error fetching tax settings:', error);
    return NextResponse.json({ error: 'Failed to fetch tax settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { enabled, percentage, name, applyToTables, applyToFnb } = body;

    // Validate inputs
    if (enabled && (percentage < 0 || percentage > 100)) {
      return NextResponse.json({ 
        error: 'Tax percentage must be between 0 and 100' 
      }, { status: 400 });
    }

    const taxSettingsValue = {
      enabled: Boolean(enabled),
      percentage: parseFloat(percentage) || 0,
      name: name || 'Tax',
      applyToTables: Boolean(applyToTables),
      applyToFnb: Boolean(applyToFnb)
    };

    // Check if tax settings exist
    const existingSettings = await db.select().from(systemSettings).where(
      eq(systemSettings.key, 'tax_settings')
    );

    if (existingSettings.length > 0) {
      // Update existing settings
      await db.update(systemSettings)
        .set({
          value: JSON.stringify(taxSettingsValue),
          updatedAt: new Date()
        })
        .where(eq(systemSettings.key, 'tax_settings'));
    } else {
      // Create new settings
      await db.insert(systemSettings).values({
        key: 'tax_settings',
        value: JSON.stringify(taxSettingsValue),
        description: 'Tax configuration settings for tables and F&B',
        isActive: true
      });
    }

    return NextResponse.json({
      message: 'Tax settings updated successfully',
      settings: taxSettingsValue
    });
  } catch (error) {
    console.error('Error updating tax settings:', error);
    return NextResponse.json({ error: 'Failed to update tax settings' }, { status: 500 });
  }
}