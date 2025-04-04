import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';

// Protected route to get the current user's information
export const GET = withAuth(async (_request: NextRequest, user) => {
  // In a real app, you might fetch additional user data from the database
  // Here we just return the user data from the JWT token
  return NextResponse.json({ user });
});
