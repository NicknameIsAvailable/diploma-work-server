/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the `_LessonSchedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "_LessonSchedules" DROP CONSTRAINT "_LessonSchedules_A_fkey";

-- DropForeignKey
ALTER TABLE "_LessonSchedules" DROP CONSTRAINT "_LessonSchedules_B_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "scheduleId",
ADD COLUMN     "scheduleDayId" TEXT;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "lessonId";

-- DropTable
DROP TABLE "_LessonSchedules";

-- CreateTable
CREATE TABLE "ScheduleDay" (
    "id" TEXT NOT NULL,
    "day" "DayOfWeek" NOT NULL,
    "scheduleId" TEXT NOT NULL,

    CONSTRAINT "ScheduleDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_scheduleDayId_fkey" FOREIGN KEY ("scheduleDayId") REFERENCES "ScheduleDay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleDay" ADD CONSTRAINT "ScheduleDay_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
