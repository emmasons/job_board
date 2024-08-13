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
  User,
  Profile,
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
  user: User & { profile: Profile | null };
};
