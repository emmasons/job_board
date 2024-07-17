import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

// PATCH handler for updating or creating employment details
export async function PATCH(req: Request, { params }: { params: { profileId: string } }) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;
    const values = await req.json();

    if (!userId || user.role !== Role.JOB_SEEKER) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingJob = await db.desiredJob.findFirst({
      where: {
        jobSeekerProfileId: params.profileId,
      },
    });

    let desiredJob;
    if (existingJob) {
      desiredJob = await db.desiredJob.update({
        where: { id: existingJob.id },
        data: { ...values },
      });
    } else {
      desiredJob = await db.desiredJob.create({
        data: {
          ...values,
          jobSeekerProfileId: params.profileId,
        },
      });
    }

    return NextResponse.json(desiredJob, { status: 200 });
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

// GET handler for fetching employment details
export async function GET(req: Request, { params }: { params: { profileId: string } }) {
  try {
    const desiredJob = await db.desiredJob.findFirst({
      where: {
        jobSeekerProfileId: params.profileId,
      },
    });
    return NextResponse.json(desiredJob, { status: 200 });
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
