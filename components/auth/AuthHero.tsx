import React from "react";

const AuthHero = () => {
  return (
    <div className="flex h-full flex-col justify-end bg-[url('/auth/ladylogin.jpg')] bg-cover bg-center bg-no-repeat px-4 pb-24">
      <div className="rounded-lg bg-[rgba(64,64,64,0.7)] px-4 py-8 text-secondary">
        <h2 className="text-xl font-bold">
          Welcome to Jobs Connect Gulf Job Portal
        </h2>
        <p className="text-[0.9rem]">
          Join thousands of other job seekers and employers.
        </p>
      </div>
    </div>
  );
};

export default AuthHero;
