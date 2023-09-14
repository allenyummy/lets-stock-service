import {
  IsInt,
  IsNotEmpty,
  IsEnum,
  IsString,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

export enum TradeCategory {
  Buy = 'buy',
  Sell = 'sell',
  Receive = 'receive',
}

export enum SecuritiesFirm {
  /** 國泰證券 */
  Cathay = 'cathay',
  /** 中信證券 */
  CTBC = 'ctbc',
  /** 群益證券 */
  Capital = 'capital',
  /** 凱基證券 */
  KGI = 'kgi',
}

export class StockDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  share: number;

  @IsEnum(TradeCategory)
  @IsNotEmpty()
  tradeCategory: TradeCategory;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  handlingFees: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  transactionTax: number;

  @IsEnum(SecuritiesFirm)
  @IsNotEmpty()
  securitiesFirm: SecuritiesFirm;

  @IsDateString()
  @IsNotEmpty()
  tradedAt: Date;
}

export class PartialStockDto extends PartialType(StockDto) {}
