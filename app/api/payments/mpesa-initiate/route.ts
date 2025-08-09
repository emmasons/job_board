// /app/api/payment/mpesa-initiate/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  const { planId, phone, billingCycle } = await req.json();
   const user = await getCurrentSessionUser();

  if (!user) {
    return NextResponse.json({ success: false, error: "Not authenticated" });
  }

  const plan = await db.plan.findUnique({ where: { id: planId } });
  if (!plan) {
    return NextResponse.json({ success: false, error: "Invalid plan" });
  }

  // Generate token
  const auth = Buffer.from(`${process.env.DARAJA_CONSUMER_KEY}:${process.env.DARAJA_CONSUMER_SECRET}`).toString("base64");
  const tokenRes = await fetch("https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    headers: { Authorization: `Basic ${auth}` },
  });
  const token = (await tokenRes.json()).access_token;

  const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  const password = Buffer.from(`${process.env.DARAJA_SHORTCODE}${process.env.DARAJA_PASSKEY}${timestamp}`).toString("base64");

  const normalizedPhone = phone.startsWith("0")
    ? "254" + phone.slice(1)
    : phone;

  const amount = Math.floor(plan.price);

  const stkPushRes = await fetch("https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        BusinessShortCode: process.env.DARAJA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerBuyGoodsOnline",
        Amount: amount,
        PartyA: normalizedPhone,
        PartyB: process.env.DARAJA_TILL,
        PhoneNumber: normalizedPhone,
        CallBackURL: `${process.env.NEXTAUTH_URL}/api/payments/mpesa-callback`,
        AccountReference: `Plan-${planId}`,
        TransactionDesc: `Subscription to ${plan.name}`,
    }),
    });


  const stkData = await stkPushRes.json();
  console.log("STK Push Response", stkData);

  if (stkData.errorMessage) {
    return NextResponse.json({ success: false, error: stkData.errorMessage });
  }

  // Save pending transaction
  await db.pendingSubscription.create({
    data: {
      userId: user.id,
      planId,
      billingCycle,
      orderId: stkData.CheckoutRequestID,
    },
  });

  return NextResponse.json({ success: true, checkoutId: stkData.CheckoutRequestID });
}
