import { db } from "@/lib/db";
import { JobsWithCompany } from "@/types/db";

type Params = {
  title?: string;
  location?: string;
};
export const getAllJobs = async ({
  title,
  location,
}: Params): Promise<JobsWithCompany[]> => {
  const formattedTitle = title?.replace(/\s/g, "");
  try {
    const jobs = await db.job.findMany({
      where: {
        location,
        ...(formattedTitle
          ? {
              OR: [
                { title: { contains: title, mode: "insensitive" } },
                { description: { contains: title, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return jobs;
  } catch (error) {
    console.log("GET_ALL_JOBS", error);
    return [];
  }
};
