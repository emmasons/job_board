import { db } from "@/lib/db";

export async function hasFeatureAccess(
  userId: string,
  featureName: string
): Promise<boolean> {
  // Find user's active subscription
  const activeSubscription = await db.subscriptionPlan.findFirst({
    where: {
      userId,
      status: "ACTIVE",
      endDate: {
        gt: new Date(), // Subscription hasn't expired
      },
    },
    include: {
      plan: {
        include: {
          planFeatures: {
            include: {
              feature: true,
            },
          },
        },
      },
    },
  });

  // No active subscription
  if (!activeSubscription) return false;

  // Check if the feature exists in the user's plan
  return activeSubscription.plan.planFeatures.some(
    (planFeature) => planFeature.feature.type === featureName
  );
}
