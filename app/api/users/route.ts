import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { Role } from "@prisma/client";
import { DOWNLOAD_EXPIRY_IN_SECONDS, uploadFile } from "@/lib/gcp/gcp-utils";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const { email, password, role, firstName, lastName, phoneNumber, cvFile } =
      Object.fromEntries(formData) as {
        email: string;
        password: string;
        role: Role;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        cvId: string;
        cvFile: File;
      };

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    if (role === Role.JOB_SEEKER && !cvFile) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    if (role === Role.EMPLOYER) {
      //  create employer profile
    }

    const duplicate = await db.user.findUnique({ where: { email: email } });

    if (duplicate) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        password: hashPassword,
        email,
        role,
      },
    });
    await db.profile.create({
      data: { userId: user.id, firstName, lastName, phoneNumber },
    });
    if (role === Role.JOB_SEEKER) {
      const cloudResponse = await uploadFile(cvFile, cvFile.name);
      if (cloudResponse.status !== 200) {
        return NextResponse.json({ message: "Storage Error" }, { status: 500 });
      }
      const cv = await db.cV.create({
        data: {
          userId: user.id,
        },
      });
      await db.gCPData.create({
        data: {
          assetId: cv.id,
          blobName: cloudResponse.blobName,
          assetType: cvFile.type,
          urlExpiryDate: DOWNLOAD_EXPIRY_IN_SECONDS,
          assetName: cvFile.name,
          downloadUrl: cloudResponse.downloadUrl,
        },
      });
    }
    const hashedToken = await bcrypt.hash(user.id.toString(), 10);
    await db.user.update({
      where: { id: user.id },
      data: {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(Date.now() + 3600000),
      },
    });
    const toEmail = user.email;
    const emailVerificationMessage = `<p>Please click <a href="${env.BASE_DOMAIN}/auth/verify-email?t=${hashedToken}">here<a/>&nbsp;to verifiy your email. Or copy and paste the email below to your browser <br>${env.BASE_DOMAIN}/auth/verify-email?t=${hashedToken}</a></p>`;
    const subject = "Verify your email";
    await sendEmail({
      to_email: toEmail,
      subject,
      message: emailVerificationMessage,
    });

    return NextResponse.json(
      { message: "Account created successfully.", userId: user.id },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
