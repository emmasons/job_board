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
