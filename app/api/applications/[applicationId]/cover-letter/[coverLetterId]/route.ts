import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { coverLetterId: string } },
) {
  try {
    const { content } = await req.json();
    await db.coverLetter.update({
      where: {
        id: params.coverLetterId,
      },
      data: {
        content,
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
