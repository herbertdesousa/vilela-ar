-- CreateTable
CREATE TABLE "DocumentRefPlaceDeviceBrand" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefPlaceDeviceBrand_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "DocumentRefPlaceDeviceCapacity" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefPlaceDeviceCapacity_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "DocumentRefPlaceDeviceMode" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefPlaceDeviceMode_pkey" PRIMARY KEY ("name")
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
CREATE TABLE "DocumentRefMaterialItem" (
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentRefMaterialItem_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefPlaceDeviceBrand_name_key" ON "DocumentRefPlaceDeviceBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefPlaceDeviceCapacity_name_key" ON "DocumentRefPlaceDeviceCapacity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefPlaceDeviceMode_name_key" ON "DocumentRefPlaceDeviceMode"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefPlaceRoom_name_key" ON "DocumentRefPlaceRoom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefPlaceFloor_name_key" ON "DocumentRefPlaceFloor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRefMaterialItem_name_key" ON "DocumentRefMaterialItem"("name");
