import Link from "next/link";
import { Settings as SettingsIcon } from "lucide-react";

const ServicesDropdown: React.FC = () => {
    return (
        <div className="group relative">
            <Link href="/services" className="font-medium flex items-center mt-4 px-4 text-gray-700 hover:text-orange-500 text-sm">
                {/* <ServicesIcon className="mr-2 h-5 w-5"/> */}
                SERVICES
            </Link>
            <div className="absolute left-0 mt-2 hidden w-52 bg-white shadow-lg group-hover:block">
                <ul className="py-2">
                <li>
                    <Link href="/services/web-development" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                        Profesional cv writing            
                    </Link>
                </li>
                <li>
                    <Link href="/services/web-development" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                        Visual cv templates
                    </Link>
                </li>
                <li>
                    <Link href="/services/web-development " className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                        Cover letter writing
                    </Link>
                </li>
                <li>
                    <Link href="/services/web-development" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                        cv evaluation
                      
                    </Link>
                </li>

                </ul>

            </div>

        </div>
        
    );
};

export default ServicesDropdown;