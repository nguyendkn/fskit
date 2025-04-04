import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that require authentication
const PROTECTED_PATHS = ['/dashboard', '/profile', '/settings', '/admin'];

// Paths that are accessible only to non-authenticated users
const AUTH_PATHS = [
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/forgot-password',
  '/auth/reset-password',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the auth token from cookies
  const token = request.cookies.get('auth-storage')?.value;
  let isAuthenticated = false;

  // Parse the cookie content if it exists
  if (token) {
    try {
      const authStorage = JSON.parse(decodeURIComponent(token));
      isAuthenticated = authStorage.state?.isAuthenticated === true && !!authStorage.state?.token;
    } catch (error) {
      console.error('Error parsing auth cookie:', error);
    }
  }

  // Check if the user is trying to access a protected route without authentication
  const isProtectedRoute = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL('/auth/sign-in', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect authenticated users away from auth pages
  const isAuthRoute = AUTH_PATHS.some((path) => pathname === path);
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Specify which paths this middleware applies to
  matcher: [
    // Apply to all protected paths
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/admin/:path*',
    // Apply to auth routes
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/forgot-password',
    '/auth/reset-password',
  ],
};
