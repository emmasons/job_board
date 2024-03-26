"use client";
import { useCountries } from "use-react-countries";
import { CheckboxGroupForm } from "./checkbox-group-form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
];

const FilterByCountry = () => {
  const { countries } = useCountries();
  const countryList = countries.map((country) => ({
    label: country.name,
    id: country.name,
  }));

  const searchParams = useSearchParams();
  const country = searchParams.get("country");

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

  if (country) {
    const values = country.split(",");
    defaultValues.push(...values);
  }

  return (
    <div className="text-left">
      <h3 className="mb-2 font-bold">Filter by country</h3>
      <CheckboxGroupForm
        items={countryList.slice(0, filtersLimit)}
        defaultValues={defaultValues}
        searchParamLabel="country"
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
