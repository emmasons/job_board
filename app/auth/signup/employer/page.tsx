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
    <MaxWidthWrapper className="flex gap-8 h-full items-center justify-between max-md:flex-col" >
     <div className="md:basis-[40%]">
        <SignupMessage/>
      </div>
      <div className="flex md:basis-[60%] h-full flex-col justify-center gap-4 rounded-md bg-slate-50 p-8">
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
