import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Signup from "@/components/auth/Signup";
import { Role } from "@prisma/client";

const page = () => {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40">
      <div className="w-full rounded-md px-[10%] py-8 shadow">
        <Signup role={Role.STAFF} />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
