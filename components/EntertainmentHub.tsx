import React, { useState } from 'react';
import { 
  Gamepad2, Tv, Trophy, Coins, Users, Heart, Star, 
  Play, Calendar, ExternalLink, Zap, Shield, 
  Search, Filter, ChevronRight, MessageCircle, DollarSign
} from 'lucide-react';

type EntTab = 'poker' | 'streaming' | 'events';

const EntertainmentHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<EntTab>('poker');
  const [donationAmount, setDonationAmount] = useState<string>('');

  const events = [
    { title: 'Lion Poker World Series', date: 'Oct 12, 2025', prize: '$100k USDT', status: 'Registering' },
    { title: 'DeFi Alpha Stream Marathon', date: 'Oct 15, 2025', prize: 'Exclusive NFTs', status: 'Upcoming' },
    { title: 'Principal Gaming Night', date: 'Oct 20, 2025', prize: 'FAMILY Tokens', status: 'Upcoming' },
  ];

  const streams = [
    { title: 'High Stakes Technical Analysis', user: 'Principal_Alpha', viewers: '1.2k', tags: ['BTC', 'Live'] },
    { title: 'Poker Night: Founders Table', user: 'Lion_Family_Core', viewers: '850', tags: ['Poker', 'Social'] },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* ENTERTAINMENT HERO */}
      <div className="terminal-panel p-10 sm:p-16 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 border-[var(--gold)]/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold)]/5 blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex flex-col flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
               <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)]">
                  <Gamepad2 size={18} />
               </div>
               <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.6em]">LFES Leisure Hub</span>
            </div>
            <h1 className="brand-font text-4xl sm:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-8 leading-none">Global <br/><span className="gold-text">Entertainment</span></h1>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] max-w-lg leading-relaxed mb-10 opacity-70">
              High-stakes gaming, premium content, and elite social gatherings. The LFES Entertainment Hub is where strategy meets leisure.
            </p>
            
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 self-center lg:self-start">
               <button 
                 onClick={() => setActiveSubTab('poker')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'poker' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Lion Poker
               </button>
               <button 
                 onClick={() => setActiveSubTab('streaming')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'streaming' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Pro Streams
               </button>
               <button 
                 onClick={() => setActiveSubTab('events')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'events' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Tournaments
               </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full lg:w-[400px]">
             <div className="terminal-panel p-8 rounded-3xl bg-white/[0.01] border-white/5 text-center flex flex-col items-center">
                <Trophy size={24} className="text-[var(--gold)] mb-3" />
                <span className="text-xl font-black text-white">420</span>
                <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Global Rank</span>
             </div>
             <div className="terminal-panel p-8 rounded-3xl bg-white/[0.01] border-white/5 text-center flex flex-col items-center">
                <Star size={24} className="text-[var(--gold)] mb-3" />
                <span className="text-xl font-black text-white">2.5k</span>
                <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Leisure XP</span>
             </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[600px]">
        {activeSubTab === 'poker' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 space-y-8">
                   <div className="terminal-panel aspect-video rounded-[3rem] bg-[url('https://images.unsplash.com/photo-1541272474964-f159ed18f33b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center relative group overflow-hidden border-[var(--gold)]/20 shadow-2xl">
                      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-700 flex flex-col items-center justify-center text-center px-12">
                         <div className="w-20 h-20 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] mb-6 animate-pulse">
                            <Gamepad2 size={40} />
                         </div>
                         <h3 className="brand-font text-3xl font-black text-white uppercase tracking-tighter mb-4">Lion Poker <span className="gold-text">Table</span></h3>
                         <p className="text-[11px] font-bold text-white/60 uppercase tracking-widest max-w-sm mb-8">
                            High-stakes hold'em exclusively for ecosystem principals. Proven-fair shuffling and instant USDT settlement.
                         </p>
                         <button className="px-10 py-5 bg-[var(--gold)] text-[#060b13] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_var(--gold-glow)]">
                            Join Strategic Table
                         </button>
                      </div>
                      <div className="absolute bottom-6 left-6 flex items-center gap-3">
                         <div className="px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[8px] font-black text-white uppercase">84 Players Online</div>
                         <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-[8px] font-black text-green-500 uppercase">Min Buy: 100 USDT</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {['Fast Fold', 'Tournament', 'SIT & GO'].map((mode, i) => (
                        <div key={i} className="terminal-panel p-8 rounded-3xl bg-white/[0.01] border-white/5 hover:border-[var(--gold)]/30 transition-all group cursor-pointer text-center">
                           <h4 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-4 group-hover:text-[var(--gold)] transition-colors">{mode}</h4>
                           <div className="text-[8px] font-black text-white/40 uppercase tracking-widest">Initialize Node</div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="xl:col-span-4 space-y-8">
                   <div className="terminal-panel p-8 rounded-[3rem] border-white/5 flex flex-col gap-6 bg-[var(--text-primary)]/[0.01]">
                      <h4 className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.4em] brand-font border-b border-white/5 pb-4">Principal Leaderboard</h4>
                      <div className="space-y-6">
                         {[
                           { name: 'Whale_Watcher', profit: '+$14,250', rank: 1 },
                           { name: 'Alpha_Executor', profit: '+$8,120', rank: 2 },
                           { name: 'Node_Master', profit: '+$5,400', rank: 3 }
                         ].map((p, i) => (
                           <div key={i} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <span className="text-[10px] font-black text-[var(--gold)]">{p.rank}</span>
                                 <span className="text-[11px] font-black text-white uppercase">{p.name}</span>
                              </div>
                              <span className="text-[10px] font-black text-green-500 tabular-nums">{p.profit}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="terminal-panel p-8 rounded-[3rem] border-dashed border-[var(--gold)]/20 bg-[var(--gold)]/5">
                      <div className="flex items-center gap-3 mb-4">
                         <Shield size={16} className="text-[var(--gold)]" />
                         <span className="text-[9px] font-black text-white uppercase tracking-widest">Proof of Fair</span>
                      </div>
                      <p className="text-[9px] text-[var(--text-secondary)] leading-relaxed font-bold">
                         All poker mechanics on the LFES terminal are governed by a decentralized RNG protocol, verifiable on-chain for total transparency.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeSubTab === 'streaming' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 space-y-8">
                   <div className="terminal-panel aspect-video rounded-[3rem] bg-black border-white/5 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200')] bg-cover opacity-60"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                            <Play size={24} className="ml-1" />
                         </div>
                      </div>
                      <div className="absolute top-6 left-6 flex items-center gap-3">
                         <div className="bg-red-600 px-3 py-1 rounded-lg text-[8px] font-black text-white uppercase tracking-widest animate-pulse">LIVE</div>
                         <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[8px] font-black text-white uppercase">1,204 Viewers</div>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/20 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)]">
                               <Tv size={20} />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-[11px] font-black text-white uppercase tracking-widest">Alpha Strategy Stream</span>
                               <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest">Principal_Alpha</span>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"><MessageCircle size={16} /></button>
                            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"><Heart size={16} /></button>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font px-4">Recommended Channels</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {streams.map((s, i) => (
                           <div key={i} className="terminal-panel p-6 rounded-[2.5rem] bg-white/[0.01] border-white/5 hover:border-[var(--gold)]/30 transition-all flex items-center gap-6 group cursor-pointer">
                              <div className="w-20 h-20 rounded-2xl bg-white/5 shrink-0 overflow-hidden relative">
                                 <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/20 to-transparent"></div>
                                 <div className="absolute inset-0 flex items-center justify-center text-[var(--gold)] opacity-30 group-hover:opacity-100 transition-opacity">
                                    <Play size={20} />
                                 </div>
                              </div>
                              <div className="flex-1 space-y-2">
                                 <h5 className="text-[12px] font-black text-white leading-tight">{s.title}</h5>
                                 <div className="flex items-center gap-3 text-[8px] font-black text-white/40 uppercase tracking-widest">
                                    <span>{s.user}</span>
                                    <span>•</span>
                                    <span>{s.viewers} Viewers</span>
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="xl:col-span-4 space-y-8">
                   <div className="terminal-panel p-10 rounded-[3rem] border-[var(--gold)]/20 bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 flex flex-col gap-8 shadow-xl">
                      <div className="text-center space-y-2">
                         <div className="w-16 h-16 rounded-3xl bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] mx-auto mb-6">
                            <Heart size={32} />
                         </div>
                         <h4 className="text-[14px] font-black text-white uppercase tracking-widest">Support Principal</h4>
                         <p className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Boost the network signal</p>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                         {['5', '25', '100'].map(val => (
                           <button 
                             key={val} 
                             onClick={() => setDonationAmount(val)}
                             className={`py-3 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                               donationAmount === val ? 'bg-[var(--gold)] text-[#060b13] border-[var(--gold)]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                             }`}
                           >
                              {val} USDT
                           </button>
                         ))}
                      </div>

                      <div className="relative group">
                         <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                         <input 
                           type="number" 
                           value={donationAmount}
                           onChange={e => setDonationAmount(e.target.value)}
                           placeholder="Custom..."
                           className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-xs font-black text-white focus:outline-none focus:border-[var(--gold)]/40 transition-all placeholder:text-white/20"
                         />
                      </div>

                      <button className="w-full py-5 rounded-[1.5rem] bg-[var(--gold)] text-[#060b13] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">
                         Transmit Donation
                      </button>

                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                         <Shield size={14} className="text-[var(--gold)]" />
                         <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">100% of donation goes directly to the content principal.</span>
                      </div>
                   </div>

                   <div className="terminal-panel p-8 rounded-[2.5rem] border-white/5 bg-[var(--text-primary)]/[0.01]">
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Recent Supporters</h4>
                      <div className="space-y-4">
                         {[
                           { name: 'DeFi_King', amount: '25 USDT' },
                           { name: 'Stable_Dave', amount: '100 USDT' }
                         ].map((d, i) => (
                           <div key={i} className="flex justify-between items-center text-[9px] font-black uppercase">
                              <span className="text-white/60">{d.name}</span>
                              <span className="gold-text">{d.amount}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeSubTab === 'events' && (
          <div className="space-y-10 animate-fade-in">
             <div className="flex items-center justify-between px-4">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                   <Calendar size={18} className="text-[var(--gold)]" /> Global Calendar
                </h3>
                <div className="flex items-center gap-3">
                   <Filter size={14} className="text-white/40" />
                   <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Strategic Shards Only</span>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {events.map((e, i) => (
                  <div key={i} className="terminal-panel p-10 rounded-[3.5rem] bg-[var(--text-primary)]/[0.01] border-white/5 hover:border-[var(--gold)]/30 transition-all group flex flex-col sm:flex-row gap-8 items-center text-center sm:text-left">
                     <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-[var(--gold)]/20 to-transparent flex flex-col items-center justify-center text-[var(--gold)] shrink-0 group-hover:rotate-6 transition-all border border-[var(--gold)]/10">
                        <span className="text-xs font-black uppercase opacity-60">{e.date.split(' ')[0]}</span>
                        <span className="text-2xl font-black">{e.date.split(' ')[1].replace(',', '')}</span>
                     </div>
                     <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                           <h4 className="text-xl font-black text-white tracking-tighter uppercase">{e.title}</h4>
                           <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                             e.status === 'Registering' ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-white/40'
                           }`}>{e.status}</span>
                        </div>
                        <div className="flex items-center gap-6 justify-center sm:justify-start">
                           <div className="flex items-center gap-2">
                              <Coins size={14} className="text-[var(--gold)]" />
                              <span className="text-[11px] font-black gold-text uppercase">{e.prize}</span>
                           </div>
                           <div className="flex items-center gap-2 text-white/40">
                              <Users size={14} />
                              <span className="text-[9px] font-black uppercase tracking-widest">84 Slots Open</span>
                           </div>
                        </div>
                        <button className="w-full sm:w-auto px-10 py-3 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest group-hover:bg-[var(--gold)] group-hover:text-[#060b13] transition-all">
                           Synchronize Participation
                        </button>
                     </div>
                  </div>
                ))}
             </div>
             
             <div className="terminal-panel p-12 rounded-[4rem] border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center text-center">
                <Trophy size={48} className="text-[var(--gold)]/20 mb-8" />
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">More Events Synchronizing...</h4>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntertainmentHub;