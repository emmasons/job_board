"use client";
import Link from "next/link";
import { useCountries } from "use-react-countries";
import {
  getCountryByAlpha2Code,
  getContinentByCountryCode,
} from "use-react-countries";

type Props = {};

const JobsByCountry = (props: Props) => {
  const { countries } = useCountries();
  const gulfCountries = [
    "UAE",
    "Oman",
    "Qatar",
    "Bahrain",
    "Kuwait",
    "Qatar",
    "Saudi Arabia",
  ];
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
              <p className="text-lg text-sky-500">{name}</p>
            </Link>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default JobsByCountry;
