import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function PATCH(
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

    const profile = await db.jobSeekerProfile.update({
      where: {
        id: params.profileId,
      },
      data: {
        ...values,
      },
    });

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
    return NextResponse.json(profile);
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    console.log(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}


