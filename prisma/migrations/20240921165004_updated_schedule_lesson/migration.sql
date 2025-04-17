/*
  Warnings:

  - You are about to drop the `ScheduleLessons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ScheduleLessons" DROP CONSTRAINT "ScheduleLessons_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleLessons" DROP CONSTRAINT "ScheduleLessons_scheduleDayId_fkey";

-- DropForeignKey
ALTER TABLE "_LessonTeachers" DROP CONSTRAINT "_LessonTeachers_A_fkey";

-- DropTable
DROP TABLE "ScheduleLessons";

-- CreateTable
CREATE TABLE "ScheduleLesson" (
    "id" TEXT NOT NULL,
    "audiences" TEXT[],
    "scheduleDayId" TEXT,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "ScheduleLesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScheduleLesson" ADD CONSTRAINT "ScheduleLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleLesson" ADD CONSTRAINT "ScheduleLesson_scheduleDayId_fkey" FOREIGN KEY ("scheduleDayId") REFERENCES "ScheduleDay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonTeachers" ADD CONSTRAINT "_LessonTeachers_A_fkey" FOREIGN KEY ("A") REFERENCES "ScheduleLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
