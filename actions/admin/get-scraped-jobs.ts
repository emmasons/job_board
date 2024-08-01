import { db } from "@/lib/db";
import { JOBSOURCE } from "@prisma/client";

export const getScrapedJobs = async () => {
  try {
    const jobs = await db.job.findMany({
      where: {
        source: JOBSOURCE.SCRAPPER,
      },
    });
    return jobs;
  } catch (error) {
    console.log("GET_SCRAPED_JOBS", error);
    return [];
  }
};
