import { db } from "@/lib/db";
import {
  Role,
  Profile,
  JobSeekerProfile,
  User,
  Sector,
  EducationLevel,
  Experience,
  Skill,
} from "@prisma/client";
import { getLatestFileMetaData } from "./get-latest-file-metadata";
import { getUserCv } from "./get-user-cv";

type candidate =
  | (User & {
      profile: Profile;
      jobSeekerProfile: JobSeekerProfile & {
        sector: Sector;
        education: EducationLevel;
        experience: Experience;
        skills: Skill[];
      };
    })
  | null;

type Params = {
  cvTitle?: string;
  countriesFilter?: string;
  location?: string;
  occupation?: string;
  city?: string;
  skills?: string;
};
export const getAllCandidates = async ({
  cvTitle,
  countriesFilter,
  location,
  occupation,
  city,
  skills,
}: Params): Promise<candidate[]> => {
  const countries = [];
  if (countriesFilter) {
    const formattedCountries = countriesFilter?.split(",");
    countries.push(...formattedCountries);
  }
  const skillsList = skills ? skills.split(",") : [];

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
              occupation: {
                contains: occupation ? occupation.toLowerCase() : undefined,
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
              skills: {
                some: {
                  skill: {
                    in: skillsList ? skillsList : undefined,
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
          {
            jobSeekerProfile: {
              employmentDetails: {
                some: {
                  location: {
                    contains: city ? city.toLowerCase() : undefined,
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
            skills: true,
          },
        },
      },
    });

    for (const candidate of candidates) {
      const cv = await getUserCv(candidate.id);
      const cvFile = await getLatestFileMetaData(cv?.id);
      candidate.cvFile = cvFile;
    }

    return candidates;
  } catch (error) {
    console.log(error, "[GET_ALL_CANDIDATES]");
    return [];
  }
};
