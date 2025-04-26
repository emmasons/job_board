"use client";

import { useState } from "react";
import { subscribeToPlan } from "@/actions/subscriptions";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubscriptionPlans({ plans, currentSubscription }) {
  const [selectedCycle, setSelectedCycle] = useState("MONTHLY");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const cycleMultiplier = {
    MONTHLY: 1,
    ANNUALLY: 10, // ~16% discount for annual
  };

  const handleSubscribe = async (planId) => {
    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("planId", planId);
    formData.append("billingCycle", selectedCycle);

    try {
      const result = await subscribeToPlan(formData);

      if (result.success) {
        router.push("/subscription/success");
      } else {
        setError(result.error || "Failed to process subscription");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if the current plan is active
  const isCurrentPlan = (planId) => {
    return currentSubscription?.planId === planId;
  };

  return (
    <div>
      {/* Billing Cycle Selector */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
          {["MONTHLY", "QUARTERLY", "ANNUALLY"].map((cycle) => (
            <button
              key={cycle}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                selectedCycle === cycle
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCycle(cycle)}
            >
              {cycle.charAt(0) + cycle.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const features = plan.planFeatures.map((pf) => pf.feature);
          const isCurrentUserPlan = isCurrentPlan(plan.id);

          // Calculate price based on billing cycle
          const adjustedPrice = (
            plan.price * cycleMultiplier[selectedCycle]
          ).toFixed(2);

          return (
            <div
              key={plan.id}
              className={`border rounded-lg overflow-hidden shadow-sm ${
                isCurrentUserPlan
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200"
              }`}
            >
              {isCurrentUserPlan && (
                <div className="bg-blue-500 text-white py-1 px-4 text-center text-sm font-medium">
                  Current Plan
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500 mt-1">{plan.description}</p>

                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold">${adjustedPrice}</span>
                  <span className="text-gray-500">
                    /
                    {selectedCycle.toLowerCase() === "monthly"
                      ? "mo"
                      : selectedCycle.toLowerCase() === "quarterly"
                        ? "quarter"
                        : "year"}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {features.map((feature) => (
                    <li key={feature.id} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature.displayName}</span>
                    </li>
                  ))}

                  {/* List all features NOT in this plan */}
                  {plans
                    .filter((p) => p.price > plan.price) // Only check higher-tier plans
                    .flatMap((p) => p.planFeatures.map((pf) => pf.feature))
                    .filter(
                      (feature, index, self) =>
                        // Remove duplicates
                        index === self.findIndex((f) => f.id === feature.id) &&
                        // Only include features not in current plan
                        !features.some((f) => f.id === feature.id)
                    )
                    .map((feature) => (
                      <li
                        key={feature.id}
                        className="flex items-start text-gray-400"
                      >
                        <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                        <span>{feature.displayName}</span>
                      </li>
                    ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isSubmitting || isCurrentUserPlan}
                  className={`w-full py-2 px-4 rounded-md font-medium ${
                    isCurrentUserPlan
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : plan.name === "Premium"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : plan.name === "Standard"
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  {isCurrentUserPlan
                    ? "Current Plan"
                    : isSubmitting
                      ? "Processing..."
                      : plan.price === 0
                        ? "Select Free Plan"
                        : `Subscribe to ${plan.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
