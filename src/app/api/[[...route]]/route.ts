// /src/app/api/[[...route]]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';
import { loginSchema, userCreateSchema } from '@/features/users/schemas/userSchema';
import { ZodSchema } from 'zod';

export const runtime = 'edge';

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

// JWT Secret (move to env variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = '7d';

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
    if (error instanceof Error) {
      return {
        isValid: false,
        data: null,
        error: 'Invalid JSON body',
      };
    }
  }
}

// Hello endpoint
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', '');

  // Basic routing based on paths
  if (path === '/hello') {
    return NextResponse.json({ message: 'Hello Next.js!' });
  }

  if (path === '/users') {
    // Return users without passwords
    const safeUsers = users.map(({ password: _, ...safeUser }) => safeUser);
    return NextResponse.json(safeUsers);
  }

  if (path.startsWith('/protected')) {
    // Verify authorization for protected routes
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
    }

    try {
      const decoded = await new Promise((resolve, reject) => {
        sign(token, JWT_SECRET, (err, decoded) => {
          if (err) reject(err);
          resolve(decoded);
        });
      });

      if (path === '/protected/me') {
        return NextResponse.json({ user: decoded });
      }

      if (path === '/protected/resource') {
        return NextResponse.json({
          message: 'Protected resource accessed successfully',
          user: decoded,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
    }
  }

  // Return 404 for unknown routes
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

// Handle POST requests
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', '');

  // Login route
  if (path === '/auth/login') {
    const validation = await validateRequest(request, loginSchema);

    if (!validation?.isValid) {
      return NextResponse.json({ error: validation?.error }, { status: 400 });
    }

    const { email, password } = validation.data;

    // Find user by email
    const user = users.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  }

  // Register route
  if (path === '/auth/register' || path === '/users') {
    const validation = await validateRequest(request, userCreateSchema);

    if (!validation?.isValid) {
      return NextResponse.json({ error: validation?.error }, { status: 400 });
    }

    const userData = validation.data;

    // Check if user already exists
    if (users.some((u) => u.email === userData.email)) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
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
  }

  // Return 404 for unknown routes
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

// Handle PUT requests
export async function PUT() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

// Handle DELETE requests
export async function DELETE() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}
