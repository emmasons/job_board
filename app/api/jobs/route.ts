import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;
    const values = await req.json();
    const { numberOfPositions, ...remainingValues } = values;

    if (!userId || !(user.role === Role.EMPLOYER)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const employerProfile = await db.employerProfile.findFirst({
      where: {
        userId,
      },
      include: {
        company: true,
      },
    });

    if (!employerProfile?.company) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const job = await db.job.create({
      data: {
        ownerId: userId,
        companyId: employerProfile.company.id,
        numberOfPositions: parseInt(numberOfPositions),
        published: true,
        ...remainingValues,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log("[JOBS]", error);
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
