"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Icon } from "@iconify/react";
import { Combobox } from "@/components/ui/combobox";

export const FilterByLocation = () => {
  const locations = [
    { value: "1", label: "Location 1" },
    { value: "2", label: "Location 2" },
    { value: "3", label: "Location 3" },
    { value: "4", label: "Location 4" },
    { value: "5", label: "Location 5" },
  ];
  const [value, setValue] = useState("");
  const handleComboboxChange = (value) => {
    setValue(value);
  };
  console.log(value, "wiii");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocationId = searchParams.get("locationId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          locationId: currentLocationId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [debouncedValue, currentLocationId, router, pathname]);

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
        className="w-full mr-6 rounded-full border-0 bg-slate-100 py-6 pl-12 focus-visible:ring-slate-200 md:w-full md:rounded-br-none md:rounded-tr-none"
        defaultText="All countries"
      />

      <Icon
        icon="mdi:close"
        className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer text-slate-600"
        onClick={() => setValue("")}
      />
    </div>
  );
};
