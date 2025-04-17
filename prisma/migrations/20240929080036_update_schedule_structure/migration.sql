/*
  Warnings:

  - You are about to drop the column `audiences` on the `ScheduleLesson` table. All the data in the column will be lost.
  - Made the column `scheduleDayId` on table `ScheduleLesson` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ScheduleLesson" DROP CONSTRAINT "ScheduleLesson_scheduleDayId_fkey";

-- AlterTable
ALTER TABLE "ScheduleLesson" DROP COLUMN "audiences",
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "scheduleDayId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ScheduleLesson" ADD CONSTRAINT "ScheduleLesson_scheduleDayId_fkey" FOREIGN KEY ("scheduleDayId") REFERENCES "ScheduleDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
