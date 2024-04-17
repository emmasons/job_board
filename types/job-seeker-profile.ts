import {
  EducationLevel,
  Experience,
  JobSeekerProfile,
  Sector,
} from "@prisma/client";

export type JobSeekerProfileProps = JobSeekerProfile & {
  sector: Sector;
  education: EducationLevel;
  experience: Experience;
};
