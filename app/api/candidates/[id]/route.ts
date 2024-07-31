import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const user = await getCurrentSessionUser();
    if (!user || user.role !== Role.EMPLOYER) {
      return NextResponse.json(
        { message: "Unauthorized", status: 401 },
        { status: 401 },
      );
    }

    const { id } = params;
    const candidate = await db.candidate.findFirst({
      where: {
        candidateId: id,
        employerId: user.id,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { message: "Forbidden", status: 403 },
        { status: 403 },
      );
    }

    await db.candidate.delete({
      where: {
        id: candidate.id,
      },
    });

    return NextResponse.json(
      { message: "Success", status: 200 },
      { status: 200 },
    );
  } catch (error) {
    console.log("[USER_ID]", error);
    return NextResponse.json(
      { message: "Internal Error", status: 500 },
      { status: 500 },
    );
  }
}
