import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; 
import { getCurrentSessionUser } from "@/lib/auth"; 

export async function POST(req: NextRequest) {
  const user = await getCurrentSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { coverId } = await req.json();
  if (!coverId) {
    return NextResponse.json({ error: "Missing coverId" }, { status: 400 });
  }

  try {
    // Get active subscription
    const subscription = await db.subscriptionPlan.findFirst({
      where: {
        userId: user.id,
        status: "ACTIVE",
      },
      include: {
        plan: true, // Get plan name
      },
    });

    if (!subscription) {
      return NextResponse.json({ error: "No active subscription." }, { status: 403 });
    }

    const planName = subscription.plan.name;
    const currentCount = subscription.downloadCount ?? 0;
    const downloadLimit =
      planName === "FREE" ? 1 : planName === "BASIC" ? 10 : Infinity;

    if ((planName === "FREE" || planName === "BASIC") && currentCount >= downloadLimit) {
      return NextResponse.json({ error: "Download limit reached." }, { status: 403 });
    }

    // Mark Cover as paid
    await db.generatedCover.update({
      where: { id: coverId },
      data: { paymentStatus: "paid" },
    });

    // Increment download count
    await db.subscriptionPlan.update({
      where: { id: subscription.id },
      data: {
        downloadCount: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Cover payment error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
