"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";

const services = [
  {
    icon: "healthicons:factory-worker-outline",
    link: <Link className="font-semibold underline text-secondary" href="/search">Find a job</Link>,
    description: "Search for your perfect job in Europe",
  },
  {
    icon: "fluent:people-search-20-filled",
    link: <Link className="font-semibold underline text-secondary" href="/find-candidates">Find a candidate</Link>,
    description: "Search for your perfect employee in Europe",
  },
  {
    icon: "wpf:worldwide-location",
    link: <Link className="font-semibold underline text-secondary" href="/search">Living and working conditions</Link>,
    description:
      "Find out more about living and working conditions in your country of preference",
  },
  //   {
  //     icon: "fluent:people-search-20-filled",
  //     link: <Link className="font-semibold underline text-secondary" href="/search">Find a candidate</Link>,
  //     description:
  //       "Dynamic recruitment events that bring jobseekers and employers together",
  //   },
];

const Services = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {services.map((service) => (
        <div
          key={service.icon}
          className="flex flex-col items-center gap-4 p-4 rounded-md   hover:shadow-md"
        >
          <Icon icon={service.icon} className="h-16 w-16 text-[#1177BC]" />
          {service.link}
          <p className="text-center text-md text-primary whitespace-normal break-words w-[80%]">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
