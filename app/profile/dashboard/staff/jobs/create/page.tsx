import { getAllSectors } from "@/actions/get-all-sectors";
import { getContractTypes } from "@/actions/get-contract-types";
import { getEducationLevels } from "@/actions/get-education-levels";
import { getExperience } from "@/actions/get-experience";
import { getWorkSchedules } from "@/actions/get-work-schedules";
import CreateJobForm from "@/components/dashboard/staff/jobs/create/CreateJobForm";
import React from "react";

const page = async () => {
  const sectors = await getAllSectors();
  const contractTypeList = await getContractTypes();
  const workSchedules = await getWorkSchedules();
  const educationLevels = await getEducationLevels();
  const experience = await getExperience();
  return (
    <div className="p-6">
      <CreateJobForm
        initialData={{
          city: "",
          sector: "",
          description: "",
          title: "",
          country: "",
          contractType: "",
          jobSector: "",
          startDate: null,
          occupation: "",
          educationLevel: "",
          numberOfPositions: 0,
          experience: "",
          workSchedule: "",
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
