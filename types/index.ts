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

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   balance: number; // This represents the primary USDT/Liquid balance
//   isEmailVerified: boolean;
//   vipTier: 'Bronze' | 'Silver' | 'Gold' | 'VIP';
// }

export interface AssetBalance {
  symbol: string;
  name: string;
  total: number;
  available: number;
  locked: number;
  valueUsdt: number;
}

// export interface Trade {
//   id: string;
//   pair: string;
//   price: number;
//   amount: number;
//   time: string;
//   type: 'buy' | 'sell';
//   total: number;
// }

// export interface Message {
//   role: 'user' | 'assistant';
//   content: string;
//   timestamp: Date;
// }

export type TabID =
  | 'dashboard'
  | 'exchange'
  | 'futures'
  | 'p2p'
  | 'wallet'
  | 'orders'
  | 'fees'
  | 'vehicles'
  | 'security'
  | 'support'
  | 'status'
  | 'ai-assistant'
  | 'academy'
  | 'business-lab'
  | 'business-network'
  | 'marketplace'
  | 'careers'
  | 'chat'
  | 'social-lounge'
  | 'entertainment'
  | 'rewards'
  | 'sport'
  | 'token-economy'
  | 'charity'
  | 'investors'
  | 'partnerships'
  | 'about'
  | 'legal'
  | 'settings';