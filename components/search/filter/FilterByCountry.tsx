"use client";

import { CheckboxGroupForm } from "./checkbox-group-form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { gulfCountries } from "@/lib/utils";

const FilterByCountry = () => {
  const countryList = gulfCountries.map((country) => ({
    id: country,
    label: country,
  }));

  const searchParams = useSearchParams();
  const countriesFilter = searchParams.get("countriesFilter");

  const defaultValues = [];

  const [showAll, setShowAll] = useState<boolean>(false);
  const [filtersLimit, setFiltersLimit] = useState<number>(5);

  const toggleShowAll = () => setShowAll((current) => !current);

  const handleChangeFiltersLimit = () => {
    toggleShowAll();
    if (filtersLimit !== countryList.length && !showAll) {
      setFiltersLimit(countryList.length);
    } else {
      setFiltersLimit(5);
    }
  };

  if (countriesFilter) {
    const values = countriesFilter.split(",");
    defaultValues.push(...values);
  }

  return (
    <div className="text-left">
      <h3 className="mb-2 font-bold">Filter by country</h3>
      <CheckboxGroupForm
        items={countryList.slice(0, filtersLimit)}
        defaultValues={defaultValues}
        searchParamLabel="countriesFilter"
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

export default FilterByCountry;
