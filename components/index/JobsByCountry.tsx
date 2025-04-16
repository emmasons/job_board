"use client";
import Link from "next/link";
import { useCountries } from "use-react-countries";
import { gulfCountries } from "@/lib/utils";

const JobsByCountry = () => {
  const { countries } = useCountries();

  return (
    <div className="space-y-6 px-4 py-4 md:px-8 lg:px-16">
      <h1 className="mb-4 text-3xl text-center font-semibold text-gray-900">
        Find Jobs in Popular Countries
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {countries.map(({ name, emoji }) =>
          gulfCountries.includes(name) ? (
            <Link
              href={`/search?countriesFilter=${name}`}
              key={name}
              className="flex h-32 w-32 transform flex-col items-center justify-center gap-2 rounded-full border text-center shadow-md transition-transform duration-300 hover:scale-105"
            >
              <p className="text-sm text-gray-700">{name}</p>
              <span className="text-4xl">{emoji}</span>
            </Link>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default JobsByCountry;
