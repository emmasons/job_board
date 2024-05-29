import React from "react";
import { SearchByProperty } from "@/components/search/SearchByProperty";
import Link from "next/link";

type Props = {};

const PopularSearches = (props: Props) => {
  const popularSearches = [
    {
      keyword: "Hospitality",
      label: "Hotel jobs in kuwait",
    },
    {
      keyword: "Sales",
      label: "Sales jobs in qatar",
    },
    {
      keyword: "IT",
      label: "IT jobs in kuwait",
    },
    {
      keyword: "Accounting",
      label: "Accounting jobs in Abu Dhabi",
    },
    {
      keyword: "Nursing",
      label: "Nursing jobs in UAE",
    },
    {
      keyword: "Construction",
      label: "Construction jobs in Saudi Arabia",
    },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Popular Searches</h1>
      <div className="space-y-4">
        <SearchByProperty inExternalComponent={true} />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {popularSearches.map(({ keyword, label }) => (
            <Link
              href={`/search?title=${keyword}`}
              key={keyword}
              className="flex items-center justify-center rounded-full border p-2"
            >
              <p className="text-center text-[1rem] text-sky-500">{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularSearches;
