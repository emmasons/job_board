import { db } from "@/lib/db";

export const getJobById = async (jobId: string) => {
  try {
    const job = await db.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        company: true,
      },
    });
    return job;
  } catch (error) {
    console.log("GET_JOB", error);
    return null;
  }
};
