import { db } from "@/lib/db";
import { format } from "date-fns";

import { startOfMonth, endOfMonth, isAfter, isBefore } from "date-fns";

export async function getSubscriptionStats(timeFrame?: "This Month" | "All Time" | (string & {})) {
  const plans = await db.subscriptionPlan.findMany({
    include: { plan: true },
  });

  const planMap = new Map<string, number>();
  const statusMap = new Map<string, number>();

  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now);
  const endOfCurrentMonth = endOfMonth(now);

  plans.forEach((sub) => {
    const subDate = new Date(sub.startDate);

    if (
      timeFrame === "This Month" &&
      (isBefore(subDate, startOfCurrentMonth) || isAfter(subDate, endOfCurrentMonth))
    ) {
      return; 
    }

    const planName = sub.plan?.name ?? "UNKNOWN";
    const status = sub.status ?? "UNKNOWN";

    planMap.set(planName, (planMap.get(planName) || 0) + 1);
    statusMap.set(status, (statusMap.get(status) || 0) + 1);
  });

  const planData = Array.from(planMap.entries()).map(([name, amount]) => ({
    name,
    amount,
  }));

  const statusData = Array.from(statusMap.entries()).map(([name, amount]) => ({
    name,
    amount,
  }));

  return {
    plans: planData,
    statuses: statusData,
  };
}


export async function getPaymentsOverviewData(
  timeFrame?: "monthly" | "yearly" | (string & {}),
) {
  const plans = await db.subscriptionPlan.findMany({
    include: { plan: true },
  });

  const earnings = {
    total: new Map<string, number>(),
    active: new Map<string, number>(),
  };

  plans.forEach((sub) => {
    const date = new Date(sub.startDate);
    const key =
      timeFrame === "yearly" ? date.getFullYear().toString() : format(date, "MMM");

    const amount = sub.plan?.price ?? 0;

    // All-time total earnings
    const totalAmount = earnings.total.get(key) || 0;
    earnings.total.set(key, +(totalAmount + amount).toFixed(2));

    // Active subscriptions only
    if (sub.status === "ACTIVE") {
      const activeAmount = earnings.active.get(key) || 0;
      earnings.active.set(key, +(activeAmount + amount).toFixed(2));
    }
  });

  const toArray = (map: Map<string, number>) =>
    Array.from(map.entries())
      .map(([x, y]) => ({ x, y }))
      .sort((a, b) => {
        if (timeFrame === "yearly") return parseInt(a.x) - parseInt(b.x);
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return months.indexOf(a.x) - months.indexOf(b.x);
      });

  return {
    active: toArray(earnings.active),
    total: toArray(earnings.total),
  };
}

export async function getMonthlyProfitData() {
  const cvs = await db.generatedCv.findMany({
    select: { createdAt: true },
  });

  const covers = await db.generatedCover.findMany({
    select: { createdAt: true },
  });

  const countByMonth = (items: { createdAt: Date }[]) => {
    const map = new Map<string, number>();

    items.forEach(({ createdAt }) => {
      const key = format(createdAt, "MMM");
      map.set(key, (map.get(key) || 0) + 1);
    });

    return Array.from(map.entries())
      .map(([x, y]) => ({ x, y }))
      .sort((a, b) => {
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return months.indexOf(a.x) - months.indexOf(b.x);
      });
  };

  return {
    sales: countByMonth(cvs),
    revenue: countByMonth(covers),
  };
}

export async function getCampaignVisitorsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    total_visitors: 784_000,
    performance: -1.5,
    chart: [
      { x: "S", y: 168 },
      { x: "S", y: 385 },
      { x: "M", y: 201 },
      { x: "T", y: 298 },
      { x: "W", y: 187 },
      { x: "T", y: 195 },
      { x: "F", y: 291 },
    ],
  };
}

export async function getVisitorsAnalyticsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112, 123, 212, 270,
    190, 310, 115, 90, 380, 112, 223, 292, 170, 290, 110, 115, 290, 380, 312,
  ].map((value, index) => ({ x: index + 1 + "", y: value }));
}

export async function getCostsPerInteractionData() {
  return {
    avg_cost: 560.93,
    growth: 2.5,
    chart: [
      {
        name: "Google Ads",
        data: [
          { x: "Sep", y: 15 },
          { x: "Oct", y: 12 },
          { x: "Nov", y: 61 },
          { x: "Dec", y: 118 },
          { x: "Jan", y: 78 },
          { x: "Feb", y: 125 },
          { x: "Mar", y: 165 },
          { x: "Apr", y: 61 },
          { x: "May", y: 183 },
          { x: "Jun", y: 238 },
          { x: "Jul", y: 237 },
          { x: "Aug", y: 235 },
        ],
      },
      {
        name: "Facebook Ads",
        data: [
          { x: "Sep", y: 75 },
          { x: "Oct", y: 77 },
          { x: "Nov", y: 151 },
          { x: "Dec", y: 72 },
          { x: "Jan", y: 7 },
          { x: "Feb", y: 58 },
          { x: "Mar", y: 60 },
          { x: "Apr", y: 185 },
          { x: "May", y: 239 },
          { x: "Jun", y: 135 },
          { x: "Jul", y: 119 },
          { x: "Aug", y: 124 },
        ],
      },
    ],
  };
}