import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { applicationId: string } },
) {
  try {
    const { content } = await req.json();
    await db.coverLetter.create({
      data: {
        content,
        applicationId: params.applicationId,
      },
    });
    return NextResponse.json(
      { message: "Cover letter saved successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
