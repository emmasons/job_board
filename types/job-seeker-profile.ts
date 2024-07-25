import {
  DesiredJob,
  EducationLevel,
  Experience,
  JobSeekerProfile,
  JobSeekerProfilePercentage,
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
  personalDetails: PersonalDetails;
  desiredJob: DesiredJob;
};
