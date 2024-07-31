import { getCompanyById } from "@/actions/employer/get-company-by-id";
import { getAllSectors } from "@/actions/get-all-sectors";
import EditCompanyForm from "@/components/dashboard/employer/company/EditCompanyForm";
import AddressForm from "@/components/dashboard/profile/AddressForm";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { ArrowLeft, BriefcaseBusiness, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.EMPLOYER)) {
    return redirect("/auth/signin?callbackUrl=/profile/dashboard");
  }
  const sectors = await getAllSectors();
  const company = await getCompanyById(params.id);
  if (!company) return notFound();

  return (
    <div className="space-y-4 p-6">
      <div className="md:w-2/3 space-y-4">
        <Link
          href="/profile/dashboard/employer"
          className="inline-flex items-center gap-2"
        >
          <ArrowLeft />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-4">
          <BriefcaseBusiness className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Edit Company</h1>
        </div>
        <EditCompanyForm
          sectorList={sectors.map((sector) => ({
            label: sector.label,
            value: sector.id,
          }))}
          initialData={{
            companyName: company.companyName,
            companyEmail: company.companyEmail,
            sectorId: company.sectorId,
          }}
          id={params.id}
        />
        {company.employerProfile?.user.address && (
          <AddressForm
            initialData={company.employerProfile?.user.address}
            userId={company.employerProfile?.user.id}
          />
        )}
      </div>
    </div>
  );
};

export default page;
