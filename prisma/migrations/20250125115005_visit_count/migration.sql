/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `VisitCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VisitCount_date_key" ON "VisitCount"("date");
