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
    const unReadNotifications = await db.notification.findMany({
      where: {
        read: false,
        userId: params.recipientId,
      },
    });

    return NextResponse.json(unReadNotifications);
  } catch (error) {
    console.log("[USER_ID_NOTIFICATIONS_READ]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { recipientId: string } },
) {
  const user = await getCurrentSessionUser();
  const userId = user?.id;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    await db.notification.updateMany({
      where: { userId: params.recipientId },
      data: {
        read: true,
      },
    });

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.log("[USER_ID_NOTIFICATIONS_READ]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
