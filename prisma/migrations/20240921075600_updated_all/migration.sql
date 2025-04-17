/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[groupId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `curatorId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_groupId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "scheduleId",
ADD COLUMN     "curatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "lessonId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "groupId",
ADD COLUMN     "studentGroupId" TEXT;

-- CreateTable
CREATE TABLE "_LessonSchedules" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LessonSchedules_AB_unique" ON "_LessonSchedules"("A", "B");

-- CreateIndex
CREATE INDEX "_LessonSchedules_B_index" ON "_LessonSchedules"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_groupId_key" ON "Schedule"("groupId");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_curatorId_fkey" FOREIGN KEY ("curatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_studentGroupId_fkey" FOREIGN KEY ("studentGroupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonSchedules" ADD CONSTRAINT "_LessonSchedules_A_fkey" FOREIGN KEY ("A") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonSchedules" ADD CONSTRAINT "_LessonSchedules_B_fkey" FOREIGN KEY ("B") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
