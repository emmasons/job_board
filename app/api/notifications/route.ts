import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;

    if (!userId || !(user.role === Role.EMPLOYER)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { message, recepientId, type } = await req.json();

    const notification = await db.notification.create({
      data: {
        fromId: userId,
        message,
        userId: recepientId,
        type,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.log("[NOTIFICATION]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
