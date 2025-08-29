import { NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

export const config = {
  matcher: ['/((?!_next|.*\\..*|api/).*)']
};

export function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  // If the pathname already starts with a valid locale, continue
  if (locales.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  // If it's the root path, redirect to default locale
  if (pathname === '/') {
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  // For any other path, prepend the default locale
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}
