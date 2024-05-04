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

type Props = {
  items: JobsWithCompany[];
};

const JobList = async ({ items }: Props) => {
  const workSchedules = await getWorkSchedules();
  const sectors = await getAllSectors();

  return (
    <div className="my-4 flex w-full grid-cols-2 flex-col justify-between gap-4 md:flex-row">
      <div className="basis-1/3 space-y-4">
        <FilterByCountry />
        <FilterByWorkSchedule workSchedules={workSchedules} />
        <FilterBySector sectors={sectors} />
        <Link
          href="/search/advanced/"
          className="inline-flex w-full items-center gap-4 rounded-md bg-primary px-4 py-2 text-white"
        >
          Advanced Search <Settings className="h-4 w-4" />
        </Link>
      </div>
      <div className="basis-2/3">
        <div className="flex justify-end">
          <Link href="/search/advanced/" className="text-sm underline py-4 hover:text-blue-400 text-blue-700">Advanced Search</Link>
        </div>
        <div className="p-4 flex flex-col bg-slate-50 items-start">
          <h2 className="text-xl font-bold">Search Results</h2>
          <p className="text-sm">We have over {items.length} jobs for you</p>
        </div>
        {items.map((item) => (
          <div key={item.id} className="mb-4 w-full">
            <JobCard
              id={item.id}
              title={item.title}
              createdAt={item.createdAt}
              sector={item.sector?.label}
              city={item.city}
              country={item.country}
              occupation={item.occupation}
              workSchedule={item.workSchedule}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
