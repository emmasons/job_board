import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.includes("/admin") &&
      !(req.nextauth?.token?.role === Role.ADMIN)
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
    if (
      req.nextUrl.pathname.includes("/staff") &&
      !(req.nextauth?.token?.role === Role.STAFF)
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
    if (
      req.nextUrl.pathname.includes("/employer") &&
      !(
        req.nextauth?.token?.role === Role.EMPLOYER ||
        req.nextauth?.token?.role === Role.ADMIN
      )
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
    if (!req.nextauth?.token?.isVerified) {
      console.log(req.nextauth?.token?.isVerified);
      return NextResponse.rewrite(new URL("/auth/unverified-email", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/profile") &&
      !req.nextauth?.token?.registeredUser
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }

    // Get the headers
    const headers = new Headers(req.headers);
    const forwardedHost = headers.get("x-forwarded-host");

    // Clean up x-forwarded-host if it contains duplicates
    if (forwardedHost && forwardedHost.includes(",")) {
      headers.set("x-forwarded-host", forwardedHost.split(",")[0].trim());
    }

    // Create new response with modified headers
    const response = NextResponse.next({
      request: {
        headers: headers,
      },
    });

    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin",
    "/profile/:path*",
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
