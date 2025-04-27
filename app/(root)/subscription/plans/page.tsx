import { Suspense } from "react";
import {
  getAvailablePlans,
  getUserSubscription,
} from "@/actions/subscriptions";
import SubscriptionPlans from "@/components/plans/subscription/SubscriptionPlans";
import CurrentSubscription from "@/components/plans/subscription/CurrentSubscription";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getCurrentSessionUser } from "@/lib/auth";

export default async function SubscriptionPage() {
  const user = await getCurrentSessionUser();

  const plans = await getAvailablePlans(user?.role || "JOB_SEEKER");

  const currentSubscription = user ? await getUserSubscription() : null;

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

      {user && currentSubscription && (
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
          isLoggedIn={!!user}
        />
      </Suspense>
    </MaxWidthWrapper>
  );
}
