import React, { useState } from 'react';
import { 
  PieChart, Coins, Lock, Zap, ArrowUpRight, BarChart3, 
  ShieldCheck, Gem, TrendingUp, Users, Calendar, 
  Info, ChevronRight, Calculator, Layers, Landmark,
  Flame, ArrowDown, Activity, Globe, Wallet
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart as RePie, Pie, Cell } from 'recharts';

type EconomyTab = 'overview' | 'utility' | 'tokenomics' | 'vesting' | 'staking';

const MOCK_PRICE_DATA = [
  { time: '00:00', price: 0.42 }, { time: '04:00', price: 0.45 },
  { time: '08:00', price: 0.43 }, { time: '12:00', price: 0.48 },
  { time: '16:00', price: 0.52 }, { time: '20:00', price: 0.50 },
  { time: '23:59', price: 0.54 },
];

const TOKEN_DISTRIBUTION = [
  { name: 'Ecosystem', value: 40, color: '#d4af37' },
  { name: 'Partners', value: 20, color: '#927315' },
  { name: 'Founders', value: 15, color: '#64748b' },
  { name: 'Liquidity', value: 15, color: '#22c55e' },
  { name: 'DAO', value: 10, color: '#3b82f6' },
];

const TokenEconomyHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EconomyTab>('overview');

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* TOKEN HERO */}
      <div className="terminal-panel p-10 sm:p-16 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 border-[var(--gold)]/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold)]/5 blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex flex-col flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
               <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)]">
                  <Coins size={18} />
               </div>
               <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.6em]">LFES Core Asset</span>
            </div>
            <h1 className="brand-font text-4xl sm:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-8 leading-none">FAMILY <br/><span className="gold-text">Token Hub</span></h1>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] max-w-lg leading-relaxed mb-10 opacity-70">
              The economic heartbeat of the Lion Family Ecosystem. Powering governance, loyalty rewards, and institutional-grade trading benefits.
            </p>
            
            <div className="flex flex-wrap bg-white/5 p-1.5 rounded-2xl border border-white/5 self-center lg:self-start gap-1">
               {(['overview', 'utility', 'tokenomics', 'vesting', 'staking'] as const).map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="w-full lg:w-[450px] flex flex-col gap-6">
             <div className="terminal-panel p-8 rounded-[3rem] bg-black/40 border border-white/5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-widest">Market Price</span>
                      <span className="text-3xl font-black text-white tabular-nums">$0.5422</span>
                   </div>
                   <div className="text-right">
                      <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">+12.4%</span>
                      <div className="flex items-center gap-1 text-[7px] text-[var(--text-secondary)] uppercase font-bold">
                         <ArrowUpRight size={10} /> 24H FLUX
                      </div>
                   </div>
                </div>
                <div className="h-24 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MOCK_PRICE_DATA}>
                         <defs>
                            <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="var(--gold)" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <Area type="monotone" dataKey="price" stroke="var(--gold)" strokeWidth={2} fill="url(#priceGrad)" />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="terminal-panel p-6 rounded-3xl bg-white/[0.01] border-white/5">
                   <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Mkt Cap</span>
                   <span className="text-lg font-black text-white tracking-tight">$54.2M</span>
                </div>
                <div className="terminal-panel p-6 rounded-3xl bg-white/[0.01] border-white/5">
                   <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Staked</span>
                   <span className="text-lg font-black text-white tracking-tight">64%</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[500px]">
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 space-y-8">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="terminal-panel p-10 rounded-[3rem] bg-[var(--text-primary)]/[0.02] border-white/5 flex flex-col justify-between group hover:border-[var(--gold)]/30 transition-all">
                         <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                               <Flame size={24} />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Burn Protocol</h3>
                            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                               2.5% of all ecosystem trade fees are automatically bridged to the burn node, reducing circulating supply in real-time.
                            </p>
                         </div>
                         <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-end">
                            <div>
                               <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Total Burned</span>
                               <span className="text-2xl font-black text-white tabular-nums">1.2M FAMILY</span>
                            </div>
                            <ArrowUpRight className="text-orange-500" size={20} />
                         </div>
                      </div>

                      <div className="terminal-panel p-10 rounded-[3rem] bg-[var(--text-primary)]/[0.02] border-white/5 flex flex-col justify-between group hover:border-blue-500/30 transition-all">
                         <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                               <Users size={24} />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Holder Network</h3>
                            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                               The FAMILY community has expanded by 14% this quarter, with institutional nodes accounting for 42% of total supply.
                            </p>
                         </div>
                         <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-end">
                            <div>
                               <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Unique Nodes</span>
                               <span className="text-2xl font-black text-white tabular-nums">42.4K</span>
                            </div>
                            <Activity className="text-blue-500" size={20} />
                         </div>
                      </div>
                   </div>

                   <div className="terminal-panel p-10 rounded-[4rem] bg-gradient-to-r from-[var(--bg-panel)] to-white/[0.02] border-white/10 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Globe size={160} />
                      </div>
                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                         <div className="space-y-4 flex-1">
                            <span className="text-[9px] font-black text-[var(--gold)] uppercase tracking-[0.5em]">Active DAO</span>
                            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Governance Protocol V2</h3>
                            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed max-w-md">
                               Principals can now propose and vote on strategic asset listings and charity distributions directly via the terminal neural link.
                            </p>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-[var(--gold)] hover:text-[#060b13] transition-all">
                               View Active Proposals
                            </button>
                         </div>
                         <div className="flex flex-col items-center gap-2">
                            <div className="w-32 h-32 rounded-full border-4 border-[var(--gold)]/20 border-t-[var(--gold)] animate-spin-slow flex items-center justify-center">
                               <span className="text-2xl font-black gold-text">84%</span>
                            </div>
                            <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Quorum Reached</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="xl:col-span-4 space-y-8">
                   <div className="terminal-panel p-8 rounded-[3rem] border-white/5 bg-[var(--text-primary)]/[0.01]">
                      <h4 className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.4em] mb-8">Node Summary</h4>
                      <div className="space-y-6">
                         <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Circulating Supply</span>
                            <span className="text-[11px] font-black text-white">42.2M FAMILY</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Market Rank</span>
                            <span className="text-[11px] font-black text-white">#284</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Security Audit</span>
                            <span className="text-[11px] font-black text-green-500">CertiK Verified</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Bridge Status</span>
                            <span className="text-[11px] font-black text-blue-400">Multichain Active</span>
                         </div>
                      </div>
                      <div className="mt-10">
                         <button className="w-full py-5 rounded-3xl bg-[var(--gold)] text-[#060b13] text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                            Acquire FAMILY Shards
                         </button>
                      </div>
                   </div>

                   <div className="terminal-panel p-8 rounded-[3rem] bg-white/[0.01] border-white/5">
                      <div className="flex items-center gap-3 mb-4">
                         <Wallet size={16} className="text-[var(--gold)]" />
                         <span className="text-[10px] font-black text-white uppercase tracking-widest">My Balance</span>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-2xl font-black text-white tabular-nums">25,000.00</span>
                         <span className="text-[8px] font-black gold-text uppercase tracking-widest">Valuation: $13,555.00</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'utility' && (
          <div className="space-y-10 animate-fade-in">
             <div className="flex items-center justify-between px-4">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                   <Zap size={18} className="text-[var(--gold)]" /> Institutional Utility
                </h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Fee Reduction', desc: 'Holders receive tiered discounts on terminal execution fees based on their node balance.', icon: BarChart3 },
                  { title: 'Governance', desc: 'Vote on ecosystem expansion, strategic charity allocations, and new asset listings.', icon: ShieldCheck },
                  { title: 'VIP Access', desc: 'Access exclusive high-fidelity trading lounges, signal feeds, and private events.', icon: Gem },
                ].map((item, i) => (
                  <div key={i} className="terminal-panel p-10 rounded-[3.5rem] bg-white/[0.01] border-white/5 hover:border-[var(--gold)]/30 transition-all group flex flex-col items-center text-center">
                     <div className="w-20 h-20 rounded-[2rem] bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] mb-8 group-hover:scale-110 transition-transform">
                        <item.icon size={32} />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-4">{item.title}</h4>
                     <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                     <button className="mt-8 text-[9px] font-black text-[var(--gold)] uppercase tracking-[0.2em] border-b border-[var(--gold)]/20 pb-1 group-hover:text-white transition-colors">Learn Protocol</button>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'tokenomics' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8">
                   <div className="terminal-panel p-10 rounded-[4rem] bg-[var(--text-primary)]/[0.01] border-white/5">
                      <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em] mb-10">Supply Matrix</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                         <div className="h-[300px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                               <RePie>
                                  <Pie
                                    data={TOKEN_DISTRIBUTION}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                  >
                                    {TOKEN_DISTRIBUTION.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                               </RePie>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                               <div className="text-center">
                                  <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Total</span>
                                  <span className="text-sm font-black text-white">100M</span>
                               </div>
                            </div>
                         </div>
                         <div className="space-y-4">
                            {TOKEN_DISTRIBUTION.map((item, i) => (
                              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[var(--gold)]/20 transition-all">
                                 <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.name}</span>
                                 </div>
                                 <span className="text-[10px] font-black gold-text">{item.value}%</span>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="xl:col-span-4 flex flex-col gap-6">
                   <div className="terminal-panel p-8 rounded-[3rem] border-[var(--gold)]/20 bg-[var(--gold)]/5 flex-1">
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Economics Protocol</h4>
                      <div className="space-y-4">
                         <div className="flex justify-between border-b border-white/5 pb-4">
                            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Total Supply</span>
                            <span className="text-[11px] font-black text-white uppercase">100,000,000</span>
                         </div>
                         <div className="flex justify-between border-b border-white/5 pb-4">
                            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Inflation Rate</span>
                            <span className="text-[11px] font-black text-white uppercase">0.5% Yearly</span>
                         </div>
                         <div className="flex justify-between border-b border-white/5 pb-4">
                            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Deflationary Mechanism</span>
                            <span className="text-[11px] font-black text-white uppercase">Buy-back & Burn</span>
                         </div>
                         <div className="flex justify-between pt-2">
                            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Network Shard</span>
                            <span className="text-[11px] font-black text-[var(--gold)] uppercase">L-Family Chain</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'vesting' && (
          <div className="space-y-10 animate-fade-in">
             <div className="terminal-panel rounded-[3.5rem] overflow-hidden border-white/5 bg-[var(--bg-panel)]">
                <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                   <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                      <Lock size={18} className="text-[var(--gold)]" /> Release Schedule
                   </h3>
                   <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Shard Status: Synchronized</span>
                </div>
                <div className="p-10 overflow-x-auto">
                   <table className="w-full text-left border-separate border-spacing-y-4">
                      <thead>
                         <tr className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em]">
                            <th className="px-6 pb-2">Allocation Shard</th>
                            <th className="px-6 pb-2">Cliff Phase</th>
                            <th className="px-6 pb-2">Vesting Cycle</th>
                            <th className="px-6 pb-2 text-right">Progress</th>
                         </tr>
                      </thead>
                      <tbody className="text-[12px] font-black">
                         {[
                           { name: 'Seed Phase', cliff: '6 Months', cycle: '24 Months Linear', progress: '100%' },
                           { name: 'Private Strategic', cliff: '3 Months', cycle: '18 Months Linear', progress: '42%' },
                           { name: 'Team Alignment', cliff: '12 Months', cycle: '48 Months Linear', progress: '0%' },
                           { name: 'Ecosystem Fund', cliff: '0 Months', cycle: 'Continuous Node Use', progress: '14%' }
                         ].map((v, i) => (
                           <tr key={i} className="bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-2xl">
                              <td className="px-6 py-5 rounded-l-2xl text-white uppercase tracking-widest">{v.name}</td>
                              <td className="px-6 py-5 text-[var(--text-secondary)]">{v.cliff}</td>
                              <td className="px-6 py-5 text-[var(--text-secondary)]">{v.cycle}</td>
                              <td className="px-6 py-5 rounded-r-2xl text-right">
                                 <div className="flex items-center justify-end gap-4">
                                    <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                                       <div className="h-full bg-[var(--gold)]" style={{ width: v.progress }}></div>
                                    </div>
                                    <span className="text-[10px] gold-text tabular-nums">{v.progress}</span>
                                 </div>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'staking' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: 'Basic Vault', apy: '4.5%', lock: 'None', min: '1,000 FAMILY' },
                  { name: 'Alpha Staking', apy: '9.2%', lock: '90 Days', min: '5,000 FAMILY', hot: true },
                  { name: 'Principal Pool', apy: '18.4%', lock: '365 Days', min: '50,000 FAMILY' }
                ].map((pool, i) => (
                  <div key={i} className={`terminal-panel p-10 rounded-[3.5rem] border transition-all flex flex-col justify-between h-[450px] relative group ${pool.hot ? 'border-[var(--gold)]/40 bg-[var(--gold)]/5 shadow-2xl' : 'border-white/5 bg-white/[0.01]'}`}>
                     {pool.hot && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[var(--gold)] text-[#060b13] rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl">Most Synchronized</div>
                     )}
                     <div className="space-y-8">
                        <div className="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center text-[var(--gold)] border border-white/5">
                           <Layers size={28} />
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{pool.name}</h4>
                           <div className="flex items-center gap-2">
                              <TrendingUp size={14} className="text-green-500" />
                              <span className="text-xl font-black text-green-500 tabular-nums">{pool.apy} APY</span>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div className="flex justify-between text-[10px] font-bold text-[var(--text-secondary)] uppercase">
                              <span>Lock Duration</span>
                              <span className="text-white">{pool.lock}</span>
                           </div>
                           <div className="flex justify-between text-[10px] font-bold text-[var(--text-secondary)] uppercase">
                              <span>Min Principal</span>
                              <span className="text-white">{pool.min}</span>
                           </div>
                        </div>
                     </div>
                     <button className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${pool.hot ? 'bg-[var(--gold)] text-[#060b13]' : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white'}`}>
                        Initiate Node Staking
                     </button>
                  </div>
                ))}
             </div>

             <div className="terminal-panel p-12 rounded-[4rem] bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex items-center gap-8">
                   <div className="w-20 h-20 rounded-[2.5rem] bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] border border-[var(--gold)]/20 shadow-2xl">
                      <Calculator size={36} />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-xl font-black text-white uppercase tracking-tighter">Strategic Yield Calculator</h4>
                      <p className="text-[11px] text-[var(--text-secondary)] font-medium uppercase tracking-widest">Analyze potential returns based on current node flux.</p>
                   </div>
                </div>
                <button className="px-12 py-5 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all flex items-center gap-4 group">
                   Open Matrix <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
        )}
      </div>

      {/* FOOTER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="terminal-panel p-6 rounded-3xl border-dashed border-white/10 flex items-center gap-4 bg-white/[0.01]">
            <Landmark size={20} className="text-[var(--gold)]" />
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-white uppercase tracking-widest">Institutional DAO</span>
               <span className="text-[7px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Governance Participation Active</span>
            </div>
         </div>
         <div className="terminal-panel p-6 rounded-3xl border-dashed border-white/10 flex items-center gap-4 bg-white/[0.01]">
            <Users size={20} className="text-blue-400" />
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-white uppercase tracking-widest">42.4K Holders</span>
               <span className="text-[7px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Node Network Expansion +4%</span>
            </div>
         </div>
         <div className="terminal-panel p-6 rounded-3xl border-dashed border-white/10 flex items-center gap-4 bg-white/[0.01]">
            <Lock size={20} className="text-green-500" />
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-white uppercase tracking-widest">Liquidity Locked</span>
               <span className="text-[7px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Unicrypt Verified</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TokenEconomyHub;