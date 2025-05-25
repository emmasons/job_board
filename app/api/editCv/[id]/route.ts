import { NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/auth";
import { generateCVBuffer } from "@/lib/generateCV";
import { uploadBufferToGCS } from "@/lib/uploadToGCS";
import { extractFirstPageImageFromBuffer } from "@/lib/extractFirstPageImage";
import { db } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {    
    const user = await getCurrentSessionUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cvId = params.id;
    const existingCv = await db.generatedCv.findUnique({
      where: { id: cvId },
    });

    if (!existingCv || existingCv.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

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
      console.error("⚠️ Failed to generate preview image:", error);
    }

    const updatedCv = await db.generatedCv.update({
      where: { id: cvId },
      data: {
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
          deleteMany: { cvId },
          create: education_list.map((edu: any) => ({
            course: edu.course,
            school: edu.school,
            date: edu.date,
            description: edu.description,
          })),
        },
        experience: {
          deleteMany: { cvId },
          create: experience_list.map((exp: any) => ({
            role: exp.role,
            placeOfWork: exp.place_of_work,
            date: exp.date,
            responsibilities: exp.responsibilities,
          })),
        },
        referees: {
          deleteMany: { cvId },
          create: referees_list.map((ref: any) => ({
            refname: ref.refname,
            role: ref.role,
            contact: ref.contact,
          })),
        },
      },
      include: {
        education: true,
        experience: true,
        referees: true,
      },
    });

    return NextResponse.json(
      {
        message: "CV updated successfully",
        cv: updatedCv,
        fileUrl, previewImageUrl,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error updating CV:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update CV" },
      { status: 500 }
    );
  }
}
