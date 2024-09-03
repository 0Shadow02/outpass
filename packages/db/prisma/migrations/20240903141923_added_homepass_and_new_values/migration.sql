/*
  Warnings:

  - A unique constraint covering the columns `[Phone_number]` on the table `Hostellers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Guardians_Pno]` on the table `Hostellers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Address` to the `Hostellers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Guardians_Pno` to the `Hostellers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Phone_number` to the `Hostellers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hostellers" ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "Guardians_Pno" INTEGER NOT NULL,
ADD COLUMN     "Phone_number" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "homepass" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT false,
    "StartTime" TIMESTAMP(3) NOT NULL,
    "Indate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homepass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hostellers_Phone_number_key" ON "Hostellers"("Phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Hostellers_Guardians_Pno_key" ON "Hostellers"("Guardians_Pno");

-- AddForeignKey
ALTER TABLE "homepass" ADD CONSTRAINT "homepass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Hostellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
