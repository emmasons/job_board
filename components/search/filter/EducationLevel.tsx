"use client";
import { EducationLevel } from "@prisma/client";
import { CheckboxGroupForm } from "./checkbox-group-form";
import { useState } from "react";
import useQueryParams from "@/hooks/useQueryParams";

type props = {
  levels: EducationLevel[];
};

const FilterByEducationLevel = ({ levels }: props) => {
  const items = levels.map((level) => ({
    label: level.label,
    id: level.id,
  }));

  const { getParam } = useQueryParams();
  const educationLevelFilter = getParam("educationLevelFilter");
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

  // console.log(level, 'in client')

  if (educationLevelFilter) {
    const values = educationLevelFilter.split(",");
    defaultValues.push(...values);
  }

  return (
    <div className="text-left">
      <h3 className="mb-2 font-semibold">Filter by Education Level</h3>
      <CheckboxGroupForm
        items={items.slice(0, filtersLimit)}
        defaultValues={defaultValues}
        searchParamLabel="educationLevelFilter"
      />
      {!showAll ? (
        <p
          className="mt-2 cursor-pointer text-sky-600 underline hover:text-slate-500"
          onClick={handleChangeFiltersLimit}
        >
          Show all
        </p>
      ) : (
        <p
          className="mt-2 cursor-pointer text-sky-600 underline hover:text-slate-500"
          onClick={handleChangeFiltersLimit}
        >
          Collapse
        </p>
      )}
    </div>
  );
};

export default FilterByEducationLevel;
