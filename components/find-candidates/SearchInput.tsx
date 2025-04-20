"use client";

import qs from "query-string";
import { Search, SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import useQueryParams from "@/hooks/useQueryParams";

export const SearchInput = () => {
  const { query, getParam, removeParam } = useQueryParams();
  const [value, setValue] = useState(getParam("cvTitle") || "");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    setValue(value);
    query["cvTitle"] = debouncedValue;
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: query,
      },
      { skipEmptyString: true, skipNull: true },
    );
    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname, value, query]);

  return (
    <div className="relative flex h-full items-center justify-center">
      <Search className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full rounded-full py-6  pl-12 text-[0.8rem] shadow-md focus-visible:ring-slate-200 md:w-full"
        placeholder="Eg: sales representative or any keyword"
      />
      <SearchX
        className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer text-slate-600"
        onClick={() => setValue("")}
      />
    </div>
  );
};
