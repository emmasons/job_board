import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function PATCH(req: Request, { params }: { params: { profileId: string } }) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;
    const values = await req.json();

    if (!userId || user.role !== Role.JOB_SEEKER) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const personal = await db.personalDetails.findFirst({
      where: {
        jobSeekerProfileId: params.profileId,
      },
    });

    let desiredJob;
    if (personal) {
      desiredJob = await db.personalDetails.update({
        where: { id: params.profileId, },
        data: { ...values },
      });
    } else {
      desiredJob = await db.personalDetails.create({
        data: {
          ...values,
          jobSeekerProfileId: params.profileId,
        },
      });
    }

    return NextResponse.json(personal, { status: 200 });
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

