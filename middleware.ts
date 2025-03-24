import { NextResponse } from 'next/server';
import authConfig from '@/auth/auth.config';
import NextAuth from 'next-auth';

import * as routes from '@/auth/routes';

const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(routes.apiAuthPrefix);
  const isPublicRoute = routes.publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = routes.authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(routes.DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return NextResponse.next();
  }

  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(routes.DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
