import { JobsWithCompany } from "@/types/db";
import React from "react";
import JobCard from "./JobCard";

type Props = {
  items: JobsWithCompany[];
};

const JobList = ({ items }: Props) => {
  return (
    <div className="flex w-full grid-cols-2 flex-col justify-between gap-4 md:flex-row my-4">
      <div className="basis-1/3">
        <h1>Filter</h1>
      </div>
      <div className="basis-2/3">
        {items.map((item) => (
          <div key={item.id} className="w-full mb-4">
            <JobCard
              id={item.id}
              title={item.title}
              createdAt={item.createdAt}
              sector={item.jobSector}
              city={item.city}
              country={item.country}
              occupation={"Thieving"}
              workSchedule={item.workSchedule}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
