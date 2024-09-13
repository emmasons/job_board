/*
  Warnings:

  - You are about to drop the column `workSchedule` on the `JobAlert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobAlert" DROP COLUMN "workSchedule",
ADD COLUMN     "workSchedules" "WorkSchedule"[];
