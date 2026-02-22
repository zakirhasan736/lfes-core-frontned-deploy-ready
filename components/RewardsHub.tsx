import React, { useState } from 'react';
import { 
  Trophy, Gift, Zap, Share2, Twitter, Instagram, 
  Youtube, Timer, Star, CheckCircle2, ChevronRight,
  TrendingUp, Award, Users, Coins, Sparkles, Flame
} from 'lucide-react';

type RewardsTab = 'loyalty' | 'pulse' | 'viral';

const RewardsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RewardsTab>('loyalty');

  const loyaltyTiers = [
    { name: 'Bronze', points: '0 - 1k', perks: ['Base Fees', 'Standard Support'], status: 'current' },
    { name: 'Silver', points: '1k - 10k', perks: ['-10% Fees', 'Priority Support', 'Early Beta Access'], status: 'next' },
    { name: 'Gold', points: '10k - 50k', perks: ['-25% Fees', 'Direct Analyst Link', 'Lion Academy Pro'], status: 'locked' },
    { name: 'Elite VIP', points: '50k+', perks: ['Zero Fees', 'Personal Node Managed', 'Founder Lounge Access'], status: 'locked' }
  ];

  const viralTasks = [
    { id: 1, platform: 'TikTok', task: 'Share a Terminal Execution', reward: '500 pts', icon: Flame },
    { id: 2, platform: 'Instagram', task: 'Post Portfolio Snapshot', reward: '300 pts', icon: Instagram },
    { id: 3, platform: 'X / Twitter', task: 'Retweet Network Update', reward: '150 pts', icon: Twitter },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* REWARDS HERO */}
      <div className="terminal-panel p-10 sm:p-16 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 border-[var(--gold)]/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold)]/5 blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex flex-col flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
               <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)]">
                  <Award size={18} />
               </div>
               <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.6em]">LFES Rewards Hub</span>
            </div>
            <h1 className="brand-font text-4xl sm:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-8 leading-none">Loyalty & <br/><span className="gold-text">Influence</span></h1>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] max-w-lg leading-relaxed mb-10 opacity-70">
              The LFES meritocracy protocol. Earn status through node participation, strategic growth, and global network influence.
            </p>
            
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 self-center lg:self-start">
               <button 
                 onClick={() => setActiveTab('loyalty')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'loyalty' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Loyalty Tiers
               </button>
               <button 
                 onClick={() => setActiveTab('pulse')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'pulse' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Weekly Pulse
               </button>
               <button 
                 onClick={() => setActiveTab('viral')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'viral' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Viral Shards
               </button>
            </div>
          </div>
          
          <div className="w-full lg:w-[400px] flex flex-col gap-4">
             <div className="terminal-panel p-8 rounded-[2.5rem] bg-white/[0.02] border-white/5">
                <div className="flex items-center justify-between mb-6">
                   <h4 className="text-[9px] font-black text-[var(--text-primary)] uppercase tracking-widest">Current Status</h4>
                   <Star size={16} className="text-[var(--gold)]" />
                </div>
                <div className="flex flex-col gap-1 mb-4">
                   <span className="text-3xl font-black text-white">8,420</span>
                   <span className="text-[8px] font-black text-[var(--gold)] uppercase tracking-[0.3em]">Lion Points (XP)</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                   <div className="h-full bg-[var(--gold)] w-[84%] shadow-[0_0_10px_var(--gold)]"></div>
                </div>
                <div className="flex justify-between text-[7px] font-black uppercase tracking-widest text-white/40">
                   <span>Bronze</span>
                   <span>1,580 XP to Silver</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[500px]">
        {activeTab === 'loyalty' && (
          <div className="space-y-10 animate-fade-in">
             <div className="flex items-center justify-between px-4">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                   <Award size={18} className="text-[var(--gold)]" /> Institutional Tiers
                </h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loyaltyTiers.map((tier, i) => (
                  <div key={i} className={`terminal-panel p-8 rounded-[2.5rem] border transition-all flex flex-col justify-between h-[380px] group ${
                    tier.status === 'current' ? 'bg-[var(--gold)]/5 border-[var(--gold)]/30 scale-105 shadow-2xl' : 
                    tier.status === 'next' ? 'bg-white/[0.01] border-white/10' : 'bg-black/20 border-white/5 opacity-40'
                  }`}>
                     <div className="space-y-6">
                        <div className="flex justify-between items-start">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                             tier.status === 'current' ? 'bg-[var(--gold)] text-[#060b13] border-[var(--gold)]' : 'bg-white/5 text-white/20 border-white/10'
                           }`}>
                              <Zap size={20} />
                           </div>
                           {tier.status === 'current' && (
                             <span className="px-2 py-0.5 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] text-[7px] font-black uppercase tracking-widest">Active</span>
                           )}
                        </div>
                        <div className="space-y-1">
                           <h4 className="text-xl font-black text-white uppercase tracking-tighter">{tier.name}</h4>
                           <span className="text-[8px] font-black text-[var(--gold)] uppercase tracking-widest">{tier.points} XP</span>
                        </div>
                        <div className="space-y-3">
                           {tier.perks.map((perk, j) => (
                             <div key={j} className="flex items-center gap-2 text-[9px] font-bold text-white/70">
                                <CheckCircle2 size={12} className="text-[var(--gold)]" />
                                {perk}
                             </div>
                           ))}
                        </div>
                     </div>
                     
                     <button className={`w-full py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                       tier.status === 'current' ? 'bg-transparent border border-[var(--gold)] text-[var(--gold)]' : 'bg-white/5 text-white/40 border border-white/5'
                     }`}>
                        {tier.status === 'current' ? 'Tier Identity Verified' : tier.status === 'next' ? 'Unlocking Soon' : 'Locked'}
                     </button>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'pulse' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 space-y-8">
                   <div className="terminal-panel p-12 rounded-[4rem] bg-gradient-to-br from-purple-900/20 to-[var(--gold)]/10 border-[var(--gold)]/20 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8">
                         <div className="px-4 py-2 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-2">
                            <Timer size={14} className="text-[var(--gold)]" />
                            <span className="text-[10px] font-black text-white tabular-nums">14:22:04</span>
                         </div>
                      </div>
                      <div className="w-24 h-24 rounded-[2.5rem] bg-[var(--gold)]/20 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] mb-8 shadow-[0_0_50px_var(--gold-glow)]">
                         <Gift size={48} />
                      </div>
                      <h3 className="brand-font text-3xl font-black text-white uppercase tracking-tighter mb-4">Weekly <span className="gold-text">Pulse</span> Giveaway</h3>
                      <p className="text-[11px] font-bold text-white/60 uppercase tracking-widest max-w-sm mb-10 leading-relaxed">
                         Active principals with {'>'}500 session volume are automatically entered into the weekly 5,000 USDT reward pool.
                      </p>
                      <div className="flex gap-4">
                         <div className="px-10 py-5 bg-[var(--gold)] text-[#060b13] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                            Register Node
                         </div>
                         <div className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                            View Rules
                         </div>
                      </div>
                   </div>

                   <div className="terminal-panel p-10 rounded-[3rem] border-white/5 bg-[var(--text-primary)]/[0.01]">
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                         <Users size={16} className="text-[var(--gold)]" /> Previous Session Winners
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         {[
                           { name: 'Principal_Whale', prize: '1,200 USDT', date: 'Session #84' },
                           { name: 'Node_Alpha', prize: '800 USDT', date: 'Session #84' },
                           { name: 'Strategic_Flow', prize: '500 USDT', date: 'Session #84' },
                           { name: 'Lion_Loyal', prize: '500 USDT', date: 'Session #84' }
                         ].map((w, i) => (
                           <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                              <div className="flex flex-col">
                                 <span className="text-[11px] font-black text-white uppercase">{w.name}</span>
                                 <span className="text-[7px] font-bold text-white/30 uppercase tracking-widest">{w.date}</span>
                              </div>
                              <span className="text-[11px] font-black gold-text tabular-nums">{w.prize}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="xl:col-span-4 space-y-8">
                   <div className="terminal-panel p-8 rounded-[3rem] border-white/5 flex flex-col gap-8">
                      <h4 className="text-[10px] font-black text-[var(--gold)] uppercase tracking-widest">Global Pool Stats</h4>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-white/40 uppercase">Total Rewards Sent</span>
                            <span className="text-[12px] font-black text-white tabular-nums">$142,500</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-white/40 uppercase">Unique Winners</span>
                            <span className="text-[12px] font-black text-white tabular-nums">1,204</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-white/40 uppercase">Network Participation</span>
                            <span className="text-[12px] font-black text-green-500">OPTIMIZED</span>
                         </div>
                      </div>
                      <div className="pt-6 border-t border-white/5">
                         <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--gold)]/5 border border-[var(--gold)]/10">
                            <Sparkles size={16} className="text-[var(--gold)]" />
                            <span className="text-[8px] font-bold text-white/40 leading-relaxed uppercase">Rewards are distributed via smart contract within 24h of session close.</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'viral' && (
          <div className="space-y-10 animate-fade-in">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                   <Share2 size={18} className="text-[var(--gold)]" /> Network Amplification
                </h3>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Active Challenges: 03</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {viralTasks.map(task => (
                  <div key={task.id} className="terminal-panel p-10 rounded-[3.5rem] bg-[var(--text-primary)]/[0.01] border-white/5 hover:border-[var(--gold)]/30 transition-all group flex flex-col items-center text-center">
                     <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center text-[var(--gold)] mb-8 group-hover:scale-110 transition-transform shadow-xl">
                        <task.icon size={32} />
                     </div>
                     <div className="space-y-4 mb-10">
                        <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-widest">{task.platform}</span>
                        <h4 className="text-xl font-black text-white tracking-tighter uppercase">{task.task}</h4>
                        <div className="flex items-center justify-center gap-2">
                           <Coins size={14} className="text-[var(--gold)]" />
                           <span className="text-[11px] font-black text-white uppercase tabular-nums">Reward: {task.reward}</span>
                        </div>
                     </div>
                     <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-[var(--gold)] hover:text-[#060b13] transition-all">
                        Execute Shard
                     </button>
                  </div>
                ))}
             </div>

             <div className="terminal-panel p-12 rounded-[4rem] border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center text-center">
                <TrendingUp size={48} className="text-[var(--gold)]/20 mb-8" />
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-4">The Viral Matrix is Synchronizing</h4>
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest max-w-sm">New amplification nodes for Youtube and Twitch coming in Phase 3.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardsHub;