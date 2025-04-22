/*
  Warnings:

  - A unique constraint covering the columns `[type,displayName]` on the table `features` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `features` MODIFY `type` ENUM('UNLIMITED_JOB_POSTING', 'UNLIMITED_JOB_APPLICATION', 'UNLIMITED_CV_DOWNLOAD', 'UNLIMITED_COMPANY_PROFILE_VIEWS', 'UNLIMITED_JOB_ALERTS', 'UNLIMITED_COVER_LETTER_GENERATION', 'UNLIMITED_CV_GENERATION', 'CV_GENERATION', 'JOB_ALERTS', 'CV_DOWNLOAD', 'JOB_APPLICATION_TRACKING', 'INTERVIEW_SCHEDULING', 'EMPLOYER_PROFILE') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `features_type_displayName_key` ON `features`(`type`, `displayName`);
