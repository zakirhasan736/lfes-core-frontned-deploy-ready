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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws';


// Internal memory for demo/mock mode persistence during session
// let mockOpenOrders: OpenOrder[] = [];
const mockMessages: Record<string, any[]> = {};

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('lfes_token') || ''}`
      },
      ...options,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new TerminalError(error.detail || 'Protocol communication failure.', 'API_ERROR');
    }

    return res.json();
  } catch (err: any) {
    if (err instanceof TerminalError) throw err;
    throw err;
  }
}

export function connectWS(onEvent: (event: string, data: any) => void) {
  const ws = new WebSocket(WS_BASE_URL);
  ws.onopen = () => console.log('LFES Terminal: Real-time uplink established.');
  ws.onmessage = msg => {
    try {
      const payload = JSON.parse(msg.data);
      onEvent(payload.event || payload.type, payload.data || payload.payload);
    } catch (e) {
      console.error("WS Protocol Parse Error", e);
    }
  };
  return ws;
}

/* =========================
   Core request helper
========================= */ 
// async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
//   try {
//     const res = await fetch(`${API_BASE_URL}${url}`, {
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       ...options,
//     });


//     if (!res.ok) {
//       let message = 'Protocol communication failure.';
//       const code = `HTTP_${res.status}`;

//       try {
//         const data = await res.json();
//         if (typeof data?.detail === 'string') {
//           message = data.detail;
//         }
//       } catch {
//         // non-JSON response (HTML / proxy / crash)
//       }

//       throw new TerminalError(message, code);
//     }

//     return (await res.json()) as T;
//   } catch (err: unknown) {
//     if (err instanceof TerminalError) throw err;
//     throw new TerminalError('Network node unreachable. Check terminal uplink.', 'NETWORK_ERROR');
//   }
// }

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
    amount: number,
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
  async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    try {
      await request('/auth/password/change', {
        method: 'POST',
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });
    } catch (e) {
      // Mock success for demo if backend fails
      if (currentPassword === 'wrong')
        throw new Error('Invalid current password');
    }
  },
  /**
   * Create New Order (Phase 2)
   */
  async createOrder(
    side: 'buy' | 'sell',
    pair: string,
    price: number,
    amount: number,
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

  // --- MARKETPLACE & B2B ---

  async fetchMarketplaceListings(category?: string): Promise<any[]> {
    try {
      return await request<any[]>(`/marketplace?category=${category || ''}`);
    } catch (e) {
      return [
        // STRATEGIC BOARD
        {
          id: 'm-1',
          title: 'Zurich Shard: Tier-1 Liquidity Bridge',
          author: 'Swiss Node Capital',
          category: 'Liquidity',
          desc: 'Provision of institutional-grade market making for deep LFES books.',
          tags: ['Institutional', 'Verified'],
          metrics: [
            { label: 'Escrow', val: '50M USDT' },
            { label: 'Sync', val: '99.9%' },
          ],
          status: 'verified',
          type: 'announcements',
          tier: 'Institutional',
          postedAt: '2h ago',
        },
        {
          id: 'm-2',
          title: 'Neural Audit: Q3 Security Report',
          author: 'LionGuard Labs',
          category: 'Security',
          desc: 'Comprehensive smart contract and protocol audit for the FAMILY token economy.',
          tags: ['Audit', 'AES-256'],
          metrics: [
            { label: 'Score', val: '100/100' },
            { label: 'Phase', val: 'Finalized' },
          ],
          status: 'verified',
          type: 'announcements',
          tier: 'Premium',
          postedAt: '12h ago',
        },
        // PARTNER SEARCH
        {
          id: 'p-1',
          title: 'Regional Node Expansion: UAE/Dubai',
          author: 'Emirates Liquidity',
          category: 'Regional Partner',
          desc: 'Seeking strategic European nodes for cross-border FAMILY settlement bridges.',
          tags: ['MENA', 'B2B'],
          metrics: [
            { label: 'Nodes', val: '14' },
            { label: 'Settlement', val: 'Instant' },
          ],
          status: 'hot',
          type: 'partners',
          tier: 'Institutional',
          postedAt: '1d ago',
        },
        {
          id: 'p-2',
          title: 'Merchant Gateway Integration Shard',
          author: 'Global Commerce Node',
          category: 'Infrastructure',
          desc: 'Open RFP for merchant payment processors to integrate with the LFES settlement bridge.',
          tags: ['Payments', 'API'],
          metrics: [
            { label: 'TPS', val: '150k' },
            { label: 'Commission', val: '0.1%' },
          ],
          status: 'active',
          type: 'partners',
          tier: 'Premium',
          postedAt: '3d ago',
        },
        // VENTURE CAPITAL
        {
          id: 'v-1',
          title: 'Alpha Fund: Q4 Allocation Shard',
          author: 'Family Venture DAO',
          category: 'Investment',
          desc: 'High-yield allocation opportunity for verified principals in late-stage AI infrastructure.',
          tags: ['VC', 'High-Yield'],
          metrics: [
            { label: 'Min', val: '50k USDT' },
            { label: 'Target', val: '22% APY' },
          ],
          status: 'hot',
          type: 'investments',
          tier: 'Institutional',
          postedAt: '5h ago',
        },
        {
          id: 'v-2',
          title: 'Early Stage: Carbon Tokenization',
          author: 'Green Settle Node',
          category: 'Impact VC',
          desc: 'Seed round for a multichain carbon credit ledger verified on LFES Mainnet.',
          tags: ['ESG', 'Seed'],
          metrics: [
            { label: 'Raised', val: '$1.2M' },
            { label: 'Equity', val: '15%' },
          ],
          status: 'active',
          type: 'investments',
          tier: 'Standard',
          postedAt: '1w ago',
        },
        // STARTUP MATRIX
        {
          id: 'st-1',
          title: 'NeuralDex v2: Gamma Testbed',
          author: 'Quantum AI Devs',
          category: 'AI Platform',
          desc: 'Decentralized exchange node with integrated SmartLion signal automation.',
          tags: ['Startup', 'AI Engine'],
          metrics: [
            { label: 'Beta Slots', val: '12/50' },
            { label: 'Dev Sync', val: '84%' },
          ],
          status: 'active',
          type: 'startups',
          tier: 'Premium',
          postedAt: '2d ago',
        },
        {
          id: 'st-2',
          title: 'SecureCloud: AES-256 Ledger',
          author: 'ShieldNode Tech',
          category: 'Privacy',
          desc: 'Encrypted cloud storage for institutional trade logs and private key fragments.',
          tags: ['Privacy', 'ZKP'],
          metrics: [
            { label: 'Encryption', val: 'AES-GCM' },
            { label: 'Nodes', val: '42' },
          ],
          status: 'verified',
          type: 'startups',
          tier: 'Standard',
          postedAt: '4d ago',
        },
        // B2B SERVICES
        {
          id: 's-1',
          title: 'White-Label Exchange Solution',
          author: 'LFES Core Engineering',
          category: 'SaaS',
          desc: 'Deploy your own liquidity shard using the institutional LFES matching engine.',
          tags: ['B2B', 'Infrastructure'],
          metrics: [
            { label: 'Setup', val: '48h' },
            { label: 'Fee Share', val: '25%' },
          ],
          status: 'verified',
          type: 'services',
          tier: 'Institutional',
          postedAt: '2w ago',
        },
        {
          id: 's-2',
          title: 'Neural KYC Verification API',
          author: 'TrustLink AI',
          category: 'Compliance',
          desc: 'Instant global identification verification utilizing neural biometric analysis.',
          tags: ['Compliance', 'API'],
          metrics: [
            { label: 'Accuracy', val: '99.9%' },
            { label: 'Latency', val: '400ms' },
          ],
          status: 'active',
          type: 'services',
          tier: 'Premium',
          postedAt: '1m ago',
        },
      ];
    }
  },

  // --- INVESTORS & TRUST ---

  async fetchRoadmap(): Promise<any[]> {
    try {
      return await request<any[]>('/trust/roadmap');
    } catch (e) {
      return [
        {
          phase: 'Phase 1: Genesis',
          title: 'Core Node Synchronization',
          status: 'Completed',
          tasks: [
            'Exchange Matching Engine',
            'AES-256 Wallet Infrastructure',
            'Lion AI Beta',
          ],
        },
        {
          phase: 'Phase 2: Expansion',
          title: 'Ecosystem Liquidity Shards',
          status: 'Current',
          tasks: [
            'FAMILY Token Launch',
            'P2P Escrow Protocol',
            'Global Charity Bridge',
          ],
        },
        {
          phase: 'Phase 3: Integration',
          title: 'Neural Entertainment Hub',
          status: 'Upcoming',
          tasks: [
            'Lion Poker Deployment',
            'Elite Circuit VIP Access',
            'AI Academy V2',
          ],
        },
        {
          phase: 'Phase 4: Sovereign',
          title: 'Institutional DAO Transition',
          status: 'Upcoming',
          tasks: [
            'Full Governance Sync',
            'Cross-Chain Yield Aggregator',
            'LFES Sovereign Chain',
          ],
        },
      ];
    }
  },

  async fetchLegalText(type: string): Promise<string> {
    try {
      const data = await request<{ content: string }>(`/trust/legal/${type}`);
      return data.content;
    } catch (e) {
      return 'The Lion Family Ecosystem utilizes a high-fidelity multisig protocol. Principals are advised to review neural risk parameters before execution.';
    }
  },

  // --- SOCIAL & COMMUNICATION ---

  async fetchSocialMessages(shardId: string): Promise<any[]> {
    try {
      return await request<any[]>(`/social/messages/${shardId}`);
    } catch (e) {
      return (
        mockMessages[shardId] || [
          {
            id: '1',
            user: 'System',
            content: `Uplink to ${shardId} shard stable.`,
            time: 'Now',
            tier: 'Node',
            isMe: false,
          },
        ]
      );
    }
  },

  async sendSocialMessage(shardId: string, content: string): Promise<any> {
    try {
      return await request<any>(`/social/messages/${shardId}`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
    } catch (e) {
      const msg = {
        id: Date.now().toString(),
        user: 'Authorized Principal',
        content,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        tier: 'Principal',
        isMe: true,
      };
      mockMessages[shardId] = [...(mockMessages[shardId] || []), msg];
      return msg;
    }
  },

  // --- INTELLIGENCE & ANALYTICS ---

  // async fetchMarketNews(): Promise<
  //   { id: number; title: string; summary: string; time: string; url?: string }[]
  // > {
  //   try {
  //     // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  //     const response = await ai.models.generateContent({
  //       model: 'gemini-3-pro-preview',
  //       contents:
  //         'List 4 critical real-time crypto and global finance news headlines for today. Concise. Source provided.',
  //       config: { tools: [{ googleSearch: {} }] },
  //     });
  //     const lines = (response.text || '')
  //       .split('\n')
  //       .filter(l => l.trim().length > 10)
  //       .slice(0, 4);
  //     return lines.map((line, idx) => ({
  //       id: Date.now() + idx,
  //       title:
  //         line.split(':')[0]?.replace(/[*#]/g, '').trim() || 'Market Alert',
  //       summary:
  //         line.split(':').slice(1).join(':').trim() ||
  //         'Processing terminal data...',
  //       time: 'Just Now',
  //       url: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.[0]
  //         ?.web?.uri,
  //     }));
  //   } catch (e) {
  //     return [
  //       {
  //         id: 1,
  //         title: 'Global Node Sync Optimization',
  //         summary:
  //           'Network latency reduced across all institutional shards by 14%.',
  //         time: '2m ago',
  //       },
  //       {
  //         id: 2,
  //         title: 'FAMILY Token Burn Event',
  //         summary:
  //           'Over 500k FAMILY tokens removed from circulation this cycle.',
  //         time: '15m ago',
  //       },
  //     ];
  //   }
  // },
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