import { getAllSectors } from "@/actions/get-all-sectors";
import { getCompanyForUser } from "@/actions/employer/get-company-for-user";
import { getContractTypes } from "@/actions/get-contract-types";
import { getEducationLevels } from "@/actions/get-education-levels";
import { getExperience } from "@/actions/get-experience";
import { getWorkSchedules } from "@/actions/get-work-schedules";
import CreateJobForm from "@/components/dashboard/employer/jobs/create/CreateJobForm";
import { getCurrentSessionUser } from "@/lib/auth";
import { PREFERRED_APPLICANT_GENDER, Role } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (!user) {
    return redirect("/"); // Redirect to home if the user is not logged in
  }

  if (user.role !== Role.EMPLOYER && user.role !== Role.ADMIN) {
    return redirect("/denied"); // Redirect unauthorized users to a specific page
  }

  const sectors = await getAllSectors();
  const contractTypeList = await getContractTypes();
  const workSchedules = await getWorkSchedules();
  const educationLevels = await getEducationLevels();
  const experience = await getExperience();
  const company = await getCompanyForUser(user.id);

  if (!company) {
    return (
      <div className="flex h-full items-center justify-center">
        <Link
          href="/profile/dashboard/employer/company"
          className="flex items-center text-sm text-zinc-600 hover:text-zinc-400"
        >
          Please set up your company first
          <ChevronRight />
        </Link>
      </div>
    );
  }
  return (
    <div className="p-6">
      <CreateJobForm
        initialData={{
          city: "",
          description: "",
          title: "",
          country: "",
          contractType: "",
          startDate: null,
          occupation: "",
          numberOfPositions: "1",
          workSchedule: "",
          companyName: "",
          educationLevelId: "",
          experienceId: "",
          sectorId: "",
          salary: "",
          preferredApplicantGender: PREFERRED_APPLICANT_GENDER.ALL,
        }}
        sectorList={sectors.map((sector) => ({
          label: sector.label,
          value: sector.id,
        }))}
        contractTypeList={contractTypeList}
        workScheduleList={workSchedules}
        educationLevelList={educationLevels.map((level) => ({
          label: level.label,
          value: level.id,
        }))}
        experienceList={experience.map((exp) => ({
          label: exp.label,
          value: exp.id,
        }))}
      />
    </div>
  );
};

export default page;
