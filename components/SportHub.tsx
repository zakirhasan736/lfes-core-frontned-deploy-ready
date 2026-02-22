import React, { useState } from 'react';
import { 
  Trophy, Swords, Gamepad2, Flag, Activity, Users, 
  ChevronRight, Timer, MapPin, Zap, Star, Shield,
  Target, Ticket, Radio, Play, Award, Calendar
} from 'lucide-react';

type SportTab = 'fight' | 'esports' | 'circuit';

const SportHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SportTab>('fight');

  const upcomingBouts = [
    { id: 1, title: 'Heavyweight Championship', fighters: ['Leo "The Lion" Silva', 'Viktor "The Bear" Volkov'], date: 'Oct 25, 2025', status: 'Main Event' },
    { id: 2, title: 'Middleweight Eliminator', fighters: ['Jax "Apex" Chen', 'Sasha "Ghost" Reed'], date: 'Oct 25, 2025', status: 'Co-Main' },
  ];

  const esportsTournaments = [
    { title: 'FAMILY Invitational: Shard 01', game: 'Strategic Warfare', prize: '50,000 USDT', teams: 16, status: 'Open' },
    { title: 'Neural League: Season 4', game: 'Cyber Tactics', prize: '25,000 USDT', teams: 8, status: 'Live' },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* ARENA HERO */}
      <div className="terminal-panel p-10 sm:p-16 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 border-[var(--gold)]/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 blur-[150px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex flex-col flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
               <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)]">
                  <Trophy size={18} />
               </div>
               <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.6em]">LFES Global Arena</span>
            </div>
            <h1 className="brand-font text-4xl sm:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-8 leading-none">The Arena <br/><span className="gold-text">Protocol</span></h1>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] max-w-lg leading-relaxed mb-10 opacity-70">
              Where physical peak meets digital strategy. Access exclusive ecosystem tournaments, world-class combat sports, and elite offline racing.
            </p>
            
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 self-center lg:self-start">
               <button 
                 onClick={() => setActiveTab('fight')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'fight' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Fight League
               </button>
               <button 
                 onClick={() => setActiveTab('esports')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'esports' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Esports Hub
               </button>
               <button 
                 onClick={() => setActiveTab('circuit')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'circuit' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Elite Circuit
               </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full lg:w-[400px]">
             <div className="terminal-panel p-8 rounded-3xl bg-white/[0.01] border-white/5 text-center flex flex-col items-center group cursor-pointer hover:border-[var(--gold)]/20 transition-all">
                <Target size={24} className="text-[var(--gold)] mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xl font-black text-white">42</span>
                <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Active Bouts</span>
             </div>
             <div className="terminal-panel p-8 rounded-3xl bg-white/[0.01] border-white/5 text-center flex flex-col items-center group cursor-pointer hover:border-[var(--gold)]/20 transition-all">
                <Radio size={24} className="text-green-500 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xl font-black text-white">LIVE</span>
                <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Arena Streams</span>
             </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[500px]">
        {activeTab === 'fight' && (
          <div className="space-y-10 animate-fade-in">
             <div className="flex items-center justify-between px-4">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                   <Swords size={18} className="text-[var(--gold)]" /> Octagon Node Feed
                </h3>
                <div className="flex items-center gap-3">
                   <div className="px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-[7px] font-black text-red-600 uppercase tracking-widest animate-pulse">
                      Live Broadcast
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 space-y-6">
                   {upcomingBouts.map(bout => (
                     <div key={bout.id} className="terminal-panel p-8 sm:p-12 rounded-[3.5rem] bg-gradient-to-r from-[var(--bg-panel)] to-white/[0.02] border-white/5 hover:border-[var(--gold)]/30 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                           <Shield size={120} />
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-10 relative z-10">
                           <div className="flex-1 text-center sm:text-left space-y-2">
                              <span className="text-[8px] font-black text-[var(--gold)] uppercase tracking-[0.4em]">{bout.status}</span>
                              <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase">{bout.fighters[0]}</h4>
                              <p className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">VS</p>
                              <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase">{bout.fighters[1]}</h4>
                           </div>
                           <div className="flex flex-col items-center sm:items-end gap-4">
                              <div className="text-right">
                                 <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Execution Date</span>
                                 <span className="text-sm font-black text-white">{bout.date}</span>
                              </div>
                              <button className="px-10 py-4 bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest rounded-2xl hover:bg-[var(--gold)] hover:text-[#060b13] hover:border-[var(--gold)] transition-all">
                                 Reserve Seat
                              </button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="xl:col-span-4 space-y-8">
                   <div className="terminal-panel p-8 rounded-[3rem] border-white/5 bg-[var(--text-primary)]/[0.01]">
                      <h4 className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                         <Award size={16} /> Power Rankings
                      </h4>
                      <div className="space-y-6">
                         {[
                           { name: 'Silva', rank: '1', score: '98.4' },
                           { name: 'Volkov', rank: '2', score: '97.2' },
                           { name: 'Chen', rank: '3', score: '94.8' },
                           { name: 'Reed', rank: '4', score: '92.1' }
                         ].map((p, i) => (
                           <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 hover:border-[var(--gold)]/20 transition-all cursor-pointer group">
                              <div className="flex items-center gap-4">
                                 <span className="text-xs font-black text-white/20 group-hover:text-[var(--gold)]">#{p.rank}</span>
                                 <span className="text-[11px] font-black text-white uppercase tracking-widest">{p.name}</span>
                              </div>
                              <span className="text-[10px] font-black text-green-500 tabular-nums">{p.score}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'esports' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {esportsTournaments.map((tourney, i) => (
                  <div key={i} className="terminal-panel p-10 rounded-[3.5rem] border-white/5 bg-gradient-to-br from-[var(--bg-panel)] to-blue-500/5 hover:border-blue-500/30 transition-all group">
                     <div className="flex justify-between items-start mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                           <Gamepad2 size={32} />
                        </div>
                        <div className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${tourney.status === 'Live' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                           {tourney.status}
                        </div>
                     </div>
                     <div className="space-y-4 mb-10">
                        <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{tourney.title}</h4>
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-2">
                              <Timer size={14} className="text-blue-400" />
                              <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase">{tourney.game}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <Users size={14} className="text-blue-400" />
                              <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase">{tourney.teams} Nodes Synchronized</span>
                           </div>
                        </div>
                     </div>
                     <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                           <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Prize Allocation</span>
                           <span className="text-xl font-black gold-text tabular-nums">{tourney.prize}</span>
                        </div>
                        <button className="px-8 py-3 bg-blue-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-400 transition-all shadow-lg">
                           Sync Team
                        </button>
                     </div>
                  </div>
                ))}
             </div>
             
             <div className="terminal-panel p-12 rounded-[4rem] border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center text-center">
                <Activity size={48} className="text-blue-500/20 mb-8" />
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">Neural Link Stable... More Shards Coming</h4>
             </div>
          </div>
        )}

        {activeTab === 'circuit' && (
          <div className="space-y-10 animate-fade-in">
             <div className="terminal-panel p-12 rounded-[4rem] relative overflow-hidden bg-black border-white/5 group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545893835-abaa50cbe628?auto=format&fit=crop&q=80&w=1200')] bg-cover opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative z-10 flex flex-col items-center text-center py-10">
                   <div className="w-20 h-20 rounded-[2rem] bg-[var(--gold)]/20 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] mb-8 shadow-2xl">
                      <Flag size={32} />
                   </div>
                   <h3 className="brand-font text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-6">Elite Circuit <span className="gold-text">Offline</span></h3>
                   <p className="text-[11px] font-bold text-white/60 uppercase tracking-widest max-w-lg mb-12 leading-relaxed">
                      Luxury trackside experiences and VIP golf access. LFES Principals receive priority allocation for global F1 and PGA events.
                   </p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl text-left">
                      {[
                        { title: 'Monaco GP Node', loc: 'Monte Carlo', date: 'May 2026', icon: Zap },
                        { title: 'LFES Masters Open', loc: 'St Andrews', date: 'July 2026', icon: Target },
                        { title: 'Stadium Shard', loc: 'Manchester', date: 'Finals 2026', icon: Users }
                      ].map((evt, i) => (
                        <div key={i} className="terminal-panel p-6 rounded-3xl border-white/10 bg-black/60 backdrop-blur-xl hover:border-[var(--gold)]/40 transition-all group/card">
                           <div className="flex justify-between items-start mb-6">
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[var(--gold)]"><evt.icon size={20} /></div>
                              <Ticket size={16} className="text-white/20 group-hover/card:text-[var(--gold)] transition-colors" />
                           </div>
                           <h5 className="text-[12px] font-black text-white uppercase mb-1">{evt.title}</h5>
                           <div className="flex items-center gap-2 text-[8px] font-bold text-white/40 uppercase tracking-widest">
                              <MapPin size={10} /> {evt.loc} • {evt.date}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
      
      {/* HUD FOOTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="terminal-panel p-8 rounded-3xl border-dashed border-white/10 flex items-center justify-between bg-white/[0.01]">
            <div className="flex items-center gap-4">
               <Calendar size={24} className="text-[var(--gold)]" />
               <div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Events Calendar</span>
                  <p className="text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Synchronized for 2025/2026</p>
               </div>
            </div>
            <button className="text-[9px] font-black text-[var(--gold)] uppercase tracking-widest border-b border-[var(--gold)]/20 pb-1 hover:text-white transition-colors">View All</button>
         </div>
         <div className="terminal-panel p-8 rounded-3xl border-dashed border-white/10 flex items-center justify-between bg-white/[0.01]">
            <div className="flex items-center gap-4">
               <Ticket size={24} className="text-green-500" />
               <div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Strategic Pass Wallet</span>
                  <p className="text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">04 Active Reservations</p>
               </div>
            </div>
            <button className="text-[9px] font-black text-green-500 uppercase tracking-widest border-b border-green-500/20 pb-1 hover:text-white transition-colors">Access Vault</button>
         </div>
      </div>
    </div>
  );
};

export default SportHub;