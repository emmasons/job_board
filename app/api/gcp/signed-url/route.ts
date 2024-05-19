import { NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/auth";
import { FileUploader } from "@/lib/gcp/gcp";
import { DOWNLOAD_EXPIRY_IN_SECONDS } from "@/lib/gcp/gcp-utils";

export async function POST(req: Request) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;
    const { fileName, contentType } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const uploader = new FileUploader(
      fileName,
      contentType,
      "PUT",
      DOWNLOAD_EXPIRY_IN_SECONDS,
    );
    const { url, blobName } = await uploader.generateSignedUrl();
    const downloadUrl = await uploader.generateSignedDownloadUrl();

    if (url && blobName && downloadUrl) {
      return new NextResponse(
        JSON.stringify({
          url,
          blobName,
          downloadUrl,
          downloadExpiry: DOWNLOAD_EXPIRY_IN_SECONDS,
        }),
        {
          status: 200,
        },
      );
    }
    return new NextResponse(JSON.stringify({ message: "Storage Error" }), {
      status: 500,
    });
  } catch (error) {
    console.log("[COURSE_ID_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
