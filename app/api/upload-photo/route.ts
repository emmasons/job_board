import { NextResponse } from "next/server";
import sharp from "sharp";
import { bucket } from "@/lib/gcs";

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

    const circleSvg = `<svg width="250" height="250"><circle cx="125" cy="125" r="125" fill="white"/></svg>`;

    const processedImage = await sharp(buffer)
      .resize(250, 250, { fit: "cover", position: "centre" })
      .composite([{ input: Buffer.from(circleSvg), blend: "dest-in" }])
      .png()
      .toBuffer();

    const filename = `photo_${Date.now()}.png`;
    const fileRef = bucket.file(`uploads/${filename}`);

    await fileRef.save(processedImage, {
      contentType: "image/png",
      public: true, // optional: allows public access
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/uploads/${filename}`;

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (e) {
    console.error("Upload processing error:", e);
    return NextResponse.json({ error: "Image processing failed" }, { status: 500 });
  }
}
