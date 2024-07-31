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
    const values = await req.json();
    if (!user || !(user.role === Role.EMPLOYER)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const company = await db.company.update({
      where: {
        id: params.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.log("[JOBS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
