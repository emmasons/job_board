import { db } from "@/lib/db";
import { JobsWithCompany } from "@/types/db";

type Params = {
  title?: string;
  location?: string;
  workSchedule?: string;
  countriesFilter?: string;
  sectorFilter?: string;
  jobTypeFilter?: string;
};

const ninetyDaysAgo = new Date();
ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

export const getAllJobs = async ({
  title,
  location,
  countriesFilter,
  workSchedule,
  sectorFilter,
  jobTypeFilter,
}: Params): Promise<JobsWithCompany[]> => {
  const formattedTitle = title?.replace(/\s/g, "");
  const countries: string[] = [];
  if (countriesFilter) {
    const formattedCountries = countriesFilter?.split(",");
    countries.push(...formattedCountries);
  }

  const workSchedules: string[] = [];
  if (workSchedule) {
    const formatted = workSchedule?.split(",");
    workSchedules.push(...formatted);
  }

  const sectors: string[] = [];
  if (sectorFilter) {
    const formatted = sectorFilter?.split(",");
    sectors.push(...formatted);
  }

  try {
    // Define the list of countries

    // Determine the country condition for the query
    const countryCondition = location
      ? { country: location } // If location is provided, use it for the query
      : countries.length > 0
        ? { country: { in: countries } } // If the country list exists and is not empty, use it
        : {}; // Otherwise, do not apply any country filter

    // Determine the country condition for the query
    const workScheduleCondition =
      workSchedules.length > 0
        ? { workSchedule: { in: workSchedules } } // If the workSchedule list exists and is not empty, use it
        : {}; // Otherwise, do not apply any workSchedule filter

    const sectorCondition =
      sectors.length > 0
        ? { sectorId: { in: sectors } } // If the workSchedule list exists and is not empty, use it
        : {}; // Otherwise, do not apply any workSchedule filter

    const jobTypeCondition = jobTypeFilter
      ? { jobType: jobTypeFilter } // If the jobTypeFilter exists, use it as a condition
      : {}; // Otherwise, do not apply any jobType filter

    const jobs = await db.job.findMany({
      where: {
        isOpen: true,
        published: true,
        ...countryCondition,
        ...(formattedTitle
          ? {
              OR: [
                { title: { contains: title, mode: "insensitive" } },
                { description: { contains: title, mode: "insensitive" } },
                { city: { contains: title, mode: "insensitive" } },
              ],
            }
          : {}),
        ...workScheduleCondition,
        ...sectorCondition,
        ...jobTypeCondition,
      },
      include: {
        company: true,
        sector: true,
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
