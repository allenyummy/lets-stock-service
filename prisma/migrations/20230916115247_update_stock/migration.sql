/*
  Warnings:

  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Stock";

-- CreateTable
CREATE TABLE "stocks" (
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
    "userId" INTEGER NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
