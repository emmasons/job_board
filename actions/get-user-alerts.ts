import { db } from "@/lib/db";

export async function getUserAlerts(userId: string) {
  try {
    const alerts = await db.jobAlert.findMany({
      where: {
        userId,
      },
    });
    return alerts;
  } catch (error) {
    console.log("GET_USER_ALERTS", error);
    return [];
  }
}
