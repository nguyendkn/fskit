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

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is /en/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url),
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
};
