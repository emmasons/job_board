export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { parseResumeFile } from "@/lib/parseResume";
import { analyzeResume } from "@/lib/analyzeResume";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const text = await parseResumeFile(file);
    const result = analyzeResume(text);

    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Failed to process resume:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
