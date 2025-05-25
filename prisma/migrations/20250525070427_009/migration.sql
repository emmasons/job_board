/*
  Warnings:

  - The values [CONTRACTOR] on the enum `WorkScheduleOnJobAlert_workSchedule` will be removed. If these variants are still used in the database, this will fail.
  - The values [CONTRACTOR] on the enum `WorkScheduleOnJobAlert_workSchedule` will be removed. If these variants are still used in the database, this will fail.
  - The values [QUARTERLY] on the enum `plans_billingCycle` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Job` MODIFY `workSchedule` ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'SEASONAL', 'NOT_SPECIFIED') NOT NULL DEFAULT 'NOT_SPECIFIED';

-- AlterTable
ALTER TABLE `WorkScheduleOnJobAlert` MODIFY `workSchedule` ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'SEASONAL', 'NOT_SPECIFIED') NOT NULL;

-- AlterTable
ALTER TABLE `plans` MODIFY `billingCycle` ENUM('MONTHLY', 'ANNUALLY') NOT NULL DEFAULT 'MONTHLY';
