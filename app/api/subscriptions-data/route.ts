// app/api/subscriptions/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const plans = await db.subscriptionPlan.findMany({
    include: { user: true, plan: true },
    orderBy: { startDate: "desc" },
  });

  const result = plans.map((p) => ({
    id: p.id,
    user: p.user?.email || "Unknown",
    plan: p.plan?.name || "N/A",
    startDate: p.startDate.toISOString(),
    endDate: p.endDate?.toISOString() || "",
    status: p.status || "UNKNOWN",
    downloads: p.downloadCount || 0,
  }));

  return NextResponse.json(result);
}
