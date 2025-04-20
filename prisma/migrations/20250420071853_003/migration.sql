-- AlterTable
ALTER TABLE `GCPData` MODIFY `urlExpiryDate` DATETIME(3) NULL,
    MODIFY `blobName` VARCHAR(191) NULL,
    MODIFY `validityDuration` INTEGER NULL DEFAULT 7,
    MODIFY `downloadUrl` VARCHAR(1000) NULL;
