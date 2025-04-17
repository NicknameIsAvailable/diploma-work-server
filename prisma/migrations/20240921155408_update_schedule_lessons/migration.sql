/*
  Warnings:

  - You are about to drop the column `audiences` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleDayId` on the `Lesson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_scheduleDayId_fkey";

-- DropForeignKey
ALTER TABLE "_LessonTeachers" DROP CONSTRAINT "_LessonTeachers_A_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "audiences",
DROP COLUMN "scheduleDayId";

-- CreateTable
CREATE TABLE "ScheduleLessons" (
    "id" TEXT NOT NULL,
    "audiences" TEXT[],
    "scheduleDayId" TEXT,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "ScheduleLessons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScheduleLessons" ADD CONSTRAINT "ScheduleLessons_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleLessons" ADD CONSTRAINT "ScheduleLessons_scheduleDayId_fkey" FOREIGN KEY ("scheduleDayId") REFERENCES "ScheduleDay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonTeachers" ADD CONSTRAINT "_LessonTeachers_A_fkey" FOREIGN KEY ("A") REFERENCES "ScheduleLessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
