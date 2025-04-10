import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/features/auth/services/authService';
import { UserCreate } from '@/features/users/schemas/userSchema';

export async function POST(request: NextRequest) {
  try {
    const userData: UserCreate = await request.json();
    const result = await registerUser(userData);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ data: result.data }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
