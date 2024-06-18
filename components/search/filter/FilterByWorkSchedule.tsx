"use client";
import { WorkSchedule } from "@prisma/client";
import { CheckboxGroupForm } from "./checkbox-group-form";
import { useState } from "react";
import useQueryParams from "@/hooks/useQueryParams";

type props = {
  workSchedules: WorkSchedule[];
};

const FilterByWorkSchedule = ({ workSchedules }: props) => {
  const items = workSchedules.map((schedule) => ({
    label: schedule.label,
    id: schedule.value,
  }));

  const { getParam } = useQueryParams();
  const workSchedule = getParam("workSchedule");

  const defaultValues = [];

  const [showAll, setShowAll] = useState<boolean>(false);
  const [filtersLimit, setFiltersLimit] = useState<number>(5);

  const toggleShowAll = () => setShowAll((current) => !current);

  const handleChangeFiltersLimit = () => {
    toggleShowAll();
    if (filtersLimit !== items.length && !showAll) {
      setFiltersLimit(items.length);
    } else {
      setFiltersLimit(5);
    }
  };

  // console.log(workSchedule, 'in client')

  if (workSchedule) {
    const values = workSchedule.split(",");
    defaultValues.push(...values);
  }

  return (
    <div className="text-left">
      <h3 className="mb-2 font-bold">Filter by work schedule</h3>
      <CheckboxGroupForm
        items={items.slice(0, filtersLimit)}
        defaultValues={defaultValues}
        searchParamLabel="workSchedule"
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

export default FilterByWorkSchedule;
