import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

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
    const subject = "Password Reset Request";
    const resetPasswordMessage = `<p>Please click <a href="${env.BASE_DOMAIN}/auth/reset-password?email=${toEmail}">here<a/>&nbsp;to reset your password. Or copy and paste the email below to your browser <br>${env.BASE_DOMAIN}/auth/reset-password?email=${toEmail}</a></p>`;

    const response = await sendEmail({
      to_email: toEmail,
      subject,
      message: resetPasswordMessage,
    });
    if (response.status === 200) {
      return NextResponse.json({ message: "Success." }, { status: 200 });
    }
    return NextResponse.json({ message: "Error." }, { status: 500 });
  } catch (error) {
    console.log("RESET_PASSWORD_LINK_EMAIL", "500");
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
