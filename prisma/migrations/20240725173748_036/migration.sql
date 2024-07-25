/*
  Warnings:

  - You are about to drop the column `companyId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employerProfileId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employerProfileId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postalCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_ownerId_fkey";

-- DropIndex
DROP INDEX "Address_companyId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "companyId",
DROP COLUMN "zipCode",
ADD COLUMN     "employerProfileId" TEXT,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ALTER COLUMN "addressLineTwo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "ownerId",
ADD COLUMN     "employerProfileId" TEXT;

-- CreateTable
CREATE TABLE "EmployerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EmployerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployerProfile_userId_key" ON "EmployerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_employerProfileId_key" ON "Address"("employerProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_employerProfileId_key" ON "Company"("employerProfileId");

-- AddForeignKey
ALTER TABLE "EmployerProfile" ADD CONSTRAINT "EmployerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_employerProfileId_fkey" FOREIGN KEY ("employerProfileId") REFERENCES "EmployerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_employerProfileId_fkey" FOREIGN KEY ("employerProfileId") REFERENCES "EmployerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
