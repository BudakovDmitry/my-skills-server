/*
  Warnings:

  - You are about to drop the column `recipient_id` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_recipient_id_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "recipient_id";
