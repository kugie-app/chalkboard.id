import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';
import { auth } from '@/lib/auth';

export async function POST() {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await seedDatabase();
    return NextResponse.json({ 
      message: 'Database seeded successfully',
      result 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to seed database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 