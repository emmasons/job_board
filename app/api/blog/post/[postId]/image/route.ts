import fs from "fs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { uploadFile } from "@/lib/gcp/gcp-utils";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } },
) {
  const userId = await getCurrentSessionUser();
  const { postId } = params;
  //   const file = await req.json();
  const formData = await req.formData();
  let data = Object.fromEntries(formData);

  const { file } = data;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // upload image
    const ROOT_DIR = `blog/editor-uploads/post/${postId}`;

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

    const image = await db.postImage.create({
      data: {
        postId: postId,
        name: file.name,
        path: downloadUrl,
      },
    });
    return NextResponse.json({ url: image.path });
  } catch (error) {
    console.log("[POST IMAGES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
