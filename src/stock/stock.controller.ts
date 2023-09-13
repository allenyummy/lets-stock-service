import { Controller, Post, Body } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto } from './dto';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Post('create')
  create(@Body() dto: StockDto) {
    return this.stockService.create(dto);
  }
}
