/*
  Warnings:

  - You are about to drop the column `locationId` on the `Group` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `Speciality` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_locationId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "locationId";

-- AlterTable
ALTER TABLE "Speciality" ADD COLUMN     "locationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Speciality" ADD CONSTRAINT "Speciality_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
