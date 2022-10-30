-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "course" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "block" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);
