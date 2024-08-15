import Link from "next/link";
import { gulfCountries, popularCities } from "@/lib/utils";
import ParamLink from "./ParamLink";

const sampleOccupations = [
  "Accounting",
  "Sales",
  "Construction",
  "Security",
  "Healthcare and Pharmaceuticals",
];

const JobsDropdown: React.FC = () => {
  return (
    <div className="group relative">
      <Link
        href="/search"
        className="font-sm px-4 pb-7 text-sm text-gray-700 hover:border-b-4 hover:border-indigo-600 hover:text-orange-500"
      >
        {/* <JobsIcon className="mr-2 h-5 w-5" /> */}
        JOBS
      </Link>
      <div className="absolute left-0 mt-7 hidden w-auto bg-white px-4 shadow-lg group-hover:flex group-hover:border-t-4 group-hover:border-indigo-400">
        <div className="flex-shrink-1 flex w-full justify-between space-x-8 px-8 py-4">
          {/* By Country */}
          <div className="flex flex-col">
            <h4 className="mb-2 px-4 text-sm font-bold text-gray-700">
              By Country <span className="text-red-500"></span>
            </h4>
            <ul className="flex w-max flex-col items-start">
              {gulfCountries.map((country) => (
                <li key={country}>
                  <ParamLink
                    value={country}
                    searchParamLabel="countriesFilter"
                    displayText={`Jobs in ${country}`}
                  />
                </li>
              ))}
              <li>
                <ParamLink
                  value={`${gulfCountries.map((country) => country).join(",")}`}
                  searchParamLabel="countriesFilter"
                  displayText="All gulf countries"
                />
              </li>
            </ul>
          </div>

          {/* By City */}
          <div>
            <h4 className="mb-2 px-4 text-sm font-bold text-gray-700">
              By City <span className="text-red-500"></span>
            </h4>
            <ul className="flex w-max flex-col items-start">
              {popularCities.map((city) => (
                <li key={city}>
                  <ParamLink
                    value={city}
                    searchParamLabel="title"
                    displayText={`Jobs in ${city}`}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* By Category */}
          <div>
            <h4 className="mb-2 px-4 text-sm font-bold text-gray-700">
              By sector<span className="text-red-500"></span>
            </h4>
            <ul className="flex w-max flex-col items-start">
              {sampleOccupations.map((occupation) => (
                <li key={occupation}>
                  <ParamLink
                    value={occupation}
                    searchParamLabel="occupationFilter"
                    displayText={`Jobs in ${occupation}`}
                  />
                </li>
              ))}

              <li>
                <Link
                  href="/search/advanced"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  View More Categories
                </Link>
              </li>
            </ul>
          </div>


        </div>
      </div>
    </div>
  );
};

export default JobsDropdown;
