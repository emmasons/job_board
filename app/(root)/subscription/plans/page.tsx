import React from "react";
import Link from "next/link";
import Pricing from "@/components/plans/pricing";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

type Props = {};

const page = (props: Props) => {
  return (
    <MaxWidthWrapper className="bg-slate-100">
      <Pricing />
    </MaxWidthWrapper>
  );
};

export default page;
