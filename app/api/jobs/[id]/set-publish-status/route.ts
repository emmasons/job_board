import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role, WorkSchedule, ContractType } from "@prisma/client";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentSessionUser();
  const userId = user?.id;

  if (!userId || !(user.role === Role.ADMIN)) {
    return NextResponse.json(
      { message: "Unauthorized", status: 401 },
      { status: 401 },
    );
  }
  const { published } = await req.json();
  const { id } = params;
  try {
    const job = await db.job.update({
      where: {
        id,
      },
      data: {
        published,
      },
    });
    return NextResponse.json(
      { message: "Job updated", status: 200 },
      { status: 200 },
    );
  } catch (error) {
    console.log("[JOB_ID]", error);
    return NextResponse.json(
      { message: "Internal server error", status: 500 },
      { status: 500 },
    );
  }
}
