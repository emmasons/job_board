/*
  Warnings:

  - A unique constraint covering the columns `[candidateId,employerId]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Candidate_candidateId_employerId_key" ON "Candidate"("candidateId", "employerId");
