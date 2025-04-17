/*
  Warnings:

  - Added the required column `order` to the `ScheduleDay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScheduleDay" ADD COLUMN     "order" INTEGER NOT NULL;
