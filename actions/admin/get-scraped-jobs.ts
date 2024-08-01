import { db } from "@/lib/db";

export const getScrapedJobs = async () => {
  try {
    const jobs = await db.job.findMany({
      where: {
        isScraped: true,
      },
    });
    return jobs;
  } catch (error) {
    console.log("GET_SCRAPED_JOBS", error);
    return [];
  }
};
