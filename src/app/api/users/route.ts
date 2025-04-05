import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { userCreateSchema } from '@/features/users/schemas/userSchema';
import { getAllUsers, createUser, deleteUser } from '@/features/users/services/userService';
import { GetDataSource } from '@/lib/db';

// GET /api/users - Get all users (public)
export async function GET() {
  try {
    const connection = await GetDataSource();

    const result = await getAllUsers();

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const connection = await GetDataSource();

    // Validate request body
    const body = await request.json();
    const result = userCreateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: result.error.errors },
        { status: 400 },
      );
    }

    const userData = result.data;

    if (!userData.password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    // Create user using service
    const createResult = await createUser(userData);

    if (!createResult.success) {
      return NextResponse.json({ error: createResult.error }, { status: 409 });
    }

    return NextResponse.json(createResult.data, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// Example of a protected endpoint
export const DELETE = withAuth(async (request: NextRequest, user) => {
  try {
    const connection = await GetDataSource();

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Admin check (example)
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Only administrators can delete users' }, { status: 403 });
    }

    // Delete user using service
    const deleteResult = await deleteUser(id);

    if (!deleteResult.success) {
      if (deleteResult.error === 'User not found') {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ error: deleteResult.error }, { status: 500 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
});
