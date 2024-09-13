/*
  Warnings:

  - The `educationLevelId` column on the `JobAlert` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "JobAlert" DROP CONSTRAINT "JobAlert_educationLevelId_fkey";

-- AlterTable
ALTER TABLE "JobAlert" DROP COLUMN "educationLevelId",
ADD COLUMN     "educationLevelId" TEXT[];
