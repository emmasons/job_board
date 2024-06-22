import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { jobId } = await req.json();

    const application = await db.application.create({
      data: {
        jobId,
        userId: user.id,
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.log("[JOBS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
