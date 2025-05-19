import { db } from "@/lib/db";
import { Company, Job, User } from "@prisma/client";

export const getJobById = async (
  jobId: string
): Promise<(Job & { company: Company; owner: User }) | null> => {
  try {
    const job = await db.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        company: true,
        owner: true,
      },
    });
    return job;
  } catch (error) {
    console.log("GET_JOB", error);
    return null;
  }
};
