-- AlterTable
ALTER TABLE "_LessonTeachers" ADD CONSTRAINT "_LessonTeachers_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_LessonTeachers_AB_unique";
