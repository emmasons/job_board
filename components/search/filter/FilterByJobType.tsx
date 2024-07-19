"use client";
import { JOBTYPE, jobType } from "@prisma/client";
import { CheckboxGroupForm } from "./checkbox-group-form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getAllJobTypes } from "@/actions/get-all-job-types";
type Props = {
  jobTypes: JOBTYPE[];
};
const FilterByJobType = ({ jobTypes }: Props) => {
  const searchParams = useSearchParams();
  const jobTypeFilter = searchParams.get("jobTypeFilter");

  const defaultValues = [];

  const [showAll, setShowAll] = useState<boolean>(false);
  const [filtersLimit, setFiltersLimit] = useState<number>(5);

  const toggleShowAll = () => setShowAll((current) => !current);

  const handleChangeFiltersLimit = () => {
    toggleShowAll();
    if (filtersLimit !== jobTypes.length && !showAll) {
      setFiltersLimit(jobTypes.length);
    } else {
      setFiltersLimit(5);
    }
  };

  if (jobTypeFilter) {
    const values = jobTypeFilter.split(",");
    defaultValues.push(...values);
  }

  return (
    <div className="text-left">
      <h3 className="mb-2 font-bold">Filter by jobType</h3>
      <CheckboxGroupForm
        items={jobTypes.slice(0, filtersLimit)}
        defaultValues={defaultValues}
        searchParamLabel="jobTypeFilter"
      />
      {!showAll ? (
        <p
          className="cursor-pointer text-sky-600 underline hover:text-slate-500"
          onClick={handleChangeFiltersLimit}
        >
          Show all
        </p>
      ) : (
        <p
          className="cursor-pointer text-sky-600 underline hover:text-slate-500"
          onClick={handleChangeFiltersLimit}
        >
          Collapse
        </p>
      )}
    </div>
  );
};

export default FilterByJobType;
