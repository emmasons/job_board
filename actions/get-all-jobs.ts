import { db } from "@/lib/db";
import { JobsWithCompany } from "@/types/db";

type Params = {
  title?: string;
  location?: string;
  country?: string;
  workSchedule?: string;
};
export const getAllJobs = async ({
  title,
  location,
  country,
  workSchedule,
}: Params): Promise<JobsWithCompany[]> => {
  const formattedTitle = title?.replace(/\s/g, "");
  const countries = [];
  if (country) {
    const formattedCountries = country?.split(",");
    countries.push(...formattedCountries);
  }

  const workSchedules = [];
  if (workSchedule) {
    const formatted = workSchedule?.split(",");
    workSchedules.push(...formatted);
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

    const jobs = await db.job.findMany({
      where: {
        ...countryCondition, // Use the determined country condition
        ...(formattedTitle
          ? {
              OR: [
                { title: { contains: title, mode: "insensitive" } },
                { description: { contains: title, mode: "insensitive" } },
                { city: { contains: title, mode: "insensitive" } },
              ],
            }
          : {}),
        // workSchedule: { in: workSchedules },
        ...workScheduleCondition,
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
