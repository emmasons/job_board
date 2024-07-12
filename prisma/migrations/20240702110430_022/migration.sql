/*
  Warnings:

  - You are about to drop the column `cvHeadline` on the `JobSeekerProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobSeekerProfile" DROP COLUMN "cvHeadline",
ADD COLUMN     "cvHeadLine" TEXT;
