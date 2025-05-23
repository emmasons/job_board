import AuthHero from "@/components/auth/AuthHero";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-full justify-center bg-[url('/auth/ladylogin.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-full w-full flex-1 bg-[rgba(64,64,64,0.5)] p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;