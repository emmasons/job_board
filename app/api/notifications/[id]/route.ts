import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const notification = await db.notification.findUnique({
      where: {
        id: id,
      },
    });

    if (!notification) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    await db.notification.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: "OK", status: 200 }, { status: 200 });
  } catch (error) {
    console.log("[NOTIFICATION]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
