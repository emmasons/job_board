"use client";

import { useState } from "react";
import { subscribeToPlan } from "@/actions/subscriptions";
import { Check, X, ChevronRight } from "lucide-react";
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
    <section className="py-12">
      <div className="">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-700">
            Choose Your Plan
          </h2>
          <p className="text-md my-4 text-slate-600">
            Select the perfect plan for your needs
          </p>
        </div>

        <div className="mb-8 flex justify-center gap-4">
          {["MONTHLY", "QUARTERLY", "ANNUALLY"].map((cycle) => (
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
          {plans.map((plan) => {
            const features = plan.planFeatures.map((pf) => pf.feature);
            const isCurrentUserPlan = isCurrentPlan(plan.id);
            const adjustedPrice = (plan.price * (selectedCycle === "ANNUALLY" ? 10 : selectedCycle === "QUARTERLY" ? 3 : 1)).toFixed(2);

            return (
              <div
                key={plan.id}
                className={`group overflow-hidden rounded-lg bg-white shadow-lg 
                  transition-all duration-300 ease-out
                  ${isCurrentUserPlan ? "scale-105" : ""} 
                  hover:-translate-y-2 hover:scale-[1.02]
                  hover:shadow-2xl
                  ${isCurrentUserPlan ? "ring-2 ring-primary" : ""}`}
              >
                {isCurrentUserPlan && (
                  <div className="bg-primary text-white py-1 px-4 text-center text-sm font-medium">
                    Current Plan
                  </div>
                )}
                <div className="p-6">
                  <h3 className="mb-2 text-md font-bold transition-colors duration-300 group-hover:text-primary">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${adjustedPrice}</span>
                    <span className="text-gray-500">
                      /{selectedCycle.toLowerCase() === "monthly" ? "mo" : 
                         selectedCycle.toLowerCase() === "quarterly" ? "quarter" : "year"}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {features.map((feature) => (
                      <li key={feature.id} className="flex items-center text-gray-600 text-[0.8rem]">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        {feature.displayName}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isSubmitting || isCurrentUserPlan}
                    className={`inline-flex items-center rounded-lg px-4 py-2 w-full justify-center
                      ${isCurrentUserPlan
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
