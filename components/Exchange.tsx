'use client'
import React, { useState, useEffect, useMemo } from 'react';
import TradingChart from './Exchange/TradingChart';
import OrderBook from './Exchange/OrderBook';
import TradePanel from './Exchange/TradePanel';
import { User, Trade } from '@/types/index';
import { OpenOrder } from '@/components/home/HomeClient';
import {
  Clock,
  ListChecks,
  Activity,
  Search,
  ChevronDown,
  Inbox,
  ChevronLeft,
  ChevronRight,
  Layers,
  PowerOff,
} from 'lucide-react';

const TRADING_PAIRS = [
  {
    id: 'BTC/USDT',
    name: 'Bitcoin',
    symbol: 'B',
    color: 'from-[#f3cf65] to-[#d4af37]',
    basePrice: 98120.45,
  },
  {
    id: 'ETH/USDT',
    name: 'Ethereum',
    symbol: 'E',
    color: 'from-[#627eea] to-[#3c3c3d]',
    basePrice: 2740.12,
  },
  {
    id: 'SOL/USDT',
    name: 'Solana',
    symbol: 'S',
    color: 'from-[#14f195] to-[#9945ff]',
    basePrice: 145.22,
  },
  {
    id: 'AVAX/USDT',
    name: 'Avalanche',
    symbol: 'A',
    color: 'from-[#e84142] to-[#b02a2b]',
    basePrice: 32.44,
  },
];

type PaginationControlsProps = {
  current: number;
  total: number;
  onPageChange: (p: number) => void;
};

