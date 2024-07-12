-- AlterTable
ALTER TABLE "JobSeekerProfile" ADD COLUMN     "profileSummary" TEXT;

-- CreateTable
CREATE TABLE "EmploymentDetails" (
    "id" TEXT NOT NULL,
    "designation" TEXT,
    "company" TEXT,
    "location" TEXT,
    "description" TEXT,
    "currentlyWorking" BOOLEAN NOT NULL DEFAULT false,
    "startMonth" TEXT NOT NULL,
    "startYear" TEXT NOT NULL,
    "endMonth" TEXT,
    "endYear" TEXT,
    "jobSeekerProfileId" TEXT NOT NULL,

    CONSTRAINT "EmploymentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastUsed" TEXT NOT NULL,
    "totalExperienceYears" INTEGER NOT NULL DEFAULT 0,
    "totalExperienceMonths" INTEGER NOT NULL DEFAULT 0,
    "jobSeekerProfileId" TEXT NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmploymentDetails" ADD CONSTRAINT "EmploymentDetails_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES "JobSeekerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES "JobSeekerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
