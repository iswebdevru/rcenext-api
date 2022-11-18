-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_groupId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleCrossSubject" DROP CONSTRAINT "ScheduleCrossSubject_cabinetId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleCrossSubject" DROP CONSTRAINT "ScheduleCrossSubject_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleCrossSubject" DROP CONSTRAINT "ScheduleCrossSubject_subjectId_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectCrossTeacher" DROP CONSTRAINT "SubjectCrossTeacher_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectCrossTeacher" DROP CONSTRAINT "SubjectCrossTeacher_teacherId_fkey";

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleCrossSubject" ADD CONSTRAINT "ScheduleCrossSubject_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleCrossSubject" ADD CONSTRAINT "ScheduleCrossSubject_subjectId_teacherId_fkey" FOREIGN KEY ("subjectId", "teacherId") REFERENCES "SubjectCrossTeacher"("subjectId", "teacherId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleCrossSubject" ADD CONSTRAINT "ScheduleCrossSubject_cabinetId_fkey" FOREIGN KEY ("cabinetId") REFERENCES "Cabinet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectCrossTeacher" ADD CONSTRAINT "SubjectCrossTeacher_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectCrossTeacher" ADD CONSTRAINT "SubjectCrossTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
