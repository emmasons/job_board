/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CV` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Candidate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Certificate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DesiredJob` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EducationDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EducationLevel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployerProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmploymentDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GCPData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobAlert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobMetrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobSeekerProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobSeekerProfilePercentage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Occupation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonalDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScrapedJob` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sector` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubOccupation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- DropForeignKey
ALTER TABLE "CV" DROP CONSTRAINT "CV_userId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_employerId_fkey";

-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_jobSeekerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_employerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_sectorId_fkey";

-- DropForeignKey
ALTER TABLE "DesiredJob" DROP CONSTRAINT "DesiredJob_jobSeekerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "EducationDetails" DROP CONSTRAINT "EducationDetails_jobSeekerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "EmployerProfile" DROP CONSTRAINT "EmployerProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "EmploymentDetails" DROP CONSTRAINT "EmploymentDetails_jobSeekerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_educationLevelId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_sectorId_fkey";

-- DropForeignKey
ALTER TABLE "JobAlert" DROP CONSTRAINT "JobAlert_companyId_fkey";

-- DropForeignKey
ALTER TABLE "JobAlert" DROP CONSTRAINT "JobAlert_userId_fkey";

-- DropForeignKey
ALTER TABLE "JobMetrics" DROP CONSTRAINT "JobMetrics_jobId_fkey";

-- DropForeignKey
ALTER TABLE "JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_educationLevelId_fkey";

-- DropForeignKey
ALTER TABLE "JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_sectorId_fkey";

-- DropForeignKey
ALTER TABLE "JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalDetails" DROP CONSTRAINT "PersonalDetails_jobSeekerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_jobSeekerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "SubOccupation" DROP CONSTRAINT "SubOccupation_occupationId_fkey";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Application";

-- DropTable
DROP TABLE "CV";

-- DropTable
DROP TABLE "Candidate";

-- DropTable
DROP TABLE "Certificate";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "DesiredJob";

-- DropTable
DROP TABLE "EducationDetails";

-- DropTable
DROP TABLE "EducationLevel";

-- DropTable
DROP TABLE "EmployerProfile";

-- DropTable
DROP TABLE "EmploymentDetails";

-- DropTable
DROP TABLE "Experience";

-- DropTable
DROP TABLE "GCPData";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "JobAlert";

-- DropTable
DROP TABLE "JobMetrics";

-- DropTable
DROP TABLE "JobSeekerProfile";

-- DropTable
DROP TABLE "JobSeekerProfilePercentage";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Occupation";

-- DropTable
DROP TABLE "PersonalDetails";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "ScrapedJob";

-- DropTable
DROP TABLE "Sector";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "SubOccupation";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "ApplicationStatus";

-- DropEnum
DROP TYPE "CURRENCY";

-- DropEnum
DROP TYPE "ContractType";

-- DropEnum
DROP TYPE "JOBSOURCE";

-- DropEnum
DROP TYPE "JOBSTATUS";

-- DropEnum
DROP TYPE "JOBTYPE";

-- DropEnum
DROP TYPE "NOTIFICATION_TYPES";

-- DropEnum
DROP TYPE "PREFERRED_APPLICANT_GENDER";

-- DropEnum
DROP TYPE "PurchaseStatus";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "SUBSCRIPTION_TYPE";

-- DropEnum
DROP TYPE "WorkSchedule";
