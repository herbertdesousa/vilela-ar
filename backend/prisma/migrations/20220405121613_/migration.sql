-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('RECIPT', 'BUDGET');

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "type" "DocumentType" NOT NULL DEFAULT E'BUDGET',
    "customerRepresentativeId" TEXT NOT NULL,
    "customerAddressId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerAddressId_fkey" FOREIGN KEY ("customerAddressId") REFERENCES "CustomerAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerRepresentativeId_fkey" FOREIGN KEY ("customerRepresentativeId") REFERENCES "CustomerRepresentative"("id") ON DELETE CASCADE ON UPDATE CASCADE;
