import AuthHero from "@/components/auth/AuthHero";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-1 flex-col rounded-md shadow sm:flex-row">
      <div className="basis-1/2">
        <AuthHero />
      </div>
      <div className="flex basis-1/2 bg-primary items-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
