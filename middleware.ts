import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

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
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/admin", "/profile/:path*"],
};
