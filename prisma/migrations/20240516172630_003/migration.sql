/*
  Warnings:

  - You are about to drop the column `jobSeekerId` on the `JobSeekerProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `JobSeekerProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `JobSeekerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_jobSeekerId_fkey";

-- AlterTable
ALTER TABLE "JobSeekerProfile" DROP COLUMN "jobSeekerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JobSeekerProfile_userId_key" ON "JobSeekerProfile"("userId");

-- AddForeignKey
ALTER TABLE "JobSeekerProfile" ADD CONSTRAINT "JobSeekerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
