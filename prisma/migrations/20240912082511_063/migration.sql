/*
  Warnings:

  - The values [OMRv] on the enum `CURRENCY` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CURRENCY_new" AS ENUM ('AED', 'OMR', 'QAR', 'BHD', 'KWD', 'SAR');
ALTER TABLE "Job" ALTER COLUMN "currency" DROP DEFAULT;
ALTER TABLE "JobSeekerProfile" ALTER COLUMN "currency" DROP DEFAULT;
ALTER TABLE "JobSeekerProfile" ALTER COLUMN "currency" TYPE "CURRENCY_new" USING ("currency"::text::"CURRENCY_new");
ALTER TABLE "Job" ALTER COLUMN "currency" TYPE "CURRENCY_new" USING ("currency"::text::"CURRENCY_new");
ALTER TYPE "CURRENCY" RENAME TO "CURRENCY_old";
ALTER TYPE "CURRENCY_new" RENAME TO "CURRENCY";
DROP TYPE "CURRENCY_old";
ALTER TABLE "Job" ALTER COLUMN "currency" SET DEFAULT 'AED';
ALTER TABLE "JobSeekerProfile" ALTER COLUMN "currency" SET DEFAULT 'AED';
COMMIT;
