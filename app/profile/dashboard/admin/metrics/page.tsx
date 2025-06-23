import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { SubscriptionInsights } from "@/components/Charts/subscription-insights";
import { WeeksProfit } from "@/components/Charts/weeks-profit";
import { TransactionsTable } from "@/components/Tables/transaction-table";
import { TopChannelsSkeleton } from "@/components/Tables/transaction-table/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { SubscriptionsTable } from "@/components/Tables/subscription-table";
import { TopProductsSkeleton } from "@/components/Tables/subscription-table/skeleton";
import { OverviewCardsGroup } from "@/components/overview-cards";
import { OverviewCardsSkeleton } from "@/components/overview-cards/skeleton";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      {/* Container with soft background and padding */}
      <div className="bg-gray-2 dark:bg-[#020d1a] p-10">

        <Suspense fallback={<OverviewCardsSkeleton />}>
            <OverviewCardsGroup />
        </Suspense>
        
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
          <PaymentsOverview
            className="col-span-12 xl:col-span-7"
            key={extractTimeFrame("payments_overview")}
            timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
          />

          <WeeksProfit
            key={extractTimeFrame("weeks_profit")}
            timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
            className="col-span-12 xl:col-span-5"
          />

          <SubscriptionInsights
            className="col-span-12 xl:col-span-7"
            key={extractTimeFrame("subscription_insights")}
            timeFrame={extractTimeFrame("subscription_insights")?.split(":")[1]}
          />

          <div className="col-span-12 grid xl:col-span-5">
            <Suspense fallback={<TopChannelsSkeleton />}>
              <TransactionsTable />
            </Suspense>
          </div>
          <div className="col-span-12 grid xl:col-span-12">
            <Suspense fallback={<TopProductsSkeleton />}>
             <SubscriptionsTable />
            </Suspense>
          </div>
          </div>
        </div>
    </>
  );
}

