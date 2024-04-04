import { JobsWithCompany } from "@/types/db";
import React from "react";
import JobCard from "./JobCard";
import SearchByWorkSchedule from "../search/advanced/SearchByWorkSchedule";
import { getWorkSchedules } from "@/actions/get-work-schedules";
import FilterByCountry from "../search/advanced/FilterByCountry";

type Props = {
  items: JobsWithCompany[];
};

const JobList = async ({ items }: Props) => {
  const workSchedules = await getWorkSchedules();

  return (
    <div className="my-4 flex w-full grid-cols-2 flex-col justify-between gap-4 md:flex-row">
      <div className="basis-1/3">
        <FilterByCountry />
        <SearchByWorkSchedule workSchedules={workSchedules} />
      </div>
      <div className="basis-2/3">
        {items.map((item) => (
          <div key={item.id} className="mb-4 w-full">
            <JobCard
              id={item.id}
              title={item.title}
              createdAt={item.createdAt}
              sector={item.sector.label}
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
