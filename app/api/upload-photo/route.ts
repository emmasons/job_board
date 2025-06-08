import { NextResponse } from "next/server";
import { bucket } from "@/lib/gcs";
import sharp from "sharp";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  if (!contentType.includes("multipart/form-data")) {
    console.error("Unsupported content type:", contentType);
    return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("photo");

    if (!(file instanceof File)) {
      console.error("Invalid or missing file in formData:", file);
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Buffer length:", buffer.length);
    console.log("First bytes (JPEG check):", buffer.toString("hex", 0, 4)); // Should start with ffd8
    console.log("Content-Type:", file.type);

    // Resize and apply circular mask
    const size = 250;

    const circleSvg = Buffer.from(`
      <svg width="${size}" height="${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
      </svg>
    `);

    const processedBuffer = await sharp(buffer)
      .resize(size, size)
      .composite([{ input: circleSvg, blend: 'dest-in' }]) // apply circular mask
      .png()
      .toBuffer();

    const filename = `photo_${Date.now()}.png`;
    const fileRef = bucket.file(`uploads/${filename}`);

    await fileRef.save(processedBuffer, {
      contentType: "image/png",
      public: true,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/uploads/${filename}`;
    console.log("Upload successful. URL:", publicUrl);
    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (e) {
    console.error("Upload processing error:", e);
    return NextResponse.json({ error: "Image processing failed" }, { status: 500 });
  }
}
