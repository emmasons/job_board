import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "@/components/dashboard/admin/users/DataTable";
import { columns } from "@/components/dashboard/admin/users/Columns";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

const page = async () => {
  const user = await getCurrentSessionUser();
  const userId = user?.id;

  if (!userId || !(user.role === Role.ADMIN)) {
    return redirect("/");
  }
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default page;
