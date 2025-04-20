import { JobsWithCompany } from "@/types/db";
import React from "react";
import JobCard from "./JobCard";
import FilterByWorkSchedule from "../search/filter/FilterByWorkSchedule";
import { getWorkSchedules } from "@/actions/get-work-schedules";
import FilterByCountry from "../search/filter/FilterByCountry";
import { getAllSectors } from "@/actions/get-all-sectors";
import FilterBySector from "../search/filter/FilterBySector";
import Link from "next/link";
import { Settings } from "lucide-react";
import { gulfCountries } from "@/lib/utils";

type Props = {
  items: JobsWithCompany[];
  totalItems: number;
  page: number;
  pageSize: string;
  totalPages: number;
};

const URL: string = "https://jobsconnect.net/";

const JobList = async ({
  items,
  totalItems,
  page,
  pageSize,
  totalPages,
}: Props) => {
  const workSchedules = await getWorkSchedules();
  const sectors = await getAllSectors();

  const countryList = gulfCountries.map((country) => ({
    id: country,
    label: country,
  }));

  return (
    <div className="my-4 flex w-full grid-cols-2 flex-col justify-between gap-4 md:flex-row">
      <div className="h-fit basis-1/3 rounded-lg border p-4">
        <div className="flex-wrap gap-3 max-sm:flex">
          <FilterByCountry countryList={countryList} />
          <FilterByWorkSchedule workSchedules={workSchedules} />
          <FilterBySector sectors={sectors} />
        </div>
        <Link
          href="/search/advanced/"
          className="inline-flex w-full items-center gap-4 rounded-md px-4  py-2 text-white max-sm:flex"
        >
          Advanced Search <Settings className="h-4 w-4" />
        </Link>
      </div>
      <div className="basis-2/3">
        <div className="mb-4 flex items-center justify-between border-b py-2">
          <p className="text-xs">
            Showing page {page} -{" "}
            <span className="text-bold">{totalPages}</span> of{" "}
            <span className="text-semibold">{totalItems}</span> jobs
          </p>
          <Link
            href="/search/advanced/"
            className=" text-sm text-blue-700 hover:text-blue-400"
          >
            Advanced Search
          </Link>
        </div>

        {items.map((item) => (
          <div key={item.id} className="mb-4 w-full">
            <JobCard
              id={item.id}
              title={item.title}
              url={`${URL}/jobs/${item.id}`} // Generate the correct URL for each job
              createdAt={item.createdAt}
              companyName={item.companyName}
              sector={item.sector?.label}
              city={item.city}
              country={item.country}
              occupation={item.occupation}
              workSchedule={item.workSchedule}
            />
          </div>
        ))}
        {items.length === 0 ? (
          <div className="flex flex-col items-start bg-slate-50 p-4">
            <h2 className="text-2xl font-semibold text-primary">
              No Jobs Found
            </h2>
            <p className="font-semibold text-zinc-500">
              Try changing your search or removing filters
            </p>
            <Link href="/search" className="text-orange-600 underline">
              Continue search
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-start bg-slate-50 p-4">
            <h2 className="text-xl font-bold">Search Results</h2>
            <p className="text-sm">We have over {totalItems} jobs for you</p>
            <p className="text-sm">
              Showing page {page} of {totalPages}
            </p>
            <p className="text-sm">{items.length} jobs</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
