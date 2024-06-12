import Link from "next/link";
import { Briefcase as JobsIcon } from "lucide-react";

const JobsDropdown: React.FC = () => {
    return (
        <div className="group relative">
            <Link href="/search" className="font-medium flex items-center mt-4 px-4 text-gray-700 hover:text-orange-500 text-sm">
                {/* <JobsIcon className="mr-2 h-5 w-5" /> */}
                JOBS
            </Link>
            <div className="absolute left-0 mt-2 hidden bg-white shadow-lg group-hover:flex w-auto p-6">
                <div className="flex justify-between w-full flex-shrink-1 px-8 py-4 space-x-8">
                    {/* By Country */}
                    <div className="flex flex-col">
                        <h4 className="font-bold text-sm px-4 text-gray-700 mb-2">By Country <span className="text-red-500">&gt;&gt;</span></h4>
                        <ul className="flex flex-col w-max items-start">
                            <li>
                                <Link href="/search?country=UAE" className="block text-nowrap text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs in UAE
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?country=SA" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs in Saudi Arabia
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?country=QA" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs in Qatar
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?country=OM" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs in Oman
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?country=KU" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs in Kuwait
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?country=BH" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs in Bahrain
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?viewMore=countries" className="block text-sm px-4  py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                  All Countries
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* By City */}
                    <div>
                        <h4 className="font-bold text-sm px-4 text-gray-700 mb-2">By City <span className="text-red-500">&gt;&gt;</span></h4>
                        <ul className="flex flex-col w-max items-start">
                            <li>
                                <Link href="/search?city=Dubai" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs in Dubai
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?city=Abu Dhabi" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs in Abu Dhabi
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?city=Riyadh" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs in Riyadh
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?city=Doha" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs in Doha
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?city=Muscat" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Jobs in Muscat
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?viewMore=cities" className="block text-sm px-4  py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    View More cities
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* By Category */}
                    <div>
                        <h4 className="font-bold text-sm px-4 text-gray-700 mb-2">By Category <span className="text-red-500"> &gt;&gt;</span></h4>
                        <ul className="flex flex-col w-max items-start">
                            <li>
                                <Link href="/search?category=Civil Engineering" className="block text-sm px-4  py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Civil Engineering Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?category=Sales" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Sales Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?category=Admin" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Admin Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?category=HR" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    HR Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?category=Finance" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    Finance Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/search?viewMore=categories" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                    View More Categories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* More Jobs */}
                    <div>
                        <h4 className="font-bold text-sm px-4 text-gray-700 mb-2">More Jobs <span className="text-red-500">&gt;&gt;</span></h4>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsDropdown;
