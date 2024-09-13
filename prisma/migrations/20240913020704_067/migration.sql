/*
  Warnings:

  - You are about to drop the column `educationLevelIds` on the `JobAlert` table. All the data in the column will be lost.
  - You are about to drop the column `sectorIds` on the `JobAlert` table. All the data in the column will be lost.
  - You are about to drop the column `workSchedules` on the `JobAlert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobAlert" DROP COLUMN "educationLevelIds",
DROP COLUMN "sectorIds",
DROP COLUMN "workSchedules",
ADD COLUMN     "educationLevelId" TEXT,
ADD COLUMN     "sectorId" TEXT,
ADD COLUMN     "workSchedule" "WorkSchedule" DEFAULT 'NOT_SPECIFIED';

-- AddForeignKey
ALTER TABLE "JobAlert" ADD CONSTRAINT "JobAlert_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES "EducationLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobAlert" ADD CONSTRAINT "JobAlert_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;
