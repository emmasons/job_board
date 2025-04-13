import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();
    const values = await req.json();

    if (!values.companyName) {
      return NextResponse.json(
        { message: "Bad request", status: 400 },
        { status: 400 },
      );
    }
    if (user.role !== Role.EMPLOYER && user.role !== Role.ADMIN) {
      return NextResponse.json(
        { message: "Unauthorized", status: 401 },
        { status: 401 },
      );
    }

    const employerProfile = await db.employerProfile.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
      },
      update: {},
    });
    if (!employerProfile) {
      return NextResponse.json(
        { message: "Unauthorized", status: 401 },
        { status: 401 },
      );
    }

    const company = await db.company.create({
      data: {
        ...values,
        employerProfileId: employerProfile.id,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.log("[JOBS]", error);
    return NextResponse.json(
      { message: "Internal server error", status: 500 },
      { status: 500 },
    );
  }
}
