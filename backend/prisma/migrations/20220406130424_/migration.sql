-- CreateEnum
CREATE TYPE "DocumentBlockPlaceDeviceType" AS ENUM ('INSIDE', 'OUTSIDE', 'BOTH');

-- CreateTable
CREATE TABLE "DocumentBlockPlace" (
    "id" TEXT NOT NULL,
    "documentBlockId" TEXT NOT NULL,
    "documentRefPlaceFloorId" TEXT,
    "documentRefPlaceRoomId" TEXT,

    CONSTRAINT "DocumentBlockPlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentBlockPlaceDevice" (
    "id" TEXT NOT NULL,
    "documentBlockPlaceId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "type" "DocumentBlockPlaceDeviceType" NOT NULL DEFAULT E'INSIDE',
    "documentRefDeviceBrandId" TEXT,
    "documentRefDeviceCapacityId" TEXT,
    "documentRefDeviceModeId" TEXT,

    CONSTRAINT "DocumentBlockPlaceDevice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DocumentBlockPlace" ADD CONSTRAINT "DocumentBlockPlace_documentBlockId_fkey" FOREIGN KEY ("documentBlockId") REFERENCES "DocumentBlock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentBlockPlace" ADD CONSTRAINT "DocumentBlockPlace_documentRefPlaceRoomId_fkey" FOREIGN KEY ("documentRefPlaceRoomId") REFERENCES "DocumentRefPlaceRoom"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentBlockPlace" ADD CONSTRAINT "DocumentBlockPlace_documentRefPlaceFloorId_fkey" FOREIGN KEY ("documentRefPlaceFloorId") REFERENCES "DocumentRefPlaceFloor"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentBlockPlaceDevice" ADD CONSTRAINT "DocumentBlockPlaceDevice_documentBlockPlaceId_fkey" FOREIGN KEY ("documentBlockPlaceId") REFERENCES "DocumentBlockPlace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentBlockPlaceDevice" ADD CONSTRAINT "DocumentBlockPlaceDevice_documentRefDeviceBrandId_fkey" FOREIGN KEY ("documentRefDeviceBrandId") REFERENCES "DocumentRefDeviceBrand"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentBlockPlaceDevice" ADD CONSTRAINT "DocumentBlockPlaceDevice_documentRefDeviceCapacityId_fkey" FOREIGN KEY ("documentRefDeviceCapacityId") REFERENCES "DocumentRefDeviceCapacity"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentBlockPlaceDevice" ADD CONSTRAINT "DocumentBlockPlaceDevice_documentRefDeviceModeId_fkey" FOREIGN KEY ("documentRefDeviceModeId") REFERENCES "DocumentRefDeviceMode"("name") ON DELETE SET NULL ON UPDATE CASCADE;
