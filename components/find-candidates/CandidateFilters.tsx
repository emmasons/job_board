import React from "react";
import FilterByCountry from "@/components/search/filter/FilterByCountry";
import FilterBySector from "@/components/search/filter/FilterBySector";
import FilterByExperience from "@/components/search/filter/Experience";
import { getAllSectors } from "@/actions/get-all-sectors";
import { getExperience } from "@/actions/get-experience";
import { getEducationLevels } from "@/actions/get-education-levels";
import FilterByEducationLevel from "@/components/search/filter/EducationLevel";
import KeywordSearch from "./KeyWordSearch";
import { cn } from "@/lib/utils";
const countries = require("country-list");

type Props = {
  className?: string;
  showFilterByCountry?: boolean;
  formClasses?: string;
};
const CandidateFilters = async ({
  className,
  showFilterByCountry = true,
  formClasses,
}: Props) => {
  const countryList = countries.getNames().map((country) => ({
    id: country,
    label: country,
  }));
  const sectors = await getAllSectors();
  const experienceLevels = await getExperience();
  const levels = await getEducationLevels();

  return (
    <div
      className={cn(
        "space-y-4 rounded-md border bg-slate-100/20 p-4 text-sm",
        className,
      )}
    >
      <div className={cn("space-y-2 ", formClasses)}>
        <KeywordSearch />
      </div>
      {showFilterByCountry && <FilterByCountry countryList={countryList} />}
      <FilterBySector sectors={sectors} />
      <FilterByExperience experienceLevels={experienceLevels} />
      <FilterByEducationLevel levels={levels} />
    </div>
  );
};

export default CandidateFilters;
