-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "isBase" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL,
    "altText" VARCHAR(255),
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleCrossSubject" (
    "scheduleId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "cabinetId" INTEGER NOT NULL,
    "info" VARCHAR(25),

    CONSTRAINT "ScheduleCrossSubject_pkey" PRIMARY KEY ("scheduleId","subjectId")
);

-- CreateTable
CREATE TABLE "Cabinet" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(25) NOT NULL,

    CONSTRAINT "Cabinet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "patronymic" VARCHAR(255) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectCrossTeacher" (
    "subjectId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "SubjectCrossTeacher_pkey" PRIMARY KEY ("subjectId","teacherId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleCrossSubject_scheduleId_index_key" ON "ScheduleCrossSubject"("scheduleId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "Cabinet_value_key" ON "Cabinet"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleCrossSubject" ADD CONSTRAINT "ScheduleCrossSubject_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleCrossSubject" ADD CONSTRAINT "ScheduleCrossSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleCrossSubject" ADD CONSTRAINT "ScheduleCrossSubject_cabinetId_fkey" FOREIGN KEY ("cabinetId") REFERENCES "Cabinet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectCrossTeacher" ADD CONSTRAINT "SubjectCrossTeacher_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectCrossTeacher" ADD CONSTRAINT "SubjectCrossTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
