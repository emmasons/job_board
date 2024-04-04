import { JobsWithCompany } from "@/types/db";
import React from "react";
import JobCard from "./JobCard";
import FilterByWorkSchedule from "../search/filter/FilterByWorkSchedule";
import { getWorkSchedules } from "@/actions/get-work-schedules";
import FilterByCountry from "../search/filter/FilterByCountry";
import { getAllSectors } from "@/actions/get-all-sectors";
import FilterBySector from "../search/filter/FilterBySector";

type Props = {
  items: JobsWithCompany[];
};

const JobList = async ({ items }: Props) => {
  const workSchedules = await getWorkSchedules();
  const sectors = await getAllSectors();

  return (
    <div className="my-4 flex w-full grid-cols-2 flex-col justify-between gap-4 md:flex-row">
      <div className="basis-1/3">
        <FilterByCountry />
        <FilterByWorkSchedule workSchedules={workSchedules} />
        <FilterBySector sectors={sectors} />
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
