import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;
    const values = await req.json();

    if (!userId || !(user.role === Role.JOB_SEEKER)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile = await db.jobSeekerProfile.create({
      data: {
        jobSeekerId: userId,
        ...values,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log("[COURSES]", error);
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
