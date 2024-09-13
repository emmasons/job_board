/*
  Warnings:

  - You are about to drop the column `educationLevelId` on the `JobAlert` table. All the data in the column will be lost.
  - The `sectorId` column on the `JobAlert` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "JobAlert" DROP CONSTRAINT "JobAlert_educationLevelId_fkey";

-- DropForeignKey
ALTER TABLE "JobAlert" DROP CONSTRAINT "JobAlert_sectorId_fkey";

-- AlterTable
ALTER TABLE "JobAlert" DROP COLUMN "educationLevelId",
ADD COLUMN     "educationLevel" TEXT[],
DROP COLUMN "sectorId",
ADD COLUMN     "sectorId" TEXT[];
