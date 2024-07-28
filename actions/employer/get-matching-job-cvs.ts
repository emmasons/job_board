import { db } from "@/lib/db";
import { getLatestFileMetaData } from "../get-latest-file-metadata";
import { getUserCv } from "../get-user-cv";
import {
  EducationLevel,
  Experience,
  GCPData,
  JobSeekerProfile,
  Profile,
  Role,
  Sector,
  Skill,
  User,
} from "@prisma/client";
type Props = {
  jobTitle: string;
  occupation: string;
};

type JobSeekerProfileType =
  | (JobSeekerProfile & {
      sector: Sector | null;
      education: EducationLevel | null;
      experience: Experience | null;
      skills: Skill[] | null;
    })
  | null;

type candidate =
  | (User & {
      profile: Profile | null;
      jobSeekerProfile: JobSeekerProfileType;
      //   cvFile: GCPData | null;
    })
  | null;

export const getMatchingJobsCvs = async ({
  jobTitle,
  occupation,
}: Props): Promise<candidate[]> => {
  try {
    const candidates = await db.user.findMany({
      where: {
        role: Role.JOB_SEEKER,
        AND: {
          jobSeekerProfile: {
            OR: [
              {
                occupation: {
                  contains: jobTitle ? jobTitle.toLowerCase() : undefined,
                  mode: "insensitive",
                },
              },
              {
                occupation: {
                  contains: occupation ? occupation.toLowerCase() : undefined,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
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
      Object.assign(candidate, { cvFile });
    }
    return candidates;
  } catch (error) {
    console.log("[GET_ALL_CANDIDATES]", error);
    return [];
  }
};
