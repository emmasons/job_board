"use client";

import { useEffect, useState } from "react";
import useQueryParams from "@/hooks/useQueryParams";
import { CheckboxGroupForm } from "./checkbox-group-form";

const FilterByCountry = () => {
  const { getParam } = useQueryParams();
  const countriesFilter = getParam("countriesFilter");

  const [countryList, setCountryList] = useState<{ id: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAll, setShowAll] = useState(false);
  const [filtersLimit, setFiltersLimit] = useState(5);

  const defaultValues: string[] = countriesFilter ? countriesFilter.split(",") : [];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("/api/posted-countries");
        const data: string[] = await res.json();
        const formatted = data.map((country) => ({
          id: country,
          label: country,
        }));
        setCountryList(formatted);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleChangeFiltersLimit = () => {
    setShowAll((prev) => !prev);
    setFiltersLimit(showAll ? 5 : countryList.length);
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading countries...</p>;
  }

  return (
    <div className="text-left">
      <h3 className="mb-2 font-semibold">Filter by country</h3>
      <CheckboxGroupForm
        items={countryList.slice(0, filtersLimit)}
        defaultValues={defaultValues}
        searchParamLabel="countriesFilter"
      />
      {countryList.length > 5 && (
        <p
          className="mt-2 cursor-pointer text-sky-600 underline hover:text-slate-500"
          onClick={handleChangeFiltersLimit}
        >
          {showAll ? "Collapse" : "Show all"}
        </p>
      )}
    </div>
  );
};

export default FilterByCountry;
