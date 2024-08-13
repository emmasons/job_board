-- CreateEnum
CREATE TYPE "CURRENCY" AS ENUM ('AED', 'OMRv', 'OMR', 'BHD', 'KWD', 'SAR');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "currency" "CURRENCY" NOT NULL DEFAULT 'AED';
