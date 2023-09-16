import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockDto, PartialStockDto } from './dto';

@Injectable()
export class StockService {
  constructor(private prismaService: PrismaService) {}

  async find(userId: number, dto: PartialStockDto) {
    const stocks = await this.prismaService.stock.findMany({
      where: {
        userId: userId,
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
        id: true,
        userId: true,
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

  async create(userId: number, dto: StockDto) {
    const stock = await this.prismaService.stock.create({
      data: {
        userId,
        ...dto,
      },
    });
    return stock;
  }

  async update() {
    throw new NotImplementedException();
  }

  async delete(userId: number, stockId: number, dto: PartialStockDto) {
    const stock = await this.prismaService.stock.findUnique({
      where: {
        id: stockId,
        userId: userId,
        code: dto.code,
        tradeCategory: dto.tradeCategory,
        securitiesFirm: dto.securitiesFirm,
        tradedAt: dto.tradedAt,
      },
    });
    if (!stock || stock.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    await this.prismaService.stock.delete({
      where: {
        id: stockId,
      },
    });
  }
}
