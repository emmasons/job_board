-- AlterTable
ALTER TABLE "JobSeekerProfile" ADD COLUMN     "currency" "CURRENCY" NOT NULL DEFAULT 'AED',
ADD COLUMN     "currentSalary" TEXT,
ADD COLUMN     "expectedSalary" TEXT;
