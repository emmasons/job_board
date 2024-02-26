import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const user = await getCurrentSessionUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { userId } = params;
    const values = await req.json();

    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[USER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
