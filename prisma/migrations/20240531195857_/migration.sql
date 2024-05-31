/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `page_link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `page_link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "page_link" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "page_link_order_key" ON "page_link"("order");
