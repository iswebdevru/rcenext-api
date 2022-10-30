-- CreateEnum
CREATE TYPE "Block" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURH', 'FIFTH', 'SIXTH');

-- CreateEnum
CREATE TYPE "Course" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH');

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "index" INTEGER NOT NULL,
    "course" "Course" NOT NULL,
    "block" "Block" NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);
