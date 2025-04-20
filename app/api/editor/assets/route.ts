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

    const ROOT_DIR = "editor/assets";
    const customFileName = path.join(ROOT_DIR, file.name);
    const uploadsDir = await getLocalUploadDirectory();

    // Create the full directory path
    const fullDirPath = path.join(uploadsDir, ROOT_DIR);

    // Create directories recursively
    await fs.promises.mkdir(fullDirPath, { recursive: true });

    // Convert the file to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const fullFilePath = path.join(uploadsDir, customFileName);

    await writeFile(fullFilePath, buffer);

    console.log("File uploaded successfully to:", fullFilePath);
    // Use forward slashes for URL paths regardless of OS
    const urlPath = `/uploads/${customFileName.split(path.sep).join("/")}`;
    return NextResponse.json({ url: urlPath });
  } catch (error) {
    console.log("[POST IMAGES]", error);
    return new Response(JSON.stringify({ error: "Failed to upload image" }), {
      status: 500,
    });
  }
}
