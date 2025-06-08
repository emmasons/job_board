// app/api/upload/route.ts
import { NextResponse } from "next/server";
import sharp from "sharp";
import { uploadImageBufferToGCS } from "@/lib/uploadImageBufferToGcs"; 

export const runtime = "nodejs";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  console.log("[DEBUG] Received content-type:", contentType);

  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("photo");
    const name = formData.get("name")?.toString(); 

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("[DEBUG] buffer.length:", buffer.length);
    console.log("[DEBUG] file.type:", file.type);

    const size = 250;
    const circleSvg = Buffer.from(`
      <svg width="${size}" height="${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
      </svg>
    `);

    const processedBuffer = await sharp(buffer)
      .rotate()
      .resize(size, size)
      .composite([{ input: circleSvg, blend: "dest-in" }])
      .png()
      .toBuffer();

    const url = await uploadImageBufferToGCS(processedBuffer);

    return NextResponse.json({ url }, { status: 200 });

  } catch (err: any) {
    console.error("[DEBUG] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error", details: err.message }, { status: 500 });
  }
}
