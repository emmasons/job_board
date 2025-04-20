import fs from "fs";
import { NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/auth";
import { getLocalUploadDirectory } from "@/lib/utils";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const userId = await getCurrentSessionUser();
  const formData = await req.formData();
  let data = Object.fromEntries(formData);

  const file = data.file;
 console.log(file);
  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!(file instanceof File)) {
      return new NextResponse("Invalid file", { status: 400 });
    }

    // upload image
    const ROOT_DIR = `editor/assets`;
    const randomString = Math.random().toString(36).substr(2, 5); // generate a random string

    const customFileName = `${ROOT_DIR}/${randomString}/${file.name}`;
    const uploadsDir = await getLocalUploadDirectory();

    // Convert the file to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Write the file to the uploads directory
    await writeFile(path.join(uploadsDir, customFileName), buffer);
    console.log("File uploaded successfully");
    return NextResponse.json({ url: `/uploads/${customFileName}` });
  } catch (error) {
    console.log("[POST IMAGES]", error);
    return new Response(JSON.stringify({ error: "Failed to upload image" }), {
      status: 500,
    });
  }
}
