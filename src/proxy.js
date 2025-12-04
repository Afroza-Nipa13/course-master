// src/proxy.js (or app/proxy.js)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const { pathname } = request.nextUrl;

  // Public paths
  if (pathname === '/' || 
      pathname.startsWith('/login') || 
      pathname.startsWith('/register') ||
      pathname.startsWith('/api/auth') ||
      pathname.includes('.')) { // Static files
    return NextResponse.next();
  }

  // Check if accessing dashboard
  if (pathname.startsWith('/dashboard')) {
    // Not logged in → redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Get user role
    const userRole = token?.role || 'student';

    // Redirect to correct dashboard based on role
    if (pathname === '/dashboard') {
      if (userRole === 'admin') {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
      } else {
        return NextResponse.redirect(new URL('/dashboard/student', request.url));
      }
    }

    // Check if user has access to specific dashboard
    if (pathname.startsWith('/dashboard/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard/student', request.url));
    }
    
    if (pathname.startsWith('/dashboard/student') && userRole === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};