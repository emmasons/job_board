/*
  Warnings:

  - You are about to drop the column `contractType` on the `JobAlert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobAlert" DROP COLUMN "contractType",
ADD COLUMN     "contractTypes" "ContractType"[];
