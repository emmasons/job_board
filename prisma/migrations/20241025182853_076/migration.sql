/*
  Warnings:

  - You are about to drop the column `contractType` on the `JobAlert` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `JobAlert` table. All the data in the column will be lost.
  - You are about to drop the column `educationLevelId` on the `JobAlert` table. All the data in the column will be lost.
  - You are about to drop the column `sectorId` on the `JobAlert` table. All the data in the column will be lost.
  - You are about to drop the column `workSchedule` on the `JobAlert` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "JobAlert" DROP CONSTRAINT "JobAlert_educationLevelId_fkey";

-- DropForeignKey
ALTER TABLE "JobAlert" DROP CONSTRAINT "JobAlert_sectorId_fkey";

-- AlterTable
ALTER TABLE "JobAlert" DROP COLUMN "contractType",
DROP COLUMN "country",
DROP COLUMN "educationLevelId",
DROP COLUMN "sectorId",
DROP COLUMN "workSchedule",
ADD COLUMN     "contractTypes" "ContractType"[],
ADD COLUMN     "countries" TEXT[],
ADD COLUMN     "educationLevelIds" TEXT[],
ADD COLUMN     "sectorIds" TEXT[],
ADD COLUMN     "workSchedules" "WorkSchedule"[];
