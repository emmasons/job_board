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
    const values = await req.json();

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

    return NextResponse.json(profile);
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
