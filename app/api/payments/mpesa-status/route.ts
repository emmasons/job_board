// /app/api/payments/mpesa-status/route.ts
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ success: false, error: "Missing orderId" });
  }

  const user = await getCurrentSessionUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Not authenticated" });
  }

  // Still pending?
  const pending = await db.pendingSubscription.findFirst({
    where: { orderId, userId: user.id },
  });
  if (pending) {
    return NextResponse.json({ success: false, status: "PENDING" });
  }

  // Check if subscription exists
  const subscription = await db.subscription.findFirst({
    where: { userId: user.id },
  });

  if (subscription) {
    return NextResponse.json({ success: true, status: "COMPLETED" });
  }

  return NextResponse.json({ success: false, status: "FAILED" });
}
