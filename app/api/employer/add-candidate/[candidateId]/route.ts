import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { candidateId: string } },
) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;

    if (!userId || !(user.role === Role.EMPLOYER)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.candidateId) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const candidate = await db.candidate.create({
      data: {
        employerId: userId,
        candidateId: params.candidateId,
      },
    });

    return NextResponse.json(candidate);
  } catch (error) {
    console.log("[JOBS]", error);
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
