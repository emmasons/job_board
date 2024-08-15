import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const user = await getCurrentSessionUser();

    if (!user || (user.role !== Role.ADMIN)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
 
    const { id } = params;
    const values = await req.json();

    await db.job.update({
      where: {
        id: id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log("[USER_ID]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
