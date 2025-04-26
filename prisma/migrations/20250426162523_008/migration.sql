-- AlterTable
ALTER TABLE `Job` ADD COLUMN `externalLink` VARCHAR(191) NULL,
    ADD COLUMN `isExternal` BOOLEAN NOT NULL DEFAULT false;
