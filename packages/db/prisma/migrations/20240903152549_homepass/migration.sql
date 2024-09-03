/*
  Warnings:

  - Added the required column `Place` to the `homepass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Place` to the `outpass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "homepass" ADD COLUMN     "Place" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outpass" ADD COLUMN     "Place" TEXT NOT NULL;
