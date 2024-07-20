import { db } from "@/lib/db";
import { Application, Job, Profile, User } from "@prisma/client";

type JobProp = Application & { user: User & { profile: Profile } };

export const getAllEmployerJobsAndApplications = async (
  ownerId: string,
): Promise<JobProp[]> => {
  try {
    const applicants = await db.application.findMany({
      where: {
        job: {
          ownerId,
        },
      },
      include: {
        // job: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    // const jobs = await db.job.findMany({
    //   where: {
    //     ownerId,
    //   },
    //   include: {
    //     applications: {
    //       where: {
    //         id: {
    //           in: applicants.map((applicant) => applicant.id),
    //         },
    //       },
    //       include: {
    //         user: {
    //           include: {
    //             profile: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    return applicants;
  } catch (error) {
    console.log("GET_USER_JOBS", error);
    return [];
  }
};
