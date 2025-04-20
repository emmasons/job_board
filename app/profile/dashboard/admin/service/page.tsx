import ServiceList from "@/components/dashboard/admin/service-list/ServiceList";
import { db } from "@/lib/db";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getAllServices } from "@/actions/services/get-all-service";

const Dashboard = async () => {
  const services = await getAllServices();
  return (
    <section className="p-6">
      <h1 className="mb-8 text-4xl font-bold leading-tight text-gray-700 lg:text-4xl">
        Services
      </h1>
      <div className="flex flex-col items-center justify-center">
        <ServiceList services={services} />
      </div>
    </section>
  );
};
export default Dashboard;
