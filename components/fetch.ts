import { db } from "@/lib/db";
import { subMonths, startOfMonth, endOfMonth } from "date-fns";

export async function getOverviewData() {
  const now = new Date();
  const currentStart = startOfMonth(now);
  const currentEnd = endOfMonth(now);
  const prevStart = startOfMonth(subMonths(now, 1));
  const prevEnd = endOfMonth(subMonths(now, 1));

  // Fetch ALL subscriptions for current and previous month (remove status filter)
  const currentPlans = await db.SubscriptionPlan.findMany({
    where: {
      startDate: { gte: currentStart, lte: currentEnd },
    },
    include: { plan: true },
  });

  const previousPlans = await db.SubscriptionPlan.findMany({
    where: {
      startDate: { gte: prevStart, lte: prevEnd },
    },
    include: { plan: true },
  });

  const sumPrices = (plans: typeof currentPlans) =>
    plans.reduce((acc, cur) => acc + (cur.plan?.price ?? 0), 0);

  const currentRevenue = sumPrices(currentPlans);
  const previousRevenue = sumPrices(previousPlans);

  // All-time active subscribers
  const allTimeSubscribers = await db.SubscriptionPlan.count({
    where: { status: "ACTIVE" },
  });

  // Current & previous month subscriber counts (still actual counts of records fetched)
  const currentSubscribers = currentPlans.length;
  const previousSubscribers = previousPlans.length;

  // All-time users
  const allTimeUsers = await db.User.count();

  const currentUsers = await db.User.count({
    where: { createdAt: { gte: currentStart, lte: currentEnd } },
  });

  const previousUsers = await db.User.count({
    where: { createdAt: { gte: prevStart, lte: prevEnd } },
  });

  // All-time CVs
  const allTimeCVs = await db.GeneratedCv.count();

  const currentCVs = await db.GeneratedCv.count({
    where: { createdAt: { gte: currentStart, lte: currentEnd } },
  });

  const previousCVs = await db.GeneratedCv.count({
    where: { createdAt: { gte: prevStart, lte: prevEnd } },
  });

  const calculateGrowthRate = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return +(((current - previous) / previous) * 100).toFixed(2);
  };

  return {
    revenuethismonth: {
      value: currentRevenue,
      growthRate: calculateGrowthRate(currentRevenue, previousRevenue),
    },
    activesubscribers: {
      value: allTimeSubscribers,
      growthRate: calculateGrowthRate(currentSubscribers, previousSubscribers),
    },
    cv: {
      value: allTimeCVs,
      growthRate: calculateGrowthRate(currentCVs, previousCVs),
    },
    users: {
      value: allTimeUsers,
      growthRate: calculateGrowthRate(currentUsers, previousUsers),
    },
  };
}
