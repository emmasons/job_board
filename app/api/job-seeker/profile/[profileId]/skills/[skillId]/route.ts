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

    // Add the new skill
    const skill = await db.skill.create({
      data: {
        ...values,
        jobSeekerProfileId: params.profileId,
      },
    });

    // Increase the profile percentage by 1%
    await db.jobSeekerProfilePercentage.upsert({
      where: {
        jobSeekerProfileId: params.profileId,
      },
      update: {
        percentage: {
          increment: 1,
        },
      },
      create: {
        jobSeekerProfileId: params.profileId,
        percentage: 1, // Start with 1% for the new skill
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.log("[ADD_SKILL]", error);
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

    // Check if the skill exists and belongs to the profile
    const skill = await db.skill.findUnique({
      where: { id: skillId },
    });

    if (!skill || skill.jobSeekerProfileId !== params.profileId) {
      return new NextResponse("Skill not found or not authorized", { status: 404 });
    }

    // Delete the skill
    await db.skill.delete({
      where: { id: skillId },
    });

    // Count the remaining skills
    const skillCount = await db.skill.count({
      where: { jobSeekerProfileId: params.profileId },
    });

    // Define the deduction percentage
    const additionalDeductionPercentage = 3; // Deduct an additional 3% if all skills are removed

    // Get the previous profile percentage
    const previousPercentage = await db.jobSeekerProfilePercentage.findUnique({
      where: { jobSeekerProfileId: params.profileId },
    });

    if (previousPercentage) {
      let newPercentage = previousPercentage.percentage;

      // If no skills are remaining, add an additional 3% deduction
      if (skillCount === 0) {
        newPercentage -= additionalDeductionPercentage;
      }

      // Ensure the percentage does not go below 0
      newPercentage = Math.max(0, newPercentage);

      await db.jobSeekerProfilePercentage.update({
        where: { jobSeekerProfileId: params.profileId },
        data: {
          percentage: newPercentage,
        },
      });
    }

    return NextResponse.json({ message: "Skill deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log("[DELETE_SKILL]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
