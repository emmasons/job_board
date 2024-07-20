import { db } from "@/lib/db";

export const getApplicationById = async (id: string) => {
  try {
    const application = await db.application.findUnique({
      where: {
        id,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    return application;
  } catch (error) {
    console.log("GET_USER_APPLICATION_BY_ID", error);
    return null;
  }
};
