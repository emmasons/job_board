import Service from "./Service";
import CreateServiceDialog from "./CreateServiceDialog";
import { Service as ServiceType } from "@prisma/client";

interface ServiceListProps {
    services: ServiceType[];
}

const ServiceList = async ({ services }: ServiceListProps) => {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 w-full md:grid-cols-2">
        <CreateServiceDialog />
        {services.map((service) => (
          <Service
            key={service.id}
            title={service.title}
            description={service.description}
            slug={service.slug}
          />
        ))}
      </div>
    );
    
};

export default ServiceList;