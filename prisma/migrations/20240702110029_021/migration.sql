-- AlterTable
ALTER TABLE "JobSeekerProfile" ADD COLUMN     "cvHeadline" TEXT;

-- CreateTable
CREATE TABLE "Skills" (
    "id" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "jobSeekerProfileId" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobSeekerProfilePercentage" (
    "id" TEXT NOT NULL,
    "jobSeekerProfileId" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "JobSeekerProfilePercentage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skills_jobSeekerProfileId_key" ON "Skills"("jobSeekerProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "JobSeekerProfilePercentage_jobSeekerProfileId_key" ON "JobSeekerProfilePercentage"("jobSeekerProfileId");

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES "JobSeekerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
