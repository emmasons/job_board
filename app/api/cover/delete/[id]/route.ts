import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentSessionUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const cover = await db.generatedCover.findUnique({
    where: { id: params.id },
  });

  if (!cover || cover.userId !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Now delete the GeneratedCover
  await db.generatedCover.delete({
    where: { id: params.id },
  });

  // Redirect back to the referer or fallback to "/"
  const referer = req.headers.get("referer") || "/";
  return NextResponse.redirect(referer);
}
