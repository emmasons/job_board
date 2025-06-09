"use client";

import { useState } from "react";
import { subscribeToPlan } from "@/actions/subscriptions";
import { Check, X, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubscriptionPlans({
  plans,
  currentSubscription,
  isLoggedIn,
}) {
  const [selectedCycle, setSelectedCycle] = useState("MONTHLY");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const cycleMultiplier = {
    MONTHLY: 1,
    ANNUALLY: 10,
  };

  const handleSubscribe = async (planId) => {
    if (!isLoggedIn) {
      window.location.href = `/auth/signin?callbackUrl=${encodeURIComponent("/subscription/plans")}`;
      return;
    }

    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("planId", planId);
    formData.append("billingCycle", selectedCycle);

    try {
      const result = await subscribeToPlan(formData);

      if (result.success) {
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl;
        } else {
          window.location.href = "/subscription/plans";
        }
      } else if (result.retryRedirect) {
        alert(result.error || "Payment was declined. Try another method.");
        window.location.href = result.retryRedirect;
      } else {
        setError(result.error || "Failed to process subscription");
      }

    } catch (err) {
      console.error("Unexpected subscription error:", err);

      const fallback =
        err?.response?.data?.details?.[0]?.description ||
        err?.message ||
        "An unexpected error occurred";

      setError(fallback);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if the current plan is active
  const isCurrentPlan = (planId) => {
    return currentSubscription?.planId === planId;
  };

  // this block shows the free plan as the last option
  const reorderedPlans = [...plans];
  if (reorderedPlans.length > 1) {
    const first = reorderedPlans.shift(); // remove the first element
    reorderedPlans.push(first!); // add it to the end
  }


  return (
    <section className="py-1">
      <div className="">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-700  my-4">
            Choose Your Plan
          </h2>
        </div>

        <div className="mb-8 flex justify-center gap-4">
          {["MONTHLY", "ANNUALLY"].map((cycle) => (
            <button
              key={cycle}
              onClick={() => setSelectedCycle(cycle)}
              className={`rounded-lg px-4 py-2 font-semibold 
                ${selectedCycle === cycle ? "bg-primary text-white" : "bg-white shadow-md"}`}
            >
              {cycle.charAt(0) + cycle.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-8 mx-auto max-w-2xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid gap-10 bg-slate-100 p-6 md:grid-cols-3">
          {reorderedPlans.map((plan, index) => {
            const features = plan.planFeatures.map((pf) => pf.feature);
            const isCurrentUserPlan = isCurrentPlan(plan.id);

            // Highlight the 2nd plan (index 1) as "Recommended" if there's no current subscription
            const isRecommendedPlan = !currentSubscription && index === 1;

            // Make the plan after the recommended (index 2) show "Lifetime" instead of the selected cycle
            const isLifetimePlan = !currentSubscription && index === 2;

            const adjustedPrice = isLifetimePlan
              ? plan.price.toFixed(2)
              : (
                  plan.price *
                  (selectedCycle === "ANNUALLY"
                    ? 10
                    : selectedCycle === "QUARTERLY"
                    ? 3
                    : 1)
                ).toFixed(2);

            return (
              <div
                key={plan.id}
                className={`group overflow-hidden rounded-lg bg-white shadow-lg 
                  transition-all duration-300 ease-out
                  ${(isCurrentUserPlan || isRecommendedPlan) ? "scale-105 ring-2 ring-primary" : ""} 
                  hover:-translate-y-2 hover:scale-[1.02]
                  hover:shadow-2xl`}
              >
                {(isCurrentUserPlan || isRecommendedPlan) && (
                  <div className="bg-primary text-white py-1 px-4 text-center text-sm font-medium">
                    {isCurrentUserPlan ? "Current Plan" : "Recommended"}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="mb-2 text-md font-bold transition-colors duration-300 group-hover:text-primary">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${adjustedPrice}</span>
                    <span className="text-gray-500">
                      /{isLifetimePlan ? "Lifetime" : selectedCycle.toLowerCase() === "monthly"
                        ? "mo"
                        : selectedCycle.toLowerCase() === "quarterly"
                        ? "quarter"
                        : "year"}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {features.map((feature) => (
                      <li
                        key={feature.id}
                        className="flex items-center text-gray-600 text-[0.8rem]"
                      >
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        {feature.displayName}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isSubmitting || isCurrentUserPlan}
                    className={`inline-flex items-center rounded-lg px-4 py-2 w-full justify-center
                      ${
                        isCurrentUserPlan
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : "bg-primary text-white hover:bg-[#46bba2] transition-colors duration-200 ease-in-out"
                      }`}
                  >
                    {isCurrentUserPlan
                      ? "Current Plan"
                      : isSubmitting
                      ? "Processing..."
                      : `Subscribe to ${plan.name}`}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
