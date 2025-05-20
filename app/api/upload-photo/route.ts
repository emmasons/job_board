import { NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import { mkdirSync, existsSync } from "fs";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("photo") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    const outputFilename = `photo_${Date.now()}.png`;
    const outputPath = path.join(uploadsDir, outputFilename);

    // Circular SVG mask
    const circleSvg = `<svg width="250" height="250"><circle cx="125" cy="125" r="125" fill="white"/></svg>`;

    await sharp(buffer)
      .resize(250, 250, { fit: "cover", position: "centre" })
      .composite([{ input: Buffer.from(circleSvg), blend: "dest-in" }])
      .png()
      .toFile(outputPath);

    return NextResponse.json({ filename: `/uploads/${outputFilename}` }, { status: 200 });
  } catch (e) {
    console.error("Upload processing error:", e);
    return NextResponse.json({ error: "Image processing failed" }, { status: 500 });
  }
}
