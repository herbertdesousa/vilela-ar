/*
  Warnings:

  - Made the column `quantity` on table `DocumentBlockPlaceDevice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DocumentBlockPlaceDevice" ALTER COLUMN "quantity" SET NOT NULL;
