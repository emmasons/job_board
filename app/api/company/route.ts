import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();
    const values = await req.json();
    if (!user || !(user.role === Role.STAFF)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const company = await db.company.create({
      data: {
        ownerId: user.id,
        ...values,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
