/*
  Warnings:

  - A unique constraint covering the columns `[visitorId,jobId]` on the table `JobMetrics` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "JobMetrics_visitorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "JobMetrics_visitorId_jobId_key" ON "JobMetrics"("visitorId", "jobId");
