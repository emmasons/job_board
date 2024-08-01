/*
  Warnings:

  - A unique constraint covering the columns `[visitorId]` on the table `JobMetrics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `visitorId` to the `JobMetrics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobMetrics" ADD COLUMN     "visitorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JobMetrics_visitorId_key" ON "JobMetrics"("visitorId");
