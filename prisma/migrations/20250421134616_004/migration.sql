/*
  Warnings:

  - You are about to drop the column `name` on the `features` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `features` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `features` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `features_name_key` ON `features`;

-- AlterTable
ALTER TABLE `features` DROP COLUMN `name`,
    ADD COLUMN `type` ENUM('UNLIMITED_JOB_POSTING', 'CV_GENERATION', 'JOB_ALERTS', 'CV_DOWNLOAD', 'JOB_APPLICATION_TRACKING', 'INTERVIEW_SCHEDULING', 'EMPLOYER_PROFILE') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `features_type_key` ON `features`(`type`);
