import { NextRequest, NextResponse } from 'next/server';
import { loginSchema, userCreateSchema } from '@/features/users/schemas/userSchema';
import { loginUser, registerUser } from '@/features/auth/services/authService';
import { GetDataSource } from '@/lib/db';

export async function POST(request: NextRequest, { params }: { params: { action: string[] } }) {
  try {
    const connection = await GetDataSource();

    const action = params.action[0];

    // Handle login
    if (action === 'login') {
      // Validate request
      const body = await request.json();
      const result = loginSchema.safeParse(body);

      if (!result.success) {
        return NextResponse.json({ error: 'Invalid credentials format' }, { status: 400 });
      }

      debugger;
      const credentials = result.data;

      // Use login service
      const loginResult = await loginUser(credentials);

      if (!loginResult.success) {
        return NextResponse.json({ error: loginResult.error }, { status: 401 });
      }

      return NextResponse.json(loginResult.data);
    }

    // Handle registration
    if (action === 'register') {
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

      // Use register service
      const registerResult = await registerUser(userData);

      if (!registerResult.success) {
        return NextResponse.json({ error: registerResult.error }, { status: 409 });
      }

      return NextResponse.json(registerResult.data, { status: 201 });
    }

    // Handle unknown action
    return NextResponse.json({ error: 'Invalid auth endpoint' }, { status: 404 });
  } catch (error) {
    console.error('Auth error:', error);
    const action = params.action[0];
    const errorMessage = action === 'login' ? 'Authentication failed' : 'Registration failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
