/*
  Warnings:

  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "LastName" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "hashPassword" TEXT NOT NULL;
