import { Suspense } from "react";
import {
  getAvailablePlans,
  getUserSubscription,
} from "@/actions/subscriptions";
import SubscriptionPlans from "@/components/plans/subscription/SubscriptionPlans";
import CurrentSubscription from "@/components/plans/subscription/CurrentSubscription";

import { redirect } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getCurrentSessionUser } from "@/lib/auth";

export default async function SubscriptionPage() {
  const user = await getCurrentSessionUser();
  if (!user) {
    return {
      success: false,
      error: "You must be logged in to cancel your subscription",
    };
  }

  if (!user) {
    redirect("/login?callbackUrl=/plans/subscription");
  }

  const plans = await getAvailablePlans(user.role || "JOBSEEKER");
  const currentSubscription = await getUserSubscription();

  return (
    <MaxWidthWrapper className="py-8">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-700">
          Plans for all your needs
        </h2>
        <p className="text-md my-4 text-slate-600">
          Simple, transparent pricing that scales with your needs.
        </p>
      </div>

      {currentSubscription && (
        <div className="mb-10">
          <Suspense fallback={<div>Loading your subscription...</div>}>
            <CurrentSubscription subscription={currentSubscription} />
          </Suspense>
        </div>
      )}

      <Suspense fallback={<div>Loading subscription plans...</div>}>
        <SubscriptionPlans
          plans={plans}
          currentSubscription={currentSubscription}
        />
      </Suspense>
    </MaxWidthWrapper>
  );
}
