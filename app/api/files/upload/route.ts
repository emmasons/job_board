import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { db } from "@/lib/db";

export const PUT = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/assets/" + filename),
      buffer,
    );
    const assetId = formData.get("assetId");
      const contentType = formData.get("contentType");
       await db.gCPData.findUnique({
      where: {
        assetId: assetId,
      },
    });
    console.log("assetId", assetId, "contentType", contentType, file);
        await db.gCPData.upsert({
          where: { assetId: assetId },
          create: {
            assetId: assetId,
            assetName: filename,
            assetType: contentType,

          },
          update: {

            assetName: filename,
            assetType: contentType,

          },
        });

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
