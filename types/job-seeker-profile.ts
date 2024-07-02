import {
  EducationLevel,
  Experience,
  JobSeekerProfile,
  JobSeekerProfilePercentage,
  Sector,
  Skill,
} from "@prisma/client";

export type JobSeekerProfileProps = JobSeekerProfile & {
  sector: Sector;
  education: EducationLevel;
  experience: Experience;
  profilePercentage: JobSeekerProfilePercentage;
  skills: Skill[];
};
