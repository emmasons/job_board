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
  GCPData,
} from "@prisma/client";
import { getLatestFileMetaData } from "./get-latest-file-metadata";
import { getUserCv } from "./get-user-cv";

export type candidate =
  | (User & {
      profile: Profile;
      jobSeekerProfile: JobSeekerProfile & {
        sector: Sector;
        education: EducationLevel;
        experience: Experience;
        skills: Skill[];
      };
      cvFile: GCPData | null;
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
  try {
    // Parse countries filter
    const countries = countriesFilter ? countriesFilter.split(",") : [];
    const skillsList = skills ? skills.split(",") : [];

    // Build country condition
    const countryCondition = location
      ? { country: location }
      : countries.length > 0
        ? { country: { in: countries } }
        : {};

    const candidates = await db.user.findMany({
      where: {
        ...countryCondition,
        role: Role.JOB_SEEKER,
        OR: [
          // Title/occupation search
          {
            jobSeekerProfile: {
              occupation: cvTitle || occupation
                ? {
                    contains: (cvTitle || occupation)?.toLowerCase(),
                    mode: "insensitive",
                  }
                : undefined,
            },
          },
          // Country search
          {
            jobSeekerProfile: cvTitle
              ? {
                  country: {
                    contains: cvTitle.toLowerCase(),
                    mode: "insensitive",
                  },
                }
              : undefined,
          },
          // CV headline search
          {
            jobSeekerProfile: cvTitle
              ? {
                  cvHeadLine: {
                    contains: cvTitle.toLowerCase(),
                    mode: "insensitive",
                  },
                }
              : undefined,
          },
          // Profile summary search
          {
            jobSeekerProfile: cvTitle
              ? {
                  profileSummary: {
                    contains: cvTitle.toLowerCase(),
                    mode: "insensitive",
                  },
                }
              : undefined,
          },
          // Sector search
          {
            jobSeekerProfile: cvTitle
              ? {
                  sector: {
                    label: {
                      contains: cvTitle.toLowerCase(),
                      mode: "insensitive",
                    },
                  },
                }
              : undefined,
          },
          // Skills search by title
          {
            jobSeekerProfile: cvTitle
              ? {
                  skills: {
                    some: {
                      skill: {
                        contains: cvTitle.toLowerCase(),
                        mode: "insensitive",
                      },
                    },
                  },
                }
              : undefined,
          },
          // Skills list search
          {
            jobSeekerProfile: skillsList.length > 0
              ? {
                  skills: {
                    some: {
                      skill: {
                        in: skillsList,
                      },
                    },
                  },
                }
              : undefined,
          },
          // City search
          {
            jobSeekerProfile: city
              ? {
                  employmentDetails: {
                    some: {
                      location: {
                        contains: city.toLowerCase(),
                        mode: "insensitive",
                      },
                    },
                  },
                }
              : undefined,
          },
        ].filter(Boolean), // Remove any undefined conditions
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
