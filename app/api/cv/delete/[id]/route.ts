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

  const cv = await db.generatedCv.findUnique({
    where: { id: params.id },
  });

  if (!cv || cv.userId !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Delete related Education entries
  await db.education.deleteMany({
    where: { cvId: params.id },
  });

  // Delete related Experiencecv entries
  await db.experiencecv.deleteMany({
    where: { cvId: params.id },
  });

  // Delete related Referee entries
  await db.referee.deleteMany({
    where: { cvId: params.id },
  });

  // Now delete the GeneratedCv
  await db.generatedCv.delete({
    where: { id: params.id },
  });

  // Redirect back to the referer or fallback to "/"
  const referer = req.headers.get("referer") || "/";
  return NextResponse.redirect(referer);
}
