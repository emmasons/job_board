import { NextRequest, NextResponse } from "next/server";
import { hasFeatureAccess } from "@/lib/subscription/subscription-utils";
import { getCurrentSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getCurrentSessionUser();
  if (!user) {
    return NextResponse.json(
      { hasAccess: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const featureName = request.nextUrl.searchParams.get("feature");
  if (!featureName) {
    return NextResponse.json(
      { hasAccess: false, error: "Feature name is required" },
      { status: 400 },
    );
  }

  const hasAccess = await hasFeatureAccess(user.id, featureName);

  return NextResponse.json({ hasAccess });
}
