"use client";

import { useState } from "react";
import { cancelSubscription } from "@/actions/subscriptions";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CurrentSubscription({ subscription }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (!subscription) {
    return null;
  }

  const endDate = new Date(subscription.endDate);
  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleCancel = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const result = await cancelSubscription();

      if (result.success) {
        router.refresh();
        setIsConfirming(false);
      } else {
        setError(result.error || "Failed to cancel subscription");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-100 border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Your Current Subscription</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Plan</p>
          <p className="font-medium">{subscription.plan.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-medium">{subscription.status}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Valid Until</p>
          <p className="font-medium">{formattedEndDate}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Included Features</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {subscription.plan.planFeatures.map((pf) => (
            <div
              key={pf.feature.id}
              className="bg-blue-100 text-blue-600 text-sm rounded px-2 py-1"
            >
              {pf.feature.displayName}
            </div>
          ))}
        </div>
      </div>

      {isConfirming ? (
        <div className="mt-6 p-4 border border-red-200 bg-red-50 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800">Confirm Cancellation</h4>
              <p className="text-sm text-red-600 mt-1">
                Are you sure you want to cancel your subscription? You'll lose
                access to premium features at the end of your billing period.
              </p>

              {error && <p className="text-red-700 text-sm mt-2">{error}</p>}

              <div className="mt-4 flex space-x-3">
                <button
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded"
                >
                  {isSubmitting ? "Processing..." : "Yes, Cancel Subscription"}
                </button>
                <button
                  onClick={() => setIsConfirming(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded"
                >
                  Keep Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <button
            onClick={() => setIsConfirming(true)}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Cancel Subscription
          </button>
        </div>
      )}
    </div>
  );
}
