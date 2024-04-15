import fs from "fs";
import { NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/auth";
import { uploadFile } from "@/lib/gcp/gcp-utils";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const userId = await getCurrentSessionUser();
  const formData = await req.formData();
  let data = Object.fromEntries(formData);

  const { file } = data;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // upload image
    const ROOT_DIR = `editor/assets`;

    const { status, downloadUrl } = await uploadFile(
      file,
      `${ROOT_DIR}/${file.name}`,
      true,
    );

    if (status !== 200) {
      return new Response(JSON.stringify({ error: "Failed to upload image" }), {
        status: 500,
      });
    }

    return NextResponse.json({ url: downloadUrl });
  } catch (error) {
    console.log("[POST IMAGES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
