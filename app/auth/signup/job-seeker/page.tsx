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
    <div className="flex flex-wrap w-full justify-between">
      <SignupMessage />
      <div className="w-full rounded-md bg-slate-50 shadow my-4 p-8 md:basis-1/2">
        <Signup role={Role.JOB_SEEKER} />
      </div>
    </div>
  );
};

export default page;
