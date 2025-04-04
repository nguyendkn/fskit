import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { hash } from 'bcryptjs';
import { userCreateSchema } from '@/features/users/schemas/userSchema';

// Mock DB for demonstration (replace with actual database in production)
const users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    // Password: password123
    password: '$2a$10$4n5/nZlMpqsR5x8EJfCYh.FG1xfJOB7LfV9e1N/x2GUw06CrgPKnW',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// GET /api/users - Get all users (public)
export async function GET() {
  // Return users without passwords
  const safeUsers = users.map(({ password, ...user }) => user);
  return NextResponse.json(safeUsers);
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
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

    // Check if user already exists
    if (users.some((u) => u.email === userData.email)) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    if (!userData.password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(userData.password, 10);

    // Create new user
    const newUser = {
      id: crypto.randomUUID(),
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to "database" (mock)
    users.push(newUser);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// Example of a protected endpoint
export const DELETE = withAuth(async (request: NextRequest, user) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Admin check (example)
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Only administrators can delete users' }, { status: 403 });
    }

    // Find user by ID
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove from array (in a real app, you'd use your DB's delete operation)
    users.splice(userIndex, 1);

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
});
