/*
  Warnings:

  - You are about to drop the column `sectorId` on the `JobAlert` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "JobAlert" DROP CONSTRAINT "JobAlert_sectorId_fkey";

-- AlterTable
ALTER TABLE "JobAlert" DROP COLUMN "sectorId",
ADD COLUMN     "sectorIds" TEXT[];
