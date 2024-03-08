"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Icon } from "@iconify/react";

export const SearchByProperty = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const location = searchParams.get("location");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          location: location,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [debouncedValue, location, router, pathname]);

  return (
    <div className="relative flex h-full items-center justify-center flex-1">
      <Icon
        className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-slate-600"
        icon="mdi:magnify"
      />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full rounded-full md:rounded-tr-none md:rounded-br-none border-0 bg-slate-100 py-6 pl-12 focus-visible:ring-slate-200 md:w-full"
        placeholder="Job title, key words, or company"
      />
      <Icon
        icon="mdi:close"
        className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-slate-600 cursor-pointer"
        onClick={() => setValue("")}
      />
    </div>
  );
};
