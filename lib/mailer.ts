import nodemailer from "nodemailer";
import { db } from "./db";
import bcrypt from "bcrypt";
import { env } from "./env";
import { EMAILTYPES } from "@/constants";

interface Props {
  toEmail: string;
  subject?: string;
  message?: string;
  emailType?: EMAILTYPES;
  extraArgs?: {
    userId?: string;
  };
}

export const sendEmail = async ({
  toEmail,
  emailType,
  extraArgs,
  subject,
  message,
}: Props) => {
  try {
    let hashedToken;
    if (extraArgs?.userId) {
      hashedToken = await bcrypt.hash(extraArgs?.userId.toString(), 10);
    }
    switch (emailType) {
      case EMAILTYPES.EMAILVERIFICATION:
        await db.user.update({
          where: { id: extraArgs?.userId },
          data: {
            verifyToken: hashedToken,
            verifyTokenExpiry: new Date(Date.now() + 3600000),
          },
        });
        break;
      case EMAILTYPES.RESETPASSWORD:
        console.log("Reset password logic goes here");
        break;
      default:
        console.log("Default case logic goes here");
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: env.MAILER_USER,
        pass: env.MAILER_PASSWORD,
      },
    });

    const emailVerificationMessage = `<p>Please click <a href="${env.BASE_DOMAIN}/auth/verify-email?t=${hashedToken}">here<a/>&nbsp;to verifiy your email. Or copy and paste the email below to your browser <br>${env.BASE_DOMAIN}/auth/verify-email?t=${hashedToken}</a></p>`;
    const resetPasswordMessage = `<p>Please click <a href="${env.BASE_DOMAIN}/auth/reset-password?email=${toEmail}">here<a/>&nbsp;to reset your password. Or copy and paste the email below to your browser <br>${env.BASE_DOMAIN}/auth/reset-password?email=${toEmail}</a></p>`;
    const mailOptions = {
      from: env.DEFAULT_FROM_EMAIL,
      to: toEmail,
      subject:
        emailType == EMAILTYPES.EMAILVERIFICATION
          ? "Email Verification"
          : subject,
      html:
        emailType == EMAILTYPES.EMAILVERIFICATION
          ? emailVerificationMessage
          : emailType == EMAILTYPES.RESETPASSWORD
          ? resetPasswordMessage
          : message,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(String(error));
  }
};
