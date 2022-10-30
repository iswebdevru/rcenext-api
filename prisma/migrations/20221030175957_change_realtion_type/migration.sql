/*
  Warnings:

  - Added the required column `teacherId` to the `ScheduleCrossSubject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ScheduleCrossSubject" DROP CONSTRAINT "ScheduleCrossSubject_subjectId_fkey";

-- AlterTable
ALTER TABLE "ScheduleCrossSubject" ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ScheduleCrossSubject" ADD CONSTRAINT "ScheduleCrossSubject_subjectId_teacherId_fkey" FOREIGN KEY ("subjectId", "teacherId") REFERENCES "SubjectCrossTeacher"("subjectId", "teacherId") ON DELETE RESTRICT ON UPDATE CASCADE;
