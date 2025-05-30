"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { client as paypalClient } from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

// Schema for subscription creation
const subscriptionSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
  billingCycle: z.enum(["MONTHLY", "ANNUALLY"]),
});

export async function getAvailablePlans(userType = "JOB_SEEKER") {
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
  const user = await getCurrentSessionUser();
  if (!user) {
    return { success: false, error: "You must be logged in to subscribe" };
  }

  try {
    const planId = formData.get("planId")?.toString();
    const billingCycle = formData.get("billingCycle")?.toString();

    if (!planId || !billingCycle) {
      return { success: false, error: "Missing required fields" };
    }

    const validatedData = subscriptionSchema.parse({ planId, billingCycle });

    const plan = await db.plan.findUnique({ where: { id: validatedData.planId } });
    if (!plan) {
      return { success: false, error: "Invalid plan selected" };
    }

    if (plan.price === 0) {
      // Free plan logic
      const endDate = new Date();
      billingCycle === "MONTHLY"
        ? endDate.setMonth(endDate.getMonth() + 1)
        : endDate.setFullYear(endDate.getFullYear() + 1);

      await db.subscriptionPlan.create({
        data: {
          userId: user.id,
          planId: plan.id,
          startDate: new Date(),
          endDate,
          status: "ACTIVE",
          paymentId: `free_${Date.now()}`,
          autoRenew: true,
        },
      });

      await db.transaction.create({
        data: {
          transactionCode: `txn_free_${Date.now()}`,
          amount: 0,
          currency: "USD",
          status: "COMPLETED",
          userId: user.id,
          planId: plan.id,
        },
      });

      revalidatePath("/subscription");
      revalidatePath("/dashboard");

      return { success: true };
    }

    // Cancel existing
    const existingSubscription = await db.subscriptionPlan.findFirst({
      where: {
        userId: user.id,
        status: "ACTIVE",
        endDate: { gt: new Date() },
      },
    });

    if (existingSubscription) {
      await db.subscriptionPlan.update({
        where: { id: existingSubscription.id },
        data: { status: "CANCELLED" },
      });
    }

    // Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [{
        amount: { currency_code: "USD", value: plan.price.toFixed(2) },
        description: `Subscription for plan: ${plan.name}`,
        custom_id: plan.id,
      }],
      application_context: {
        brand_name: "Talentra.io",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        shipping_preference: "NO_SHIPPING",
        return_url: `${process.env.NEXTAUTH_URL}/subscription/success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/subscription/plans`,
      },
    });

    let order;
    try {
      order = await paypalClient.execute(request);
    } catch (paypalError: any) {
      const errorBody = paypalError?.message ? JSON.parse(paypalError.message) : paypalError;

      if (
        errorBody?.name === "UNPROCESSABLE_ENTITY" &&
        errorBody.details?.[0]?.issue === "INSTRUMENT_DECLINED"
      ) {
        const fallbackLink = errorBody.links?.find((l: any) => l.rel === "redirect")?.href;
        return {
          success: false,
          retryRedirect: fallbackLink,
          error: errorBody.details?.[0]?.description || "Your payment was declined. Please try again.",
        };
      }

      return {
        success: false,
        error: "Failed to create PayPal order. Please try another method.",
      };
    }

    const approvalLink = order.result.links.find((l) => l.rel === "approve")?.href;
    if (!approvalLink) {
      return { success: false, error: "Failed to get PayPal approval link" };
    }

    await db.pendingSubscription.create({
      data: {
        orderId: order.result.id,
        userId: user.id,
        planId: plan.id,
        billingCycle: validatedData.billingCycle,
      },
    });

    return { success: true, redirectUrl: approvalLink };

  } catch (error: any) {
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
      error: "Something went wrong while processing your subscription.",
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

export async function finalizeSubscription(orderId: string, userId: string) {
  const orderDetails = await paypalClient.execute(
    new paypal.orders.OrdersGetRequest(orderId)
  );

  if (!orderDetails.result || orderDetails.result.status !== "APPROVED") {
    throw new Error("Order not approved");
  }

  const capture = await paypalClient.execute(
    new paypal.orders.OrdersCaptureRequest(orderId)
  );

  const captureResult = capture.result;
  const paymentId = captureResult.purchase_units[0].payments.captures[0].id;

  // Fetch pending subscription first
  const pending = await db.pendingSubscription.findUnique({
    where: { orderId },
  });

  if (!pending) {
    throw new Error("Pending subscription not found.");
  }

  // Now fetch plan from DB using pending.planId
  const plan = await db.plan.findUnique({
    where: { id: pending.planId },
  });

  if (!plan) {
    throw new Error("Plan not found");
  }

  const endDate = new Date();
  if (pending.billingCycle === "MONTHLY") {
    endDate.setMonth(endDate.getMonth() + 1);
  } else {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  const subscription = await db.subscriptionPlan.create({
    data: {
      userId,
      planId: plan.id,
      startDate: new Date(),
      endDate,
      status: "ACTIVE",
      paymentId,
      autoRenew: true,
    },
  });

  await db.transaction.create({
    data: {
      transactionCode: paymentId,
      amount: plan.price,
      currency: "USD",
      status: "COMPLETED",
      userId,
      planId: plan.id,
    },
  });

  await db.pendingSubscription.delete({
    where: { orderId },
  });

  revalidatePath("/dashboard");
  revalidatePath("/subscription");

  const fullSubscription = await db.subscriptionPlan.findUnique({
    where: { id: subscription.id },
    include: { plan: true },
  });

  return fullSubscription;
}
