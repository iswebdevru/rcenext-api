/*
  Warnings:

  - A unique constraint covering the columns `[groupId,date]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Schedule_groupId_date_key" ON "Schedule"("groupId", "date");
