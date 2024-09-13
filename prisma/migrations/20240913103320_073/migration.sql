/*
  Warnings:

  - You are about to drop the column `country` on the `JobAlert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobAlert" DROP COLUMN "country",
ADD COLUMN     "countries" TEXT[];
