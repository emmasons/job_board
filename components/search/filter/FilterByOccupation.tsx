"use client";
import { Occupation } from "@prisma/client";
import { CheckboxGroupForm } from "./checkbox-group-form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type props = {
  occupations: Occupation[];
};

const FilterByOccupation = ({ occupations }: props) => {
  const items = occupations.map((occupation) => ({
    label: occupation.title,
    id: occupation.id,
  }));
  const searchParams = useSearchParams();
  const occupationFilter = searchParams.get("occupationFilter");

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

  if (occupationFilter) {
    const values = occupationFilter.split(",");
    defaultValues.push(...values);
  }

  return (
    <div className="text-left">
      <h3 className="mb-2 font-bold">Filter by occupation</h3>

      <CheckboxGroupForm
        items={items.slice(0, filtersLimit)}
        defaultValues={defaultValues}
        searchParamLabel="occupationFilter"
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

export default FilterByOccupation;
