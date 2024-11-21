import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import EmployerSignup from "@/components/auth/EmployerSignup";
import { getAllSectors } from "@/actions/get-all-sectors";
import { Role } from "@prisma/client";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign up as an employer",
};
const page = async () => {
  const sectors = await getAllSectors();

  return (
    <div className="flex flex-wrap h-full w-full justify-between rounded-md basis-full bg-red-200">
      <div className="w-full rounded-md bg-slate-50 shadow p-8">
        <EmployerSignup
          role={Role.EMPLOYER}
          sectorList={sectors.map((sector) => ({
            label: sector.label,
            value: sector.id,
          }))}
        />
      </div>
    </div>
  );
};

export default page;
