import React, { useState } from 'react';
import { 
  Briefcase, Rocket, Landmark, Users, TrendingUp, ChevronRight, 
  Globe, Shield, Zap, PieChart, Layers, Target, Coins,
  Building2, ArrowUpRight, CheckCircle2, Star, Timer
} from 'lucide-react';

interface Startup {
  id: string;
  name: string;
  category: string;
  fundingProgress: number;
  goal: string;
  valuation: string;
  desc: string;
  status: 'Funding' | 'Incubating' | 'Graduated';
}

const STARTUPS: Startup[] = [
  { 
    id: 's1', 
    name: 'NeuralDex', 
    category: 'AI Infrastructure', 
    fundingProgress: 84, 
    goal: '$2.5M', 
    valuation: '$12M',
    desc: 'L2 decentralized matching engine with zero-latency AI optimization.',
    status: 'Funding'
  },
  { 
    id: 's2', 
    name: 'LionGuard', 
    category: 'Cybersecurity', 
    fundingProgress: 100, 
    goal: '$5M', 
    valuation: '$25M',
    desc: 'Quantum-resistant wallet encryption for institutional custody.',
    status: 'Incubating'
  },
  { 
    id: 's3', 
    name: 'EcoSettle', 
    category: 'Green Tech', 
    fundingProgress: 42, 
    goal: '$1.8M', 
    valuation: '$8M',
    desc: 'Blockchain-based carbon credit tokenization and settlement protocol.',
    status: 'Funding'
  }
];

