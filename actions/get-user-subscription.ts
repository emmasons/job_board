import { db } from "@/lib/db";

type UserSubscription = {
  id: string;
  status: string;
  plan: {
    name: string;
  };
} | null;

export const getUserSubscription = async (userId: string): Promise<UserSubscription> => {
  try {
    const subscription = await db.subscriptionPlan.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        plan: true,
      },
    });

    return subscription;
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return null;
  }
};
