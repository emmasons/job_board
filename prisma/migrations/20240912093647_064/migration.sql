-- CreateEnum
CREATE TYPE "SUBSCRIPTION_TYPE" AS ENUM ('NEWSLETTER', 'JOB_POSTINGS');

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "SUBSCRIPTION_TYPE" NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);
