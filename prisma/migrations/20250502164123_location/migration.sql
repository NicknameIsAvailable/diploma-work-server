/*
  Warnings:

  - Added the required column `locationId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Speciality" DROP CONSTRAINT "Speciality_locationId_fkey";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "locationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Speciality" ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Speciality" ADD CONSTRAINT "Speciality_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
