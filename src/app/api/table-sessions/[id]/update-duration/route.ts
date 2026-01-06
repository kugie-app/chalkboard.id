import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tableSessions } from '@/schema/tables';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function PUT(
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
    const { durationType, actualDuration } = body;

    if (!durationType || typeof actualDuration !== 'number') {
      return NextResponse.json({ 
        error: 'Duration type and actual duration are required' 
      }, { status: 400 });
    }

    if (!['hourly', 'per_minute'].includes(durationType)) {
      return NextResponse.json({ 
        error: 'Invalid duration type. Must be "hourly" or "per_minute"' 
      }, { status: 400 });
    }

    // Find the active session
    const currentSession = await db.select().from(tableSessions)
      .where(and(eq(tableSessions.id, sessionId), eq(tableSessions.status, 'active')))
      .limit(1);

    if (currentSession.length === 0) {
      return NextResponse.json({ 
        error: 'Active session not found' 
      }, { status: 404 });
    }

    const sessionData = currentSession[0];

    // Calculate the current elapsed time if originalDuration is not set
    let originalDuration = sessionData.originalDuration;
    if (!originalDuration) {
      const startTime = new Date(sessionData.startTime);
      const currentTime = new Date();
      originalDuration = Math.floor((currentTime.getTime() - startTime.getTime()) / (1000 * 60));
    }

    // Update the session with new duration type and manual duration
    const updatedSession = await db.update(tableSessions)
      .set({
        durationType,
        actualDuration,
        originalDuration, // Store the original duration if not already set
      })
      .where(eq(tableSessions.id, sessionId))
      .returning();

    return NextResponse.json({
      ...updatedSession[0],
      message: 'Session duration updated successfully'
    });
  } catch (error) {
    console.error('Error updating session duration:', error);
    return NextResponse.json({ error: 'Failed to update session duration' }, { status: 500 });
  }
}