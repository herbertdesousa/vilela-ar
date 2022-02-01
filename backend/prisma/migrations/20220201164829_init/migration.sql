-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('PERSONAL', 'ENTITY');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT,
    "type" "CustomerType" NOT NULL DEFAULT E'PERSONAL',
    "representative" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "financeIncomeId" TEXT,
    "financeOutcomeId" TEXT,

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceIncome" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "value" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "FinanceIncome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceOutcome" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "value" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinanceOutcome_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_financeIncomeId_fkey" FOREIGN KEY ("financeIncomeId") REFERENCES "FinanceIncome"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_financeOutcomeId_fkey" FOREIGN KEY ("financeOutcomeId") REFERENCES "FinanceOutcome"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceIncome" ADD CONSTRAINT "FinanceIncome_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
