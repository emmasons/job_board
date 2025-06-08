// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { bucket } from "@/lib/gcs";
import sharp from "sharp";

export const runtime = "nodejs"; 

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  console.log("[DEBUG] Received content-type:", contentType);

  if (!contentType.includes("multipart/form-data")) {
    console.error("[DEBUG] Unsupported content type:", contentType);
    return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("photo");

    if (!(file instanceof File)) {
      console.error("[DEBUG] File missing or invalid", file);
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

    let processedBuffer: Buffer;
    try {
      processedBuffer = await sharp(buffer)
        .rotate()
        .resize(size, size)
        .composite([{ input: circleSvg, blend: "dest-in" }])
        .png()
        .toBuffer();
    } catch (sharpError: any) {
      console.error("[DEBUG] Sharp processing error:", sharpError);
      return NextResponse.json({ error: "Image processing failed", details: sharpError.message }, { status: 500 });
    }

    const filename = `photo_${Date.now()}.png`;
    const fileRef = bucket.file(`uploads/${filename}`);

    try {
      await fileRef.save(processedBuffer, {
        contentType: "image/png",
        public: true,
        metadata: { cacheControl: "public, max-age=31536000" },
      });
    } catch (uploadError: any) {
      console.error("[DEBUG] Upload error:", uploadError);
      return NextResponse.json({ error: "Upload failed", details: uploadError.message }, { status: 500 });
    }

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/uploads/${filename}`;
    return NextResponse.json({ url: publicUrl }, { status: 200 });

  } catch (e: any) {
    console.error("[DEBUG] Unexpected error:", e);
    return NextResponse.json({ error: "Internal server error", details: e.message }, { status: 500 });
  }
}
