import { db } from "@/lib/db";

export const getUserJobs = async (ownerId: string) => {
  try {
    const jobs = await db.job.findMany({
      where: {
        ownerId,
      },
    });
    return jobs;
  } catch (error) {
    console.log("GET_USER_JOBS", error);
    return [];
  }
};
