import React, { useState } from 'react';
import { 
  Heart, ShieldCheck, Globe, FileText, Download, 
  ChevronRight, TrendingUp, Users, Activity, 
  BarChart3, Landmark, ArrowUpRight, CheckCircle2,
  Zap, Eye, ExternalLink, Filter
} from 'lucide-react';

type CharityTab = 'overview' | 'projects' | 'transparency';

const CharityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CharityTab>('overview');

  const activeProjects = [
    { title: 'Savanna Guard Node', goal: '$250k', raised: '$184k', category: 'Conservation', desc: 'Deploying AI-driven surveillance shards to protect indigenous lion habitats in Sub-Saharan regions.' },
    { title: 'Neural Scholars', goal: '$100k', raised: '$92k', category: 'Education', desc: 'Bridging digital education nodes to high-poverty zones, providing satellite uplink and hardware for potential engineering principals.' },
    { title: 'Ocean Cleanse Shard', goal: '$500k', raised: '$112k', category: 'Environment', desc: 'Automated debris removal fleets synchronized via the L-Family Chain for real-time tracking.' }
  ];

  const reports = [
    { name: 'Annual Impact Audit 2024', size: '2.4 MB', date: 'Jan 2025' },
    { name: 'Q4 2024 Node Allocation Report', size: '1.8 MB', date: 'Dec 2024' },
    { name: 'Savanna Project Phase 1 Completion', size: '4.2 MB', date: 'Nov 2024' }
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* CHARITY HERO */}
      <div className="terminal-panel p-10 sm:p-16 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-rose-500/5 border-rose-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex flex-col flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
               <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                  <Heart size={18} />
               </div>
               <span className="text-[10px] font-black text-rose-400 uppercase tracking-[0.6em]">Lion Heart Fund</span>
            </div>
            <h1 className="brand-font text-4xl sm:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-8 leading-none">Impact & <br/><span className="gold-text">Legacy</span></h1>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] max-w-lg leading-relaxed mb-10 opacity-70">
              Transforming ecosystem yields into verifiable global good. 2.5% of all terminal execution fees are automatically bridged to the Heart Fund DAO.
            </p>
            
            <div className="flex flex-wrap bg-white/5 p-1.5 rounded-2xl border border-white/5 self-center lg:self-start gap-1">
               {(['overview', 'projects', 'transparency'] as const).map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-rose-500 text-white shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="w-full lg:w-[450px] flex flex-col gap-6">
             <div className="terminal-panel p-8 rounded-[3rem] bg-black/40 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Globe size={100} className="text-rose-500" />
                </div>
                <div className="relative z-10 flex flex-col gap-1">
                   <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Total Global Impact</span>
                   <div className="flex items-end gap-3 mt-4 mb-2">
                      <span className="text-4xl font-black text-white tabular-nums">$1,245,000</span>
                      <span className="text-[10px] font-black text-green-500 uppercase mb-2 tracking-widest">+18% YTD</span>
                   </div>
                   <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Bridged from Ecosystem Yields</span>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="terminal-panel p-6 rounded-3xl bg-white/[0.01] border-white/5">
                   <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Active Projects</span>
                   <span className="text-lg font-black text-white tracking-tight">12 Shards</span>
                </div>
                <div className="terminal-panel p-6 rounded-3xl bg-white/[0.01] border-white/5">
                   <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Audit Score</span>
                   <span className="text-lg font-black text-green-500 tracking-tight">100/100</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[500px]">
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'On-Chain Proof', desc: 'Every satoshi moved to the Heart Fund is traceable from the exchange matching engine to the final destination node.', icon: ShieldCheck, color: 'text-rose-400' },
                  { title: 'Principal Voting', desc: 'Holders of FAMILY tokens propose and select the next global shards to receive funding allocation.', icon: Landmark, color: 'text-[var(--gold)]' },
                  { title: 'Verified Impact', desc: 'Partnering with global NGOs to provide real-time telemetry and imagery for funded initiatives.', icon: Eye, color: 'text-blue-400' },
                ].map((item, i) => (
                  <div key={i} className="terminal-panel p-10 rounded-[3.5rem] bg-white/[0.01] border-white/5 hover:border-rose-500/30 transition-all group flex flex-col items-center text-center">
                     <div className={`w-20 h-20 rounded-[2.5rem] bg-white/5 flex items-center justify-center ${item.color} mb-8 group-hover:scale-110 transition-transform shadow-xl`}>
                        <item.icon size={32} />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-4">{item.title}</h4>
                     <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>

             <div className="terminal-panel p-12 rounded-[4rem] bg-gradient-to-r from-[var(--bg-panel)] to-white/[0.02] border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474099711-423501fde67e?auto=format&fit=crop&q=80&w=1200')] bg-cover opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                   <div className="flex-1 space-y-6">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[8px] font-black text-rose-400 uppercase tracking-[0.4em]">Strategic Mission</div>
                      <h3 className="text-3xl font-black text-white tracking-tighter uppercase">The 100-Year <span className="gold-text">Conservation Shard</span></h3>
                      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-xl">
                        Our primary commitment is the preservation of physical lion species across Africa and Asia. By bridging technology with biology, we ensure that the namesake of our ecosystem thrives for generations.
                      </p>
                      <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all flex items-center gap-4">
                         View Strategic Roadmap <ChevronRight size={16} />
                      </button>
                   </div>
                   <div className="w-full md:w-[300px] space-y-6">
                      <div className="terminal-panel p-6 rounded-3xl bg-black/60 border border-white/10">
                         <div className="flex justify-between items-center mb-4">
                            <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase">Live Telemetry</span>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                         </div>
                         <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black">
                               <span className="text-white/40">Tagged Units</span>
                               <span className="text-white uppercase tracking-widest">84 Pride Nodes</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-black">
                               <span className="text-white/40">Area Covered</span>
                               <span className="text-white uppercase tracking-widest">12,400 KM²</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-10 animate-fade-in">
             <div className="flex items-center justify-between px-4">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                   <Zap size={18} className="text-rose-400" /> Active Initiative Shards
                </h3>
                <div className="flex gap-4">
                   <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[var(--text-secondary)]"><Filter size={16} /></button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {activeProjects.map((proj, i) => (
                  <div key={i} className="terminal-panel p-8 rounded-[3.5rem] bg-white/[0.01] border-white/5 hover:border-[var(--gold)]/20 transition-all group flex flex-col justify-between h-[450px]">
                     <div className="space-y-6">
                        <div className="flex justify-between items-center">
                           <span className="px-3 py-1 rounded-full bg-white/5 text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest border border-white/5">{proj.category}</span>
                           <ArrowUpRight size={18} className="text-white/20 group-hover:text-[var(--gold)] transition-colors" />
                        </div>
                        <h4 className="text-2xl font-black text-white tracking-tighter uppercase leading-tight">{proj.title}</h4>
                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{proj.desc}</p>
                     </div>

                     <div className="space-y-6">
                        <div className="space-y-2">
                           <div className="flex justify-between items-center text-[9px] font-black uppercase">
                              <span className="text-[var(--text-secondary)] tracking-widest">Funding Progress</span>
                              <span className="gold-text">{proj.raised} / {proj.goal}</span>
                           </div>
                           <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[var(--gold)] to-green-500" style={{ width: `${(parseInt(proj.raised.replace('$', '').replace('k', '')) / parseInt(proj.goal.replace('$', '').replace('k', ''))) * 100}%` }}></div>
                           </div>
                        </div>
                        <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-[var(--gold)] hover:text-[#060b13] transition-all">
                           Back Initiative
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'transparency' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 space-y-6">
                   <div className="terminal-panel rounded-[3rem] overflow-hidden border-white/5 bg-[var(--bg-panel)]">
                      <div className="px-10 py-8 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                         <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                            <FileText size={18} className="text-blue-400" /> Transparency Matrix
                         </h4>
                         <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Sync Status: Real-time</span>
                      </div>
                      <div className="p-4 sm:p-8">
                         {reports.map((report, i) => (
                           <div key={i} className="flex items-center justify-between p-6 rounded-2xl hover:bg-white/[0.02] transition-colors group border-b border-white/5 last:border-none">
                              <div className="flex items-center gap-6">
                                 <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-blue-400 transition-colors">
                                    <FileText size={24} />
                                 </div>
                                 <div className="flex flex-col gap-1">
                                    <span className="text-[12px] font-black text-white uppercase tracking-widest">{report.name}</span>
                                    <span className="text-[8px] font-bold text-[var(--text-secondary)] uppercase">{report.date} • {report.size}</span>
                                 </div>
                              </div>
                              <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-[var(--text-secondary)] hover:text-white hover:bg-blue-500 transition-all">
                                 <Download size={18} />
                              </button>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="xl:col-span-4 space-y-8">
                   <div className="terminal-panel p-8 rounded-[3rem] border-rose-500/20 bg-rose-500/5">
                      <div className="flex items-center gap-3 mb-6">
                         <Activity size={18} className="text-rose-400" />
                         <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Financial Node Health</h4>
                      </div>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-[var(--text-secondary)] uppercase">Overhead Ratio</span>
                            <span className="text-green-500">2.4% (Ultra Low)</span>
                         </div>
                         <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-[var(--text-secondary)] uppercase">On-Chain Reserved</span>
                            <span className="text-white">$842.1k</span>
                         </div>
                         <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-[var(--text-secondary)] uppercase">Settlement Speed</span>
                            <span className="text-white">Instant Block</span>
                         </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-rose-500/10">
                         <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-rose-500/20 text-rose-400 text-[8px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">
                            <ExternalLink size={14} /> Open Chain Audit
                         </button>
                      </div>
                   </div>

                   <div className="terminal-panel p-8 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01]">
                      <p className="text-[9px] text-[var(--text-secondary)] leading-relaxed italic text-center font-medium">
                        "The Lion Family Ecosystem utilizes a fully automated bridge that requires zero human intervention for fee allocation, ensuring that our legacy commitments are fulfilled by protocol code."
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* HUD FOOTER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Wildlife Shard', val: '$540k', icon: Heart, color: 'text-rose-400' },
           { label: 'Education Node', val: '$210k', icon: Users, color: 'text-blue-400' },
           { label: 'Relief Sync', val: '$145k', icon: Zap, color: 'text-amber-400' },
           { label: 'Green Protocol', val: '$350k', icon: Globe, color: 'text-green-400' }
         ].map((stat, i) => (
           <div key={i} className="terminal-panel p-6 rounded-3xl border-white/5 flex items-center gap-4 bg-white/[0.01]">
              <stat.icon size={20} className={stat.color} />
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-white uppercase tracking-widest">{stat.label}</span>
                 <span className="text-lg font-black gold-text tabular-nums">{stat.val}</span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default CharityHub;