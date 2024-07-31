import AuthHero from "@/components/auth/AuthHero";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-full items-stretch justify-center bg-[url('/auth/ladylogin.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="flex-1 bg-[rgba(64,64,64,0.5)] p-8 w-full min-h-full">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
