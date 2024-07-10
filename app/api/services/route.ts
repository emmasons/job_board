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
    const { title, description } = await req.json();

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });
    const service = await db.service.create({
      data: {
        title,
        description,
        slug,
      },
    });
    console.log(service)
    return NextResponse.json({ id: service.id, message: "Service created" });
  } catch (error) {
    console.log("[SERVICE]", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
