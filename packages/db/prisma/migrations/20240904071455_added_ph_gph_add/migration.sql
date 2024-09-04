/*
  Warnings:

  - A unique constraint covering the columns `[Phone_number]` on the table `homepass` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Guardians_Pno]` on the table `homepass` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Phone_number]` on the table `outpass` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Guardians_Pno]` on the table `outpass` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Address` to the `homepass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Guardians_Pno` to the `homepass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Phone_number` to the `homepass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Address` to the `outpass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Guardians_Pno` to the `outpass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Phone_number` to the `outpass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "homepass" ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "Guardians_Pno" TEXT NOT NULL,
ADD COLUMN     "Phone_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outpass" ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "Guardians_Pno" TEXT NOT NULL,
ADD COLUMN     "Phone_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "homepass_Phone_number_key" ON "homepass"("Phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "homepass_Guardians_Pno_key" ON "homepass"("Guardians_Pno");

-- CreateIndex
CREATE UNIQUE INDEX "outpass_Phone_number_key" ON "outpass"("Phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "outpass_Guardians_Pno_key" ON "outpass"("Guardians_Pno");
