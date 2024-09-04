import { db } from "@/lib/db";

export const getFeaturedJobs = async () => {
  try {
    const jobs = await db.job.findMany({
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        isFeatured: true,
      },
    });
    return jobs;
  } catch (error) {
    console.log("FEATURED JOBS ERROR", error);
    return null;
  }
};
