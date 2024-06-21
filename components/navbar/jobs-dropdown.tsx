import Link from "next/link";
import { gulfCountries } from "@/lib/utils";

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
                  <Link
                    href={`/search?countriesFilter=${country}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                  >
                    Jobs in {country}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/search?countriesFilter=${gulfCountries.map((country) => country).join(",")}`}
                  className="block px-4 py-2  text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  All Countries
                </Link>
              </li>
            </ul>
          </div>

          {/* By City */}
          <div>
            <h4 className="mb-2 px-4 text-sm font-bold text-gray-700">
              By City <span className="text-red-500"></span>
            </h4>
            <ul className="flex w-max flex-col items-start">
              <li>
                <Link
                  href="/search?city=Dubai"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Jobs in Dubai
                </Link>
              </li>
              <li>
                <Link
                  href="/search?city=Abu Dhabi"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Jobs in Abu Dhabi
                </Link>
              </li>
              <li>
                <Link
                  href="/search?city=Riyadh"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Jobs in Riyadh
                </Link>
              </li>
              <li>
                <Link
                  href="/search?city=Doha"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Jobs in Doha
                </Link>
              </li>
              <li>
                <Link
                  href="/search?city=Muscat"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Jobs in Muscat
                </Link>
              </li>
              <li>
                <Link
                  href="/search?viewMore=cities"
                  className="block px-4 py-2  text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  View More cities
                </Link>
              </li>
            </ul>
          </div>

          {/* By Category */}
          <div>
            <h4 className="mb-2 px-4 text-sm font-bold text-gray-700">
              By sector<span className="text-red-500"></span>
            </h4>
            <ul className="flex w-max flex-col items-start">
              <li>
                <Link
                  href="/search?category=Civil Engineering"
                  className="block px-4 py-2  text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Accountancy jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=Sales"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Sales Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=Admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Construction & Property
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=HR"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=Finance"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Healthcare & Pharma
                </Link>
              </li>
              <li>
                <Link
                  href="/search?viewMore=categories"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  View More Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* More Jobs */}
          {/* <div>
                        <h4 className="font-bold text-sm px-4 text-gray-700 mb-2">More Jobs <span className="text-red-500"></span></h4>
                        <ul className="flex flex-col w-max items-start">
                            <li>
                                <Link href="/search?filter=industry" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs by Industry
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?filter=executives" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs for Executives
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?filter=freshGraduates" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs for Fresh Graduates
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?filter=gulfNationals" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs for Gulf Nationals
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?filter=topEmployers" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Top Employers
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?filter=topRecruiters" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Top Recruiters
                                </Link>
                            </li>
                            <li>
                                <Link href="/search" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Search Jobs
                                </Link>
                            </li>
                        </ul>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default JobsDropdown;
