import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;
    const values = await req.json();
    if (!userId || !(user.role === Role.STAFF)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const company = await db.company.findFirst({
      where: {
        ownerId: user.id,
      },
    });

    if (!company) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const job = await db.job.create({
      data: {
        ownerId: userId,
        companyId: company.id,
        ...values,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
