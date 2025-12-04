import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Runs before any protected route loads
export async function proxy(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If logged in → allow access
  return NextResponse.next();
}

// Protect this path
export const config = {
  matcher: ["/courses/:path*"],
};