import { UnsubscribeForm } from "@/components/forms/subscription/UnsubscribeForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { db } from "@/lib/db";
import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Unsubscribe",
};
type Props = {
  searchParams: Record<"email", string>;
};

const page = async (props: Props) => {
  if (!props.searchParams.email) {
    return (
      <MaxWidthWrapper className="flex h-full items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-secondary">Oops, something went wrong!</h1>
          <p className="text-lg font-semibold text-secondary/80">Please try again later.</p>
        </div>
      </MaxWidthWrapper>
    );
  }
  const subscriptions = await db.subscription.findMany({
    where: {
      email: props.searchParams.email,
    },
  });
  return (
    <MaxWidthWrapper className="flex h-full items-center justify-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
      <div>
        <UnsubscribeForm
          subscriptions={subscriptions}
          email={props.searchParams.email}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
