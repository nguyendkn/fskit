// /src/app/api/[[...route]]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema } from 'zod';
import { loginSchema, userCreateSchema } from '@/features/users/schemas/userSchema';
import { loginUser, registerUser, verifyToken } from '@/features/auth/services/authService';
import { getAllUsers, createUser } from '@/features/users/services/userService';
import { GetDataSource } from '@/lib/db';

export const runtime = 'edge';

// Helper function to handle validation
async function validateRequest(request: NextRequest, schema: ZodSchema) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return {
        isValid: false,
        data: null,
        error: result.error.errors,
      };
    }

    return {
      isValid: true,
      data: result.data,
      error: null,
    };
  } catch (error) {
    return {
      isValid: false,
      data: null,
      error: 'Invalid JSON body',
    };
  }
}

// Hello endpoint
export async function GET(request: NextRequest) {
  try {
    const connection = await GetDataSource();

    const url = new URL(request.url);
    const path = url.pathname.replace('/api', '');

    // Basic routing based on paths
    if (path === '/hello') {
      return NextResponse.json({ message: 'Hello Next.js!' });
    }

    if (path === '/users') {
      // Get all users
      const result = await getAllUsers();

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      return NextResponse.json(result.data);
    }

    if (path.startsWith('/protected')) {
      // Verify authorization for protected routes
      const token = request.headers.get('Authorization')?.split(' ')[1];

      if (!token) {
        return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
      }

      // Verify token
      const tokenResult = await verifyToken(token);

      if (!tokenResult.success) {
        return NextResponse.json({ error: tokenResult.error }, { status: 401 });
      }

      const decoded = tokenResult.data;

      if (path === '/protected/me') {
        return NextResponse.json({ user: decoded });
      }

      if (path === '/protected/resource') {
        return NextResponse.json({
          message: 'Protected resource accessed successfully',
          user: decoded,
        });
      }
    }

    // Return 404 for unknown routes
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const connection = await GetDataSource();

    const url = new URL(request.url);
    const path = url.pathname.replace('/api', '');

    // Login route
    if (path === '/auth/login') {
      const validation = await validateRequest(request, loginSchema);

      if (!validation?.isValid) {
        return NextResponse.json({ error: validation?.error }, { status: 400 });
      }

      // Use login service
      const loginResult = await loginUser(validation.data);

      if (!loginResult.success) {
        return NextResponse.json({ error: loginResult.error }, { status: 401 });
      }

      return NextResponse.json(loginResult.data);
    }

    // Register route
    if (path === '/auth/register' || path === '/users') {
      const validation = await validateRequest(request, userCreateSchema);

      if (!validation?.isValid) {
        return NextResponse.json({ error: validation?.error }, { status: 400 });
      }

      const userData = validation.data;

      const service = path === '/auth/register' ? registerUser : createUser;
      const result = await service(userData);

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 409 });
      }

      return NextResponse.json(result.data, { status: 201 });
    }

    // Return 404 for unknown routes
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Handle PUT requests
export async function PUT() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

// Handle DELETE requests
export async function DELETE() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}
