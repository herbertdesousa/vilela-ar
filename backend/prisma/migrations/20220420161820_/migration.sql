/*
  Warnings:

  - You are about to drop the column `customerId` on the `FinanceIncome` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FinanceIncome" DROP CONSTRAINT "FinanceIncome_customerId_fkey";

-- AlterTable
ALTER TABLE "FinanceIncome" DROP COLUMN "customerId";
