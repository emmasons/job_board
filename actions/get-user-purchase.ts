import { db } from "@/lib/db";
import { Purchase } from "@prisma/client";

export const getUserPurchase = async (
  userId: string,
  jobId: string,
): Promise<Purchase | null> => {
  try {
    let purchase = await db.purchase.findUnique({
      where: {
        userId_jobId: {
          userId,
          jobId,
        },
      },
    });
    return purchase;
  } catch (error) {
    console.log(error);
    return null;
  }
};
