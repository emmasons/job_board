import {
  DesiredJob,
  EducationLevel,
  Experience,
  JobSeekerProfile,
  JobSeekerProfilePercentage,
  EmploymentDetails,
  PersonalDetails,
  Sector,
  Skill,
} from "@prisma/client";

export type JobSeekerProfileProps = JobSeekerProfile & {
  sector: Sector;
  education: EducationLevel;
  experience: Experience;
  profilePercentage: JobSeekerProfilePercentage;
  skills: Skill[];
  employmentDetails: EmploymentDetails[];
  personalDetails: PersonalDetails;
  desiredJob: DesiredJob;
};
