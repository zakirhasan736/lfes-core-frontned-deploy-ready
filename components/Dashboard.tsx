'use client'
import React, { useMemo, useState } from 'react';
import { User, Trade } from '@/types/index';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
type WatchlistItem = {
  sym: string;
  price: number;
  chg: number;
};
type MetricBoxProps = {
  label: string;
  val: number;
  sub: string;
  up: boolean;
  breakdown?: Record<string, string | number>;
};
const getMockData = (period: '1H' | '1D' | '1W') => {
  const basePrice = 98120.45;
  const config = {
    '1H': { points: 12, lbl: 'm' },
    '1D': { points: 12, lbl: ':00' },
    '1W': { points: 7, lbl: '' },
  };
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const { points, lbl } = config[period];
  return Array.from({ length: points }, (_, i) => ({
    name:
      period === '1W' ? weekdays[i] : `${i * (period === '1H' ? 5 : 2)}${lbl}`,
    price: Math.floor(
      basePrice - 2000 + Math.sin(i * 0.7) * 1500 + Math.random() * 800
    ),
  }));
};

const getPortfolioData = () => {
  const baseValue = 15000;
  return Array.from({ length: 10 }, (_, i) => ({
    name: `T-${9 - i}`,
    value: baseValue + i * 450 + (Math.random() * 1000 - 500),
  }));
};

