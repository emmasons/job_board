// blog
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    const author = await getCurrentSessionUser();

    if (!author || author.role !== Role.ADMIN) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { title } = await req.json();

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });
    const post = await db.post.create({
      data: {
        // imageUrl,
        title,
        authorId: author.id,
        slug,
      },
    });

    return NextResponse.json({ id: post.id, message: "Post created" });
  } catch (error) {
    console.log("[BLOG]", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
