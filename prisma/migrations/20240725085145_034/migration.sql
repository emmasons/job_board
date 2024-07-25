/*
  Warnings:

  - A unique constraint covering the columns `[jobSeekerProfileId]` on the table `DesiredJob` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DesiredJob_jobSeekerProfileId_key" ON "DesiredJob"("jobSeekerProfileId");
