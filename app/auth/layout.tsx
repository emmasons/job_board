import AuthHero from "@/components/auth/AuthHero";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex  w-full flex-1 flex-col rounded-md bg-[url('/auth/ladylogin.jpg')] bg-cover bg-center bg-no-repeat shadow sm:flex-row ">
      {/* <div className="basis-1/2">
        <AuthHero />
      </div> */}
      <div className="flex w-full flex-col items-end bg-[rgba(64,64,64,0.5)] p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
