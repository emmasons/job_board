import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Signup from "@/components/auth/Signup";
import { Role } from "@prisma/client";

const page = () => {
  return (
    <MaxWidthWrapper>
      <div className="w-full rounded-md px-[10%] py-8 shadow">
        <Signup role={Role.EMPLOYER} />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
