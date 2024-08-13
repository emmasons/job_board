import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { jobId } = await req.json();

    const job = await db.job.findFirst({
      where: {
        id: jobId,
      },
      include: {
        owner: true,
      },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }

    const application = await db.application.create({
      data: {
        jobId,
        userId: user.id,
      },
    });

    const subject = "New Job Application";
    const message = `<p>New job application received from ${user.name}.</p>
    <p>Job title: ${job.title}</p>
    <p>Please <a href="${env.BASE_DOMAIN}/profile/dashboard/employer/jobs/${job.id}">Login</a> to view and respond.</a></p>`;

    await sendEmail({
      to_email: job.owner?.email || env.ADMIN_EMAIL,
      subject,
      message,
    });

    return NextResponse.json(application);
  } catch (error) {
    console.log("[JOBS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
