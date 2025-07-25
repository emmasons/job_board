"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { Combobox } from "@/components/ui/combobox";
import useQueryParams from "@/hooks/useQueryParams";

export const SearchByLocation = () => {
  const [locations, setLocations] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const { query, getParam } = useQueryParams();
  const defaultLocation = getParam("location");
  const [value, setValue] = useState(defaultLocation || "");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("/api/posted-countries");
        const data: string[] = await res.json();
        const formatted = data.map((country) => ({
          value: country,
          label: country,
        }));
        setLocations(formatted);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleComboboxChange = (val: string) => {
    setValue(val);
    query["location"] = val;
    const url = qs.stringifyUrl({ url: pathname, query }, { skipEmptyString: true, skipNull: true });
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
    </div>
  );
};
