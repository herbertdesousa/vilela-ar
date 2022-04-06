-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('PERSONAL', 'ENTITY');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('RECIPT', 'BUDGET');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT,
    "type" "CustomerType" NOT NULL DEFAULT E'PERSONAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerAddress" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerRepresentative" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerRepresentative_pkey" PRIMARY KEY ("id")
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
    "customerId" TEXT,

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

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "type" "DocumentType" NOT NULL DEFAULT E'BUDGET',
    "customerRepresentativeId" TEXT,
    "customerAddressId" TEXT,
    "customerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentBlock" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "price" INTEGER,
    "description" TEXT,
    "documentRefBlockNameId" TEXT,

    CONSTRAINT "DocumentBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentBlockMaterial" (
    "id" TEXT NOT NULL,
    "documentBlockId" TEXT NOT NULL,
    "documentRefMaterialId" TEXT,

    CONSTRAINT "DocumentBlockMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRefDeviceBrand" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefDeviceBrand_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "DocumentRefDeviceCapacity" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefDeviceCapacity_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "DocumentRefDeviceMode" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefDeviceMode_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "DocumentRefPlaceRoom" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefPlaceRoom_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "DocumentRefPlaceFloor" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefPlaceFloor_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "DocumentRefMaterial" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefMaterial_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "DocumentRefBlockName" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefBlockName_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefDeviceBrand_name_key" ON "DocumentRefDeviceBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefDeviceCapacity_name_key" ON "DocumentRefDeviceCapacity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefDeviceMode_name_key" ON "DocumentRefDeviceMode"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefPlaceRoom_name_key" ON "DocumentRefPlaceRoom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefPlaceFloor_name_key" ON "DocumentRefPlaceFloor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefMaterial_name_key" ON "DocumentRefMaterial"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefBlockName_name_key" ON "DocumentRefBlockName"("name");

-- AddForeignKey
ALTER TABLE "CustomerAddress" ADD CONSTRAINT "CustomerAddress_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerRepresentative" ADD CONSTRAINT "CustomerRepresentative_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_financeIncomeId_fkey" FOREIGN KEY ("financeIncomeId") REFERENCES "FinanceIncome"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_financeOutcomeId_fkey" FOREIGN KEY ("financeOutcomeId") REFERENCES "FinanceOutcome"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceIncome" ADD CONSTRAINT "FinanceIncome_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerAddressId_fkey" FOREIGN KEY ("customerAddressId") REFERENCES "CustomerAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerRepresentativeId_fkey" FOREIGN KEY ("customerRepresentativeId") REFERENCES "CustomerRepresentative"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentBlock" ADD CONSTRAINT "DocumentBlock_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentBlock" ADD CONSTRAINT "DocumentBlock_documentRefBlockNameId_fkey" FOREIGN KEY ("documentRefBlockNameId") REFERENCES "DocumentRefBlockName"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentBlockMaterial" ADD CONSTRAINT "DocumentBlockMaterial_documentBlockId_fkey" FOREIGN KEY ("documentBlockId") REFERENCES "DocumentBlock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentBlockMaterial" ADD CONSTRAINT "DocumentBlockMaterial_documentRefMaterialId_fkey" FOREIGN KEY ("documentRefMaterialId") REFERENCES "DocumentRefMaterial"("name") ON DELETE SET NULL ON UPDATE CASCADE;
