"use client";
import Link from "next/link";
import { useCountries } from "use-react-countries";
import { gulfCountries } from "@/lib/utils";

const JobsByCountry = () => {
  const { countries } = useCountries();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Find Jobs in popular gulf countries
      </h1>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {countries.map(({ name, emoji }) =>
          gulfCountries.includes(name) ? (
            <Link
              href={`/search?countriesFilter=${name}`}
              key={name}
              className="flex items-center gap-4 rounded-sm border p-6"
            >
              <h2 className="text-3xl">{emoji}</h2>
              <p className="text-sm text-sky-500">{name}</p>
            </Link>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default JobsByCountry;
