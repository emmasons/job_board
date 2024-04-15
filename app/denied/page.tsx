import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40 space-y-4">
      <h2 className="text-2xl font-semibold text-primary">Denied</h2>
      <p className="font-semibold text-zinc-500">
        You are authenticated but dont have authority to view this page.
      </p>
      <Link href="/" className="text-orange-600 underline">
        Go Home
      </Link>
    </MaxWidthWrapper>
  );
};

export default page;
