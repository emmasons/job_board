import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { db } from "@/lib/db";
import fs from "fs";
import { getLocalUploadDirectory } from "@/lib/server-utils";

type Props = {
  customFileName: string;
  assetId: string;
  contentType: string;
  file: File;
};

export const uploadFileToLocalStorage = async ({
  customFileName,
  assetId,
  contentType,
  file,
}: Props) => {
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  const uploadsDir = await getLocalUploadDirectory();
  const buffer = Buffer.from(await file.arrayBuffer());

  if (customFileName.includes("/")) {
    const dirPath = path.join(uploadsDir, path.dirname(customFileName));
    if (!fs.existsSync(dirPath)) {
      await fs.promises.mkdir(dirPath, { recursive: true });
    }
  }

  try {
    await writeFile(path.join(uploadsDir, customFileName), buffer);

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

    return { Message: "Success", status: 200 };
  } catch (error) {
    return { Message: "Failed", status: 500 };
  }
};