const BusinessLab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'incubation' | 'deposits' | 'careers'>('incubation');

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* ENTERPRISE HERO */}
      <div className="terminal-panel p-10 sm:p-16 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 border-[var(--gold)]/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold)]/5 blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex flex-col flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
               <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)]">
                  <Briefcase size={18} />
               </div>
               <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.6em]">LFES Strategic Hub</span>
            </div>
            <h1 className="brand-font text-4xl sm:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-8 leading-none">Business <br/><span className="gold-text">Lab</span></h1>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] max-w-lg leading-relaxed mb-10 opacity-70">
              Accelerating the next generation of institutional nodes. From venture incubation to strategic capital deployment.
            </p>
            
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 self-center lg:self-start">
               <button 
                 onClick={() => setActiveSubTab('incubation')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'incubation' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Venture Hub
               </button>
               <button 
                 onClick={() => setActiveSubTab('deposits')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'deposits' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Capital Deposits
               </button>
               <button 
                 onClick={() => setActiveSubTab('careers')}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'careers' ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
               >
                 Careers
               </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full lg:w-[400px]">
             <div className="terminal-panel p-8 rounded-3xl bg-white/[0.01] border-white/5 text-center flex flex-col items-center">
                <Target size={24} className="text-[var(--gold)] mb-3" />
                <span className="text-xl font-black text-white">14</span>
                <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Active Ventures</span>
             </div>
             <div className="terminal-panel p-8 rounded-3xl bg-white/[0.01] border-white/5 text-center flex flex-col items-center">
                <Coins size={24} className="text-[var(--gold)] mb-3" />
                <span className="text-xl font-black text-white">$42M</span>
                <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Capital Raised</span>
             </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      {activeSubTab === 'incubation' && (
        <div className="space-y-10">
           <div className="flex items-center justify-between px-4">
              <h3 className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                 <Rocket size={18} className="text-[var(--gold)]" /> Emerging Nodes
              </h3>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Global Seed Round Open</span>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STARTUPS.map(startup => (
                <div key={startup.id} className="terminal-panel p-8 rounded-[3rem] bg-[var(--text-primary)]/[0.01] border-white/5 hover:border-[var(--gold)]/20 transition-all flex flex-col justify-between h-[450px] group cursor-pointer">
                   <div className="space-y-6">
                      <div className="flex justify-between items-start">
                         <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                           startup.status === 'Funding' ? 'bg-green-500/10 text-green-500' : 'bg-[var(--gold)]/10 text-[var(--gold)]'
                         }`}>
                           {startup.status}
                         </div>
                         <Star size={16} className="text-[var(--text-secondary)] opacity-20 group-hover:text-[var(--gold)] transition-all" />
                      </div>
                      <div className="space-y-3">
                         <h4 className="text-2xl font-black text-white tracking-tighter group-hover:gold-text transition-all">{startup.name}</h4>
                         <span className="text-[9px] font-black text-[var(--gold)] uppercase tracking-widest">{startup.category}</span>
                         <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{startup.desc}</p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-3">
                         <div className="flex justify-between items-center text-[10px] font-black">
                            <span className="text-[var(--text-secondary)] uppercase">Progress</span>
                            <span className="text-white">{startup.fundingProgress}%</span>
                         </div>
                         <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[var(--gold)] to-green-500 transition-all duration-1000" style={{ width: `${startup.fundingProgress}%` }}></div>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                         <div>
                            <span className="block text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Target</span>
                            <span className="text-[13px] font-black text-white tabular-nums">{startup.goal}</span>
                         </div>
                         <div className="text-right">
                            <span className="block text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Valuation</span>
                            <span className="text-[13px] font-black text-white tabular-nums">{startup.valuation}</span>
                         </div>
                      </div>

                      <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest group-hover:bg-[var(--gold)] group-hover:text-[#060b13] transition-all">
                         Review Strategic Deck
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeSubTab === 'deposits' && (
        <div className="space-y-10 animate-fade-in">
           <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
              <div className="xl:col-span-8 space-y-8">
                 <div className="terminal-panel p-10 sm:p-14 rounded-[3.5rem] bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 border-[var(--gold)]/20 shadow-xl">
                    <div className="flex items-center gap-4 mb-8">
                       <Landmark size={24} className="text-[var(--gold)]" />
                       <h3 className="text-[14px] font-black text-white uppercase tracking-[0.4em] brand-font">Strategic Yield Protocol</h3>
                    </div>
                    <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest leading-relaxed mb-10 opacity-70">
                       Deploy your liquid capital into the LFES institutional ecosystem. Earn consistent rewards while powering venture liquidity.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                       {[
                         { term: '30 Days', apy: '4.2%', color: 'border-blue-500/20' },
                         { term: '90 Days', apy: '7.8%', color: 'border-[var(--gold)]/40 shadow-[0_0_20px_var(--gold-glow)]' },
                         { term: '365 Days', apy: '14.5%', color: 'border-purple-500/20' }
                       ].map((tier, i) => (
                         <div key={i} className={`terminal-panel p-8 rounded-[2.5rem] bg-white/[0.02] border flex flex-col items-center gap-4 hover:scale-[1.05] transition-all cursor-pointer ${tier.color}`}>
                            <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest">{tier.term} Locked</span>
                            <span className="text-3xl font-black gold-text">{tier.apy}</span>
                            <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Target APY</span>
                            <button className="mt-2 text-[8px] font-black text-[var(--gold)] uppercase tracking-[0.2em] border-b border-[var(--gold)]/20 pb-1">Deploy Capital</button>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="terminal-panel p-10 rounded-[3rem] border-white/5 bg-[var(--text-primary)]/[0.01]">
                    <div className="flex items-center gap-3 mb-8">
                       <Shield size={18} className="text-green-500" />
                       <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Economic Safeguards</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 shrink-0"><CheckCircle2 size={16} /></div>
                          <div>
                             <span className="block text-[10px] font-black text-white uppercase tracking-widest mb-1">Reserve Backed</span>
                             <p className="text-[9px] text-[var(--text-secondary)] leading-relaxed">All strategic deposits are backed 1:1 by the Lion Family Reserve Pool.</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 shrink-0"><CheckCircle2 size={16} /></div>
                          <div>
                             <span className="block text-[10px] font-black text-white uppercase tracking-widest mb-1">Instant Audit</span>
                             <p className="text-[9px] text-[var(--text-secondary)] leading-relaxed">View real-time chain validation for yield sources and distribution nodes.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="xl:col-span-4 space-y-8">
                 <div className="terminal-panel p-8 rounded-[3rem] border-white/5 flex flex-col gap-6">
                    <h4 className="text-[10px] font-black text-[var(--gold)] uppercase tracking-widest">Capital Stats</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center text-[10px]">
                          <span className="text-[var(--text-secondary)] font-bold">TOTAL DEPOSITED</span>
                          <span className="text-white font-black tabular-nums">$12,450.00</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px]">
                          <span className="text-[var(--text-secondary)] font-bold">TOTAL REWARDS</span>
                          <span className="text-green-500 font-black tabular-nums">+$420.12</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px]">
                          <span className="text-[var(--text-secondary)] font-bold">REWARD FREQUENCY</span>
                          <span className="text-white font-black">Daily Node Sync</span>
                       </div>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                       <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--gold)] to-[#aa8a22] text-[#060b13] text-[9px] font-black uppercase tracking-widest">
                          New Deposit Request
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeSubTab === 'careers' && (
        <div className="space-y-10 animate-fade-in">
           <div className="terminal-panel p-12 rounded-[4rem] border-dashed border-[var(--gold)]/20 bg-white/[0.01] flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] mb-8">
                 <Users size={32} />
              </div>
              <h3 className="brand-font text-3xl font-black text-white uppercase tracking-tighter mb-4">Elite Principal <span className="gold-text">Recruiting</span></h3>
              <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest max-w-lg leading-relaxed mb-10">
                 The LFES Ecosystem is seeking the most disciplined minds in blockchain, engineering, and finance. Join the node expansion.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl text-left">
                 {[
                   { title: 'Senior Neural Engineer', dept: 'AI Lab', loc: 'Remote / Global' },
                   { title: 'Institutional Flow Manager', dept: 'Exchange', loc: 'Zurich Hub' },
                   { title: 'Security Architect', dept: 'Core Dev', loc: 'Stealth Hub' },
                   { title: 'Community Alpha Lead', dept: 'Ecosystem', loc: 'Remote' }
                 ].map((job, i) => (
                   <div key={i} className="terminal-panel p-6 rounded-3xl border-white/5 bg-white/[0.01] hover:bg-white/5 transition-all group flex items-center justify-between">
                      <div>
                         <h4 className="text-[12px] font-black text-white uppercase tracking-widest mb-1 group-hover:gold-text transition-all">{job.title}</h4>
                         <span className="text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{job.dept} • {job.loc}</span>
                      </div>
                      <ArrowUpRight size={18} className="text-[var(--text-secondary)] opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                   </div>
                 ))}
              </div>
              
              <div className="mt-12 flex items-center gap-3 p-4 rounded-2xl bg-[var(--gold)]/5 border border-[var(--gold)]/10">
                 <Timer size={16} className="text-[var(--gold)]" />
                 <span className="text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Next Recruitment Window Opens in 14 Days</span>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default BusinessLab;