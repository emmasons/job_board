/*
  Warnings:

  - The values [QUARTERLY] on the enum `plans_billingCycle` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `plans` MODIFY `billingCycle` ENUM('MONTHLY', 'ANNUALLY') NOT NULL DEFAULT 'MONTHLY';
