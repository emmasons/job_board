import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { applicationId: string } },
) {
  try {
    const user = await getCurrentSessionUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { status } = await req.json();
    console.log(status, "************************############");

    const application = await db.application.findUnique({
      where: {
        id: params.applicationId,
      },
    });
    if (!application) {
      return new NextResponse("Not found", { status: 404 });
    }

    const updatedApplication = await db.application.update({
      where: {
        id: params.applicationId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      message: "Update successful",
      status: 200,
      updatedApplication,
    });
  } catch (error) {
    console.log("[JOBS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
