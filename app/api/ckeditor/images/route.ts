import fs from "fs";
import { NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/auth";
import { getLocalUploadDirectory } from "@/lib/server-utils";
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
  

    const customFileName = `${ROOT_DIR}/${file.name}`;
    const uploadsDir = await getLocalUploadDirectory();

    // Create the full directory path
    const fullDirPath = `${uploadsDir}/${ROOT_DIR}/`.replace(
      /\/{2,}/g,
      "/",
    );

    // Create directories recursively
    await fs.promises.mkdir(fullDirPath, { recursive: true });

    // Convert the file to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const fullFilePath = `${uploadsDir}/${customFileName}`.replace(
      /\/{2,}/g,
      "/",
    );

    await writeFile(fullFilePath, buffer);

    console.log("File uploaded successfully to:", fullFilePath);
    return NextResponse.json({ url: `/uploads/${customFileName}` });
  } catch (error) {
    console.log("[POST IMAGES]", error);
    return new Response(JSON.stringify({ error: "Failed to upload image" }), {
      status: 500,
    });
  }
}
