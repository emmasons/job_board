import Login from "@/components/auth/Login";
import { getCurrentSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const page = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (user) {
    return redirect("/profile/dashboard");
  }
  return (
    <Login
      error={props.searchParams?.error}
      callbackUrl={props.searchParams?.callbackUrl}
    />
  );
};

export default page;
