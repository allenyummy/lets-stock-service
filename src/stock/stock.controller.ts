import { Controller, Post, Body } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto } from './dto';

@Controller('v1/stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Post('record')
  create(@Body() dto: StockDto) {
    return this.stockService.create(dto);
  }
}
