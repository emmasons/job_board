/*
  Warnings:

  - You are about to drop the column `educationLevelId` on the `JobAlert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobAlert" DROP COLUMN "educationLevelId",
ADD COLUMN     "educationLevelIds" TEXT[];
