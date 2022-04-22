/*
  Warnings:

  - You are about to drop the column `financeIncomeId` on the `Finance` table. All the data in the column will be lost.
  - You are about to drop the column `financeOutcomeId` on the `Finance` table. All the data in the column will be lost.
  - You are about to drop the `FinanceIncome` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinanceOutcome` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Finance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Finance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FinanceType" AS ENUM ('INCOME', 'OUTCOME');

-- DropForeignKey
ALTER TABLE "Finance" DROP CONSTRAINT "Finance_financeIncomeId_fkey";

-- DropForeignKey
ALTER TABLE "Finance" DROP CONSTRAINT "Finance_financeOutcomeId_fkey";

-- AlterTable
ALTER TABLE "Finance" DROP COLUMN "financeIncomeId",
DROP COLUMN "financeOutcomeId",
ADD COLUMN     "date" DATE NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" "FinanceType" NOT NULL DEFAULT E'OUTCOME',
ADD COLUMN     "value" INTEGER NOT NULL;

-- DropTable
DROP TABLE "FinanceIncome";

-- DropTable
DROP TABLE "FinanceOutcome";
