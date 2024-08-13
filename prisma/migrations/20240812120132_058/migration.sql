/*
  Warnings:

  - Added the required column `level` to the `EducationDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EducationDetails" ADD COLUMN     "level" TEXT NOT NULL;
