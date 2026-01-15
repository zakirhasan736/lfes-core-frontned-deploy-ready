'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import Exchange from '@/components/Exchange';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Recovery from '@/components/Recovery';
import LiveStream from '@/components/LiveStream';
import AIAssistant from '@/components/AIAssistant';
import { User, Trade} from '@/types';
import {
  Sun,
  Moon,
  ShieldAlert,
  X,
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
} from 'lucide-react';
import { apiService } from '@/services/apiService';
import { TerminalError } from '@/services/errors';
import { useTerminalSocket } from '@/services/useTerminalSocket'; 

export interface OpenOrder extends Trade {
  status: 'pending' | 'filling' | 'filled' | 'cancelled';
}
export interface SignupProps {
  onSignup: (user: User) => void;
  onToggleLogin: () => void;
}
type TerminalSocketEvent =
  | {
      type: 'order_update';
      data: { order: Partial<OpenOrder> & { id: number } };
    }
  | {
      type: 'order_filled';
      data: { order_id: number };
    }
  | {
      type: 'trade';
      data: Trade & { realized_pnl: number };
    }
  | {
      type: 'balance_update';
      data: { balance: number };
    }
  | {
      type: 'mark_price';
      data: { pair: string; price: number };
    };

interface AppNotification {
  id: string;
  type: 'error' | 'success' | 'info';
  message: string;
  code?: string;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'recovery'>(
    'login'
  );
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'exchange'>(
    'dashboard'
  );
  const [trades, setTrades] = useState<Trade[]>([]);
  const [openOrders, setOpenOrders] = useState<OpenOrder[]>([]);
  const [showLiveStream, setShowLiveStream] = useState<boolean>(false);
  const [showAIAssistant, setShowAIAssistant] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [orderHistory, setOrderHistory] = useState<OpenOrder[]>([]);
  const [markPrices, setMarkPrices] = useState<Record<string, number>>({});

  const [pendingTrade, setPendingTrade] = useState<{
    side: 'buy' | 'sell';
    pair: string;
    price: number;
    amount: number;
    total: number;
  } | null>(null);

  const addNotification = useCallback(
    (
      message: string,
      type: 'error' | 'success' | 'info' = 'info',
      code?: string
    ) => {
      const id = Math.random().toString(36).substr(2, 9);
      setNotifications(prev =>
        [{ id, message, type, code }, ...prev].slice(0, 5)
      );
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 6000);
    },
    []
  );

  // Sync Global State from Backend
  const refreshTerminalState = useCallback(async () => {
    try {
      // 1. Fetch user first to verify session and update balance
      const updatedUser = await apiService.fetchUserData();

      if (!updatedUser) {
        if (isAuthenticated) {
          setIsAuthenticated(false);
          setUser(null);
        }
        return;
      }

      setUser(updatedUser);

      // 2. Fetch History and Active Orders only after successful Auth confirmation
      const [updatedTrades, updatedOrders] = await Promise.all([
        apiService.fetchTradeHistory(),
        apiService.fetchOpenOrders(),
      ]);

      if (updatedTrades) setTrades(updatedTrades);
      if (updatedOrders) setOpenOrders(updatedOrders);
    } catch (e) {
      console.error('Terminal state sync failed.');
    }
  }, [isAuthenticated]);

  // Initialization: Check session
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedUser = await apiService.fetchUserData();
        if (savedUser) {
          setUser(savedUser);
          setIsAuthenticated(true);
        }
      } catch (e) {
        // No valid session on node
      }
    };
    loadState();
  }, []);

  // Polling: Refresh data every 30 seconds when authenticated to keep balance/trades synced
  useEffect(() => {
    let interval: number | undefined;
    if (isAuthenticated) {
      // Immediate refresh on auth status change
      refreshTerminalState();

      interval = window.setInterval(() => {
        refreshTerminalState();
      }, 30000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAuthenticated, refreshTerminalState]);

  // UI/Theme Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('lfes_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') document.body.classList.add('light-mode');
    }

    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 1400) setIsSidebarCollapsed(true);
      else setIsSidebarCollapsed(false);
      if (width >= 1024) setIsMobileSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('lfes_theme', newTheme);
    if (newTheme === 'light') document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (e) {
      console.warn('Backend logout protocol disrupted.');
    }
    setUser(null);
    setTrades([]);
    setOpenOrders([]);
    setIsAuthenticated(false);
    setAuthMode('login');
    addNotification('Session terminated successfully.', 'info');
  };
  const handleOrderUpdate = (order: Partial<OpenOrder> & { id: number }) => {
    setOpenOrders(prev =>
      prev.map(o => (o.id === order.id ? { ...o, ...order } : o))
    );
  };
  const handleOrderFilled = (orderId: number) => {
    setOpenOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'filling' } : o))
    );

    setTimeout(() => {
      setOpenOrders(prev => {
        const filled = prev.find(o => o.id === orderId);
        if (!filled) return prev;

        setOrderHistory(h => [{ ...filled, status: 'filled' }, ...h]);
        return prev.filter(o => o.id !== orderId);
      });
    }, 700);
  };
