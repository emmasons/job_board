import React from "react";
import { SearchByProperty } from "@/components/search/SearchByProperty";
import Link from "next/link";

type Props = {};

const PopularSearches = (props: Props) => {
  const popularSearches = [
    {
      keyword: "Hospitality",
      label: "Hospitality jobs",
    },
    {
      keyword: "Sales",
      label: "Sales jobs in Europe",
    },
    {
      keyword: "IT",
      label: "IT jobs in Canada",
    },
    {
      keyword: "Accounting",
      label: "Accounting jobs in the UK",
    },
    {
      keyword: "Nursing",
      label: "Nursing jobs in Australia",
    },
    {
      keyword: "Construction",
      label: "Construction jobs in Germany",
    },
  ];
  return (
    <div className="space-y-6">
      <h1 className="mb-4 text-3xl font-semibold text-gray-900">
        Popular Searches
      </h1>
      <div className="space-y-4">
        <SearchByProperty inExternalComponent={true} />
        <div className="flex flex-wrap">
          {popularSearches.map(({ keyword, label }) => (
            <Link
              href={`/search?title=${keyword}`}
              key={keyword}
              className="flex flex-wrap items-center justify-center px-4 py-2"
            >
              <p className="w-max break-keep text-center  text-sky-500">
                {label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularSearches;
