export interface PortfolioDto {
  portfolioName: string;
  portfolioCurrentValue: number;
  trade: TradeDto[];
}

export interface TradeDto {
  stockName: string;
  ticker: string;
  averageBuyingCostPerShare: number;
  totalGainOrLoss: number;
  quantity: number;
  totalCurrentValue: number;
  lastPricePerShare: number;
}


export interface TickerDetails {
  ticker: string;
  shortName: string;
  currentPrice: string;
}

export interface TransactionDto extends CreateTransactionDto {
  transactionId: string;
}

export interface CreateTransactionDto {
  ticker: string;
  executedOn: string;
  transactionType: TransactionType;
  quantity: number;
  tickerPrice: number;
}

export enum TransactionType {
  SELL = 1,
  BUY = 2
}



