import React, { useMemo, useState } from 'react';
import { User, Trade, AssetBalance } from '@/types';
import { OpenOrder, Transaction } from '@/components/home/HomeClient';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, 
  History, PieChart, Coins, RefreshCcw, ExternalLink,
  Info, Lock, Zap, ArrowRight, Eye, EyeOff, CheckCircle2,
  Clock, AlertTriangle, ArrowRightLeft, Database, X,
  TrendingUp, TrendingDown, QrCode, CreditCard, ChevronRight,
  TrendingUpDown, Activity, LayoutGrid, Loader2
} from 'lucide-react';

interface WalletViewProps {
  user: User;
  trades: Trade[];
  assets: AssetBalance[];
  openOrders: OpenOrder[];
  transactions: Transaction[];
  onDeposit: (symbol: string, amount: number) => void;
  onWithdraw: (symbol: string, amount: number) => void;
}

interface ModalBackdropProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const ModalBackdrop: React.FC<ModalBackdropProps> = ({ children, onClose }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 animate-fade-in">
    <div className="absolute inset-0" onClick={onClose}></div>
    <div className="relative z-10 w-full max-w-xl terminal-panel rounded-[3rem] p-8 sm:p-14 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] border-[var(--gold)]/20">
      <button onClick={onClose} className="absolute top-10 right-10 p-2 text-white/30 hover:text-white transition-all bg-white/5 rounded-full"><X size={24} /></button>
      {children}
    </div>
  </div>
);

