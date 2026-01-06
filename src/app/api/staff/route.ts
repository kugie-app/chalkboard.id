import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { staff } from '@/schema/fnb';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    let staffMembers;
    
    if (activeOnly) {
      staffMembers = await db.select().from(staff)
        .where(eq(staff.isActive, true))
        .orderBy(staff.name);
    } else {
      staffMembers = await db.select().from(staff)
        .orderBy(staff.name);
    }
    return NextResponse.json(staffMembers);
  } catch (error) {
    console.error('Error fetching staff:', error);
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, role } = body;

    if (!name || !role) {
      return NextResponse.json({ 
        error: 'Name and role are required' 
      }, { status: 400 });
    }

    const newStaff = await db.insert(staff).values({
      name,
      role,
      isActive: true,
    }).returning();

    return NextResponse.json(newStaff[0], { status: 201 });
  } catch (error) {
    console.error('Error creating staff member:', error);
    return NextResponse.json({ error: 'Failed to create staff member' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, role, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });
    }

    const updatedStaff = await db.update(staff)
      .set({
        ...(name && { name }),
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
      })
      .where(eq(staff.id, id))
      .returning();

    if (updatedStaff.length === 0) {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
    }

    return NextResponse.json(updatedStaff[0]);
  } catch (error) {
    console.error('Error updating staff member:', error);
    return NextResponse.json({ error: 'Failed to update staff member' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });
    }

    // Instead of hard delete, we'll soft delete by setting isActive to false
    const deletedStaff = await db.update(staff)
      .set({ isActive: false })
      .where(eq(staff.id, parseInt(id)))
      .returning();

    if (deletedStaff.length === 0) {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Staff member deactivated successfully' });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    return NextResponse.json({ error: 'Failed to delete staff member' }, { status: 500 });
  }
} 