/*
  Warnings:

  - You are about to drop the column `Fname` on the `Hostellers` table. All the data in the column will be lost.
  - You are about to drop the column `Lname` on the `Hostellers` table. All the data in the column will be lost.
  - You are about to drop the column `valid` on the `Hostellers` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `outpass` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Name]` on the table `Hostellers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Name` to the `Hostellers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `outpass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hostellers" DROP COLUMN "Fname",
DROP COLUMN "Lname",
DROP COLUMN "valid",
ADD COLUMN     "Name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outpass" DROP COLUMN "name",
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "valid" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Hostellers_Name_key" ON "Hostellers"("Name");
