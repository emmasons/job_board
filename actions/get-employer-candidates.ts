import { db } from "@/lib/db";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";
import { Profile, User, JobSeekerProfile, Experience } from "@prisma/client";

export type CandidateProps = User & {
  profile: Profile | null;
  jobSeekerProfile:
    | (JobSeekerProfile & {
        experience: Experience | null;
      })
    | null;
};

export const getEmployerCandidates = async (
  employerId: string,
): Promise<CandidateProps[] | null> => {
  try {
    const candidateIds = await db.candidate.findMany({
      where: {
        employerId,
      },
      select: {
        candidateId: true,
      },
    });
    const candidates = await db.user.findMany({
      where: {
        id: { in: candidateIds.map(({ candidateId }) => candidateId) },
      },
      include: {
        profile: true,
        jobSeekerProfile: {
          include: {
            experience: true,
          },
        },
      },
    });
    return candidates;
  } catch (error) {
    console.log("[GET_EMPLOYER_CANDIDATES]", error);
    return [];
  }
};
