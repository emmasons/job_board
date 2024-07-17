-- CreateTable
CREATE TABLE "DesiredJob" (
    "id" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "jobSeekerProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DesiredJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DesiredJob" ADD CONSTRAINT "DesiredJob_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES "JobSeekerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
