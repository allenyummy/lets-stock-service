import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockDto } from './dto';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  async create(dto: StockDto) {
    const stock = await this.prisma.stock.create({
      data: {
        code: dto.code,
        tradeCategory: dto.tradeCategory,
        tradedAt: dto.tradedAt,
      },
    });
    return stock;
  }
}
