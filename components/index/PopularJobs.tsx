import { getFeaturedJobs } from "@/actions/get-featured-jobs";
import JobCard from "../job/JobCard";
import NoDataWrapper from "../NoData";

const PopularJobs: React.FC = async () => {
  const jobData = await getFeaturedJobs();
  if (!jobData || jobData.length === 0) {
    return (
      <div className="bg-slate-50 py-4">
        <NoDataWrapper dataTitle="Featured jobs" />
      </div>
    );
  }
  return (
    <div className=" w-full border-none">
      <div className="rounded-lg bg-white p-6">
        <h2 className="mb-4 mt-12 text-center text-3xl font-semibold text-gray-900">
          featured Jobs
        </h2>
        <p className="mb-8 text-center">Find your Ideal Visa sponsored jobs</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {jobData.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              createdAt={job.createdAt}
              sector={job.sector}
              city={job.city}
              country={job.country}
              occupation={job.occupation}
              workSchedule={job.workSchedule}
              url={""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularJobs;
