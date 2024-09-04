"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import useQueryParams from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";

type Props = {
  inExternalComponent?: boolean;
};

export const SearchByProperty = ({ inExternalComponent = false }: Props) => {
  const { query, getParam, removeParam } = useQueryParams();
  const [value, setValue] = useState(getParam("title") || "");

  const router = useRouter();
  let pathname = usePathname();
  if (!pathname.startsWith("/search")) {
    pathname = "/search" + pathname;
  }

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

  const handleRemoveParam = (key) => {
    setValue("");
    const newQuery = { ...query };
    delete newQuery[key];

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: newQuery,
      },
      { skipEmptyString: true, skipNull: true },
    );
    router.push(url);
  };

  return (
    <div className="relative flex h-full flex-1 items-center justify-center">
      <Icon
        className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-slate-600"
        icon="mdi:magnify"
      />
      <Input
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        className={cn(
          "w-full py-6 pl-12 border-none md:w-full",
          !inExternalComponent && "md:rounded-br-none md:rounded-tr-none",
        )}
        placeholder="Job title, key words, or company"
      />
      {/* <Icon
        icon="mdi:close"
        className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer text-slate-600"
        onClick={() => handleRemoveParam("title")}
      /> */}
    </div>
  );
};
