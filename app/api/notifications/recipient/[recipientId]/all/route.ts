import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { recipientId: string } },
) {
  const user = await getCurrentSessionUser();
  const userId = user?.id;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const all = await db.notification.findMany({
      where: {
        userId: params.recipientId,
      },
    });

    return NextResponse.json(all);
  } catch (error) {
    console.log("[USER_ID_NOTIFICATIONS_READ]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
