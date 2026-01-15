
export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
}
export interface Position {
  pair: string;
  size: number;
  avg_entry: number;
  realized_pnl: number;
}

export interface Trade {
  id: number;
  pair: string;
  side: 'buy' | 'sell';
  price: number;
  amount: number;
  total: number;
  fee: number;
  realized_pnl: number;
  time: string;
}


export interface MarketData {
  pair: string;
  price: number;
  change: number;
  volume: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface OpenOrder {
  id: number;
  pair: string;
  side: 'buy' | 'sell';
  price: number;
  amount: number;
  filled: number;
  status: 'pending' | 'partially_filled' | 'filling';
}
