export enum TradeCategory {
  Buy = 'buy',
  Sell = 'sell',
  Receive = 'receive',
}

export interface StockDto {
  code: string;
  tradeCategory: TradeCategory;
  tradedAt: Date;
}
