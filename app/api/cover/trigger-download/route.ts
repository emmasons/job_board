// app/api/cv/trigger-download/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const user = await getCurrentSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { coverId } = await req.json();

  if (!coverId) {
    return NextResponse.json({ error: "Missing Cover Letter ID" }, { status: 400 });
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

    const cover = await db.generatedCover.findUnique({
      where: { id: coverId },
    });

    if (!cover) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    if (cover.paymentStatus !== "paid") {
      await db.generatedCover.update({
        where: { id: coverId },
        data: { paymentStatus: "paid" },
      });

      await db.subscriptionPlan.update({
        where: { id: subscription.id },
        data: { downloadCount: { increment: 1 } },
      });
    }

    return NextResponse.json({ fileUrl: cover.fileUrl });
  } catch (err) {
    console.error("Download error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
