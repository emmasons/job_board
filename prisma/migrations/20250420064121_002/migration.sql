/*
  Warnings:

  - You are about to alter the column `currency` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(12))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Job` MODIFY `currency` VARCHAR(191) NULL;
