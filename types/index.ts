// // src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
  educationDetails?: string;
  currentLocation?: string;
  phoneNumber?: string;
  emailVerified: Date | null;
  isVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  password: string | null;
  verifyToken: string | null;
  verifyTokenExpiry: Date | null;
}

//   export interface CV {
//     id: string;
//   }

//   export interface Sector {
//     id: string;
//     label: string;
//   }

//   export interface EducationLevel {
//     id: string;
//     label: string;
//   }

//   export interface Experience {
//     id: string;
//     label: string;
//   }

// //   export type JobSeekerProfileProps = JobSeekerProfile &{
// //     id: string;
// //     userId: string;
// //     country?: string;
// //     occupation?: string;
// //     educationLevelId?: string;
// //     experienceId?: EducationLevel;
// //     sectorId?: string;
// //   }
export interface JobSeekerProfile {
  id: string;
  userId: string;
  country?: string;
  occupation?: string;
  educationLevelId?: string;
  experienceId?: string;
  sectorId?: string;
}
// import {
//     // EducationLevel,
//     // Experience,
//     JobSeekerProfile,
//     // Sector,
//   } from "@prisma/client";

export interface CV {
  id: string;
}

export interface Sector {
  id: string;
  label: string;
}

export interface EducationLevel {
  id: string;
  label: string;
}

export interface Experience {
  id: string;
  label: string;
}
//   export type JobSeekerProfileProps = JobSeekerProfile & {
//     sector: Sector;
//     education: EducationLevel;
//     experience: Experience;
//   };
// export interface JobSeekerProfile {
//     id: string;
//     userId: string;
//   }

export interface Accept {
  [key: string]: string[];
}

export interface CoverLetterTemplateDetailsValidation {
  name: string;
  jobTitle: string;
  address: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
  companyName: string;
  hiringManager: string;
}
