import {
  EducationLevel,
  Experience,
  JobSeekerProfile,
  JobSeekerProfilePercentage,
  Sector,
} from "@prisma/client";

export type JobSeekerProfileProps = JobSeekerProfile & {
  sector: Sector;
  education: EducationLevel;
  experience: Experience;
  profilePercentage: JobSeekerProfilePercentage;
};
