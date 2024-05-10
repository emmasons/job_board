"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCountries } from "use-react-countries";
import { useDebounce } from "@/hooks/useDebounce";
import { Icon } from "@iconify/react";
import { Combobox } from "@/components/ui/combobox";
import useQueryParams from "@/hooks/useQueryParams";

export const SearchByLocation = () => {
  const { countries } = useCountries();
  const locations = countries.map((country) => ({
    value: country.name,
    label: country.name,
  }));
  const { query, getParam } = useQueryParams();
  const [value, setValue] = useState(getParam("location"));
  const handleComboboxChange = (value) => {
    setValue(value);
  };

  const debouncedValue = useDebounce(value);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    query["location"] = debouncedValue;
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: query,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [debouncedValue, router, pathname, query]);

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
        className="mr-6 w-full rounded-full border-0 bg-slate-100 py-6 pl-12 focus-visible:ring-slate-200 md:w-full md:rounded-br-none md:rounded-tr-none"
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
