import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { NOTIFICATION_TYPES } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { jobId, coverLetter } = await req.json();

    const job = await db.job.findFirst({
      where: { id: jobId },
      include: { owner: true },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }

    // Prevent duplicate application
    const existingApplication = await db.application.findFirst({
      where: {
        jobId,
        userId: user.id,
      },
    });

    if (existingApplication) {
      return new NextResponse("You have already applied to this job.", { status: 400 });
    }

    const application = await db.application.create({
      data: {
        jobId,
        userId: user.id,
      },
    });

    // Only create cover letter if provided
    if (coverLetter && coverLetter.trim() !== "") {
      await db.coverLetter.create({
        data: {
          content: coverLetter,
          applicationId: application.id,
        },
      });
    }

    const subject = "New Job Application";
    const message = `<p>New job application received from ${user.firstName}.</p>
      <p>Job title: ${job.title}</p>
      <p>Please <a href="${env.BASE_DOMAIN}/profile/dashboard/employer/jobs/${job.id}">Login</a> to view and respond.</p>`;

    await sendEmail({
      to_email: job.owner?.email || env.ADMIN_EMAIL,
      subject,
      message,
    });

    const admin = await db.user.findFirst({
      where: { email: env.ADMIN_EMAIL },
    });

    const notificationMessage = `New job application received from ${user.email}. For job title: ${job.title}. Please login to view and respond.`;

    if (admin || job.owner) {
      await db.notification.create({
        data: {
          fromId: user.id,
          message: notificationMessage,
          userId: job.owner?.id || admin?.id,
          type: NOTIFICATION_TYPES.JOB_APPLICATION_SUBMITTED,
        },
      });
    }

    return NextResponse.json(application);
  } catch (error) {
    console.log("[JOBS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
