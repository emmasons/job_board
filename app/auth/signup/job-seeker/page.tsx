import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Signup from "@/components/auth/Signup";
import SignupMessage from "@/components/auth/SignupMessage";
import { Role } from "@prisma/client";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign up as a job seeker",
};
const page = () => {
  return (
  <MaxWidthWrapper className="flex gap-8 h-full items-center justify-between max-md:flex-col" >
    <div className="md:basis-1/2">
      <SignupMessage/>
    </div>
    <div className="flex md:basis-1/2 h-full flex-col justify-center gap-4 rounded-md bg-slate-50 p-8">
        <Signup role={Role.JOB_SEEKER} />
    </div>
    </MaxWidthWrapper>
  );
};

export default page;
