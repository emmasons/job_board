import { NextResponse } from "next/server";
import { bucket } from "@/lib/gcs";
import * as PImage from "pureimage";
import jpeg from "jpeg-js";
import { Readable, PassThrough } from "stream";

export const runtime = "nodejs";

// Enable JPEG decoding for PureImage
(PImage as any).decodeJPEG = jpeg.decode;

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("photo");

    if (!(file instanceof File)) {
      console.error("Invalid or missing file in formData");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const readable = Readable.from(buffer);

    let img;
    try {
      img = await PImage.decodeJPEGFromStream(readable);
    } catch (decodeError) {
      console.error("Failed to decode JPEG:", decodeError);
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }

    const size = 250;
    const canvas = PImage.make(size, size);
    const ctx = canvas.getContext("2d");

    // Clear with transparent background
    ctx.clearRect(0, 0, size, size);

    // Create circular clip
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Manually scale and draw image
    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      0, 0, size, size
    );

    // Stream PNG output
    const stream = new PassThrough();
    const chunks: Buffer[] = [];

    stream.on("data", (chunk) => chunks.push(chunk));
    const streamEnd = new Promise<void>((resolve, reject) => {
      stream.on("end", resolve);
      stream.on("error", reject);
    });

    await PImage.encodePNGToStream(canvas, stream);
    stream.end();
    await streamEnd;

    const processedBuffer = Buffer.concat(chunks);
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
    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (e) {
    console.error("Upload processing error:", e);
    return NextResponse.json({ error: "Image processing failed" }, { status: 500 });
  }
}