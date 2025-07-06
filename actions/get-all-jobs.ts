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
  // ──────────────────────────────────────────────
  //   1. Normalise the search term
  //   – trim, collapse whitespace and lower‑case
  // ──────────────────────────────────────────────
  const formattedTitle = title
    ? title
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase()
    : undefined;

  // ––––– split comma‑separated filters –––––
  const countries = countriesFilter?.split(",").filter(Boolean) ?? [];
  const workSchedules = workSchedule?.split(",").filter(Boolean) ?? [];
  const sectors = sectorFilter?.split(",").filter(Boolean) ?? [];

  try {
    // ––––– dynamic where‑clause pieces –––––
    const countryCondition =
      location
        ? { country: location }
        : countries.length
          ? { country: { in: countries } }
          : {};

    const workScheduleCondition =
      workSchedules.length
        ? { workSchedule: { in: workSchedules } }
        : {};

    const sectorCondition =
      sectors.length
        ? { sectorId: { in: sectors } }
        : {};

    const jobTypeCondition = jobTypeFilter
      ? { jobType: jobTypeFilter }
      : {};

    const jobs = await db.job.findMany({
      where: {
        isOpen: true,
        published: true,
        ...countryCondition,
        ...(formattedTitle
          ? {
              OR: [
                { title:       { contains: formattedTitle } },
                { description: { contains: formattedTitle } },
                { city:        { contains: formattedTitle } },
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
