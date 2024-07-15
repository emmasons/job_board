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
    const values = await req.json();

    if (!userId || !(user.role === Role.JOB_SEEKER)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const employmentDetails = await db.employmentDetails.create({
      data: {
        ...values,
        jobSeekerProfileId: params.profileId,
      },
    });
    return NextResponse.json(employmentDetails, { status: 201 });
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    console.log(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

// GET handler for fetching employment details
export async function GET(
  req: Request,
  { params }: { params: { profileId: string } },
) {
  try {
    const employmentDetails = await db.employmentDetails.findMany({
      where: {
        jobSeekerProfileId: params.profileId,
      },
    });
    return NextResponse.json(employmentDetails, { status: 200 });
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    console.log(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