const WalletView: React.FC<WalletViewProps> = ({ 
  user, trades, assets, openOrders, transactions, onDeposit, onWithdraw 
}) => {
  const [showValues, setShowValues] = useState(true);
  const [activeModal, setActiveModal] = useState<'deposit' | 'withdraw' | null>(null);
  const [withdrawData, setWithdrawData] = useState({ symbol: 'USDT', amount: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const totalValue = useMemo(() => {
    return assets.reduce((sum, asset) => sum + (asset.total * asset.valueUsdt), 0);
  }, [assets]);

  const activityLedger = useMemo(() => {
    const tradeLogs = trades.map(t => ({
      id: `TX-${String(t.id).slice(-6)}`,
      type: t.side === 'buy' ? 'Buy Execution' : 'Sell Execution',
      category: 'Trade',
      asset: t.pair.split('/')[0],
      amount: t.amount,
      total: t.total,
      status: 'Finalized',
      time: t.time,
      isTrade: true,
      desc: t.side === 'buy' ? `Purchase of ${t.amount} ${t.pair.split('/')[0]} completed.` : `Sale of ${t.amount} ${t.pair.split('/')[0]} completed.`
    }));

    const orderLogs = openOrders.map(o => ({
      id: `RES-${String(o.id).slice(-6)}`,
      type: 'Escrow Lock',
      category: 'System',
      asset: o.side === 'buy' ? 'USDT' : o.pair.split('/')[0],
      amount: o.side === 'buy' ? o.total : o.amount,
      total: o.total,
      status: 'In Escrow',
      time: o.time,
      isTrade: false,
      desc: `Funds locked for ${o.side.toUpperCase()} order on ${o.pair}.`
    }));

    const txLogs = transactions.map(tx => ({
      id: tx.id,
      type: tx.type,
      category: 'Finance',
      asset: tx.asset,
      amount: tx.amount,
      total: tx.amount * (assets.find(a => a.symbol === tx.asset)?.valueUsdt || 1),
      status: tx.status,
      time: tx.time,
      isTrade: false,
      desc: tx.type === 'Deposit' ? `Incoming ${tx.asset} from bridge sync.` : `Outbound settlement to ${tx.txHash.slice(0, 10)}...`
    }));

    return [...txLogs, ...orderLogs, ...tradeLogs].sort((a, b) => b.time.localeCompare(a.time));
  }, [trades, openOrders, transactions, assets]);

  const handleWithdrawSubmit = () => {
    const amt = parseFloat(withdrawData.amount);
    if (!amt || amt <= 0) return;
    setIsSubmitting(true);
    onWithdraw(withdrawData.symbol, amt);
    setTimeout(() => {
      setIsSubmitting(false);
      setActiveModal(null);
      setWithdrawData({ symbol: 'USDT', amount: '', address: '' });
    }, 1000);
  };

  const handleDepositTrigger = (symbol: string) => {
    setIsSubmitting(true);
    // Standard mock deposit of 5000 for simplicity in demo
    onDeposit(symbol, 5000);
    setTimeout(() => {
      setIsSubmitting(false);
      setActiveModal(null);
    }, 1000);
  };

  const AssetCard: React.FC<{ asset: AssetBalance }> = ({ asset }) => {
    const mockTrend = useMemo(() => (Math.random() * 8 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2), []);

    return (
      <div className="terminal-panel p-8 rounded-[3rem] bg-[var(--text-primary)]/[0.01] hover:bg-[var(--text-primary)]/[0.03] transition-all group border-[var(--border)] hover:border-[var(--gold)]/30 shadow-xl flex flex-col justify-between h-[360px]">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-[var(--gold)]/20 to-transparent flex items-center justify-center text-[var(--gold)] font-black text-lg border border-[var(--gold)]/10 shadow-lg">
                {asset?.symbol?.charAt(0) || ""}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-black text-white tracking-tighter uppercase">{asset.symbol}</span>
                <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">{asset.name}</span>
              </div>
            </div>
            <div className="text-right">
               <div className={`flex items-center justify-end gap-2 text-[10px] font-black uppercase tabular-nums ${Number(mockTrend) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                 {Number(mockTrend) >= 0 ? '+' : ''}{mockTrend}%
                 {Number(mockTrend) >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
               </div>
               <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-1">24h Flux</div>
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em]">Institutional Valuation</span>
                <span className="text-2xl font-black gold-text tabular-nums">
                   {showValues ? `$${(asset.total * asset.valueUsdt).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
                </span>
             </div>
             <div className="flex items-center gap-2 text-[9px] font-bold text-white/20">
                <LayoutGrid size={12} />
                <span>Market: ${asset.valueUsdt.toLocaleString()} / Shard</span>
             </div>
          </div>
        </div>

        <div className="space-y-6 pt-6 border-t border-white/5">
          <div className="grid grid-cols-2 gap-8">
             <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-green-500"></div>
                   <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">Available</span>
                </div>
                <span className="text-[15px] font-black text-white tabular-nums">{showValues ? asset.available.toLocaleString() : '••••'}</span>
             </div>
             <div className="flex flex-col gap-1 text-right">
                <div className="flex items-center gap-2 justify-end">
                   <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">Locked</span>
                   <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></div>
                </div>
                <span className="text-[15px] font-black text-red-400 tabular-nums">{showValues ? asset.locked.toLocaleString() : '••••'}</span>
             </div>
          </div>

          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
             <div className="h-full bg-gradient-to-r from-[var(--gold)]/40 to-[var(--gold)] transition-all duration-1000" style={{ width: `${(asset.available / (asset.total || 1)) * 100}%` }}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* Portfolio Summary Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 terminal-panel p-10 sm:p-14 rounded-[4rem] bg-gradient-to-br from-[#0d1624] to-[#1e3a8a]/10 relative overflow-hidden flex flex-col justify-between min-h-[400px] border-blue-500/20 shadow-2xl group">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-[1.75rem] bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-lg">
                  <PieChart size={28} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.5em]">
                    Net Institutional Equity
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">
                      Sovereign Node Link Active
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowValues(!showValues)}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[var(--text-secondary)] hover:text-white hover:border-white/20 transition-all shadow-xl"
              >
                {showValues ? <Eye size={24} /> : <EyeOff size={24} />}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-baseline gap-4">
                <span className="text-6xl sm:text-8xl font-black text-white tabular-nums tracking-tighter leading-none">
                  {showValues
                    ? `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : '$ •••••••'}
                </span>
                {showValues && (
                  <span className="text-xl font-black text-green-500 tabular-nums mb-2">
                    +3.2%
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-4">
                <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                  <TrendingUpDown size={14} /> session flux
                </div>
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                  Protocol Shard: L-Family Mainnet-1
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 mt-12 relative z-10">
            <button
              onClick={() => setActiveModal('deposit')}
              className="flex-1 min-w-[180px] bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-2xl group/btn"
            >
              <Zap size={20} className="group-hover/btn:animate-pulse" />{' '}
              Deposit Assets
            </button>
            <button
              onClick={() => setActiveModal('withdraw')}
              className="flex-1 min-w-[180px] bg-white/5 backdrop-blur-xl py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 border border-white/10 hover:bg-white/10 transition-all shadow-xl"
            >
              <ArrowDownLeft size={20} /> Withdrawal Portal
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="terminal-panel p-10 rounded-[3.5rem] border-white/10 flex flex-col justify-between flex-1 bg-[var(--text-primary)]/[0.01] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={100} className="text-green-500" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">
                  Node Audit
                </span>
                <ShieldCheck size={28} className="text-green-500" />
              </div>
              <div className="space-y-8">
                <div className="flex justify-between items-center group cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] font-black text-white uppercase">
                      KYC Authorization
                    </span>
                    <span className="text-[9px] font-bold text-green-500 uppercase tracking-[0.2em]">
                      Institutional Verified
                    </span>
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-white/20 group-hover:text-[var(--gold)] transition-all"
                  />
                </div>
                <div className="h-px bg-white/5"></div>
                <div className="flex justify-between items-center group cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] font-black text-white uppercase">
                      Escrow Protocol
                    </span>
                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.2em]">
                      100% Reserve Verified
                    </span>
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-white/20 group-hover:text-[var(--gold)] transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-white/5 relative z-10">
              <div className="p-5 rounded-[1.5rem] bg-blue-500/5 border border-blue-500/10 flex items-center gap-4 shadow-inner">
                <Activity
                  size={18}
                  className="text-blue-400 shrink-0 animate-pulse"
                />
                <span className="text-[9px] font-bold text-white/40 uppercase leading-relaxed tracking-tighter">
                  Your terminal balance is cryptographically anchored to the
                  LFES Liquidity Node.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-10">
          <div className="flex items-center justify-between px-8">
            <h3 className="text-[12px] font-black text-white uppercase tracking-[0.5em] brand-font flex items-center gap-4">
              <Coins size={22} className="text-[var(--gold)]" /> Sovereign Asset
              Matrix
            </h3>
            <div className="flex items-center gap-3 text-[9px] font-black text-white/30 uppercase tracking-widest">
              <RefreshCcw size={12} className="animate-spin-slow" /> Network
              Sync: Stable
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {assets.map(asset => (
              <AssetCard key={asset.symbol} asset={asset} />
            ))}
          </div>

          <div className="terminal-panel p-10 rounded-[4rem] bg-gradient-to-br from-[var(--gold)]/5 to-transparent border-dashed border-2 border-[var(--gold)]/20 shadow-inner">
            <div className="flex items-center gap-5 mb-8">
              <ArrowRightLeft className="text-[var(--gold)]" size={28} />
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em] brand-font">
                Escrow Transparency Protocol
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-green-500 transition-colors border border-white/5">
                  1
                </div>
                <span className="block text-[10px] font-black text-white uppercase tracking-[0.2em]">
                  Authorization
                </span>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
                  Instructions move assets from{' '}
                  <span className="text-green-500">Available</span> to{' '}
                  <span className="text-red-400 font-bold">
                    Locked (In-Queue)
                  </span>
                  .
                </p>
              </div>
              <div className="space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-blue-500 transition-colors border border-white/5">
                  2
                </div>
                <span className="block text-[10px] font-black text-white uppercase tracking-[0.2em]">
                  Escrow Locking
                </span>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
                  Assets are held in a high-fidelity multisig escrow to
                  guarantee transaction validity.
                </p>
              </div>
              <div className="space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-[var(--gold)] transition-colors border border-white/5">
                  3
                </div>
                <span className="block text-[10px] font-black text-white uppercase tracking-[0.2em]">
                  Settlement
                </span>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
                  Successful executions update{' '}
                  <span className="text-white font-bold">Total Custody</span>{' '}
                  and release bridge liquidity.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4">
          <div className="terminal-panel rounded-[3.5rem] flex flex-col h-full overflow-hidden border-white/10 bg-[var(--bg-panel)] shadow-2xl min-h-[800px]">
            <div className="px-10 py-10 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Database size={22} className="text-[var(--gold)]" />
                <h3 className="text-[12px] font-black text-white uppercase tracking-[0.5em] brand-font">
                  Strategic Ledger
                </h3>
              </div>
              <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">
                Audit Node #9401
              </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6">
              {activityLedger.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10 text-center px-16">
                  <History size={80} strokeWidth={0.5} className="mb-8" />
                  <span className="text-[12px] font-black uppercase tracking-[0.8em] leading-relaxed">
                    Matrix Empty
                  </span>
                </div>
              ) : (
                activityLedger.map((log, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col p-6 rounded-[2rem] bg-[#0d1624] border border-white/5 hover:border-[var(--gold)]/20 transition-all group shadow-lg animate-fade-in"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xl ${
                            log.status === 'Finalized'
                              ? 'bg-green-500/10 text-green-500 border-green-500/20'
                              : log.status === 'Processing' ||
                                  log.status === 'In Escrow'
                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}
                        >
                          {log.status === 'Finalized' ? (
                            <CheckCircle2 size={20} />
                          ) : (
                            <Clock size={20} className="animate-pulse" />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-black text-white tracking-widest uppercase">
                              {log.type}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[7px] font-black text-white/40 uppercase tracking-widest">
                              {log.category}
                            </span>
                          </div>
                          <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest font-mono">
                            {log.id}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col gap-1">
                        <span
                          className={`text-sm font-black tabular-nums ${log.status === 'Finalized' ? (log.type.includes('Buy') || log.type.includes('Deposit') ? 'text-green-500' : 'text-red-500') : 'text-amber-500'}`}
                        >
                          {log.status === 'Finalized'
                            ? log.type.includes('Buy') ||
                              log.type.includes('Deposit')
                              ? '+'
                              : '-'
                            : ''}
                          {log.amount.toLocaleString()} {log.asset}
                        </span>
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">
                          {log.time}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-[var(--text-secondary)] mb-5 italic font-medium leading-relaxed px-1">
                      &quot;{log.desc}&quot;
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${log.status === 'Finalized' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]'}`}
                        ></div>
                        <span
                          className={`text-[9px] font-black uppercase tracking-[0.3em] ${log.status === 'Finalized' ? 'text-green-500' : 'text-amber-500'}`}
                        >
                          {log.status}
                        </span>
                      </div>
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-tighter">
                        Valuation: ${log.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-10 bg-black/20 border-t border-white/5">
              <div className="flex items-center gap-5 p-6 rounded-[2rem] border border-[var(--gold)]/10 bg-[var(--gold)]/5 shadow-inner">
                <AlertTriangle
                  size={20}
                  className="text-[var(--gold)] shrink-0 animate-pulse"
                />
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                  Ledger entries reflect institutional flux. Finality is
                  guaranteed by the neural settlement bridge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeModal === 'deposit' && (
        <ModalBackdrop onClose={() => setActiveModal(null)}>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-24 h-24 rounded-[2.5rem] bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
              <Zap size={48} className="animate-pulse" />
            </div>
            <h2 className="brand-font text-4xl gold-text mb-4 uppercase font-black tracking-tighter">
              Capital Influx
            </h2>
            <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em]">
              Synchronize Secure Asset Bridge
            </p>
          </div>

          <div className="space-y-4">
            {assets.map(asset => (
              <button
                key={asset.symbol}
                disabled={isSubmitting}
                onClick={() => handleDepositTrigger(asset.symbol)}
                className="w-full flex items-center justify-between p-6 rounded-[1.75rem] bg-white/[0.02] border border-white/10 hover:border-blue-500/50 group transition-all hover:bg-blue-500/5 shadow-sm disabled:opacity-50"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[1rem] bg-white/5 flex items-center justify-center text-[var(--gold)] font-black group-hover:scale-110 transition-transform">
                    {asset?.symbol?.charAt(0) || ""}
                  </div>
                  <div className="text-left">
                    <span className="block text-[13px] font-black text-white uppercase tracking-widest leading-none mb-1">
                      {asset.name}
                    </span>
                    <span className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">
                      Institutional Protocol
                    </span>
                  </div>
                </div>
                {isSubmitting ? (
                  <Loader2 size={24} className="animate-spin text-blue-400" />
                ) : (
                  <QrCode
                    size={24}
                    className="text-white/10 group-hover:text-blue-400 transition-all"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-[2.5rem] bg-black/60 border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-black/80 hover:border-blue-500/30 transition-all shadow-xl">
            <div className="flex items-center gap-5">
              <CreditCard
                size={32}
                className="text-blue-400 group-hover:scale-110 transition-transform"
              />
              <div className="text-left">
                <span className="block text-[13px] font-black text-white uppercase tracking-widest mb-1">
                  Fiat Clearing Node
                </span>
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">
                  Visa / Master / Instant Sync
                </span>
              </div>
            </div>
            <ChevronRight
              size={20}
              className="text-white/10 group-hover:text-blue-400 group-hover:translate-x-2 transition-all"
            />
          </div>
        </ModalBackdrop>
      )}

      {activeModal === 'withdraw' && (
        <ModalBackdrop onClose={() => setActiveModal(null)}>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-24 h-24 rounded-[2.5rem] bg-red-500/10 flex items-center justify-center text-red-400 mb-8 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
              <ArrowDownLeft size={48} />
            </div>
            <h2 className="brand-font text-4xl gold-text mb-4 uppercase font-black tracking-tighter">
              Settlement Portal
            </h2>
            <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em]">
              External Principal Remittance
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] ml-3">
                Destination Cipher
              </label>
              <input
                type="text"
                value={withdrawData.address}
                onChange={e =>
                  setWithdrawData({ ...withdrawData, address: e.target.value })
                }
                placeholder="External Wallet Address (Ox...)"
                className="w-full bg-black/60 border border-white/10 rounded-[1.5rem] p-5 text-sm font-black text-white focus:outline-none focus:border-red-500/50 transition-all shadow-inner placeholder:text-white/10"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] ml-3">
                  Asset Shard
                </label>
                <select
                  value={withdrawData.symbol}
                  onChange={e =>
                    setWithdrawData({ ...withdrawData, symbol: e.target.value })
                  }
                  className="w-full bg-black/60 border border-white/10 rounded-[1.5rem] p-5 text-sm font-black text-white/60 focus:outline-none appearance-none cursor-pointer"
                >
                  {assets.map(a => (
                    <option key={a.symbol} value={a.symbol}>
                      {a.symbol} ({a.available})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] ml-3">
                  Allocation
                </label>
                <input
                  type="number"
                  value={withdrawData.amount}
                  onChange={e =>
                    setWithdrawData({ ...withdrawData, amount: e.target.value })
                  }
                  placeholder="0.00"
                  className="w-full bg-black/60 border border-white/10 rounded-[1.5rem] p-5 text-sm font-black text-white focus:outline-none focus:border-red-500/50 shadow-inner"
                />
              </div>
            </div>
            <button
              onClick={handleWithdrawSubmit}
              disabled={
                isSubmitting || !withdrawData.amount || !withdrawData.address
              }
              className="w-full py-6 rounded-[2.5rem] bg-gradient-to-r from-red-600 to-red-500 text-white text-[12px] font-black uppercase tracking-[0.5em] shadow-2xl hover:scale-[1.03] transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Initialize Remittance'
              )}
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4 p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 shadow-inner">
            <Lock size={18} className="text-red-400 shrink-0" />
            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] leading-relaxed">
              Withdrawals are subject to 12-block verification on the neural
              chain to ensure principal integrity.
            </span>
          </div>
        </ModalBackdrop>
      )}
    </div>
  );
};

export default WalletView;