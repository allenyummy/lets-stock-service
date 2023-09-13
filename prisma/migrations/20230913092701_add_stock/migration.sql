/*
  Warnings:

  - Added the required column `securitiesFirm` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `share` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "handlingFees" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "securitiesFirm" TEXT NOT NULL,
ADD COLUMN     "share" INTEGER NOT NULL,
ADD COLUMN     "transactionTax" INTEGER NOT NULL DEFAULT 0;
