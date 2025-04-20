import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

// PATCH handler for updating or creating employment details
export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string } },
) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;
    const { profilePercentage, ...values } = await req.json();
    console.log("Request Body:", values);

    if (!userId || user.role !== Role.JOB_SEEKER) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingJob = await db.desiredJob.findFirst({
      where: {
        jobSeekerProfileId: params.profileId,
      },
    });

    let desiredJob;
    // update existing desired job content
    if (existingJob) {
      desiredJob = await db.desiredJob.update({
        where: { id: existingJob.id },
        data: { ...values },
      });
    } else {
      // create a new desired job
      desiredJob = await db.desiredJob.create({
        data: {
          ...values,
          jobSeekerProfileId: params.profileId,
        },
      });
    }

    // handle percentage
    if (profilePercentage) {
      const percentage = parseInt(profilePercentage, 10);
      await db.jobSeekerProfilePercentage.upsert({
        where: {
          jobSeekerProfileId: params.profileId,
        },
        update: {
          percentage: {
            increment: percentage,
          },
        },
        create: {
          jobSeekerProfileId: params.profileId,
          percentage: percentage,
        },
      });
    }

    return NextResponse.json(desiredJob, { status: 200 });
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
