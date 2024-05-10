"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCountries } from "use-react-countries";
import { useDebounce } from "@/hooks/useDebounce";
import { Icon } from "@iconify/react";
import { Combobox } from "@/components/ui/combobox";

type Props = {
  query: {};
};

export const SearchByLocation = ({ query }: Props) => {
  const { countries } = useCountries();
  const locations = countries.map((country) => ({
    value: country.name,
    label: country.name,
  }));
  const [value, setValue] = useState("");
  const handleComboboxChange = (value) => {
    setValue(value);
  };

  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const searchParamsObject = Object.entries(query).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    searchParamsObject["location"] = debouncedValue;
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: searchParamsObject,
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
