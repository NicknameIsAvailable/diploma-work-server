-- DropForeignKey
ALTER TABLE "ScheduleLesson" DROP CONSTRAINT "ScheduleLesson_scheduleDayId_fkey";

-- AlterTable
ALTER TABLE "ScheduleLesson" ALTER COLUMN "scheduleDayId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ScheduleLesson" ADD CONSTRAINT "ScheduleLesson_scheduleDayId_fkey" FOREIGN KEY ("scheduleDayId") REFERENCES "ScheduleDay"("id") ON DELETE SET NULL ON UPDATE CASCADE;
