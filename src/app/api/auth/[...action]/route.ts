import { NextRequest, NextResponse } from 'next/server';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { loginSchema, userCreateSchema } from '@/features/users/schemas/userSchema';

// JWT Secret (move to env variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = '7d';

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

export async function POST(request: NextRequest, { params }: { params: { action: string[] } }) {
  const action = params.action[0];

  // Handle login
  if (action === 'login') {
    try {
      // Validate request
      const body = await request.json();
      const result = loginSchema.safeParse(body);

      if (!result.success) {
        return NextResponse.json({ error: 'Invalid credentials format' }, { status: 400 });
      }

      const { email, password } = result.data;

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
    } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
  }

  // Handle registration
  if (action === 'register') {
    try {
      // Validate request
      const body = await request.json();
      const result = userCreateSchema.safeParse(body);

      if (!result.success) {
        return NextResponse.json(
          { error: 'Invalid registration data', details: result.error.errors },
          { status: 400 },
        );
      }

      const userData = result.data;

      // Check if user already exists
      if (users.some((u) => u.email === userData.email)) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
      }

      // Hash password (must exist from validation)
      const hashedPassword = await hash(userData.password as string, 10);

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
      console.error('Registration error:', error);
      return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
  }

  // Handle unknown action
  return NextResponse.json({ error: 'Invalid auth endpoint' }, { status: 404 });
}
