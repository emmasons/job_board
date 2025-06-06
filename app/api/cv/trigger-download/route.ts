// app/api/cv/trigger-download/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const user = await getCurrentSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cvId } = await req.json();

  if (!cvId) {
    return NextResponse.json({ error: "Missing CV ID" }, { status: 400 });
  }

  try {
    const subscription = await db.subscriptionPlan.findFirst({
      where: { userId: user.id, status: "ACTIVE" },
      include: { plan: true },
    });

    if (!subscription) {
      return NextResponse.json({ error: "No active subscription" }, { status: 403 });
    }

    const planName = subscription.plan.name;
    const downloadLimit = planName === "FREE" ? 1 : planName === "BASIC" ? 10 : Infinity;
    const currentCount = subscription.downloadCount ?? 0;

    if (currentCount >= downloadLimit) {
      return NextResponse.json({ error: "Download limit reached" }, { status: 403 });
    }

    const cv = await db.generatedCv.findUnique({
      where: { id: cvId },
    });

    if (!cv) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    if (cv.paymentStatus !== "paid") {
      await db.generatedCv.update({
        where: { id: cvId },
        data: { paymentStatus: "paid" },
      });

      await db.subscriptionPlan.update({
        where: { id: subscription.id },
        data: { downloadCount: { increment: 1 } },
      });
    }

    return NextResponse.json({ fileUrl: cv.fileUrl });
  } catch (err) {
    console.error("Download error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
