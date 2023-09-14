import { Controller, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto, PartialStockDto } from './dto';

@Controller('v1/stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get('record')
  find(@Body() dto: PartialStockDto) {
    return this.stockService.find(dto);
  }

  @Post('record')
  create(@Body() dto: StockDto) {
    return this.stockService.create(dto);
  }

  @Put('record')
  update() {
    return this.stockService.update();
  }

  @Delete('record')
  delete() {
    return this.stockService.delete();
  }
}
