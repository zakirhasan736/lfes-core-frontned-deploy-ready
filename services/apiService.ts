import { User, Trade, } from '@/types/index';
import { OpenOrder } from '@/components/home/HomeClient';
import { TerminalError } from './errors';
/**
 * LFES TERMINAL - INTEGRATED API SERVICE
 * 
 * Full synchronization with LFES backend protocol.
 * Handling both immediate trades and persistent orders.
 */

// export class TerminalError extends Error {
//   constructor(public message: string, public code: string = 'SYNC_ERROR') {
//     super(message);
//     this.name = 'TerminalError';
//   }
// }

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/* =========================
   Core request helper
========================= */ 
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });


    if (!res.ok) {
      let message = 'Protocol communication failure.';
      const code = `HTTP_${res.status}`;

      try {
        const data = await res.json();
        if (typeof data?.detail === 'string') {
          message = data.detail;
        }
      } catch {
        // non-JSON response (HTML / proxy / crash)
      }

      throw new TerminalError(message, code);
    }

    return (await res.json()) as T;
  } catch (err: unknown) {
    if (err instanceof TerminalError) throw err;
    throw new TerminalError('Network node unreachable. Check terminal uplink.', 'NETWORK_ERROR');
  }
}

export const apiService = {
  // --- AUTHENTICATION ---

  async signup(name: string, email: string, password: string): Promise<User> {
    await request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    return this.login(email, password);
  },

  async login(email: string, password: string): Promise<User> {
    await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return await this.me();
  },

  async logout(): Promise<void> {
    await request('/auth/logout', { method: 'POST' });
  },

  async me(): Promise<User> {
    return await request<User>('/auth/me');
  },

  async requestKeyRecovery(email: string): Promise<void> {
    await request('/auth/recovery/request', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async verifyRecoveryCode(email: string, code: string): Promise<boolean> {
    const res = await request<{ valid: boolean }>('/auth/recovery/verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });

    return res.valid === true;
  },

  async resetAccessKey(email: string, newPassword: string): Promise<void> {
    await request('/auth/recovery/reset', {
      method: 'POST',
      body: JSON.stringify({
        email,
        new_password: newPassword,
      }),
    });
  },
  // --- TRADING & ORDERS ---

  /**
   * Immediate Execution Endpoint
   */
  async executeTrade(
    side: 'buy' | 'sell',
    pair: string,
    price: number,
    amount: number
  ): Promise<Trade> {
    return request<Trade>('/trade', {
      method: 'POST',
      body: JSON.stringify({ side, pair, price, amount }),
    });
  },

  /**
   * Historical Trades
   */
  async fetchTradeHistory(): Promise<Trade[]> {
    return request<Trade[]>('/trade/history');
  },

  /**
   * Create New Order (Phase 2)
   */
  async createOrder(
    side: 'buy' | 'sell',
    pair: string,
    price: number,
    amount: number
  ): Promise<OpenOrder> {
    return await request<OpenOrder>('/orders', {
      method: 'POST',
      body: JSON.stringify({ side, pair, price, amount }),
    });
  },

  /**
   * Fetch Active Open Orders
   */
  async fetchOpenOrders(): Promise<OpenOrder[]> {
    try {
      return await request<OpenOrder[]>('/orders/open');
    } catch (e) {
      // Graceful fallback if orders endpoint is not yet fully initialized on specific nodes
      return [];
    }
  },

  /**
   * Cancel Specific Order Cluster
   */
  async cancelOrder(orderId: string | number): Promise<void> {
    return await request(`/orders/${orderId}/cancel`, {
      method: 'POST',
    });
  },

  // --- DATA RETRIEVAL ---

  async fetchUserData(): Promise<User | null> {
    try {
      return await this.me();
    } catch (e) {
      return null;
    }
  },

  async fetchOrderBook(pair: string, currentPrice: number) {
    const base = pair.split('/')[0];
    const generate = (isAsk: boolean) =>
      Array.from({ length: 12 }, (_, i) => ({
        price: isAsk
          ? currentPrice + (12 - i) * (currentPrice * 0.00015)
          : currentPrice - (i + 1) * (currentPrice * 0.00015),
        size: Math.random() * (base === 'BTC' ? 0.3 : 3) + 0.05,
        tot: Math.random() * 15 + 2,
      }));
    return { asks: generate(true), bids: generate(false) };
  },
};