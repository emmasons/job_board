import { db } from "@/lib/db";
import {
  Role,
  Profile,
  JobSeekerProfile,
  User,
  Sector,
  EducationLevel,
  Experience,
} from "@prisma/client";

type candidate =
  | (User & {
      profile: Profile;
      jobSeekerProfile: JobSeekerProfile & {
        sector: Sector;
        education: EducationLevel;
        experience: Experience;
      };
    })
  | null;

type Params = {
  cvTitle?: string;
  countriesFilter?: string;
};
export const getAllCandidates = async ({
  cvTitle,
  countriesFilter,
}: Params): Promise<candidate[]> => {
  const countries = [];
  if (countriesFilter) {
    const formattedCountries = countriesFilter?.split(",");
    countries.push(...formattedCountries);
  }
  try {
    const countryCondition = location
      ? { country: location } // If location is provided, use it for the query
      : countries.length > 0
        ? { country: { in: countries } } // If the country list exists and is not empty, use it
        : {}; // Otherwise, do not apply any country filter
    const candidates = await db.user.findMany({
      where: {
        ...countryCondition, // Use the determined country condition
        role: Role.JOB_SEEKER,
        OR: [
          {
            jobSeekerProfile: {
              occupation: {
                contains: cvTitle ? cvTitle.toLowerCase() : undefined,
                mode: "insensitive",
              },
            },
          },
          {
            jobSeekerProfile: {
              country: {
                contains: cvTitle ? cvTitle.toLowerCase() : undefined,
                mode: "insensitive",
              },
            },
          },
          {
            jobSeekerProfile: {
              cvHeadLine: {
                contains: cvTitle ? cvTitle.toLowerCase() : undefined,
                mode: "insensitive",
              },
            },
          },
          {
            jobSeekerProfile: {
              profileSummary: {
                contains: cvTitle ? cvTitle.toLowerCase() : undefined,
                mode: "insensitive",
              },
            },
          },
          {
            jobSeekerProfile: {
              sector: {
                label: {
                  contains: cvTitle ? cvTitle.toLowerCase() : undefined,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            jobSeekerProfile: {
              skills: {
                some: {
                  skill: {
                    contains: cvTitle ? cvTitle.toLowerCase() : undefined,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
          {
            jobSeekerProfile: {
              desiredJob: {
                some: {
                  designation: {
                    contains: cvTitle ? cvTitle.toLowerCase() : undefined,
                    mode: "insensitive",
                  },
                  industry: {
                    contains: cvTitle ? cvTitle.toLowerCase() : undefined,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        profile: true,
        jobSeekerProfile: {
          include: {
            sector: true,
            education: true,
            experience: true,
          },
        },
      },
    });
    return candidates;
  } catch (error) {
    console.log(error, "[GET_ALL_CANDIDATES]");
    return [];
  }
};
