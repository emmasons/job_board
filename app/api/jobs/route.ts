import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { NOTIFICATION_TYPES, Role } from "@prisma/client";
import { sendEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { getNotificationHeading } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;
    const values = await req.json();
    const { numberOfPositions, ...remainingValues } = values;

    if (!userId || !(user.role === Role.EMPLOYER)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const employerProfile = await db.employerProfile.findFirst({
      where: {
        userId,
      },
      include: {
        company: true,
      },
    });

    if (!employerProfile?.company) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const job = await db.job.create({
      data: {
        ownerId: userId,
        companyId: employerProfile.company.id,
        numberOfPositions: parseInt(numberOfPositions),
        published: true,
        ...remainingValues,
      },
    });

    const alerts = await db.jobAlert.findMany();

    for (const alert of alerts) {
      if (
        (alert.city?.toLowerCase() === job.city?.toLowerCase() ||
          (job.country && alert.countries?.includes(job.country))) ||
          alert.companyId === job.companyId ||
          (job.educationLevelId &&
            alert.educationLevelIds.includes(job.educationLevelId)) ||
          (job.sectorId && alert.sectorIds?.includes(job.sectorId)) ||
          (job.contractType &&
            alert.contractTypes?.includes(job.contractType)) ||
          (job.workSchedule &&
            alert.workSchedules?.includes(job.workSchedule)) ||
          job.occupation
            ?.toLowerCase()
            .includes(alert.occupation?.toLowerCase() ?? "")) &&
        alert.userId !== userId
      ) {
        await db.notification.create({
          data: {
            userId: alert.userId,
            resourceId: job.id,
            type: NOTIFICATION_TYPES.NEW_JOB_POSTING,
            fromId: userId,
            message: "A new job posting for your alerts was created",
          },
        });

        const notified = await db.user.findUnique({
          where: {
            id: alert.userId,
          },
        });

        if (notified && notified.email) {
          // send email
          const message = `A new job posting for your alerts was created. Check it out here: ${env.BASE_DOMAIN}/jobs/${job.id}`;
          const subject = getNotificationHeading(
            NOTIFICATION_TYPES.NEW_JOB_POSTING,
          );
          const status = await sendEmail({
            to_email: notified.email,
            subject,
            message,
          });
          console.log(status);
        }
      }
    }

    return NextResponse.json(job);
  } catch (error) {
    console.log("[JOBS]", error);
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
