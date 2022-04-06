-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_customerAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_customerRepresentativeId_fkey";

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "customerRepresentativeId" DROP NOT NULL,
ALTER COLUMN "customerAddressId" DROP NOT NULL,
ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerAddressId_fkey" FOREIGN KEY ("customerAddressId") REFERENCES "CustomerAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerRepresentativeId_fkey" FOREIGN KEY ("customerRepresentativeId") REFERENCES "CustomerRepresentative"("id") ON DELETE SET NULL ON UPDATE CASCADE;
