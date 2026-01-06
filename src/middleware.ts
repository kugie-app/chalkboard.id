import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import createIntlMiddleware from 'next-intl/middleware';

const intlMiddleware = createIntlMiddleware({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  localeDetection: false
});

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Apply internationalization middleware first
    const intlResponse = intlMiddleware(req);

    // Get the locale from the pathname or default to 'id'
    const locale = pathname.split('/')[1];
    const isValidLocale = ['id', 'en'].includes(locale);
    const actualLocale = isValidLocale ? locale : 'id';
    
    // Remove locale from pathname for auth checks
    const pathWithoutLocale = isValidLocale ? pathname.replace(`/${locale}`, '') || '/' : pathname;

    // If user is authenticated and trying to access landing page, redirect to dashboard
    if (token && pathWithoutLocale === "/") {
      return NextResponse.redirect(new URL(`/${actualLocale}/dashboard`, req.url));
    }

    // If user is not authenticated and trying to access protected routes, redirect to signin
    if (!token && pathWithoutLocale.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL(`/${actualLocale}/auth/signin`, req.url));
    }

    return intlResponse || NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Get the locale from the pathname
        const locale = pathname.split('/')[1];
        const isValidLocale = ['id', 'en'].includes(locale);
        const pathWithoutLocale = isValidLocale ? pathname.replace(`/${locale}`, '') || '/' : pathname;
        
        // Allow access to public routes
        if (pathWithoutLocale.startsWith("/auth") || pathname === "/api/auth") {
          return true;
        }
        
        // Allow access to API routes (they handle their own auth)
        if (pathname.startsWith("/api")) {
          return true;
        }
        
        // For root path, allow both authenticated and unauthenticated
        if (pathWithoutLocale === "/") {
          return true;
        }
        
        // For dashboard routes, require authentication
        if (pathWithoutLocale.startsWith("/dashboard")) {
          return !!token;
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - images folder (static assets)
     * - api routes (handled separately)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|api/|public/).*)",
  ],
}; 