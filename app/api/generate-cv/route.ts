import { NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/auth";
import { generateCVBuffer } from "@/lib/generateCV";
import { uploadBufferToGCS } from "@/lib/uploadToGCS";
import { extractFirstPageImageFromBuffer } from "@/lib/extractFirstPageImage";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    const body = await req.json();
    const {
    name,
    title,
    profile,
    contact_info,
    skills = [],
    achievements = [],
    education_list = [],
    experience_list = [],
    referees_list = [],
    photo,
    template = "basic",
    format = "docx",
  } = body;


    const buffer = await generateCVBuffer(body, format);

    const fileUrl = await uploadBufferToGCS(
      buffer,
      `cv.${format}`,
      format === "pdf"
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      name
    );

    // Generate first-page preview image
    let previewImageUrl: string | null = null;
    try {
      const previewBuffer = await extractFirstPageImageFromBuffer(buffer, format, name);
      previewImageUrl = await uploadBufferToGCS(
        previewBuffer,
        `preview-${Date.now()}.jpg`,
        "image/jpeg",
        name
      );
    } catch (error) {
      console.error("Failed to generate preview image:", error);
    }

    const generatedCv = await db.generatedCv.create({
      data: {
        userId,
        name,
        title,
        profile,
        contactInfo: contact_info,
        skills,
        achievements,
        photoUrl: photo,
        fileName: `cv.${format}`,
        fileUrl,
        template,
        previewImageUrl,
        fileFormat: format === "pdf" ? "pdf" : "word",
        paymentStatus: "unpaid",
        education: {
          create: education_list.map((edu: any) => ({
            course: edu.course,
            school: edu.school,
            date: edu.date,
            description: edu.description,
          })),
        },
        experience: {
          create: experience_list.map((exp: any) => ({
            role: exp.role,
            placeOfWork: exp.place_of_work,
            date: exp.date,
            responsibilities: exp.responsibilities,
          })),
        },
        referees: {
          create: referees_list.map((ref: any) => ({
            refname: ref.refname,
            role: ref.role,
            contact: ref.contact,
          })),
        },
      },
    });

    return NextResponse.json({ fileUrl, previewImageUrl, cvId: generatedCv.id }, { status: 200 });
  } catch (err: any) {
    console.error("Error generating CV:", err);
    return NextResponse.json({ error: err.message || "Failed to generate CV" }, { status: 500 });
  }
}