const PaginationControls: React.FC<PaginationControlsProps> = ({
  current,
  total,
  onPageChange,
}) => {
  if (total <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 sm:px-10 py-6 border-t border-(--border) bg-(--text-primary)/1">
      <span className="text-[10px] font-black text-(--text-secondary) uppercase tracking-[0.2em]">
        Frame {current} / {total}
      </span>

      <div className="flex items-center gap-2">
        <button
          disabled={current === 1}
          onClick={() => onPageChange(current - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-(--border) disabled:opacity-10"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          disabled={current === total}
          onClick={() => onPageChange(current + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-(--border) disabled:opacity-10"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const ITEMS_PER_PAGE = 5;
const Exchange: React.FC<{
  user: User;
  trades: Trade[];
  openOrders: OpenOrder[];
  onTrade: (
    side: 'buy' | 'sell',
    pair: string,
    price: number,
    amount: number
  ) => void;
  onCancelOrder: (id: string) => void;
}> = ({ user, trades, openOrders, onTrade, onCancelOrder }) => {
  const [selectedPair, setSelectedPair] = useState(TRADING_PAIRS[0]);
  const [currentPrice, setCurrentPrice] = useState(selectedPair.basePrice);
  const [activeTab, setActiveTab] = useState<'history' | 'open'>('history');
  const [showPairSelector, setShowPairSelector] = useState(false);

  // Pagination State
  const [historyPage, setHistoryPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);

  useEffect(() => {
    const int = setInterval(() => {
      setCurrentPrice(p =>
        Number((p + (Math.random() - 0.5) * (p * 0.001)).toFixed(2))
      );
    }, 3000);

    return () => clearInterval(int);
  }, [selectedPair.id]); // re-create timer when pair changes

  // Reset pagination when switching tabs
  // useEffect(() => {
  //   // setHistoryPage(1);
  //   setOrdersPage(1);
  // }, [activeTab]);
const switchTab = (tab: 'history' | 'open') => {
  setActiveTab(tab);
  setHistoryPage(1);
  setOrdersPage(1);
};
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return {
          container: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
          dot: 'bg-yellow-500 animate-pulse',
        };
      case 'cancelled':
        return {
          container: 'bg-red-500/10 text-red-500 border-red-500/20',
          dot: 'bg-red-500',
        };
      case 'filled':
        return {
          container: 'bg-green-500/10 text-green-500 border-green-500/20',
          dot: 'bg-green-500',
        };
      default:
        return {
          container: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
          dot: 'bg-blue-500 animate-pulse',
        };
    }
  };
  const getChangePct = (pair: (typeof TRADING_PAIRS)[number]) => {
    const reference = pair.basePrice; // or yesterday close later
    const price = pair.id === selectedPair.id ? currentPrice : pair.basePrice;

    return ((price - reference) / reference) * 100;
  };

  // Paginated Data Computation
  const paginatedTrades = useMemo(() => {
    const start = (historyPage - 1) * ITEMS_PER_PAGE;
    return trades.slice(start, start + ITEMS_PER_PAGE);
  }, [trades, historyPage]);

  const paginatedOrders = useMemo(() => {
    const start = (ordersPage - 1) * ITEMS_PER_PAGE;
    return openOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [openOrders, ordersPage]);

  const totalHistoryPages = Math.ceil(trades.length / ITEMS_PER_PAGE);
  const totalOrdersPages = Math.ceil(openOrders.length / ITEMS_PER_PAGE);

 
  return (
    <div className="flex flex-col gap-6 sm:gap-8 h-full relative z-9  animate-fade-in">
      {/* Matrix Ribbon with Pair Selector */}
      <div className="terminal-panel p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between bg-linear-to-r from-(--bg-panel) to-(--bg-main) gap-6">
        <div className="flex items-center gap-4 sm:gap-8 relative z-999">
          <div
            onClick={() => setShowPairSelector(!showPairSelector)}
            className={`w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br ${selectedPair.color} rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-[#060b13] text-xl sm:text-2xl shadow-xl cursor-pointer hover:scale-105 transition-all shrink-0`}
          >
            {selectedPair.symbol}
          </div>
          <div
            className="cursor-pointer group select-none"
            onClick={() => setShowPairSelector(!showPairSelector)}
          >
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-(--text-primary) tracking-tighter brand-font uppercase">
                {selectedPair.id}
              </h2>
              <ChevronDown
                size={18}
                className={`text-(--text-secondary) transition-transform ${
                  showPairSelector ? 'rotate-180' : ''
                }`}
              />
            </div>
            <p className="text-[8px] sm:text-[9px] font-black text-green-500 uppercase tracking-widest mt-1">
              Live Feed Synchronized
            </p>
          </div>

          {showPairSelector && (
            <div className="absolute top-full left-0 mt-4 w-56 sm:w-64 bg-[#0d1624] border border-(--border) rounded-xl shadow-2xl z-9999 overflow-hidden animate-fade-in backdrop-blur-xl">
              <div className="p-3 sm:p-4 border-b border-(--border) bg-(--text-secondary)/5">
                <span className="text-[9px] sm:text-[10px] font-black text-(--gold) uppercase tracking-[0.2em]">
                  Select Asset Matrix
                </span>
              </div>
              <div className="py-2 max-h-75 overflow-y-auto custom-scrollbar">
                {TRADING_PAIRS.map(pair => (
                  <button
                    key={pair.id}
                    onClick={() => {
                      setSelectedPair(pair);
                      setShowPairSelector(false);
                    }}
                    className={`w-full px-4 sm:px-6 cursor-pointer py-3 sm:py-4 flex items-center justify-between hover:bg-(--gold)/5 transition-all ${
                      selectedPair.id === pair.id
                        ? 'bg-(--gold)/10 border-l-4 border-(--gold)'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-lg bg-linear-to-br ${pair.color} flex items-center justify-center text-[10px] font-black text-[#060b13]`}
                      >
                        {pair.symbol}
                      </span>
                      <div className="text-left">
                        <p className="text-xs font-black text-(--text-primary)">
                          {pair.id}
                        </p>
                        <p className="text-[8px] sm:text-[9px] font-bold text-(--text-secondary) uppercase">
                          {pair.name}
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black tabular-nums text-(--text-primary)">
                      ${pair.basePrice.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-8 sm:gap-16 sm:pr-10">
          <div className="flex flex-col gap-1 items-start">
            <span className="text-[8px] sm:text-[9px] font-black text-(--text-secondary) uppercase tracking-widest">
              Market Value
            </span>
            <span className="text-xl sm:text-2xl font-black gold-text tabular-nums tracking-tighter">
              $
              {currentPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex flex-col gap-1 items-end sm:items-start">
            <span className="text-[8px] sm:text-[9px] font-black text-(--text-secondary) uppercase tracking-widest">
              24H Flux
            </span>
            <span className="text-xs sm:text-sm font-black text-green-500 tracking-tight">
              +4.12%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 relative -z-1 gap-6 sm:gap-8 flex-1 min-h-0">
        <div className="xl:col-span-9 flex flex-col gap-6 sm:gap-8 order-2 xl:order-1">
          {/* Main Visualizer */}
          <div className="grid grid-cols-6 md:grid-cols-12 gap-5">
            <div className="col-span-6 md:col-span-9 flex-[2.5] terminal-panel rounded-2xl overflow-hidden min-h-100 sm:min-h-125">
              <TradingChart
                pair={selectedPair.id}
                trades={trades.filter(t => t.pair === selectedPair.id)}
              />
            </div>
            <div className="block col-span-6 md:col-span-3">
              <OrderBook currentPrice={currentPrice} pair={selectedPair.id} />
            </div>
          </div>

          {/* Ledger Hub */}
          <div className="flex-1 terminal-panel rounded-2xl flex flex-col min-h-87.5">
            <div className="px-10 py-7 border-b border-(--border) flex justify-between items-center bg-(--text-secondary)/2">
              <div className="flex gap-12">
                <button
                  onClick={() => switchTab('history')}
                  className={`flex items-center gap-3 transition-all ${
                    activeTab === 'history'
                      ? 'text-(--gold)'
                      : 'opacity-30 hover:opacity-100'
                  }`}
                >
                  <Clock size={18} />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] brand-font">
                    Execution Log
                  </span>
                </button>
                <button
                  onClick={() => switchTab('open')}
                  className={`flex items-center gap-3 transition-all ${
                    activeTab === 'open'
                      ? 'text-(--gold)'
                      : 'opacity-30 hover:opacity-100'
                  }`}
                >
                  <ListChecks size={18} />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] brand-font">
                    Active Queue ({openOrders.length})
                  </span>
                </button>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-(--gold)/10 bg-(--gold)/5">
                <Activity
                  size={12}
                  className="text-(--gold) animate-pulse"
                />
                <span className="text-[8px] font-black text-(--gold) uppercase tracking-[0.2em]">
                  Live Sync
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto custom-scrollbar">
              <div className="p-10 min-w-225">
                {activeTab === 'history' ? (
                  <div className="h-full flex flex-col">
                    {trades.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 opacity-30">
                        <Inbox
                          size={48}
                          strokeWidth={1}
                          className="mb-4 text-(--gold)"
                        />
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-center">
                          Buffer Clear
                        </p>
                      </div>
                    ) : (
                      <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead className="text-[10px] font-black opacity-30 uppercase tracking-[0.5em] text-(--text-secondary)">
                          <tr>
                            <th className="px-6 pb-4">Timestamp</th>
                            <th className="px-6 pb-4">Asset Matrix</th>
                            <th className="px-6 pb-4">Side</th>
                            <th className="px-6 pb-4 text-right">Unit Price</th>
                            <th className="px-6 pb-4 text-right">Aggregate</th>
                            <th className="px-6 pb-4 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedTrades.map(t => (
                            <tr
                              key={t.id}
                              className="text-[13px] font-black tabular-nums bg-(--text-primary)/3 rounded-2xl hover:bg-(--text-primary)/5 transition-all"
                            >
                              <td className="px-6 py-5 text-(--text-secondary)">
                                {t.time}
                              </td>
                              <td className="px-6 py-5 text-(--text-primary)">
                                {t.pair}
                              </td>
                              <td
                                className={`px-6 py-5 ${
                                  t.side === 'buy'
                                    ? 'text-green-500'
                                    : 'text-red-500'
                                }`}
                              >
                                {t.side.toUpperCase()}
                              </td>
                              <td className="px-6 py-5 text-right font-mono">
                                $
                                {t.price.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                })}
                              </td>
                              <td className="px-6 py-5 text-right gold-text">
                                $
                                {t.total.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                })}
                              </td>
                              <td className="px-6 py-5 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                  <span className="px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-500 text-[9px] font-black tracking-widest">
                                    FILLED
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col">
                    {openOrders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 animate-fade-in group">
                        <Layers
                          size={48}
                          strokeWidth={1}
                          className="text-(--gold) opacity-20 group-hover:rotate-12 transition-transform duration-700"
                        />
                        <h3 className="mt-4 text-[14px] font-black uppercase tracking-[0.8em] text-(--gold)/40">
                          Queue Empty
                        </h3>
                      </div>
                    ) : (
                      <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead className="text-[10px] font-black opacity-30 uppercase tracking-[0.5em] text-(--text-secondary)">
                          <tr>
                            <th className="px-6 pb-4">Asset</th>
                            <th className="px-6 pb-4">Side</th>
                            <th className="px-6 pb-4">Volume</th>
                            <th className="px-6 pb-4">Limit</th>
                            <th className="px-6 pb-4 text-right">Status</th>
                            <th className="px-6 pb-4 text-right">Control</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedOrders.map(o => {
                            const statusStyles = getStatusStyles(o.status);
                            return (
                              <tr
                                key={o.id}
                                className="text-[13px] font-black tabular-nums bg-(--text-primary)/3 rounded-2xl hover:bg-(--text-primary)/5 transition-all"
                              >
                                <td className="px-6 py-5">{o.pair}</td>
                                <td
                                  className={`px-6 py-5 ${
                                    o.side === 'buy'
                                      ? 'text-green-500'
                                      : 'text-red-500'
                                  }`}
                                >
                                  {o.side.toUpperCase()}
                                </td>
                                <td className="px-6 py-5">
                                  {o.amount.toFixed(4)}
                                </td>
                                <td className="px-6 py-5 font-mono">
                                  ${o.price.toLocaleString()}
                                </td>
                                <td className="px-6 py-5 text-right">
                                  <div
                                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black tracking-widest ${statusStyles.container}`}
                                  >
                                    <div
                                      className={`w-1 h-1 rounded-full ${statusStyles.dot}`}
                                    ></div>
                                    {o.status.toUpperCase()}
                                  </div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                  <button
                                    onClick={() => onCancelOrder(String(o.id))}
                                    className="p-2 text-red-500/40 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all"
                                  >
                                    <PowerOff size={14} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Functional Pagination Controls */}
            {activeTab === 'history' && trades.length > ITEMS_PER_PAGE && (
              <PaginationControls
                current={historyPage}
                total={totalHistoryPages}
                onPageChange={setHistoryPage}
              />
            )}
            {activeTab === 'open' && openOrders.length > ITEMS_PER_PAGE && (
              <PaginationControls
                current={ordersPage}
                total={totalOrdersPages}
                onPageChange={setOrdersPage}
              />
            )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="xl:col-span-3 flex flex-col gap-6 sm:gap-8 order-1 xl:order-2">
          <div className="w-full">
            <TradePanel
              currentPrice={currentPrice}
              balance={user.balance}
              pair={selectedPair.id}
              onTrade={(t, a) => onTrade(t, selectedPair.id, currentPrice, a)}
            />
          </div>

          <div className="terminal-panel rounded-2xl p-6 sm:p-8 flex flex-col gap-6 sm:gap-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] sm:text-[11px] font-black text-(--gold) uppercase tracking-[0.3em] sm:tracking-[0.4em] brand-font">
                Node Matrix
              </h3>
              <Search
                size={18}
                className="text-(--text-secondary) opacity-30"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
              {TRADING_PAIRS.map(pair => {
                const change = getChangePct(pair);
                return (
                  <div
                    key={pair.id}
                    onClick={() => setSelectedPair(pair)}
                    className={`flex justify-between items-center px-4 py-2 sm:px-5 sm:py-3 bg-(--text-primary)/3 rounded-xl border transition-all cursor-pointer group shadow-sm ${
                      selectedPair.id === pair.id
                        ? 'border-(--gold) bg-(--gold)/5'
                        : 'border-(--border) hover:border-(--gold)/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedPair.id === pair.id
                            ? 'bg-(--gold) animate-pulse shadow-[0_0_8px_var(--gold)'
                            : 'bg-(--text-secondary)'
                        }`}
                      ></span>
                      <p className="text-[10px] sm:text-[11px] font-black text-(--text-primary) group-hover:gold-text transition-all tracking-widest">
                        {pair.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] sm:text-[11px] text-(--text-primary) tabular-nums font-bold">
                        ${pair.basePrice.toLocaleString()}
                      </p>
                      <p
                        className={`text-[8px] sm:text-[9px] font-bold ${
                          change >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {change >= 0 ? '+' : ''}
                        {change.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
