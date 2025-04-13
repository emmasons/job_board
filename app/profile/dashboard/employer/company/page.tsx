import CreateCompanyForm from "@/components/dashboard/employer/company/CreateCompanyForm";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (user.role !== Role.EMPLOYER && user.role !== Role.ADMIN) {
    return redirect("/");
  }
  return (
    <div className="p-6">
      <CreateCompanyForm
        initialData={{
          companyName: "",
          companyEmail: "",
        }}
      />
    </div>
  );
};

export default page;
