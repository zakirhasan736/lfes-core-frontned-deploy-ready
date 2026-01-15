import React, { useEffect, useRef, useState } from 'react';
import { Trade } from '@/types/index';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

interface TradingChartProps {
  pair: string;
  trades?: Trade[];
}

const TradingChart: React.FC<TradingChartProps> = ({ pair, trades = [] }) => {
  const container = useRef<HTMLDivElement>(null);
  const [latency, setLatency] = useState(14);
  const [isLoaded, setIsLoaded] = useState(false);

  // Markers for display - take the last few trades
  const tradeMarkers = trades.slice(0, 12);

  useEffect(() => {
    const symbol = pair.replace('/', '');
    const formattedSymbol = `BINANCE:${symbol}`;

    if (!container.current) return;

    container.current.innerHTML = '';
    setIsLoaded(false);

    const widgetDiv = document.createElement('div');
    widgetDiv.className = "tradingview-widget-container__widget w-full h-full";
    container.current.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    // Detect theme for TradingView widget
    const isLight = document.body.classList.contains('light-mode');
    
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": formattedSymbol,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": isLight ? "light" : "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "calendar": false,
      "support_host": "https://www.tradingview.com",
      "backgroundColor": isLight ? "rgba(255, 255, 255, 1)" : "rgba(6, 11, 19, 1)",
      "gridColor": isLight ? "rgba(15, 23, 42, 0.05)" : "rgba(43, 49, 57, 0.05)",
      "hide_side_toolbar": false,
      "details": false,
      "hotlist": false,
      "calendar_event": false,
      "show_popup_button": true,
      "popup_width": "1000",
      "popup_height": "650"
    });

    container.current.appendChild(script);

    const timer = setTimeout(() => setIsLoaded(true), 1500);

    const latencyInterval = setInterval(() => {
      setLatency(prev => Math.max(8, Math.min(25, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(latencyInterval);
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [pair]);

  return (
    <div className="w-full h-full flex flex-col min-h-87.5 relative bg-(--bg-main)">
      {!isLoaded && (
        <div className="absolute inset-0 bg-(--bg-main) flex flex-col items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
             <div className="w-8 h-8 border-4 border-(--gold)/10 border-t-(--gold) rounded-full animate-spin"></div>
             <p className="text-[9px] font-black text-(--gold) uppercase tracking-[0.3em] brand-font text-center">Syncing Feed...</p>
          </div>
        </div>
      )}

      {/* TRADE MARKERS OVERLAY - Interactive elements for past executions */}
      {isLoaded && trades.length > 0 && (
        <div className="absolute top-16 left-8 right-8 z-30 pointer-events-none">
          <div className="flex flex-wrap gap-2 animate-fade-in">
            {tradeMarkers.map((t) => (
              <div 
                key={t.id} 
                className="pointer-events-auto relative group"
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-crosshair shadow-lg transform hover:scale-125 ${
                  t.side === 'buy' 
                  ? 'bg-green-500/20 border-green-500 text-green-500 hover:bg-green-500 hover:text-white' 
                  : 'bg-red-500/20 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                }`}>
                  {t.side === 'buy' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>

                {/* TOOLTIP ON HOVER - High fidelity with theme-aware colors */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 transform group-hover:translate-y-0 translate-y-2">
                  <div className="terminal-panel p-4 rounded-xl border border-(--border) shadow-2xl bg-(--bg-panel) backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-(--border) pb-2 mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${t.side === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                        {t.side.toUpperCase()} EXECUTION
                      </span>
                      <span className="text-[8px] font-bold text-(--text-secondary) opacity-50">{t.time}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px]">
                        <span className="text-(--text-secondary) font-black uppercase tracking-tighter">Price</span>
                        <span className="text-(--text-primary) font-black tabular-nums font-mono">${t.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[9px]">
                        <span className="text-(--text-secondary) font-black uppercase tracking-tighter">Amount</span>
                        <span className="text-(--text-primary) font-black tabular-nums font-mono">{t.amount} BTC</span>
                      </div>
                      <div className="flex justify-between text-[10px] pt-1 border-t border-(--border)">
                        <span className="gold-text font-black uppercase tracking-tighter">Total</span>
                        <span className="text-(--text-primary) tabular-nums font-mono font-bold">${t.total.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 opacity-30">
                      <Target size={8} className="text-(--gold)" />
                      <span className="text-[7px] font-black text-(--text-secondary) uppercase tracking-[0.2em]">Verified on Node</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div 
        ref={container} 
        className="flex-1 w-full h-full rounded-xl overflow-hidden tradingview-widget-container" 
        style={{ minHeight: '350px' }}
      />
      
      {/* HUD Panels */}
      <div className="absolute bottom-4 right-4 pointer-events-none z-20">
        <div className="bg-(--bg-panel)/90 backdrop-blur-xl p-3 rounded-xl border border-(--gold)/10 shadow-2xl min-w-35 space-y-2">
          <div className="flex items-center justify-between border-b border-(--border) pb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[8px] font-black text-(--text-secondary) uppercase tracking-[0.2em]">Node Feed</span>
            </div>
            <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Live</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[8px] text-(--text-secondary) font-black uppercase tracking-tighter">Latency</span>
            <span className="text-[10px] text-(--text-primary) font-mono font-black tabular-nums">{latency}ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;