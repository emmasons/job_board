import { getUserSubscription } from "@/actions/subscriptions";
import { redirect } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { getCurrentSessionUser } from "@/lib/auth";

export default async function SubscriptionSuccessPage() {
  const user = await getCurrentSessionUser();

  if (!user) {
    redirect("/auth/login?callbackUrl=/subscription/success");
  }

  const subscription = await getUserSubscription();

  if (!subscription) {
    redirect("/subscription");
  }

  return (
    <div className="container mx-auto max-w-md py-16 px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Subscription Successful!</h1>
        <p className="text-gray-600 mb-6">
          You've successfully subscribed to our {subscription.plan.name} plan.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
          <h2 className="font-medium mb-2">Subscription Details</h2>
          <p className="text-sm text-gray-600">
            Plan: {subscription.plan.name}
          </p>
          <p className="text-sm text-gray-600">
            Valid until: {new Date(subscription.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
