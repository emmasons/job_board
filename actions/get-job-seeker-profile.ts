import { db } from "@/lib/db";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";

export const getJobSeekerProfile = async (
  jobSeekerId: string,
): Promise<JobSeekerProfileProps | null> => {
  try {
    const profile = await db.jobSeekerProfile.findFirst({
      where: { userId: jobSeekerId },
      include: {
        sector: true,
        education: true,
        experience: true,
      },
    });
    return profile;
  } catch (error) {
    console.log("GET_JOB_SEEKER_PROFILE", error);
    return null;
  }
};
