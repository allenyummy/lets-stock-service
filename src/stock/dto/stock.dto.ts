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

export interface StockDto {
  code: string;
  share: number;
  tradeCategory: TradeCategory;
  handlingFees: number;
  transactionTax: number;
  securitiesFirm: SecuritiesFirm;
  tradedAt: Date;
}
