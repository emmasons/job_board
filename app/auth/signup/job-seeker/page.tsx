import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Signup from "@/components/auth/Signup";
import { Role } from "@prisma/client";

const page = () => {
  return (
    <MaxWidthWrapper>
      <div className="w-full rounded-md px-[10%] py-8 shadow h-full">
        <Signup role={Role.JOB_SEEKER} />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
