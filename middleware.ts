import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { match as matchLocale } from '@formatjs/intl-localematcher';

// Supported locales
export const locales = ['en', 'fr', 'es', 'de'];
export const defaultLocale = 'en';

// Configure accept-language
acceptLanguage.languages(locales);

// Get the preferred locale from request
export function getLocale(request: NextRequest): string {
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

// This middleware will now only set a cookie for the locale instead of redirecting
export function middleware(request: NextRequest) {
  // Get locale either from cookie or from accept-language header
  const locale = request.cookies.get('NEXT_LOCALE')?.value || getLocale(request);

  // Create a response to pass along
  const response = NextResponse.next();

  // Set or update the locale cookie if it doesn't exist or is different
  if (!request.cookies.has('NEXT_LOCALE') || request.cookies.get('NEXT_LOCALE')?.value !== locale) {
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return response;
}

// Export the config with a matcher that excludes static files and API routes
export const config = {
  matcher: ['/((?!_next|api|favicon.ico|assets|.*\\.).*)'],
};
