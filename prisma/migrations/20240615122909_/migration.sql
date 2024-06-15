/*
  Warnings:

  - You are about to drop the column `planId` on the `permission` table. All the data in the column will be lost.
  - Added the required column `plan_id` to the `permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permission" DROP CONSTRAINT "permission_planId_fkey";

-- AlterTable
ALTER TABLE "permission" DROP COLUMN "planId",
ADD COLUMN     "plan_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "permission" ADD CONSTRAINT "permission_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
