import { db } from "@/lib/db";

export const getAllJobAlerts = async (userId: string) => {
  try {
    const jobAlerts = await db.jobAlert.findMany({
      where: {
        userId,
      },
      include: {
        company: true,
      },
    });

    const jobAlertsFormatted = await Promise.all(
      jobAlerts.map(async (jobAlert) => {
        const sectorPromises = jobAlert.sectorIds.map(async (sectorId) => {
          const sector = await db.sector.findUnique({
            where: { id: sectorId },
          });
          return sector?.label;
        });
        const sectorLabels = await Promise.all(sectorPromises);
        return {
          ...jobAlert,
          sectorIds: sectorLabels,
        };
      }),
    );

    const jobAlertsFormattedWithJob = await Promise.all(
      jobAlertsFormatted.map(async (jobAlert) => {
        if (jobAlert.jobId) {
          const job = await db.job.findUnique({
            where: { id: jobAlert.jobId },
          });
          return {
            ...jobAlert,
            job,
          };
        }

        return jobAlert;
      }),
    );

    return jobAlertsFormattedWithJob;
  } catch (error) {
    console.log("GET_USER_JOB_ALERTS", error);
    return [];
  }
};
