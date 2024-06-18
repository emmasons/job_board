"use client";
import Link from "next/link";
import { useCountries } from "use-react-countries";
import { gulfCountries } from "@/lib/utils";

const JobsByCountry = () => {
  const { countries } = useCountries();

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-16 py-8">
      <h1 className="text-2xl font-bold text-center mb-4">
        Find Jobs in Popular Gulf Countries
      </h1>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 justify-items-center">
        {countries.map(({ name, emoji }) =>
          gulfCountries.includes(name) ? (
            <Link
              href={`/search?countriesFilter=${name}`}
              key={name}
              className="flex flex-col items-center gap-2 p-4 transition-transform duration-300 transform hover:scale-105"
            >
              <span className="text-4xl">{emoji}</span>
              <p className="text-sm text-gray-700">{name}</p>
            </Link>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default JobsByCountry;
