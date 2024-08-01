import { db } from "@/lib/db";
import { Sector } from "@/types";
import { Application, Job, JobMetrics } from "@prisma/client";

type JobType = Job & {
  applications: Application[];
  sector: Sector | null;
  metrics: JobMetrics[];
};

export const getJob = async (jobId: string): Promise<JobType | null> => {
  try {
    const job = await db.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        applications: true,
        sector: true,
        metrics: true,
      },
    });
    return job;
  } catch (error) {
    console.log("GET_JOB", error);
    return null;
  }
};
