import { Module } from '@nestjs/common';
import { StockModule } from './stock/stock.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [StockModule, PrismaModule],
})
export class AppModule {}
