/*
  Warnings:

  - You are about to drop the column `cvId` on the `JobSeekerProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CV" ADD COLUMN     "cvId" TEXT;

-- AlterTable
ALTER TABLE "JobSeekerProfile" DROP COLUMN "cvId";
