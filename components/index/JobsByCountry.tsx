"use client";
import Link from "next/link";
import { useCountries } from "use-react-countries";
import { gulfCountries } from "@/lib/utils";

const JobsByCountry = () => {
  const { countries } = useCountries();

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-16 py-8">
      <h1 className="text-2xl font-bold text-center mb-12">
        Find Jobs in Popular Gulf Countries
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {countries.map(({ name, emoji }) =>
          gulfCountries.includes(name) ? (
            <Link
              href={`/search?countriesFilter=${name}`}
              key={name}
              className="flex flex-col justify-center text-center items-center gap-2 h-32 w-32 border rounded-full shadow-md transition-transform duration-300 transform hover:scale-105"
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
