import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const page = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile/server");
  }
  return (
    <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
      <h2 className="text-2xl font-semibold text-primary">Hello, Admin</h2>
      <p className="font-semibold text-zinc-500">
        You are a {session?.user?.role}
      </p>
    </MaxWidthWrapper>
  );
};

export default page;
