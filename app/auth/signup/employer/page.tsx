import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import EmployerSignup from "@/components/auth/EmployerSignup";
import { getAllSectors } from "@/actions/get-all-sectors";
import { Role } from "@prisma/client";
import SignupMessage from "@/components/auth/SignupMessage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign up as an employer",
};
const page = async () => {
  const sectors = await getAllSectors();

  return (
    <MaxWidthWrapper className="flex flex-wrap h-full w-full justify-between rounded-md">
      <SignupMessage />
      <div className="w-full md:basis-1/2 rounded-md bg-slate-50 shadow p-8 my-4">
        <EmployerSignup
          role={Role.EMPLOYER}
          sectorList={sectors.map((sector) => ({
            label: sector.label,
            value: sector.id,
          }))}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
