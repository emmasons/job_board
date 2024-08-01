import { getScrapedJobs } from "@/actions/admin/get-scraped-jobs";
import TransformEuresData from "@/components/dashboard/admin/data/TransformEuresData";
import { columns } from "@/components/dashboard/admin/scrapped-jobs/Columns";
import { DataTable } from "@/components/dashboard/admin/scrapped-jobs/DataTable";

type Props = {};

const page = async (props: Props) => {
  const jobs = await getScrapedJobs();
  return (
    <div className="p-6">
      <TransformEuresData />
      <DataTable columns={columns} data={jobs} />
    </div>
  );
};

export default page;
