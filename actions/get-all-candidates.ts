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

export const getAllCandidates = async (): Promise<candidate[]> => {
  try {
    const candidates = await db.user.findMany({
      where: {
        role: Role.JOB_SEEKER,
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
