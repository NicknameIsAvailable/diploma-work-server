/*
  Warnings:

  - Added the required column `course` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "course" INTEGER NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL;
