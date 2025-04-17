/*
  Warnings:

  - Changed the type of `day` on the `ScheduleDay` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ScheduleDay" DROP COLUMN "day",
ADD COLUMN     "day" TEXT NOT NULL;

-- DropEnum
DROP TYPE "DayOfWeek";
