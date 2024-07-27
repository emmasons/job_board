-- CreateEnum
CREATE TYPE "JOBSTATUS" AS ENUM ('OPEN', 'CLOSED', 'DRAFT');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "status" "JOBSTATUS" NOT NULL DEFAULT 'DRAFT';
