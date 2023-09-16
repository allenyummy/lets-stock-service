/*
  Warnings:

  - You are about to drop the `stocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_userId_fkey";

-- DropTable
DROP TABLE "stocks";

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "share" INTEGER NOT NULL,
    "tradeCategory" TEXT NOT NULL,
    "handlingFees" INTEGER NOT NULL,
    "transactionTax" INTEGER NOT NULL,
    "securitiesFirm" TEXT NOT NULL,
    "tradedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);
