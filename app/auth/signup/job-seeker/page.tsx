import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Signup from "@/components/auth/Signup";
import SignupMessage from "@/components/auth/SignupMessage";
import { Role } from "@prisma/client";

const page = () => {
  return (
    <MaxWidthWrapper className="flex w-full justify-between">
      <SignupMessage />
      <div className="w-full rounded-md bg-slate-50 shadow md:p-8 basis-1/2">
        <Signup role={Role.JOB_SEEKER} />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
