/*
  Warnings:

  - Made the column `applicationId` on table `CoverLetter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CoverLetter" ALTER COLUMN "applicationId" SET NOT NULL;
