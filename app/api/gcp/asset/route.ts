import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { DOWNLOAD_EXPIRY_IN_SECONDS } from "@/lib/gcp/gcp-utils";

export async function PUT(req: NextRequest) {
  try {
    const { blobName, contentType, assetId, assetName, downloadUrl } =
      await req.json();

    if (!blobName || !contentType || !assetId || !assetName || !downloadUrl) {
      return new NextResponse(JSON.stringify({ message: "Bad Request" }), {
        status: 400,
      });
    }

    const existingMetadata = await db.gCPData.findUnique({
      where: {
        assetId: assetId,
      },
    });

    // if (existingMetadata) {
    //   const uploader = new FileUploader(
    //     existingMetadata.blobName,
    //     contentType,
    //     "PUT",
    //     DOWNLOAD_EXPIRY_IN_SECONDS,
    //   );
    //   try {
    //     await uploader.deleteBlob();
    //   } catch (error) {
    //     console.log("[COURSE_ID_ID]", error);
    //     return new NextResponse(JSON.stringify({ message: "Storage Error." }), {
    //       status: 500,
    //     });
    //   }
    // }

    await db.gCPData.upsert({
      where: { assetId: assetId },
      create: {
        assetId: assetId,
        urlExpiryDate: DOWNLOAD_EXPIRY_IN_SECONDS,
        blobName: blobName,
        assetName: assetName,
        assetType: contentType,
        downloadUrl: downloadUrl,
      },
      update: {
        urlExpiryDate: DOWNLOAD_EXPIRY_IN_SECONDS,
        blobName: blobName,
        assetName: assetName,
        assetType: contentType,
        downloadUrl: downloadUrl,
      },
    });
    return new NextResponse(JSON.stringify({ message: "Success." }), {
      status: 200,
    });
  } catch (error) {
    console.log("[COURSE_ID_ID]", error);
    return new NextResponse(JSON.stringify({ message: "Internal Error." }), {
      status: 500,
    });
  }
}
