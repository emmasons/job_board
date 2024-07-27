import { db } from "@/lib/db";
import { Application, Job } from "@prisma/client";

type JobType = Job & {
  applications: Application[];
  sector: Sector;
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
      },
    });
    return job;
  } catch (error) {
    console.log("GET_JOB", error);
    return null;
  }
};
