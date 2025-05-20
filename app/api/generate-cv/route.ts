// /app/api/generate-cv/route.ts

import { NextResponse } from "next/server";
import { generateCVBuffer } from "@/lib/generateCV"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const templateName = body.template || "basic";
    const format = body.format || "docx";

    // Generate the appropriate buffer (DOCX or PDF)
    const buffer = await generateCVBuffer(body, format);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": format === "pdf"
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="generated_cv.${format}"`,
      },
    });
  } catch (err: any) {
    console.error("Error generating CV:", err);
    return NextResponse.json({ error: err.message || "Failed to generate CV" }, { status: 500 });
  }
}
