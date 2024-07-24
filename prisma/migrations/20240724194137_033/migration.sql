/*
  Warnings:

  - A unique constraint covering the columns `[jobSeekerProfileId]` on the table `PersonalDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_jobSeekerProfileId_key" ON "PersonalDetails"("jobSeekerProfileId");
