import { db } from "@/lib/db";

export const getAllJobs = async () => {
  try {
    const jobs = await db.job.findMany({});
    return jobs;
  } catch (error) {
    console.log("GET_SCRAPED_JOBS", error);
    return [];
  }
};
