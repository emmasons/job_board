// components/FeatureGuard.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FeatureGuardProps {
  featureName: string;
  userId: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function FeatureGuard({
  featureName,
  userId,
  fallback,
  children,
}: FeatureGuardProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // This would need to be an API route instead of direct function call
        const access = await fetch(
          `/api/subscription/check-access?feature=${featureName}`,
        );
        const { hasAccess } = await access.json();
        setHasAccess(hasAccess);
      } catch (error) {
        console.error("Failed to check feature access:", error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [featureName, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasAccess) {
    return (
      fallback || (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
          <h3 className="font-medium text-amber-800">Subscription Required</h3>
          <p className="mt-1 text-amber-700">
            This feature requires a higher subscription plan.
          </p>
          <button
            className="mt-3 rounded-md bg-amber-600 px-4 py-2 text-white"
            onClick={() => router.push("/subscription/plans")}
          >
            Upgrade Plan
          </button>
        </div>
      )
    );
  }

  return <>{children}</>;
}
