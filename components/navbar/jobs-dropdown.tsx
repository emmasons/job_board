import Link from "next/link";
import { Briefcase as JobsIcon } from "lucide-react";

const JobsDropdown: React.FC = () => {
    return (
        <div className="group relative">
            <Link href="/search" className="font-medium flex items-center mt-4 px-4 text-gray-700 hover:text-orange-500 text-sm">
                {/* <JobsIcon className="mr-2 h-5 w-5" /> */}
                JOBS
            </Link> 
            <div className="absolute left-0 mt-2 hidden w-48 bg-white shadow-lg group-hover:block">
                <ul className="py-2">
                    <li>
                        <Link href="/search" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                Find Jobs
                        </Link>
                    </li>
                    <li>
                        <Link href="/search" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                Popular Jobs                      
                        </Link>
                    </li>
                    <li>
                        <Link href="/search" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                Jobs by Sector
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                            Jobs by location
                        </Link>
                       
                    </li>
                    <li>
                        <Link href="/search" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                Jobs by company
                               
                        </Link>
                    </li>
                    <li>
                        <Link href="/search" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                                Jobs Category
                        </Link>
                    </li>
                </ul>

            </div>


        </div>
        
    );
};


export default JobsDropdown;