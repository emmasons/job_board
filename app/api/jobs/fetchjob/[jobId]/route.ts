// app/api/jobs/fetchjob/[jobId]/route.ts
import { NextResponse } from "next/server";
import { getJobById } from "@/actions/get-job-by-id";

export async function GET(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;

  if (!jobId) {
    return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
  }

  try {
    const job = await getJobById(jobId);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
