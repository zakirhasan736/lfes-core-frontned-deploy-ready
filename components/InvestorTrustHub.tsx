import React, { useState, useEffect } from 'react';
import { 
  Users, Map, FileText, Info, Shield, Mail, 
  ChevronRight, Download, ExternalLink, Globe, 
  TrendingUp, BarChart3, Clock, CheckCircle2, 
  MessageSquare, Lock, Eye, Zap, Landmark, Award,
  Scale, FileSearch, ShieldAlert, BookOpen, Fingerprint
} from 'lucide-react';
import { apiService } from '../services/apiService';

export type TrustTab = 'investors' | 'roadmap' | 'documentation' | 'about' | 'legal' | 'contact';

interface InvestorTrustHubProps {
  initialTab?: TrustTab;
}

const InvestorTrustHub: React.FC<InvestorTrustHubProps> = ({ initialTab = 'investors' }) => {
  const [activeTab, setActiveTab] = useState<TrustTab>(initialTab);
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
    const loadData = async () => {
      setIsLoading(true);
      const data = await apiService.fetchRoadmap();
      setRoadmap(data);
      setIsLoading(false);
    };
    loadData();
  }, [initialTab]);

  const docs = [
    { title: 'Ecosystem Whitepaper', subtitle: 'Technical Architecture & Vision', size: '12.8 MB', version: 'v3.0', icon: BookOpen, type: 'Technical' },
    { title: 'Strategic Litepaper', subtitle: 'Condensed Economic Model', size: '4.2 MB', version: 'v2.1', icon: FileText, type: 'Economic' },
    { title: 'Press & Media Kit', subtitle: 'Brand Assets & Guidelines', size: '24.5 MB', version: '2025 Edition', icon: Award, type: 'Marketing' },
    { title: 'Compliance Matrix', subtitle: 'Regulatory Framework v1.4', size: '3.1 MB', version: 'v1.4', icon: Shield, type: 'Legal' },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* HUB HERO */}
      <div className="terminal-panel p-10 sm:p-16 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-blue-500/5 border-blue-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex flex-col flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
               <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Landmark size={18} />
               </div>
               <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.6em]">Foundation Matrix</span>
            </div>
            <h1 className="brand-font text-4xl sm:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-8 leading-none">Trust & <br/><span className="gold-text">Governance</span></h1>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] max-w-lg leading-relaxed mb-10 opacity-70">
              Institutional transparency, strategic roadmap tracking, and the legal framework of the Lion Family Ecosystem.
            </p>
            
            <div className="flex flex-wrap bg-white/5 p-1.5 rounded-2xl border border-white/5 self-center lg:self-start gap-1">
               {[
                 { id: 'investors', label: 'Investors' },
                 { id: 'roadmap', label: 'Roadmap' },
                 { id: 'documentation', label: 'Documentation' },
                 { id: 'about', label: 'About' },
                 { id: 'legal', label: 'Legal' },
                 { id: 'contact', label: 'Contact' }
               ].map(tab => (
                 <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as TrustTab)}
                   className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-blue-500 text-white shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
                 >
                   {tab.label}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="w-full lg:w-[450px] flex flex-col gap-6">
             <div className="terminal-panel p-8 rounded-[3rem] bg-black/40 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Globe size={100} className="text-blue-500" />
                </div>
                <div className="relative z-10 flex flex-col gap-1">
                   <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Reserve Transparency</span>
                   <div className="flex items-end gap-3 mt-4 mb-2">
                      <span className="text-4xl font-black text-white tabular-nums">$142.4M</span>
                      <span className="text-[10px] font-black text-green-500 uppercase mb-2 tracking-widest">+42% YoY</span>
                   </div>
                   <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">On-Chain Verified Assets</span>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="terminal-panel p-6 rounded-3xl bg-white/[0.01] border-white/5">
                   <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Audit Score</span>
                   <span className="text-lg font-black text-green-500 tracking-tight">100/100</span>
                </div>
                <div className="terminal-panel p-6 rounded-3xl bg-white/[0.01] border-white/5">
                   <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Principals</span>
                   <span className="text-lg font-black text-white tracking-tight">42.4K</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[500px]">
        {activeTab === 'investors' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Capital Efficiency', val: '98.4%', desc: 'Matching engine optimization score and liquidity utilization metrics.', icon: TrendingUp },
                  { title: 'Growth Shards', val: '14 Active', desc: 'Ventures currently being incubated and funded by ecosystem yields.', icon: Zap },
                  { title: 'DAO Reserve', val: '$42.1M', desc: 'Total capital currently locked in governance and stabilization pools.', icon: Landmark },
                ].map((item, i) => (
                  <div key={i} className="terminal-panel p-10 rounded-[3.5rem] bg-white/[0.01] border-white/5 hover:border-blue-500/30 transition-all group text-center flex flex-col items-center">
                     <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                        <item.icon size={28} />
                     </div>
                     <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-2">{item.title}</span>
                     <span className="text-3xl font-black text-white mb-4 tabular-nums">{item.val}</span>
                     <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>

             <div className="terminal-panel p-10 rounded-[4rem] bg-[var(--text-primary)]/[0.01] border-white/5">
                <div className="flex items-center justify-between mb-10">
                   <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                      <BarChart3 size={18} className="text-blue-400" /> Capital Allocation Matrix
                   </h4>
                   <button className="text-[9px] font-black text-blue-400 uppercase tracking-widest border-b border-blue-400/20 pb-1">Download Ledger</button>
                </div>
                <div className="space-y-6">
                   {[
                     { name: 'Swiss Node Ventures', share: '12.4%', status: 'Institutional' },
                     { name: 'Titan Global Liquidity', share: '8.2%', status: 'Strategic' },
                     { name: 'Lion Founders Pool', share: '15.0%', status: 'Founding' },
                     { name: 'Community DAO Shard', share: '64.4%', status: 'Liquid' }
                   ].map((p, i) => (
                     <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-black/20 border border-white/5">
                        <div className="flex items-center gap-4">
                           <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                           <span className="text-[11px] font-black text-white uppercase tracking-widest">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-8">
                           <span className="px-3 py-1 rounded-full bg-white/5 text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">{p.status}</span>
                           <span className="text-sm font-black gold-text tabular-nums">{p.share}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-10 animate-fade-in">
             <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block"></div>
                <div className="space-y-12">
                   {roadmap.map((item, i) => (
                     <div key={i} className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        <div className="flex-1 w-full">
                           <div className={`terminal-panel p-8 rounded-[3rem] border-white/5 bg-white/[0.01] hover:border-blue-500/30 transition-all group ${item.status === 'Current' ? 'border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : ''}`}>
                              <div className="flex justify-between items-start mb-6">
                                 <div>
                                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1 block">{item.phase}</span>
                                    <h4 className="text-xl font-black text-white uppercase tracking-tighter">{item.title}</h4>
                                 </div>
                                 <div className={`px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-widest ${
                                   item.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 
                                   item.status === 'Current' ? 'bg-blue-500/20 text-blue-500 animate-pulse' : 
                                   'bg-white/5 text-white/20'
                                 }`}>
                                    {item.status}
                                 </div>
                              </div>
                              <div className="space-y-3">
                                 {item.tasks.map((task: string, j: number) => (
                                   <div key={j} className="flex items-center gap-3 text-[10px] font-medium text-[var(--text-secondary)]">
                                      <CheckCircle2 size={12} className={item.status === 'Completed' ? 'text-green-500' : 'text-white/10'} />
                                      {task}
                                   </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[var(--bg-main)] border-4 border-white/10 flex items-center justify-center z-10 shrink-0">
                           <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'Completed' ? 'bg-green-500' : item.status === 'Current' ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-white/10'}`}></div>
                        </div>
                        <div className="flex-1 hidden md:block"></div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'documentation' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {docs.map((doc, i) => (
                  <div key={i} className="terminal-panel p-8 rounded-[3.5rem] bg-white/[0.01] border-white/5 hover:border-blue-500/30 transition-all group flex flex-col items-center text-center justify-between min-h-[380px]">
                     <div className="space-y-6 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-white/20 group-hover:text-blue-400 transition-colors shadow-lg">
                           <doc.icon size={36} strokeWidth={1.5} />
                        </div>
                        <div>
                           <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-2 block">{doc.type}</span>
                           <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-2 leading-tight">{doc.title}</h4>
                           <p className="text-[10px] text-[var(--text-secondary)] font-medium leading-relaxed">{doc.subtitle}</p>
                        </div>
                     </div>
                     <div className="w-full space-y-4">
                        <div className="flex justify-between items-center px-2">
                           <span className="text-[7px] font-black text-white/30 uppercase">{doc.version}</span>
                           <span className="text-[7px] font-black text-white/30 uppercase">{doc.size}</span>
                        </div>
                        <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest group-hover:bg-blue-500 group-hover:text-white transition-all flex items-center justify-center gap-3">
                           <Download size={14} /> Synchronize
                        </button>
                     </div>
                  </div>
                ))}
             </div>
             
             <div className="terminal-panel p-10 rounded-[4rem] bg-gradient-to-r from-blue-900/10 to-transparent border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <MessageSquare size={32} />
                   </div>
                   <div className="text-left">
                      <h4 className="text-xl font-black text-white uppercase tracking-tighter">Strategic Press Inquiries</h4>
                      <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Access high-resolution brand assets and official statements.</p>
                   </div>
                </div>
                <button className="px-10 py-4 bg-blue-500 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                   Open Media Vault
                </button>
             </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-10 animate-fade-in max-w-4xl mx-auto text-center">
             <div className="space-y-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mx-auto shadow-2xl mb-10">
                   <Landmark size={48} />
                </div>
                <h3 className="brand-font text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none">The Architecture of <br/><span className="gold-text">High Fidelity</span></h3>
                <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed font-medium">
                   The Lion Family Ecosystem was founded on the principal of high-fidelity financial synchronization. By bridging institutional-grade execution with a community-first DAO structure, we are building a sovereign foundation for the digital economy.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 text-left">
                <div className="terminal-panel p-10 rounded-[3rem] border-white/5 bg-white/[0.01]">
                   <h4 className="text-[12px] font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                      <Shield size={18} className="text-blue-400" /> Our Mission
                   </h4>
                   <p className="text-[12px] text-[var(--text-secondary)] leading-[1.8]">
                      To provide every principal in our network with the neural tools and institutional capital access required to achieve absolute financial sovereignty within a secure, AES-256 verified environment.
                   </p>
                </div>
                <div className="terminal-panel p-10 rounded-[3rem] border-white/5 bg-white/[0.01]">
                   <h4 className="text-[12px] font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                      <Zap size={18} className="text-[var(--gold)]" /> Our Heritage
                   </h4>
                   <p className="text-[12px] text-[var(--text-secondary)] leading-[1.8]">
                      Born from a synergy of elite quant traders and neural architects, LFES has evolved from a private liquidity shard into a global ecosystem serving over 42,000 verified principals.
                   </p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="space-y-10 animate-fade-in max-w-4xl mx-auto">
             <div className="terminal-panel rounded-[3rem] border-white/5 overflow-hidden bg-[var(--bg-panel)] shadow-2xl">
                <div className="px-10 py-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Scale size={18} className="text-blue-400" />
                      <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font">Protocol Governance</h4>
                   </div>
                   <div className="flex items-center gap-2">
                      <Clock size={12} className="text-[var(--text-secondary)]" />
                      <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Updated: Jan 2025</span>
                   </div>
                </div>
                <div className="p-10 space-y-10 overflow-y-auto max-h-[600px] custom-scrollbar text-[12px] text-[var(--text-secondary)] leading-[1.8] text-justify font-medium">
                   <section>
                      <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                         <ShieldAlert size={14} className="text-red-400" /> 1. RISK DISCLAIMER
                      </h5>
                      <p>Digital asset execution involves high-fidelity volatility. Strategic capital deployment should only be performed by disciplined nodes capable of absorbing total principal loss. SmartLion AI signals are for advisory sync only and do not constitute absolute execution certainty.</p>
                   </section>
                   <section>
                      <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-4">2. PRINCIPAL IDENTIFICATION</h5>
                      <p>Access to the LFES terminal is restricted to authorized principals who have completed the neural verification protocol. You are responsible for maintaining the security of your Access Key cipher.</p>
                   </section>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-10 animate-fade-in max-w-4xl mx-auto">
             <div className="terminal-panel p-10 sm:p-14 rounded-[4rem] border-white/5 bg-white/[0.01] shadow-2xl">
                <div className="flex flex-col items-center text-center mb-12">
                   <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                      <Fingerprint size={32} />
                   </div>
                   <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font mb-4">Initialize Support Protocol</h4>
                   <p className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Direct secure node-to-node communication</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-2">Principal Identifier</label>
                      <input type="text" placeholder="Alias or ID" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white focus:outline-none focus:border-blue-500/40 transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-2">Secure Link</label>
                      <input type="email" placeholder="node@principal.link" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white focus:outline-none focus:border-blue-500/40 transition-all" />
                   </div>
                </div>
                <div className="space-y-2 mb-10">
                   <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-2">Message Shard</label>
                   <textarea rows={4} placeholder="Describe the inquiry or technical disruption..." className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white focus:outline-none focus:border-blue-500/40 transition-all resize-none"></textarea>
                </div>
                <button className="w-full py-5 rounded-[2rem] bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                   Transmit Signal
                </button>
             </div>
          </div>
        )}
      </div>

      {/* HUB FOOTER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="terminal-panel p-6 rounded-3xl border-dashed border-white/10 flex items-center gap-4 bg-white/[0.01]">
            <Lock size={20} className="text-blue-400" />
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-white uppercase tracking-widest">End-to-End Trust</span>
               <span className="text-[7px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">AES-256 Link Active</span>
            </div>
         </div>
         <div className="terminal-panel p-6 rounded-3xl border-dashed border-white/10 flex items-center gap-4 bg-white/[0.01]">
            <Landmark size={20} className="text-green-500" />
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-white uppercase tracking-widest">Sovereign Reserve</span>
               <span className="text-[7px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Verified Multi-Sig Shards</span>
            </div>
         </div>
         <div className="terminal-panel p-6 rounded-3xl border-dashed border-white/10 flex items-center gap-4 bg-white/[0.01]">
            <ExternalLink size={20} className="text-[var(--gold)]" />
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-white uppercase tracking-widest">Explorer Hub</span>
               <span className="text-[7px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Real-time Chain Ledger</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default InvestorTrustHub;