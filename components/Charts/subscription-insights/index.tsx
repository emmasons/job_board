import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";
import { getSubscriptionStats } from "@/services/charts.services";
import { DonutChart } from "./chart";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export async function SubscriptionInsights({
  timeFrame = "All Time",
  className,
}: PropsType) {
  const data = await getSubscriptionStats(timeFrame);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Subscription Insights
        </h2>

        <PeriodPicker
          items={["All Time", "This Month"]}
          defaultValue={timeFrame}
          sectionKey="subscription_insights"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        <div>
          <h3 className="text-center mb-4 text-base font-semibold text-dark dark:text-white">Plans Distribution</h3>
          <DonutChart data={data.plans} />
        </div>

        <div>
          <h3 className="text-center mb-4 text-base font-semibold text-dark dark:text-white">Statuses</h3>
          <DonutChart data={data.statuses} />
        </div>
      </div>
    </div>
  );
}
