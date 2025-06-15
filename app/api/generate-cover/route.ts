import { NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/auth";
import { generateCoverBuffer } from "@/lib/generateCover";
import { uploadBufferToGCS } from "@/lib/uploadCoverToGcs";
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
    full_name,
    job_title,
    address,
    email,
    phone_number,
    company_name,
    job_applied,
    hiring_manager_name,
    cover_letter_body,
    template = "impact",
    format = "docx",
  } = body;


    const buffer = await generateCoverBuffer(body, format);

    const fileUrl = await uploadBufferToGCS(
      buffer,
      `cover.${format}`,
      format === "pdf"
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      full_name
    );

    // Generate first-page preview image
    let previewImageUrl: string | null = null;
    try {
      const previewBuffer = await extractFirstPageImageFromBuffer(buffer, format, full_name);
      previewImageUrl = await uploadBufferToGCS(
        previewBuffer,
        `preview-${Date.now()}.jpg`,
        "image/jpeg",
        full_name
      );
    } catch (error) {
      console.error("Failed to generate preview image:", error);
    }

    const generatedCover = await db.generatedCover.create({
      data: {
        userId,
        full_name,
        job_title,
        address,
        email,
        phone_number,
        company_name,
        job_applied,
        hiring_manager_name,
        cover_letter_body,
        fileName: `cover.${format}`,
        fileUrl,
        template,
        previewImageUrl,
        fileFormat: format === "pdf" ? "pdf" : "docx",
        paymentStatus: "unpaid",
      },
    });

    return NextResponse.json({ fileUrl, previewImageUrl, coverId: generatedCover.id }, { status: 200 });
  } catch (err: any) {
    console.error("Error generating Cover letter:", err);
    return NextResponse.json({ error: err.message || "Failed to generate Cover Letter" }, { status: 500 });
  }
}
