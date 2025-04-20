import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { db } from "@/lib/db";
import fs from "fs";

export const PUT = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadsDir)) {
    await fs.promises.mkdir(uploadsDir);
  }

  console.log(uploadsDir);

  const buffer = Buffer.from(await file.arrayBuffer());

  const customFileName = formData.get("customFileName");
  console.log(customFileName);

  // Add directory creation if customFileName contains a path separator
  if (customFileName.includes('/')) {
    const dirPath = path.join(uploadsDir, path.dirname(customFileName));
    if (!fs.existsSync(dirPath)) {
      await fs.promises.mkdir(dirPath, { recursive: true });
    }
  }

  try {
    await writeFile(
      path.join(uploadsDir, customFileName), // Remove process.cwd() and the leading slash
      buffer,
    );
    const assetId = formData.get("assetId");
    const contentType = formData.get("contentType");
    await db.gCPData.findUnique({
      where: {
        assetId: assetId,
      },
    });
    await db.gCPData.upsert({
      where: { assetId: assetId },
      create: {
        assetId: assetId,
        assetName: file.name,
        downloadUrl: "/uploads/" + customFileName,
        assetType: contentType,
      },
      update: {
        assetName: file.name,
        downloadUrl: "/uploads/" + customFileName,
        assetType: contentType,
      },
    });

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