type TradeWithPnL = Trade & { realized_pnl: number };
  const handleTrade = (trade: TradeWithPnL) => {
    if (!trade || !trade.pair) return;
    setTrades(prev => [trade, ...prev]);

    if (trade.realized_pnl !== 0) {
      addNotification(
        `PnL ${
          trade.realized_pnl > 0 ? '▲' : '▼'
        } $${trade.realized_pnl.toFixed(2)}`,
        trade.realized_pnl > 0 ? 'success' : 'error'
      );
    }
  };

  const handleBalanceUpdate = (data: { balance: number }) => {
    setUser(prev => (prev ? { ...prev, balance: data.balance } : prev));
  };

useTerminalSocket<TerminalSocketEvent>(
  event => {
    switch (event.type) {
      case 'order_update':
        handleOrderUpdate(event.data.order);
        break;

      case 'order_filled':
        handleOrderFilled(event.data.order_id);
        break;

      case 'trade':
        handleTrade(event.data);
        break;

      case 'balance_update':
        handleBalanceUpdate(event.data);
        break;

      case 'mark_price':
        setMarkPrices(p => ({
          ...p,
          [event.data.pair]: event.data.price,
        }));
        break;
    }
  },
  isAuthenticated // ✅ THIS IS THE KEY
);


 

  // --- TRADING WORKFLOW ---

  const handleOrderInitiation = (
    side: 'buy' | 'sell',
    pair: string,
    price: number,
    amount: number
  ) => {
    if (!user) return;
    const total = price * amount;
    if (side === 'buy' && user.balance < total) {
      addNotification(
        `Insufficient liquidity. Required $${total.toLocaleString()} USDT.`,
        'error',
        'BALANCE_LOW'
      );
      return;
    }
    setPendingTrade({ side, pair, price, amount, total });
  };

  const confirmExecution = async () => {
    if (!user || !pendingTrade || isExecuting) return;
    const { side, pair, price, amount } = pendingTrade;

    setIsExecuting(true);
    try {
      // Use createOrder for exchange matrix instructions
      await apiService.createOrder(side, pair, price, amount);

      addNotification(
        `${side.toUpperCase()} Instruction Transmitted: ${pair}`,
        'success',
        'PROTO_CONFIRMED'
      );
      setPendingTrade(null);

      // Full refresh of terminal state from server
      await refreshTerminalState();
    } catch (e: unknown) {
     const msg =
       e instanceof TerminalError ? e.message : 'Execution protocol failure.';

     addNotification(msg, 'error');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleOrderCancellation = async (id: string | number) => {
    try {
      await apiService.cancelOrder(id);
      await refreshTerminalState();
      addNotification('Order instruction aborted.', 'info');
    } catch (e: unknown) {
      addNotification(
        e instanceof Error ? e.message : 'Cancellation failed.',
        'error'
      );
    }
  };

  if (!isAuthenticated) {
    switch (authMode) {
      case 'login':
        return (
          <Login
            onLogin={userData => {
              setUser(userData);
              setIsAuthenticated(true);
              addNotification(`Welcome, ${userData.name}`, 'success');
            }}
            onToggleSignup={() => setAuthMode('signup')}
            onToggleRecovery={() => setAuthMode('recovery')}
          />
        );
      case 'signup':
        return (
          <Signup
            onSignup={userData => {
              setUser(userData);
              setIsAuthenticated(true);
              addNotification('Account initialized.', 'success');
            }}
            onToggleLogin={() => setAuthMode('login')}
          />
        );
      case 'recovery':
        return <Recovery onToggleLogin={() => setAuthMode('login')} />;
      default:
        return (
          <Login
            onLogin={userData => {
              setUser(userData);
              setIsAuthenticated(true);
            }}
            onToggleSignup={() => setAuthMode('signup')}
            onToggleRecovery={() => setAuthMode('recovery')}
          />
        );
    }
  }

  return (
    <div className="flex h-screen bg-(--bg-main) overflow-hidden">
      {/* Toast Notifications */}
      <div className="fixed top-20 right-6 z-300 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`pointer-events-auto terminal-panel p-4 rounded-xl border-l-4 shadow-2xl animate-fade-in flex gap-4 items-start ${
              n.type === 'error'
                ? 'border-red-500 bg-red-500/5'
                : n.type === 'success'
                ? 'border-green-500 bg-green-500/5'
                : 'border-(--gold) bg-(--gold)/5'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {n.type === 'error' && (
                <AlertCircle size={18} className="text-red-500" />
              )}
              {n.type === 'success' && (
                <CheckCircle2 size={18} className="text-green-500" />
              )}
              {n.type === 'info' && (
                <Info size={18} className="text-(--gold)" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-black text-(--text-primary) leading-tight">
                {n.message}
              </p>
              {n.code && (
                <p className="text-[8px] font-black uppercase tracking-widest mt-1 opacity-40">
                  {n.code}
                </p>
              )}
            </div>
            <button
              onClick={() =>
                setNotifications(prev =>
                  prev.filter(notif => notif.id !== n.id)
                )
              }
              className="opacity-30 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-100 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        userName={user?.name || ''}
        showLiveStream={showLiveStream}
        toggleLiveStream={() => setShowLiveStream(!showLiveStream)}
        showAI={showAIAssistant}
        toggleAI={() => setShowAIAssistant(!showAIAssistant)}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        closeMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-(--bg-main) relative">
        <header className="h-16 shrink-0 border-b border-(--border) bg-(--bg-header) backdrop-blur-xl flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden text-(--gold) p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="hidden xs:flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">
                Protocol Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-(--border) text-(--text-secondary) hover:text-(--gold) transition-all bg-(--bg-panel)"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[8px] font-black text-(--text-secondary) uppercase tracking-widest">
                Global Balance
              </span>
              <span className="text-lg font-black gold-text tabular-nums">
                $
                {user?.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-(--gold)/10 flex items-center justify-center border border-(--border) text-(--gold) font-black uppercase shadow-inner">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-4 pt-4 pb-9 sm:p-8 max-w-550 mx-auto w-full">
            <div className="flex flex-col xl:flex-row gap-8">
              <div
                className={`flex-1 flex flex-col gap-8 transition-all duration-500 ${
                  showAIAssistant ? 'xl:w-2/3' : 'w-full'
                }`}
              >
                {showLiveStream && (
                  <div className="terminal-panel rounded-3xl overflow-hidden border border-(--border) animate-fade-in shadow-2xl">
                    <LiveStream />
                  </div>
                )}
                {activeTab === 'dashboard' ? (
                  <Dashboard
                    user={user!}
                    trades={trades}
                    markPrices={markPrices}
                  />
                ) : (
                  <Exchange
                    user={user!}
                    trades={trades}
                    openOrders={openOrders}
                    onTrade={handleOrderInitiation}
                    onCancelOrder={handleOrderCancellation}
                  />
                )}
              </div>
              {showAIAssistant && (
                <div className="w-full xl:w-100 2xl:w-125 shrink-0 animate-fade-in">
                  <AIAssistant />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECURE AUTHORIZATION OVERLAY */}
      {pendingTrade && (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
          <div className="terminal-panel rounded-[3rem] p-10 sm:p-14 max-w-xl w-full border border-(--gold)/30 shadow-2xl relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-64 h-64 bg-(--gold)/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--gold)] to-[#aa8a22] flex items-center justify-center shadow-2xl">
                {isExecuting ? (
                  <Loader2 size={40} className="text-[#060b13] animate-spin" />
                ) : (
                  <ShieldAlert size={40} className="text-[#060b13]" />
                )}
              </div>
            </div>
            <h2 className="brand-font text-2xl text-center gold-text mb-8 tracking-[0.2em] uppercase font-black">
              Verify Instruction
            </h2>

            <div className="space-y-5 mb-12">
              <div className="flex justify-between items-center border-b border-(--border) pb-4">
                <span className="text-[10px] font-black text-(--text-secondary) uppercase tracking-widest">
                  Action
                </span>
                <span
                  className={`text-[12px] font-black uppercase ${
                    pendingTrade.side === 'buy'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {pendingTrade.side} {pendingTrade.pair}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-(--border) pb-4">
                <span className="text-[10px] font-black text-(--text-secondary) uppercase tracking-widest">
                  Entry Price
                </span>
                <span className="text-[12px] font-black text-(--text-primary) font-mono">
                  ${pendingTrade.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-6">
                <span className="text-[12px] font-black gold-text uppercase tracking-widest">
                  Escrow Total
                </span>
                <span className="text-3xl text-(--text-primary) tabular-nums font-bold">
                  $
                  {pendingTrade.total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                disabled={isExecuting}
                onClick={() => setPendingTrade(null)}
                className="flex-1 bg-(--text-secondary)/10 hover:bg-(--text-secondary)/20 text-(--text-secondary) py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all disabled:opacity-30"
              >
                Abort
              </button>
              <button
                disabled={isExecuting}
                onClick={confirmExecution}
                className="flex-1 bg-linear-to-r from-[var(--gold)] to-[#aa8a22] text-[#060b13] py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-[0_15px_40px_rgba(212,175,55,0.3)] hover:scale-[1.03] transition-all disabled:opacity-50"
              >
                {isExecuting ? 'Transmitting...' : 'Confirm Execution'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
