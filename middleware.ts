import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { match as matchLocale } from '@formatjs/intl-localematcher';

// Supported locales
export const locales = ['en', 'fr', 'es', 'de'];
export const defaultLocale = 'en';

// Configure accept-language
acceptLanguage.languages(locales);

// Paths that require authentication
const PROTECTED_PATHS = ['/dashboard', '/profile', '/settings', '/admin'];

// Paths that are accessible only to non-authenticated users
const AUTH_PATHS = [
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/forgot-password',
  '/auth/reset-password',
];

// Get the preferred locale from request
function getLocale(request: NextRequest): string {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the best locale
  let languages = acceptLanguage.get(negotiatorHeaders['accept-language']);
  if (!languages) languages = defaultLocale;

  // Convert string to array if necessary
  const languagesArray = Array.isArray(languages) ? languages : [languages];

  return matchLocale(languagesArray, locales, defaultLocale);
}

// Combined middleware for both internationalization and authentication
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // PART 1: Internationalization handling
  // Get locale either from cookie or from accept-language header
  const locale = request.cookies.get('NEXT_LOCALE')?.value || getLocale(request);

  // Set or update the locale cookie if it doesn't exist or is different
  if (!request.cookies.has('NEXT_LOCALE') || request.cookies.get('NEXT_LOCALE')?.value !== locale) {
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  // PART 2: Authentication handling
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

  return response;
}

// Combined matcher for both internationalization and authentication
export const matcher = [
  // i18n: Match all paths except static files and API routes
  '/((?!_next|api|favicon.ico|assets|.*\\.).*))',
  // Auth: Match protected paths
  '/dashboard/:path*',
  '/profile/:path*',
  '/settings/:path*',
  '/admin/:path*',
  // Auth: Match auth routes
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/forgot-password',
  '/auth/reset-password',
];
