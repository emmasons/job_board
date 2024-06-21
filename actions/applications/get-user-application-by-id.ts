import { db } from "@/lib/db";

export const getUserApplicationById = async (userId: string, jobId: string) => {
  try {
    const application = await db.application.findUnique({
      where: {
        applicationId: {
          userId,
          jobId,
        },
      },
    });

    return application;
  } catch (error) {
    console.log("GET_USER_APPLICATION_BY_ID", error);
    return null;
  }
};
