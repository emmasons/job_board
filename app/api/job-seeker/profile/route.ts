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
        userId,
        ...values,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log("[PROFILE]", error);
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Example mock API endpoint

export async function getProfileViews() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        views: [50, 100, 200, 400, 300, 150, 75],
      });
    }, 1000); // Simulate network delay
  });
}
