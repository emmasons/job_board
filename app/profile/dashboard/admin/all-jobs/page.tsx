import { getAllJobs } from "@/actions/admin/get-all-jobs";
import { columns } from "@/components/dashboard/admin/scrapped-jobs/Columns";
import { DataTable } from "@/components/dashboard/admin/scrapped-jobs/DataTable";

const page = async () => {
  const jobs = await getAllJobs();
  return (
    <div className="p-6">
      <DataTable columns={columns} data={jobs} />
    </div>
  );
};

export default page;
