/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `page` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "page_name_key" ON "page"("name");
