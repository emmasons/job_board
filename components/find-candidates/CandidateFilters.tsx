import React from "react";
import FilterByCountry from "@/components/search/filter/FilterByCountry";
const countries = require("country-list");
const CandidateFilters = () => {
  const countryList = countries.getNames().map((country) => ({
    id: country,
    label: country,
  }));

  return (
    <div>
      <FilterByCountry countryList={countryList} />
    </div>
  );
};

export default CandidateFilters;
