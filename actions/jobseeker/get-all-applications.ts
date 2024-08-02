import { db } from "@/lib/db";
import { Application, Job, Profile, User } from "@prisma/client";

export type ApplicationProp = Application & {
  user: User & { profile: Profile | null };
  job: Job;
};

export const getAllJobsApplications = async (userId: string) => {
  try {
    const applications = await db.application.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        jobId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            profile: true,
          },
        },
        job: true,
      },
    });

    return applications;
  } catch (error) {
    console.log("GET_CANDIDATES_APPLICATIONS", error);
    return [];
  }
};
