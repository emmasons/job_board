import { cn } from "@/lib/utils";
import { getMonthlyProfitData } from "@/services/charts.services";
import { WeeksProfitChart } from "./chart";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export async function WeeksProfit({ className }: PropsType) {
  const data = await getMonthlyProfitData();

  return (
    <div
      className={cn(
        "rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          CVs & Covers Created (Monthly)
        </h2>
      </div>

      <WeeksProfitChart data={data} />
    </div>
  );
}