import Signup from "@/components/auth/Signup";
import { Role } from "@prisma/client";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign up as a job seeker",
};
const page = () => {
  return (
    <div className="w-full justify-between basis-full">
      <div className="my-4 w-full rounded-md bg-slate-50 p-8 shadow">
        <Signup role={Role.JOB_SEEKER} />
      </div>
    </div>
  );
};

export default page;
