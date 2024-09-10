//api/job-seeker/profile/[profileId]/skills route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
// import { revalidatePath } from "next/cache";

export async function POST(
  req: Request,
  { params }: { params: { profileId: string } },
) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;
    const { profilePercentage, ...values } = await req.json();

    if (!userId || !(user.role === Role.JOB_SEEKER)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    values.selectedSkills.forEach(async (value: any) => {
      await db.skill.create({
        data: {
          skill: value,
          jobSeekerProfileId: params.profileId,
        },
      });
    });

    if (profilePercentage !== undefined) {
      const percentage = parseInt(profilePercentage, 10);

      if (isNaN(percentage)) {
        return new NextResponse("Invalid percentage value", { status: 400 });
      }

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
    const skills = await db.skill.findMany({
      where: {
        jobSeekerProfileId: params.profileId,
      },
    });
    return NextResponse.json(
      { status: 201, message: "Created", data: skills },
      { status: 201 },
    );
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
