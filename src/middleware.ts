import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  // Fetch token from cookies
  const token = request.cookies.get("token")?.value;

  // Redirect if trying to access protected paths without a token
  if (!isPublicPath && !token) {
    // User is not logged in, redirect to login
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If user is already logged in, don't allow them to access login or signup
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/feed", request.nextUrl));
  }

  // Default response
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/updateProfile",
    "/feed", // Make sure /feed path is included
    "/login",
    "/signup",
  ],
};
