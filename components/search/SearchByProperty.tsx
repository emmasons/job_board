"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Icon } from "@iconify/react";
import useQueryParams from "@/hooks/useQueryParams";

type Props = {
  defaultValue: string;
};

export const SearchByProperty = () => {
  const { query, getParam } = useQueryParams();
  const [value, setValue] = useState(getParam("title"));

  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value) => {
    setValue(value);
    query["title"] = value;
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: query,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  };

  useEffect(() => {
    setValue(getParam("title"));
  }, [getParam]);

  return (
    <div className="relative flex h-full flex-1 items-center justify-center">
      <Icon
        className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-slate-600"
        icon="mdi:magnify"
      />
      <Input
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        className="w-full rounded-full border-0 bg-slate-100 py-6 pl-12 focus-visible:ring-slate-200 md:w-full md:rounded-br-none md:rounded-tr-none"
        placeholder="Job title, key words, or company"
      />
      <Icon
        icon="mdi:close"
        className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer text-slate-600"
        onClick={() => setValue("")}
      />
    </div>
  );
};
