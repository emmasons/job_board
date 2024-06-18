"use client";
import { Occupation, SubOccupation } from "@prisma/client";
import { CheckboxGroupForm } from "./checkbox-group-form";
import { useState } from "react";
import "./detail.css";

type OccupationFilter = Occupation & { subOccupations: SubOccupation[] };

type props = {
  occupations: OccupationFilter[];
};

const FilterByOccupation = ({ occupations }: props) => {
  const items = occupations.map((occupation) => ({
    label: occupation.title,
    id: occupation.id,
  }));

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

  return (
    <div className="text-left">
      <h3 className="mb-2 font-bold">Filter by occupation</h3>
      {occupations.map((occupation) => (
        <details key={occupation.id}>
          <summary className="cursor-pointer">{occupation.title}</summary>
          <div className="px-3">
            <CheckboxGroupForm
              key={`${occupation.id}-${occupation.title}`}
              items={occupation.subOccupations.map((subOccupation) => ({
                label: subOccupation.title,
                id: subOccupation.id,
              }))}
              defaultValues={defaultValues}
              searchParamLabel="occupationFilter"
            />
          </div>
        </details>
      ))}

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
