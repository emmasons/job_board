import { getAllSectors } from "@/actions/get-all-sectors";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BreadCrumb from "@/components/navbar/BreadCrumbs";
import KeywordSearch from "@/components/search/advanced/KeywordSearch";
import FilterByCountry from "@/components/search/filter/FilterByCountry";
import FilterBySector from "@/components/search/filter/FilterBySector";
import FilterByWorkSchedule from "@/components/search/filter/FilterByWorkSchedule";
import { getWorkSchedules } from "@/actions/get-work-schedules";
import { getEducationLevels } from "@/actions/get-education-levels";
import FilterByEducationLevel from "@/components/search/filter/EducationLevel";
import { getExperience } from "@/actions/get-experience";
import FilterByExperience from "@/components/search/filter/Experience";
import PublicationDateSearch from "@/components/search/advanced/PublicationDateSearch";
import Search from "@/components/search/advanced/Search";

type Props = {};

const page = async (props: Props) => {
  const sectors = await getAllSectors();
  const workSchedules = await getWorkSchedules();
  const levels = await getEducationLevels();
  const experienceLevels = await getExperience();

  return (
    <MaxWidthWrapper className="py-4">
      <BreadCrumb />
      <div className="my-4 space-y-4">
        <h2 className="text-2xl font-semibold text-primary">
          Fine tune your search
        </h2>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Keywords</p>
          <KeywordSearch />
        </div>
        <div className="space-y-2">
          <FilterBySector sectors={sectors} />
        </div>
        <div className="space-y-2">
          <FilterByCountry />
        </div>
        <div className="space-y-2">
          <FilterByWorkSchedule workSchedules={workSchedules} />
        </div>
        <div className="space-y-2">
          <FilterByEducationLevel levels={levels} />
        </div>
        <div className="space-y-2">
          <FilterByExperience experienceLevels={experienceLevels} />
        </div>
        <div className="space-y-2">
          <PublicationDateSearch />
        </div>
        <div className="flex items-center gap-x-2">
          <Search />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
