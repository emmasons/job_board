// /app/api/payments/mpesa-status/route.ts
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Missing orderId" },
        { status: 400 }
      );
    }

    const user = await getCurrentSessionUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Still pending?
    const pending = await db.pendingSubscription.findFirst({
      where: { orderId, userId: user.id },
    });
    if (pending) {
      return NextResponse.json({ success: true, status: "PENDING" });
    }

    // Check if subscription exists in subscriptionPlan
    const subscription = await db.subscriptionPlan.findFirst({
      where: { userId: user.id, paymentId: { not: null } },
    });

    if (subscription) {
      return NextResponse.json({ success: true, status: "COMPLETED" });
    }

    return NextResponse.json({ success: true, status: "FAILED" });

  } catch (error) {
    console.error("Error checking Mpesa status:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
