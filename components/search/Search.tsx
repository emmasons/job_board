import React from "react";
import { SearchByProperty } from "./SearchByProperty";
import { FilterByLocation } from "./FilterByLocation";
import { Button } from "../ui/button";

type Props = {};

const Search = (props: Props) => {
  return (
    <div className="w-full items-center gap-2 rounded-lg border bg-slate-100 p-2 md:flex">
      <div className="md:flex md:gap-2 md:p-0 md:border-none md:shadow-none flex-1 items-center border border-slate-200 p-4 rounded-md shadow-md">
        <SearchByProperty />
        <div className="my-4 border-b-2 border-gray-300 md:h-8 md:border-l-2 "></div>
        <FilterByLocation />
      </div>

      <Button className="my-4 md:my-0 w-full text-lg font-bold p-4 md:w-auto">Search</Button>
    </div>
  );
};

export default Search;
