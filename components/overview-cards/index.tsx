import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const { revenuethismonth, cv, activesubscribers, users } = await getOverviewData();

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
      <OverviewCard
        label="Earnings this Month"
        data={{
          ...revenuethismonth,
          value: "$" + compactFormat(revenuethismonth.value),
        }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="Total CVs"
        data={{
          ...cv,
          value: compactFormat(cv.value),
        }}
        Icon={icons.CVIcon}
      />

      <OverviewCard
        label="Active Subscribers"
        data={{
          ...activesubscribers,
          value: compactFormat(activesubscribers.value),
        }}
        Icon={icons.SubscribersIcon}
      />

      <OverviewCard
        label="Total Users"
        data={{
          ...users,
          value: compactFormat(users.value),
        }}
        Icon={icons.Users}
      />
    </div>
  );
}
