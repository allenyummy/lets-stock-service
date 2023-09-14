import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockDto, PartialStockDto } from './dto';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  async find(dto: PartialStockDto) {
    const stocks = await this.prisma.stock.findMany({
      where: {
        code: dto.code,
        tradeCategory: dto.tradeCategory,
        securitiesFirm: dto.securitiesFirm,
      },
      orderBy: [
        {
          code: 'asc',
        },
        {
          tradeCategory: 'asc',
        },
        {
          tradedAt: 'desc',
        },
        {
          securitiesFirm: 'asc',
        },
      ],
      select: {
        code: true,
        share: true,
        tradeCategory: true,
        handlingFees: true,
        transactionTax: true,
        securitiesFirm: true,
        tradedAt: true,
      },
    });
    return stocks;
  }

  async create(dto: StockDto) {
    const stock = await this.prisma.stock.create({
      data: dto,
    });
    return stock;
  }

  async update() {
    throw new NotImplementedException();
  }

  async delete() {
    throw new NotImplementedException();
  }
}
