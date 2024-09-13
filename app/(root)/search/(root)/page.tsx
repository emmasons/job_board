import { getAllJobs } from "@/actions/get-all-jobs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { JobAlertSwitch } from "@/components/job/AlertSwitch";
import JobList from "@/components/job/JobList";
import { JobListSkeleton } from "@/components/job/JobListSkeleton";
import PaginationControls from "@/components/search/PaginationControls";
import RemoveSearchParam from "@/components/search/RemoveSearchParam";
import Search from "@/components/search/Search";
import { JobsWithCompany } from "@/types/db";
import { Suspense } from "react";
import { getUserAlerts } from "@/actions/get-user-alerts";
import { createAlert, deleteAlert } from "../../jobs/actions";
import { getCurrentSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { WorkSchedule } from "@prisma/client";
interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const itemsList = (await getAllJobs({
    ...searchParams,
  })) as JobsWithCompany[];
  const page = searchParams?.page ? searchParams?.page : "1";
  const pageSize = searchParams?.pageSize ? searchParams?.pageSize : "10";
  const start = (Number(page) - 1) * Number(pageSize); // 0, 5, 10 ...
  const end = start + Number(pageSize); // 5, 10, 15 ...
  const items = itemsList.slice(start, end);
  const totalPages = Math.ceil(itemsList.length / Number(pageSize));

  const user = await getCurrentSessionUser();

  console.log(searchParams);
  const args = {
    country: searchParams.countriesFilter as string,
    educationLevelId: searchParams.educationLevelFilter as string,
    sectorId: searchParams.sectorFilter as string,
    workSchedule: searchParams.workSchedule,
    occupation: searchParams.title as string,
  };
  let alert = false;
  const sectorIdList =
    typeof args.sectorId === "string"
      ? args.sectorId.split(",").map((id) => id)
      : args.sectorId;

  const educationLevelIdList =
    typeof args.educationLevelId === "string"
      ? args.educationLevelId.split(",").map((id) => id)
      : args.educationLevelId;
  const workScheduleList =
    typeof args.workSchedule === "string"
      ? args.workSchedule
          .split(",")
          .map((id) => WorkSchedule[id as keyof typeof WorkSchedule])
      : (args.workSchedule as WorkSchedule[]);
  if (user) {
    const alerts = await getUserAlerts(user?.id);
    const previousAlert = await db.jobAlert.findFirst({
      where: {
        ...({
          country: args.country as string,

          educationLevelIds: {
            hasSome: educationLevelIdList ? educationLevelIdList : [],
          },
          sectorIds: {
            hasSome: sectorIdList ? sectorIdList : [],
          },
          workSchedules: {
            hasSome: workScheduleList ? workScheduleList : [],
          },
          occupation: args.occupation as string,
          userId: user.id,
        } as const),
      },
    });
    alert = previousAlert ? true : false;
  }

  return (
    <main className="">
      <MaxWidthWrapper className="mb-12 mt-2 flex h-full flex-col items-center justify-center  text-center sm:mt-4">
        <div className="w-full space-y-8 rounded-lg bg-slate-50 p-6 pb-12">
          <div className="mb-4">
            <h1 className="py-4 text-2xl font-semibold">
              <span className="text-blue-600">{itemsList.length} Jobs</span>{" "}
              Available Now
            </h1>

            <p className="w-max-1/4 text-xs">
              Unlock your future with top-tier job opportunities in the Gulf.
            </p>
          </div>

          <Search />
        </div>

        {searchParams && Object.keys(searchParams).length > 0 && (
          <div className="mt-6 w-full rounded-md bg-slate-50 p-4">
            <h2 className="text-left text-xl font-semibold text-primary">
              Remove filter
            </h2>
            <RemoveSearchParam />
          </div>
        )}
        {searchParams && Object.keys(searchParams).length > 0 && (
          <div className="my-4 flex w-full items-center justify-between bg-sky-100 p-2">
            <p className="text-[1rem] font-semibold text-zinc-600">
              {alert
                ? "You have set alerts for similar job"
                : "Create a job alert for similar jobs"}
            </p>
            <JobAlertSwitch
              createAlert={createAlert}
              args={args}
              userId={user?.id}
              deleteAlert={deleteAlert}
              alert={alert}
            />
          </div>
        )}

        <Suspense fallback={<JobListSkeleton />}>
          <JobList
            items={items}
            totalItems={itemsList.length}
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
          />
        </Suspense>

        <PaginationControls
          hasNextPage={end < itemsList.length}
          hasPrevPage={start > 0}
          totalPages={totalPages}
        />
      </MaxWidthWrapper>
    </main>
  );
}
