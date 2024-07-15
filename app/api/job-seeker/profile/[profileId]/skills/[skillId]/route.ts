// api/job-seeker/profile/[profileId]/skills/[skillId].ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function POST(
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

    const skill = await db.skill.create({
      data: {
        ...values,
        jobSeekerProfileId: params.profileId,
      },
    });
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    console.log(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { profileId: string; skillId: string } },
) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;

    if (!userId || !(user.role === Role.JOB_SEEKER)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { skillId } = params;

    const skill = await db.skill.findUnique({
      where: { id: skillId },
    });

    if (!skill || skill.jobSeekerProfileId !== params.profileId) {
      return new NextResponse("Skill not found or not authorized", { status: 404 });
    }

    await db.skill.delete({
      where: { id: skillId },
    });

    return NextResponse.json({ message: "Skill deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log("[DELETE_SKILL]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
