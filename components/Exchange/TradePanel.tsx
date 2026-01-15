import React, { useState, useEffect } from 'react';
import { Database, Wallet, ArrowUpCircle, ArrowDownCircle, Shield, Info } from 'lucide-react';

const TradePanel: React.FC<{ 
  currentPrice: number, 
  balance: number, 
  pair: string,
  onTrade: (t: 'buy' | 'sell', a: number) => void 
}> = ({ currentPrice, balance, pair, onTrade }) => {
  const [amt, setAmt] = useState('');
  const [displayBalance, setDisplayBalance] = useState(balance);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const baseAsset = pair.split('/')[0];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Animate balance update visually for "real-time" feel
  useEffect(() => {
    if (Math.abs(balance - displayBalance) > 0.001) {
      setIsUpdating(true);
      const timer = setTimeout(() => {
        setDisplayBalance(balance);
        setIsUpdating(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [balance, displayBalance]);

  const calculateAmt = (percent: number) => {
    const totalPotential = balance / currentPrice;
    const calculated = (totalPotential * (percent / 100)).toFixed(4);
    setAmt(calculated);
  };

  const getPercentageTooltip = (percent: number) => {
    return ((balance * (percent / 100)) / currentPrice).toFixed(4);
  };

  const handleAction = (type: 'buy' | 'sell') => {
    const parsedAmt = parseFloat(amt);
    if (!parsedAmt || parsedAmt <= 0) return;
    onTrade(type, parsedAmt);
    // Visual cue of balance deduction for BUY or escrow
    if (type === 'buy') {
      setIsUpdating(true);
      setDisplayBalance(prev => prev - (parsedAmt * currentPrice));
    }
    setAmt('');
  };

  const isValidInput = amt !== '' && parseFloat(amt) > 0;

  return (
    <div className={`terminal-panel rounded-2xl overflow-hidden flex flex-col shadow-2xl relative border-[#d4af37]/20 h-full group/hub transition-all duration-700 ${hasMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      {/* Header */}
      <div className="bg-(--bg-panel) p-5 border-b border-(--border) flex items-center justify-between">
         <div className="flex items-center gap-2.5">
            <Shield size={14} className="text-(--gold)" />
            <h3 className="text-[9px] font-black text-(--text-primary) uppercase tracking-[0.4em] brand-font">Execution Hub</h3>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
            <span className="text-[7px] font-black text-(--text-secondary) uppercase tracking-widest">HFT SECURE</span>
         </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col space-y-7">
        {/* REAL-TIME LIQUIDITY BALANCE */}
        <div className={`bg-(--bg-main) border ${isUpdating ? 'border-(--gold) shadow-[0_0_25px_var(--gold-glow) scale-[1.02]' : 'border-(--border)'} rounded-2xl px-5 py-3 flex flex-col gap-2 group shadow-inner relative overflow-hidden transition-all duration-500`}>
           <div className={`absolute top-0 right-0 w-32 h-32 bg-(--gold)/5 blur-3xl -mr-12 -mt-12 transition-opacity duration-500 ${isUpdating ? 'opacity-100' : 'opacity-30'}`}></div>
           <div className="flex items-center justify-between relative z-10">
             <div className="flex items-center gap-2">
               <Wallet size={12} className="text-(--gold) opacity-60" />
               <span className="text-[8px] font-black text-(--text-secondary) uppercase tracking-[0.3em]">Liquidity Pool</span>
             </div>
             <div className="flex items-center gap-1.5">
               <span className={`text-[7px] font-black uppercase tracking-widest transition-all duration-500 ${isUpdating ? 'text-(--gold) animate-pulse' : 'text-(--text-secondary)'}`}>
                 {isUpdating ? 'Updating...' : 'Verified'}
               </span>
             </div>
           </div>
           <div className={`text-xl font-black tabular-nums transition-all duration-500 origin-left relative z-10 ${isUpdating ? 'gold-text scale-[1.05] drop-shadow-[0_0_15px_var(--gold-glow)' : 'text-(--text-primary)'}`}>
             $ {displayBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
           </div>
        </div>

        {/* Input Matrix */}
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
               <label className="text-[8px] font-black text-(--text-secondary) uppercase tracking-[0.4em]">Market Reference</label>
               <Info size={10} className="text-(--text-secondary) hover:text-(--gold) transition-colors cursor-help" />
            </div>
            <div className="relative group">
              <input 
                type="text" 
                readOnly 
                value={currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })} 
                className="w-full bg-(--bg-panel) border border-(--border) rounded-xl p-4 text-xs font-black text-(--text-primary)/20 focus:outline-none transition-all shadow-inner" 
              />
              <span className="absolute right-5 top-4 text-[9px] font-black text-(--text-secondary) uppercase tracking-widest">USDT</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
               <label className="text-[8px] font-black text-(--text-secondary) uppercase tracking-[0.4em]">Entry Volume</label>
               <span className="text-[7px] font-bold text-(--gold) uppercase tracking-widest">Precision {baseAsset}</span>
            </div>
            <div className="relative group">
              <input 
                type="number" 
                value={amt} 
                onChange={e => setAmt(e.target.value)} 
                placeholder="0.0000" 
                min="0"
                step="0.0001"
                className="w-full bg-(--bg-main) border border-(--border) focus:border-(--gold)/60 focus:ring-4 focus:ring-(--gold)/5 rounded-xl p-4 text-xs font-black text-(--text-primary) focus:outline-none transition-all placeholder:text-(--text-secondary)/30 shadow-inner" 
              />
              <span className="absolute right-5 top-4 text-[9px] font-black text-(--gold) uppercase tracking-widest">{baseAsset}</span>
            </div>
          </div>
        </div>

        {/* Shortcut Matrix */}
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map(p => (
            <div key={p} className="relative group/tip">
              <button 
                onClick={() => calculateAmt(p)} 
                className="w-full py-3 bg-(--bg-panel) border border-(--border) rounded-xl text-[8px] font-black text-(--text-secondary) hover:text-(--gold) hover:border-(--gold)/40 hover:bg-(--gold)/5 transition-all active:scale-90"
              >
                {p}%
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-(--bg-panel) border border-(--gold)/30 rounded-lg opacity-0 group-hover/tip:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-2xl scale-90 group-hover/tip:scale-100 backdrop-blur-md">
                 <span className="text-[9px] font-black text-(--text-primary) tabular-nums tracking-widest">{getPercentageTooltip(p)} {baseAsset}</span>
                 <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-(--gold)/30"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            disabled={!isValidInput}
            onClick={() => handleAction('buy')} 
            className={`action-button py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl flex items-center justify-center gap-2 group ${
              isValidInput 
                ? 'bg-linear-to-br from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 hover:scale-[1.05] hover:shadow-green-500/30 active:scale-95' 
                : 'bg-(--bg-panel) border border-(--border) text-(--text-secondary) opacity-40 grayscale cursor-not-allowed'
            }`}
          >
            <ArrowUpCircle size={14} className={isValidInput ? "group-hover:-translate-y-1 transition-transform" : ""} />
            Buy {baseAsset}
          </button>
          <button 
            disabled={!isValidInput}
            onClick={() => handleAction('sell')} 
            className={`action-button py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl flex items-center justify-center gap-2 group ${
              isValidInput 
                ? 'bg-linear-to-br from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 hover:scale-[1.05] hover:shadow-red-500/30 active:scale-95' 
                : 'bg-(--bg-panel) border border-(--border) text-(--text-secondary) opacity-40 grayscale cursor-not-allowed'
            }`}
          >
            <ArrowDownCircle size={14} className={isValidInput ? "group-hover:translate-y-1 transition-transform" : ""} />
            Sell {baseAsset}
          </button>
        </div>
      </div>

      <div className="p-4 bg-(--text-primary)/[0.02] border-t border-(--border) flex items-center justify-center gap-2">
         <Database size={10} className="text-(--text-secondary)" />
         <span className="text-[8px] font-black text-(--text-secondary) uppercase tracking-[0.4em]">Proprietary Node Active</span>
      </div>
    </div>
  );
};

export default TradePanel;