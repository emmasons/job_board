import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const values = await req.json();

    const { numberOfPositions, ...remainingValues } = values;

    const job = await db.job.create({
      data: {
        numberOfPositions: parseInt(numberOfPositions),
        ...remainingValues,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log("[COURSES]", error);
    console.log(error);

    const dbError = { message: "DB Error" };
    if (error instanceof Error) {
      console.log(error);
      dbError.message = error.message;
    }

    return NextResponse.json(dbError, { status: 500 });
  }
}
