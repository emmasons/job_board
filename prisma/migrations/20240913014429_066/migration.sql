/*
  Warnings:

  - You are about to drop the column `educationLevel` on the `JobAlert` table. All the data in the column will be lost.
  - You are about to drop the column `sectorId` on the `JobAlert` table. All the data in the column will be lost.
  - You are about to drop the column `workSchedule` on the `JobAlert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobAlert" DROP COLUMN "educationLevel",
DROP COLUMN "sectorId",
DROP COLUMN "workSchedule",
ADD COLUMN     "educationLevelIds" TEXT[],
ADD COLUMN     "sectorIds" TEXT[],
ADD COLUMN     "workSchedules" "WorkSchedule"[];
