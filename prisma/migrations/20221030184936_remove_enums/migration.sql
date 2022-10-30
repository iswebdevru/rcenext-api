/*
  Warnings:

  - Changed the type of `course` on the `Group` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `block` on the `Group` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/

DELETE FROM "Group";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "course",
ADD COLUMN     "course" INTEGER NOT NULL,
DROP COLUMN "block",
ADD COLUMN     "block" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Block";

-- DropEnum
DROP TYPE "Course";
