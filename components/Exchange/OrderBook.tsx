import React from 'react';

const OrderBook: React.FC<{ currentPrice: number, pair: string }> = ({ currentPrice, pair }) => {
  const baseAsset = pair.split('/')[0];
  
  const asks = Array.from({ length: 10 }, (_, i) => ({ 
    price: currentPrice + (15 - i) * (currentPrice * 0.0001), 
    size: Math.random() * (baseAsset === 'BTC' ? 0.5 : 5) + 0.1, 
    tot: Math.random() * 12 + 1 
  }));
  const bids = Array.from({ length: 10 }, (_, i) => ({ 
    price: currentPrice - (i + 1) * (currentPrice * 0.0001), 
    size: Math.random() * (baseAsset === 'BTC' ? 0.5 : 5) + 0.1, 
    tot: Math.random() * 12 + 1 
  }));

  const Row = ({ price, size, total, type }: any) => (
    <div className="grid grid-cols-3 text-[11px] font-black h-6 items-center relative group cursor-pointer">
      {/* Background Visual Bar */}
      <div 
        className={`absolute inset-y-0 right-0 transition-all duration-500 ${type === 'ask' ? 'bg-red-500/10' : 'bg-green-500/10'}`} 
        style={{ width: `${Math.min(100, total * 8)}%` }}
      ></div>
      {/* Hover Indicator */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-(--text-primary)/5 transition-colors z-10"></div>
      
      <span className={`z-20 tabular-nums px-4 transition-colors ${type === 'ask' ? 'text-red-500/80 group-hover:text-red-500' : 'text-green-500/80 group-hover:text-green-500'}`}>
        {price.toLocaleString(undefined, { minimumFractionDigits: 1 })}
      </span>
      <span className="z-20 text-right text-(--text-primary)/60 group-hover:text-(--text-primary) tabular-nums px-4 transition-colors font-medium">{size.toFixed(4)}</span>
      <span className="z-20 text-right text-(--text-secondary) group-hover:text-(--text-secondary) tabular-nums px-4 transition-colors font-bold">{total.toFixed(2)}</span>
    </div>
  );

  return (
    <div className="terminal-panel rounded-xl h-full flex flex-col overflow-hidden shadow-2xl border-(--border)">
      <div className="p-6 border-b border-(--border) bg-(--text-primary)/[0.01] flex items-center justify-between">
         <h3 className="text-[10px] font-black text-(--text-primary) uppercase tracking-[0.4em] brand-font">Order Matrix</h3>
         <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/40"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/40"></div>
         </div>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0 bg-(--bg-main)/50">
        <div className="grid grid-cols-3 text-[8px] font-black text-(--text-secondary) uppercase tracking-[0.2em] py-3 px-4 border-b border-(--border) bg-(--bg-panel)/40">
          <span>Price (USDT)</span>
          <span className="text-right">Vol ({baseAsset})</span>
          <span className="text-right">Sum</span>
        </div>
        
        {/* Asks (Sell Orders) */}
        <div className="flex-1 overflow-hidden flex flex-col justify-end py-1">
          {asks.map((a, i) => <Row key={i} price={a.price} size={a.size} total={a.tot} type="ask" />)}
        </div>

        {/* Spread & Market Price */}
        <div className="py-5 px-4 bg-(--bg-panel) border-y border-(--border) flex flex-col items-center gap-1 relative overflow-hidden group">
           <div className="absolute inset-0 bg-linear-to-r from-transparent via-(--gold)/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="text-2xl font-black text-green-500 tabular-nums tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700">
             ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 1 })}
           </div>
           <div className="text-[8px] font-black text-(--text-secondary) uppercase tracking-[0.3em]">Execution Midpoint</div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="flex-1 overflow-hidden py-1">
          {bids.map((b, i) => <Row key={i} price={b.price} size={b.size} total={b.tot} type="bid" />)}
        </div>
      </div>
      
      <div className="px-6 py-4 bg-(--bg-panel)/80 border-t border-(--border) flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-(--text-secondary)/60">
         <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-(--gold) rounded-full"></span>
            <span>Tick: 0.1</span>
         </div>
         <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
            <span>Live Feed Active</span>
         </div>
      </div>
    </div>
  );
};

export default OrderBook;