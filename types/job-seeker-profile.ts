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
  EducationDetails,
} from "@prisma/client";

export type JobSeekerProfileProps = JobSeekerProfile & {
  sector: Sector;
  education: EducationLevel[];
  experience: Experience;
  profilePercentage: JobSeekerProfilePercentage;
  skills: Skill[];
  employmentDetails: EmploymentDetails[];
  educationDetails: EducationDetails[];
  personalDetails: PersonalDetails;
  desiredJob: DesiredJob;
};
