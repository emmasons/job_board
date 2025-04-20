"use client";
import { SearchByProperty } from "./SearchByProperty";
import { SearchByLocation } from "./SearchByLocation";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";

type Props = {};

const Search = (props: Props) => {
  return (
    <div className="w-full items-center gap-2 rounded-lg bg-white shadow-md md:m-auto md:flex  md:w-3/4">
      <div className="flex-1 items-center rounded-md  p-4  md:flex md:gap-2 md:border-none md:p-0 md:shadow-none">
        <div className="my-4 md:h-8 md:border-r-2 ">
          <SearchByLocation />
        </div>
        <SearchByProperty />
      </div>
      <div className="flex items-start justify-start p-4">
        <Button className="m-2 p-4 text-sm md:my-0">Search</Button>
      </div>
    </div>
  );
};

export default Search;
