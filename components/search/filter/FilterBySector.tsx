"use client";
import { Sector } from "@prisma/client";
import { CheckboxGroupForm } from "./checkbox-group-form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type props = {
  sectors: Sector[];
};

const FilterBySector = ({ sectors }: props) => {
  const items = sectors.map((sector) => ({
    label: sector.label,
    id: sector.id,
  }));
  const searchParams = useSearchParams();
  const sectorFilter = searchParams.get("sectorFilter");

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

  if (sectorFilter) {
    const values = sectorFilter.split(",");
    defaultValues.push(...values);
  }

  return (
    <div className="text-left">
      <h3 className="mb-2 font-bold">Filter by Sector</h3>
      <CheckboxGroupForm
        items={items.slice(0, filtersLimit)}
        defaultValues={defaultValues}
        searchParamLabel="sectorFilter"
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

export default FilterBySector;
