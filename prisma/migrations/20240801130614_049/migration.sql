/*
  Warnings:

  - You are about to drop the column `totalShares` on the `JobMetrics` table. All the data in the column will be lost.
  - You are about to drop the column `totalViews` on the `JobMetrics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "JobMetrics" DROP CONSTRAINT "JobMetrics_jobId_fkey";

-- AlterTable
ALTER TABLE "JobMetrics" DROP COLUMN "totalShares",
DROP COLUMN "totalViews",
ADD COLUMN     "share" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "view" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "JobMetrics" ADD CONSTRAINT "JobMetrics_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
