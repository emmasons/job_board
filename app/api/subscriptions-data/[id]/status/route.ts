import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { status } = await request.json();

  if (!["ACTIVE", "CANCELLED", "EXPIRED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await db.subscriptionPlan.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
