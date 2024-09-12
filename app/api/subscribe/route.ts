import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { SUBSCRIPTION_TYPE } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { email, type: typeString } = (await req.json()) as {
      email: string;
      type: string;
    };
    const type =
      SUBSCRIPTION_TYPE[typeString as keyof typeof SUBSCRIPTION_TYPE];

    if (!email || !type) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const duplicate = await db.subscription.findFirst({
      where: { email: email, type: SUBSCRIPTION_TYPE[type] },
    });

    if (duplicate) {
      return NextResponse.json(
        { message: "Already subscribed" },
        { status: 409 },
      );
    }

    await db.subscription.create({
      data: {
        email,
        type: SUBSCRIPTION_TYPE[type],
      },
    });

    const toEmail = email;
    const emailVerificationMessage =
      type === SUBSCRIPTION_TYPE.NEWSLETTER
        ? `Thank you for subscribing to our newsletter. <br/>You will be receiving emails from us on all news. <br/>You can <a href=${env.BASE_DOMAIN}/unsubscribe?email=${email}>unsubscribe</a> at any time.`
        : `Thank you for subscribing to our newsletter. <br/>You will be receiving emails from us on all news. <br/>You can <a href=${env.BASE_DOMAIN}/unsubscribe?email=${email}>unsubscribe</a> at any time.`;
    const subject = "Subscription Confirmation";
    await sendEmail({
      to_email: toEmail,
      subject,
      message: emailVerificationMessage,
    });

    return NextResponse.json(
      { message: "Subscription successful." },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
