import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import { EMAILTYPES } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const toEmail = req.nextUrl.searchParams.get("toEmail");
  if (!toEmail) {
    return NextResponse.json(
      { message: "Please provide a valid email address" },
      { status: 500 },
    );
  }
  const user = await db.user.findUnique({ where: { email: toEmail } });

  if (!user) {
    return NextResponse.json(
      { message: "No account was found with that email" },
      { status: 500 },
    );
  }
  try {
    const toEmail = user.email;
    const emailType = EMAILTYPES.EMAILVERIFICATION;
    const userId = user.id;
    const extraArgs = {
      userId: userId,
    };
    await sendEmail({
      toEmail,
      emailType,
      extraArgs,
    });

    return NextResponse.json({ message: "Success." }, { status: 200 });
  } catch (error) {
    console.log("RESEND_VERIFICATION_EMAIL", error, "500");
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
