import { db } from "@/lib/db";

export const getAllJobAlerts = async (userId: string) => {
  try {
    const jobAlerts = await db.jobAlert.findMany({
      where: {
        userId,
      },
      include: {
        company: true,
        educationLevel: true,
        sector: true,
      },
    });

    return jobAlerts;
  } catch (error) {
    console.log("GET_USER_JOB_ALERTS", error);
    return [];
  }
};
