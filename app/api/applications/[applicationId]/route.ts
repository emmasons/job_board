import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { ApplicationStatus, Role } from "@prisma/client";

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

    if (updatedApplication.status === ApplicationStatus.ACCEPTED) {
      try {
        const candidate = await db.candidate.findFirst({
          where: {
            candidateId: updatedApplication.userId,
            employerId: user.id,
          },
        });
        if (!candidate) {
          await db.candidate.create({
            data: {
              candidateId: updatedApplication.userId,
              employerId: user.id,
            },
          });
        }
      } catch (error) {
        console.log("[JOBS]", error);
      }
    }

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
