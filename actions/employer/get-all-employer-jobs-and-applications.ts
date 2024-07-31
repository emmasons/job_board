import { db } from "@/lib/db";
import { Application, Job, Profile, User } from "@prisma/client";

type ApplicationProp =
  | (Application & { user: User & { profile: Profile | null }; job: Job })
  | null;

export const getAllEmployerJobsAndApplications = async (
  ownerId: string,
): Promise<ApplicationProp[]> => {
  try {
    const applicants = await db.application.findMany({
      where: {
        job: {
          ownerId,
        },
      },
      include: {
        job: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    return applicants;
  } catch (error) {
    console.log("GET_USER_JOBS", error);
    return [];
  }
};
