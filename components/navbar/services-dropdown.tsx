import Link from "next/link";

const services = [
  "Profesional cv writing",
  "Visual cv templates",
  "Cover letter writing",
  "CV evaluation",
  "CV evaluation",
];

const ServicesDropdown: React.FC = () => {
  return (
    <div className="group relative">
      <Link
        href="/services"
        className="px-4 pb-7 text-sm font-medium text-gray-700 hover:border-b-4 hover:border-indigo-600 hover:text-orange-500"
      >
        {/* <ServicesIcon className="mr-2 h-5 w-5"/> */}
        SERVICES
      </Link>
      <div className="absolute left-0 mt-7 hidden w-52 bg-white pt-2 shadow-lg group-hover:block group-hover:border-t-4 group-hover:border-indigo-400 ">
        <ul className="py-2">
          {services.map((service) => (
            <li key={service}>
              <Link
                href="/coming-soon"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
              >
                {service}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServicesDropdown;
