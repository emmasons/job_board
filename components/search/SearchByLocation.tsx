"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { Combobox } from "@/components/ui/combobox";
import useQueryParams from "@/hooks/useQueryParams";
import { gulfCountries } from "@/lib/utils";

export const SearchByLocation = () => {
  const locations = gulfCountries.map((country) => ({
    value: country,
    label: country,
  }));
  const { query, getParam } = useQueryParams();
  const defaultLocation = getParam("location");

  const [value, setValue] = useState(defaultLocation || "");

  const router = useRouter();
  const pathname = usePathname();
  const handleComboboxChange = (value) => {
    setValue(value);
    query["location"] = value;
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
    setValue(getParam("location") || "");
  }, [getParam, query]);

  return (
    <div className="relative flex h-full flex-1 items-center justify-center">
      <Icon
        className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-slate-600"
        icon="mdi:location"
      />

      <Combobox
        options={locations}
        onChange={handleComboboxChange}
        value={value}
        className="mr-6 w-full border-0 py-6 pl-12 hover:bg-white focus-visible:ring-slate-200 md:w-full md:rounded-br-none md:rounded-tr-none"
        defaultText="All countries"
      />

      {/* <Icon
        icon="mdi:close"
        className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer text-slate-600"
        onClick={() => setValue("")}
      /> */}
    </div>
  );
};
