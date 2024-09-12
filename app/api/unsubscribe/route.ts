import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { SUBSCRIPTION_TYPE } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { ids, email } = await req.json();

    if (ids.length === 0 || !email) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    await db.subscription.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const toEmail = email;
    const message = `<p>You have successfuly unsubscribed. You will no longer receive updates from us.</p>`;
    const subject = "UnSubscription Confirmation";
    await sendEmail({
      to_email: toEmail,
      subject,
      message: message,
    });

    return NextResponse.json({ message: "Success." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
