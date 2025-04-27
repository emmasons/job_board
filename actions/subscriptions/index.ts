"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";

// Schema for subscription creation
const subscriptionSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
  billingCycle: z.enum(["MONTHLY", "ANNUALLY"]),
});

export async function getAvailablePlans(userType = "JOB_SEEKER") {
  "use server";
  if (userType !== "JOB_SEEKER" && userType !== "EMPLOYER") {
    userType = "JOB_SEEKER";
  }

  const plans = await db.plan.findMany({
    where: {
      userType,
      isActive: true,
    },
    include: {
      planFeatures: {
        include: {
          feature: true,
        },
      },
    },
    orderBy: {
      price: "asc",
    },
  });

  return plans;
}

export async function getUserSubscription() {
  "use server";
  const user = await getCurrentSessionUser();
  if (!user) {
    return null;
  }

  const subscription = await db.subscriptionPlan.findFirst({
    where: {
      userId: user.id,
      status: "ACTIVE",
      endDate: {
        gt: new Date(),
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return subscription;
}

export async function subscribeToPlan(formData: FormData) {
  "use server";
  const user = await getCurrentSessionUser();
  if (!user) {
    return {
      success: false,
      error: "You must be logged in to subscribe",
    };
  }

  try {
    const planId = formData.get("planId") as string;
    const billingCycle = formData.get("billingCycle") as string;

    // Validate
    const validatedData = subscriptionSchema.parse({
      planId,
      billingCycle,
    });

    // Get the plan
    const plan = await db.plan.findUnique({
      where: { id: validatedData.planId },
    });

    if (!plan) {
      return {
        success: false,
        error: "Invalid plan selected",
      };
    }

    // Calculate subscription end date based on billing cycle
    let endDate = new Date();
    switch (validatedData.billingCycle) {
      case "MONTHLY":
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case "ANNUALLY":
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }

    // Check if user already has an active subscription
    const existingSubscription = await db.subscriptionPlan.findFirst({
      where: {
        userId: user.id,
        status: "ACTIVE",
        endDate: {
          gt: new Date(),
        },
      },
    });

    if (existingSubscription) {
      // Cancel existing subscription
      await db.subscriptionPlan.update({
        where: { id: existingSubscription.id },
        data: { status: "CANCELLED" },
      });
    }

    // Create new subscription
    // In a real app, you would integrate with a payment provider here
    const subscription = await db.subscriptionPlan.create({
      data: {
        userId: user.id,
        planId: validatedData.planId,
        startDate: new Date(),
        endDate,
        status: "ACTIVE",
        paymentId: `simulate_payment_${Date.now()}`, // Simulate payment ID
        autoRenew: true,
      },
    });

    revalidatePath("/subscription");
    revalidatePath("/dashboard");

    return {
      success: true,
      subscription,
    };
  } catch (error) {
    console.error("Subscription error:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid subscription data",
        validationErrors: error.errors,
      };
    }

    return {
      success: false,
      error: "Failed to process subscription",
    };
  }
}

export async function cancelSubscription() {
  "use server";
  const user = await getCurrentSessionUser();
  if (!user) {
    return {
      success: false,
      error: "You must be logged in to cancel your subscription",
    };
  }

  try {
    const activeSubscription = await db.subscriptionPlan.findFirst({
      where: {
        userId: user.id,
        status: "ACTIVE",
      },
    });

    if (!activeSubscription) {
      return {
        success: false,
        error: "No active subscription found",
      };
    }

    // Update subscription status
    await db.subscriptionPlan.update({
      where: { id: activeSubscription.id },
      data: {
        status: "CANCELLED",
        autoRenew: false,
      },
    });

    revalidatePath("/subscription");
    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return {
      success: false,
      error: "Failed to cancel subscription",
    };
  }
}
