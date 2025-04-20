import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

// POST handler for creating education details
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

    // check if the profileId exists
    const profile = await db.jobSeekerProfile.findUnique({
      where: { id: params.profileId },
    });

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 },
      );
    }
    // check if this is the first education details
    const existingDetails = await db.educationDetails.findMany({
      where: { jobSeekerProfileId: params.profileId },
    });

    const isFirstDetail = existingDetails.length === 0;
    const educationDetails = await db.educationDetails.create({
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

    return NextResponse.json(educationDetails, { status: 201 });
  } catch (error) {
    console.error("[PROFILE_ID] Error:", error);
    return NextResponse.json(
      { message: "Internal Error", error: error.message },
      { status: 500 },
    );
  }
}
