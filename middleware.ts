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

  //   // Check if the path requires a specific feature
  //   for (const [path, feature] of Object.entries(protectedFeatures)) {
  //     if (request.nextUrl.pathname.startsWith(path)) {
  //       // Make API call to check feature access
  //       // Note: In real middleware this would need a different approach since
  //       // you can't directly query your database from Edge middleware
  //       const hasAccess = await checkFeatureAccessSomehow(token.sub, feature);

  //       if (!hasAccess) {
  //         return NextResponse.redirect(new URL('/subscription/plans', request.url));
  //       }
  //     }
  //   }

  //   return NextResponse.next();
  // }

  //   // For real implementation, you'd need a different approach to check access in middleware
  //   async function checkFeatureAccessSomehow(userId: string, feature: string) {
  //     // Implementation depends on your setup - could use Redis, external API, etc.
  //   }
);

export const config = {
  matcher: ["/admin", "/profile/:path*"],
};
