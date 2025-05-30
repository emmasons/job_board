import { finalizeSubscription } from "@/actions/subscriptions";
import { getCurrentSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

async function SuccessContent({ searchParams }: { searchParams: { token?: string } }) {
  const user = await getCurrentSessionUser();

  if (!user) {
    redirect("/auth/login?callbackUrl=/subscription/success");
  }

  const orderId = searchParams.token;

  if (!orderId) {
    redirect("/subscription");
  }

  const subscription = await finalizeSubscription(orderId, user.id);

  let generatedCvsUrl = "/profile/dashboard/job-seeker/generated-cvs";
  if (user.role === "EMPLOYER") {
    generatedCvsUrl = "/profile/dashboard/employer/generated-cvs";
  } else if (user.role === "ADMIN") {
    generatedCvsUrl = "/profile/dashboard/admin/generated-cvs";
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
          <p className="text-sm text-gray-600">Plan: {subscription.plan.name}</p>
          <p className="text-sm text-gray-600">
            Valid until: {new Date(subscription.endDate).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <Link
            href={generatedCvsUrl}
            className="inline-block px-4 py-2 bg-primary/70 text-white rounded hover:bg-primary/80 transition"
          >
            View Generated CVs
          </Link>

          {user.role === "JOB_SEEKER" && (
            <Link
              href="/search"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Browse Job Listings
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SubscriptionSuccessPage(props: any) {
  return (
    <Suspense fallback={<div className="text-center py-16">Processing your subscription...</div>}>
      <SuccessContent searchParams={props.searchParams} />
    </Suspense>
  );
}
