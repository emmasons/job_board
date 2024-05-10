"use client";
import { SearchByProperty } from "./SearchByProperty";
import { SearchByLocation } from "./SearchByLocation";
import { Button } from "../ui/button";
import useQueryParams from "@/hooks/useQueryParams";

type Props = {};

const Search = (props: Props) => {
  const { query } = useQueryParams();
  return (
    <div className="w-full items-center gap-2 rounded-lg border bg-slate-100 p-2 md:flex">
      <div className="flex-1 items-center rounded-md border border-slate-200 p-4 shadow-md md:flex md:gap-2 md:border-none md:p-0 md:shadow-none">
        <SearchByProperty query={query} />
        <div className="my-4 border-b-2 border-gray-300 md:h-8 md:border-l-2 "></div>
        <SearchByLocation query={query} />
        <div className="my-4 border-b-2 border-gray-300 md:h-8 md:border-l-2 "></div>
      </div>

      <Button className="my-4 w-full p-4 text-lg font-bold md:my-0 md:w-auto">
        Search
      </Button>
    </div>
  );
};

export default Search;
