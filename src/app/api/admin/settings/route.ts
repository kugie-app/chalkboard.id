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

    const settings = await db.select().from(systemSettings).where(eq(systemSettings.isActive, true));
    
    // Convert to key-value object for easier access
    const settingsObject = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json({ settings: settingsObject });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { key, value, description } = await request.json();

    if (!key || !value) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    // Check if setting already exists
    const existingSetting = await db.select().from(systemSettings)
      .where(eq(systemSettings.key, key))
      .limit(1);

    if (existingSetting.length > 0) {
      // Update existing setting
      const updatedSetting = await db.update(systemSettings)
        .set({ 
          value, 
          description,
          updatedAt: new Date() 
        })
        .where(eq(systemSettings.key, key))
        .returning();

      return NextResponse.json({ setting: updatedSetting[0] });
    } else {
      // Create new setting
      const newSetting = await db.insert(systemSettings).values({
        key,
        value,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      return NextResponse.json({ setting: newSetting[0] });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 });
  }
}