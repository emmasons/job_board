-- AlterTable
ALTER TABLE "JobSeekerProfile" ADD COLUMN     "cvId" TEXT,
ALTER COLUMN "country" DROP NOT NULL;
