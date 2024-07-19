import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function PATCH(req: Request, { params }: { params: { profileId: string } }) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;
    const body = await req.text();
    console.log("Request Body:", body);

    const values = JSON.parse(body);

    if (!userId || user.role !== Role.JOB_SEEKER) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const personal = await db.personalDetails.findFirst({
      where: {
        jobSeekerProfileId: params.profileId,
      },
    });

    let personalDetails;

    if (personal) {
      // Update existing personal details
      personalDetails = await db.personalDetails.update({
        where: { id: personal.id },
        data: { ...values },
      });
    } else {
      // Create new personal details
      personalDetails = await db.personalDetails.create({
        data: {
          ...values,
          jobSeekerProfileId: params.profileId,
        },
      });
    }

    return NextResponse.json(personalDetails, { status: 200 });
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
