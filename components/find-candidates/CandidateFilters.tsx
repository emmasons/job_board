import React from "react";
import FilterByCountry from "@/components/search/filter/FilterByCountry";
import FilterBySector from "@/components/search/filter/FilterBySector";
import FilterByExperience from "@/components/search/filter/Experience";
import { getAllSectors } from "@/actions/get-all-sectors";
import { getExperience } from "@/actions/get-experience";
import { getEducationLevels } from "@/actions/get-education-levels";
import FilterByEducationLevel from "@/components/search/filter/EducationLevel";
const countries = require("country-list");
const CandidateFilters = async () => {
  const countryList = countries.getNames().map((country) => ({
    id: country,
    label: country,
  }));
  const sectors = await getAllSectors();
  const experienceLevels = await getExperience();
  const levels = await getEducationLevels();

  return (
    <div>
      <FilterByCountry countryList={countryList} />
      <FilterBySector sectors={sectors} />
      <FilterByExperience experienceLevels={experienceLevels} />
      <FilterByEducationLevel levels={levels} />
    </div>
  );
};

export default CandidateFilters;
