import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

// POST handler for creating employment details
export async function POST(
  req: Request,
  { params }: { params: { profileId: string } },
) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;

    if (!userId || user.role !== Role.JOB_SEEKER) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { profilePercentage, ...values } = await req.json();

    // Check if the profileId exists
    const profile = await db.jobSeekerProfile.findUnique({
      where: { id: params.profileId },
    });

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 },
      );
    }

    // Check if this is the first employment detail
    const existingDetails = await db.employmentDetails.findMany({
      where: { jobSeekerProfileId: params.profileId },
    });

    const isFirstDetail = existingDetails.length === 0;

    const employmentDetails = await db.employmentDetails.create({
      data: {
        ...values,
        jobSeekerProfileId: params.profileId,
      },
    });

    if (isFirstDetail) {
      await db.jobSeekerProfilePercentage.upsert({
        where: {
          jobSeekerProfileId: params.profileId,
        },
        update: {
          percentage: {
            increment: 20,
          },
        },
        create: {
          jobSeekerProfileId: params.profileId,
          percentage: 20,
        },
      });
    }

    return NextResponse.json(employmentDetails, { status: 201 });
  } catch (error) {
    console.error("[PROFILE_ID] Error:", error);
    return NextResponse.json(
      { message: "Internal Error", error: error.message },
      { status: 500 },
    );
  }
}
