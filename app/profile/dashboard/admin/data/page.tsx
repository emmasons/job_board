import TransformEuresData from "@/components/dashboard/admin/data/TransformEuresData";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentSessionUser();
  const userId = user?.id;

  if (!userId || !(user.role === Role.ADMIN)) {
    return redirect("/");
  }

  return (
    <div className="p-6">
      <TransformEuresData />
    </div>
  );
};

export default page;
