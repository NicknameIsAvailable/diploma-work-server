-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_curatorId_fkey";

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "curatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_curatorId_fkey" FOREIGN KEY ("curatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
