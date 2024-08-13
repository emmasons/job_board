-- CreateTable
CREATE TABLE "EducationDetails" (
    "id" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "collegeLocation" TEXT NOT NULL,
    "startYear" TEXT NOT NULL,
    "endYear" TEXT,
    "jobSeekerProfileId" TEXT NOT NULL,

    CONSTRAINT "EducationDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EducationDetails" ADD CONSTRAINT "EducationDetails_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES "JobSeekerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
