import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto, PartialStockDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('v1/stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get('records')
  findByUserId(@GetUser('id') userId: number, @Body() dto: PartialStockDto) {
    return this.stockService.find(userId, dto);
  }

  @Post('records')
  createByUserId(@GetUser('id') userId: number, @Body() dto: StockDto) {
    return this.stockService.create(userId, dto);
  }

  @Patch('records/:id')
  update(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) stockId: number,
    @Body() dto: PartialStockDto,
  ) {
    return this.stockService.update(userId, stockId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('records/:id')
  deleteByUserId(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) stockId: number,
  ) {
    return this.stockService.delete(userId, stockId);
  }
}
