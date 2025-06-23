import { db } from "@/lib/db";

export async function fetchSubscriptions() {
  const res = await fetch("/api/subscriptions-data");
  if (!res.ok) throw new Error("Failed to fetch subscriptions");
  return res.json();
}

export async function updateSubscriptionStatus(id: string, status: string) {
  const res = await fetch(`/api/subscriptions-data/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}


export async function getTransactions() {
  const plans = await db.subscriptionPlan.findMany({
    include: {
      user: true,
      plan: true,
    },
    orderBy: {
      startDate: "desc",
    },
    take: 20,
  });

  return plans
    .filter((plan) => plan.plan?.name?.toUpperCase() !== "FREE")
    .map((plan) => ({
      user: plan.user?.email || "Unknown User",
      plan: plan.plan?.name || "No Plan",
      paymentId: plan.paymentId || "N/A",
      startDate: plan.startDate.toISOString(),
      amount: plan.plan?.price || 0, 
    }));
}

