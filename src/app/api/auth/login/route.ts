import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/features/auth/services/authService';
import { LoginCredentials } from '@/features/users/schemas/userSchema';

export async function POST(request: NextRequest) {
  try {
    const credentials: LoginCredentials = await request.json();
    const result = await loginUser(credentials);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({ data: result.data }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
