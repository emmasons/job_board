"use client";
import { useSession } from "next-auth/react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { redirect } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });
  return (
    <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
      <h2 className="text-2xl font-semibold text-primary">
        Hello, {session?.user?.email}
      </h2>
      <p className="font-semibold text-zinc-500">
        You are a {session?.user?.role}
      </p>
    </MaxWidthWrapper>
  );
};

export default page;
