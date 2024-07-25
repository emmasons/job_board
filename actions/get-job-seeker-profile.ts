import { db } from "@/lib/db";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";

export const getJobSeekerProfile = async (
  jobSeekerId: string,
): Promise<JobSeekerProfileProps | null> => {
  try {
    let profile;
    profile = await db.jobSeekerProfile.findFirst({
      where: { userId: jobSeekerId },
      include: {
        sector: true,
        education: true,
        experience: true,
        skills: true,
        personalDetails: true,
        desiredJob: true,
      },
    });
    console.log("profile", profile);
    if (!profile)
      profile = await db.jobSeekerProfile.create({
        data: { userId: jobSeekerId },
      });

    const profilePercentage = await db.jobSeekerProfilePercentage.findFirst({
      where: {
        jobSeekerProfileId: profile.id,
      },
    });

    return {
      ...profile,
      profilePercentage: profilePercentage || null,
    };
  } catch (error) {
    console.log("GET_JOB_SEEKER_PROFILE", error);
    return null;
  }
};
