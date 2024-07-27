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

    if (!user || user.role !== Role.EMPLOYER) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownJob = await db.job.findFirst({
      where: {
        id: params.id,
        ownerId: user.id,
      },
    });

    if (!ownJob) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { id } = params;
    const values = await req.json();
    const { numberOfPositions, ...remainingValues } = values;

    const updatedJob = await db.job.update({
      where: {
        id: id,
      },
      data: {
        ...remainingValues,
        numberOfPositions: parseInt(numberOfPositions),
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.log("[USER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