const MetricBox: React.FC<MetricBoxProps> = ({ label, val, sub, up, breakdown }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="terminal-panel p-5 sm:p-6 rounded-2xl flex flex-col justify-between group gold-glow-hover transition-all duration-300 relative cursor-help"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <span className="text-[8px] sm:text-[9px] font-black text-(--text-secondary) uppercase tracking-[0.2em]">
          {label}
        </span>
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            up
              ? 'bg-green-500 shadow-[0_0_10px_#22c55e]'
              : 'bg-red-500 shadow-[0_0_10px_#ef4444]'
          }`}
        ></div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xl sm:text-2xl font-black text-(--text-primary) tabular-nums tracking-tighter">
          {val < 0 ? '-' : ''}$
          {Math.abs(val).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </div>
        <div
          className={`text-[8px] font-black uppercase tracking-widest ${
            up ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {sub}
        </div>
      </div>

      {showTooltip && breakdown && (
        <div className="absolute top-full left-0 w-full mt-2 z-50 terminal-panel p-4 rounded-xl border border-(--gold)/30 shadow-2xl animate-fade-in bg-(--bg-panel) backdrop-blur-xl">
          <p className="text-[8px] font-black text-(--gold) uppercase tracking-widest mb-3 border-b border-(--border) pb-2">
            Valuation Breakdown
          </p>
          <div className="space-y-2">
            {Object.entries(breakdown).map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between text-[9px] font-bold"
              >
                <span className="text-(--text-secondary) uppercase">
                  {k.replace(/([A-Z])/g, ' $1')}
                </span>
                <span
                  className={
                    typeof v === 'number'
                      ? v >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                      : 'text-(--text-primary)'
                  }
                >
                  {typeof v === 'string'
                    ? v
                    : `${v < 0 ? '-' : ''}$${Math.abs(v).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2 }
                      )}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC<{
  user: User;
  trades: Trade[];
  markPrices: Record<string, number>;
}> = ({ user, trades, markPrices }) => {
  const [period, setPeriod] = useState<'1H' | '1D' | '1W'>('1D');

  const [newAsset, setNewAsset] = useState('');
  const marketPrice = markPrices['BTCUSDT'] ?? 0;

const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
  if (typeof window === 'undefined') return [];

  try {
    const saved = localStorage.getItem('lfes_watchlist');
    if (saved) {
      return JSON.parse(saved) as WatchlistItem[];
    }
  } catch (err) {
    console.error('Failed to parse watchlist', err);
  }

  return [
    { sym: 'BTC', price: 98120.45, chg: 2.45 },
    { sym: 'ETH', price: 2740.12, chg: -1.2 },
    { sym: 'SOL', price: 145.82, chg: 5.8 },
  ];
});


const saveWatchlist = (list: WatchlistItem[]) => {
  setWatchlist(list);
  localStorage.setItem('lfes_watchlist', JSON.stringify(list));
};


  const addToWatchlist = () => {
    if (!newAsset || watchlist.find(i => i.sym === newAsset.toUpperCase()))
      return;
    const item = {
      sym: newAsset.toUpperCase(),
      price: Math.random() * 10000,
      chg: Math.random() * 10 - 5,
    };
    saveWatchlist([...watchlist, item]);
    setNewAsset('');
  };

  const removeFromWatchlist = (sym: string) => {
    saveWatchlist(watchlist.filter(i => i.sym !== sym));
  };


  const stats = useMemo(() => {
    const tradeArray = Array.isArray(trades) ? [...trades].reverse() : []; 

    let currentInventory = 0;
    let weightedAvgCost = 0;
    let realizedPnL = 0;

    tradeArray.forEach(trade => {
      if (trade.side === 'buy') {
        const newTotalAmount = currentInventory + trade.amount;
        if (newTotalAmount > 0) {
          // New WACB = ((Old Inventory * Old WACB) + (New Buy Amount * Buy Price)) / New Total Amount
          weightedAvgCost =
            (currentInventory * weightedAvgCost + trade.amount * trade.price) /
            newTotalAmount;
        }
        currentInventory = newTotalAmount;
      } else if (trade.side === 'sell') {
        // Realized PnL = amount * (sellPrice - currentWACB)
        realizedPnL += trade.amount * (trade.price - weightedAvgCost);
        currentInventory -= trade.amount;

        // If position is cleared, reset WACB
        if (currentInventory <= 0) {
          currentInventory = 0;
          weightedAvgCost = 0;
        }
      }
    });

    const unrealizedPnL = currentInventory * (marketPrice - weightedAvgCost);
    const aggregatePnL = realizedPnL + unrealizedPnL;

    return {
      unrealized: unrealizedPnL,
      realized: realizedPnL,
      total: aggregatePnL,
      breakdown: {
        realizedProfit: realizedPnL,
        unrealizedProfit: unrealizedPnL,
        currentWACB: weightedAvgCost,
        netHoldings: `${currentInventory.toFixed(6)} BTC`,
        marketReference: marketPrice,
      },
    };
  }, [trades, marketPrice]);

  const news = [
    {
      id: 1,
      title: 'Bitcoin Consolidation phase near $100k',
      summary:
        'Market analysts predict a breakout as institutional buy-side liquidity increases across Tier-1 nodes.',
      time: '2m ago',
    },
    {
      id: 2,
      title: 'LFES Ecosystem Upgrade V1.5',
      summary:
        'New protocol upgrades for the Lion Family terminal provide 10x faster order execution paths.',
      time: '15m ago',
    },
    {
      id: 3,
      title: 'Global Regulatory Shift',
      summary:
        'Major jurisdictions signal positive move towards institutional grade digital asset storage frameworks.',
      time: '1h ago',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in relative z-9">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricBox
          label="Available Liquidity"
          val={user.balance}
          sub="Main USDT Vault"
          up={true}
        />
        <MetricBox
          label="Unrealized Performance"
          val={stats.unrealized}
          sub={stats.unrealized >= 0 ? 'Floating Gain' : 'Floating Loss'}
          up={stats.unrealized >= 0}
          breakdown={{
            unrealizedPnL: stats.unrealized,
            avgEntry: stats.breakdown.currentWACB,
            markPrice: stats.breakdown.marketReference,
            positionSize: stats.breakdown.netHoldings,
          }}
        />
        <MetricBox
          label="Aggregate P&L"
          val={stats.total}
          sub="Net Performance"
          up={stats.total >= 0}
          breakdown={{
            realized: stats.realized,
            unrealized: stats.unrealized,
            total: stats.total,
          }}
        />
        <div className="terminal-panel p-5 sm:p-6 rounded-2xl flex flex-col justify-center bg-lenear-to-br from-(--gold)/10 to-transparent border-(--gold)/20">
          <span className="text-[8px] sm:text-[9px] font-black text-(--gold) uppercase tracking-[0.2em] mb-3 sm:mb-4">
            Node Operations
          </span>
          <div className="text-2xl sm:text-3xl font-black text-(--text-primary) tabular-nums tracking-tighter leading-none">
            {Array.isArray(trades) ? trades.length : 0}
          </div>
          <span className="text-[7px] sm:text-[8px] font-black text-(--text-secondary) uppercase tracking-[0.3em] mt-2">
            Verified Logs
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 relative -z-1 gap-6 sm:gap-8">
        <div className="xl:col-span-8 space-y-6 sm:space-y-8">
          <div className="terminal-panel rounded-2xl overflow-hidden flex flex-col min-h-87.5 sm:h-100">
            <div className="p-4 sm:p-6 border-b border-(--border) flex flex-col sm:flex-row justify-between items-center gap-4 bg-(--text-primary)/2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-(--gold) rounded-full animate-pulse shadow-[0_0_8px_var(--gold)"></div>
                <h2 className="text-[9px] sm:text-[10px] font-black text-(--text-primary) uppercase tracking-[0.2em] sm:tracking-[0.3em] brand-font">
                  Market Momentum Vector
                </h2>
              </div>
              <div className="flex bg-(--bg-main) p-1 rounded-xl border border-(--border) shrink-0 overflow-x-auto no-scrollbar">
                {(['1H', '1D', '1W'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-4 sm:px-5 py-2 text-[8px] sm:text-[9px] font-black rounded-lg transition-all ${
                      period === p
                        ? 'bg-(--gold) text-[#060b13] shadow-lg'
                        : 'text-(--text-secondary) hover:text-(--text-primary)'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 p-4 sm:p-6 relative min-h-62.5">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getMockData(period)}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="pgrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--gold)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--gold)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--text-secondary)"
                    opacity={0.15}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--text-secondary)"
                    fontSize={9}
                    fontWeight="900"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                  />
                  <YAxis
                    stroke="var(--text-secondary)"
                    fontSize={9}
                    fontWeight="900"
                    tickLine={false}
                    axisLine={false}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--bg-panel)',
                      border: '1px solid var(--gold)',
                      borderRadius: '12px',
                      boxShadow: 'var(--card-shadow)',
                      padding: '12px',
                    }}
                    itemStyle={{ color: 'var(--gold)', fontSize: '10px' }}
                    labelStyle={{
                      color: 'var(--text-secondary)',
                      fontSize: '8px',
                      marginBottom: '4px',
                      fontWeight: 'black',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="var(--gold)"
                    strokeWidth={3}
                    fill="url(#pgrad)"
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="terminal-panel rounded-2xl overflow-hidden flex flex-col min-h-62.5 sm:h-75">
            <div className="p-4 sm:p-6 border-b border-(--border) bg-(--text-secondary)/2">
              <h2 className="text-[9px] sm:text-[10px] font-black text-(--text-primary) uppercase tracking-[0.2em] sm:tracking-[0.3em] brand-font">
                Portfolio Performance Index
              </h2>
            </div>
            <div className="flex-1 p-4 sm:p-6 min-h-50">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getPortfolioData()}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--text-secondary)"
                    opacity={0.15}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--text-secondary)"
                    fontSize={8}
                    fontWeight="900"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--text-secondary)"
                    fontSize={8}
                    fontWeight="900"
                    tickLine={false}
                    axisLine={false}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--bg-panel)',
                      border: '1px solid var(--gold)',
                      borderRadius: '8px',
                      padding: '12px',
                    }}
                    itemStyle={{ color: 'var(--gold)', fontSize: '10px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--gold)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: 'var(--gold)' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-6 sm:space-y-8">
          <div className="terminal-panel rounded-2xl flex flex-col p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-[9px] sm:text-[10px] font-black text-(--text-primary) uppercase tracking-[0.3em] brand-font">
                Active Watchlist
              </h3>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="ADD ASSET"
                  value={newAsset}
                  onChange={e => setNewAsset(e.target.value.toUpperCase())}
                  className="flex-1 sm:flex-none bg-(--bg-main) border border-(--border) rounded-lg px-3 py-1.5 text-[9px] font-black text-(--text-primary) focus:outline-none focus:border-(--gold)/40 w-full sm:w-24 placeholder:text-(--text-secondary)/30"
                />
                <button
                  onClick={addToWatchlist}
                  className="bg-(--gold) text-[#060b13] px-3 py-1.5 rounded-lg text-[10px] font-black"
                >
                  +
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {watchlist.map(item => (
                <div
                  key={item.sym}
                  className="flex justify-between items-center bg-(--text-primary)/2 p-3 rounded-xl border border-(--border) group hover:border-(--gold)/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-black text-(--text-primary)">
                      {item.sym}
                    </span>
                    <span
                      className={`text-[8px] font-bold ${
                        item.chg >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {item.chg >= 0 ? '+' : ''}
                      {item.chg.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-(--text-primary) tabular-nums font-bold">
                      $
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <button
                      onClick={() => removeFromWatchlist(item.sym)}
                      className="sm:opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 transition-all text-sm px-2"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="terminal-panel rounded-2xl flex flex-col p-4 sm:p-6 min-h-75 sm:h-100">
            <h3 className="text-[9px] sm:text-[10px] font-black text-(--text-primary) uppercase tracking-[0.3em] brand-font mb-6">
              Market News Feed
            </h3>
            <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 flex-1">
              {news.map(n => (
                <div key={n.id} className="space-y-2 group">
                  <div className="flex justify-between items-start">
                    <h4 className="text-[9px] sm:text-[10px] font-black text-(--gold) uppercase leading-tight group-hover:underline cursor-pointer">
                      {n.title}
                    </h4>
                    <span className="text-[7px] font-black text-(--text-secondary) uppercase shrink-0 ml-2">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-[9px] text-(--text-secondary) font-medium leading-relaxed">
                    {n.summary}
                  </p>
                  <div className="pt-2 border-b border-(--border)"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
