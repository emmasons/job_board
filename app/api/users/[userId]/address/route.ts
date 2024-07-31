import { getCurrentSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const user = await getCurrentSessionUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
  }

  const values = await req.json();
  try {
    const user = await db.user.findUnique({
      where: {
        id: params.userId,
      },
      include: { profile: true, address: true },
    });

    if (!user) {
      return new NextResponse("User not found.", { status: 404 });
    }
    const updatedAddress = await db.address.update({
      where: {
        id: user.address?.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedAddress);
  } catch (error) {
    console.log("[USER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
