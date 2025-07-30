// /app/api/payment/mpesa-callback/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const callback = payload.Body?.stkCallback;

  if (!callback || callback.ResultCode !== 0) {
    return NextResponse.json({ success: false });
  }

  const checkoutId = callback.CheckoutRequestID;
  const meta = callback.CallbackMetadata.Item;

  const amount = meta.find((i: any) => i.Name === "Amount")?.Value;
  const receipt = meta.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value;
  const phone = meta.find((i: any) => i.Name === "PhoneNumber")?.Value;

  const pending = await db.pendingSubscription.findUnique({
    where: { orderId: checkoutId },
  });

  if (!pending) return NextResponse.json({ success: false, error: "Pending subscription not found" });

  const endDate = new Date();
  if (pending.billingCycle === "MONTHLY") {
    endDate.setMonth(endDate.getMonth() + 1);
  } else {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  await db.subscriptionPlan.create({
    data: {
      userId: pending.userId,
      planId: pending.planId,
      startDate: new Date(),
      endDate,
      status: "ACTIVE",
      paymentId: receipt,
      autoRenew: true,
    },
  });

  await db.transaction.create({
    data: {
      transactionCode: receipt,
      amount,
      currency: "KES",
      status: "COMPLETED",
      userId: pending.userId,
      planId: pending.planId,
    },
  });

  await db.pendingSubscription.delete({ where: { orderId: checkoutId } });

  return NextResponse.json({ success: true });
}
