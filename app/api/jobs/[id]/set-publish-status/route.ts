import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import {
  Role,
  WorkSchedule,
  ContractType,
  NOTIFICATION_TYPES,
} from "@prisma/client";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentSessionUser();
  const userId = user?.id;

  if (!user || (user.role !== Role.ADMIN && user.role !== Role.EMPLOYER)) {
    return NextResponse.json(
      { message: "Unauthorized", status: 401 },
      { status: 401 },
    );
  }
  const { published } = await req.json();
  const { id } = params;
  try {
    const job = await db.job.update({
      where: {
        id,
      },
      data: {
        published,
      },
    });
    if (job.published) {
      // notify subs

      const noJobAlerts = await db.jobAlert.findMany({
        where: {
          AND: [
            { city: job.city },
            { country: job.country },
            { companyId: job.companyId },
            {
              educationLevelIds: {
                hasSome: job.educationLevelId ? [job.educationLevelId] : [],
              },
            },
            { sectorIds: { hasSome: job.sectorId ? [job.sectorId] : [] } },
            {
              workSchedules: {
                hasSome: job.workSchedule ? [job.workSchedule] : [],
              },
            },
            {
              contractTypes: {
                hasSome: job.contractType ? [job.contractType] : [],
              },
            },
            { occupation: job.occupation },
            {
              OR: [{ jobId: null }, { jobId: job.id }],
            },
          ],
        },
      });
      for (const alert of noJobAlerts) {
        await db.notification.create({
          data: {
            userId: alert.userId,
            type: NOTIFICATION_TYPES.NEW_JOB_POSTING,
            resourceId: job.id,
            fromId: user.id,
            message: `A new job posting has been published for ${job.occupation}!`,
          },
        });
      }
    }
    return NextResponse.json(
      { message: "Job updated", status: 200 },
      { status: 200 },
    );
  } catch (error) {
    console.log("[JOB_ID]", error);
    return NextResponse.json(
      { message: "Internal server error", status: 500 },
      { status: 500 },
    );
  }
}
