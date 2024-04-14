import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { sendEmail } from "@/lib/email";
import { env } from "@/lib/env";
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
    const hashedToken = await bcrypt.hash(user.id.toString(), 10);
    await db.user.update({
      where: { id: user.id },
      data: {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(Date.now() + 3600000),
      },
    });
    const emailVerificationMessage = `<p>Please click <a href="${env.BASE_DOMAIN}/auth/verify-email?t=${hashedToken}">here<a/>&nbsp;to verifiy your email. Or copy and paste the email below to your browser <br>${env.BASE_DOMAIN}/auth/verify-email?t=${hashedToken}</a></p>`;
    const subject = "Verify your email";
    const response = await sendEmail({
      to_email: toEmail,
      subject,
      message: emailVerificationMessage,
    });
    if (response.status === 200) {
      return NextResponse.json({ message: "Success." }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Error." }, { status: 500 });
    }
  } catch (error) {
    console.log("RESEND_VERIFICATION_EMAIL!", error, "500");
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
