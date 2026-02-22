import React, { useState } from 'react';
import { 
  Handshake, Users, Link as LinkIcon, Share2, 
  BarChart3, Award, Globe, ShieldCheck, 
  ChevronRight, Copy, CheckCircle2, Zap,
  TrendingUp, Star, Mail, Briefcase, ExternalLink,
  Gift, DollarSign, Activity
} from 'lucide-react';

type PartnershipTab = 'collaborations' | 'affiliates' | 'inquiry';

const PartnershipHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PartnershipTab>('collaborations');
  const [copied, setCopied] = useState(false);

  const partners = [
    { name: 'Swiss Node Capital', type: 'Liquidity Provider', desc: 'Providing deep order books and institutional-grade pricing for LFES principals.', logo: 'SN' },
    { name: 'Titan Liquidity', type: 'Market Maker', desc: 'Ensuring zero-spread execution across all primary and secondary ecosystem shards.', logo: 'TL' },
    { name: 'Neural Guard', type: 'Security Audit', desc: 'Continuous on-chain verification of smart contracts and custody vaults.', logo: 'NG' },
    { name: 'Apex Media', type: 'Ecosystem Growth', desc: 'Strategic marketing and global brand amplification across physical and digital hubs.', logo: 'AM' },
  ];

  const copyReferral = () => {
    navigator.clipboard.writeText('https://lfes.exchange/ref/PRINCIPAL_8420');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* PARTNERSHIP HERO */}
      <div className="terminal-panel p-10 sm:p-16 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 border-[var(--gold)]/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex flex-col flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
               <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)]">
                  <Handshake size={18} />
               </div>
               <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.6em]">Global Partnership Matrix</span>
            </div>
            <h1 className="brand-font text-4xl sm:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-8 leading-none">Synergy & <br/><span className="gold-text">Growth</span></h1>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] max-w-lg leading-relaxed mb-10 opacity-70">
              Expanding the Lion Family Ecosystem through strategic institutional alliances and a high-fidelity reward protocol for network contributors.
            </p>
            
            <div className="flex flex-wrap bg-white/5 p-1.5 rounded-2xl border border-white/5 self-center lg:self-start gap-1">
               {(['collaborations', 'affiliates', 'inquiry'] as const).map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[var(--gold)] text-[#060b13] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
                 >
                   {tab === 'affiliates' ? 'Affiliate Network' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="w-full lg:w-[450px] flex flex-col gap-4">
             <div className="terminal-panel p-8 rounded-[3rem] bg-black/40 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Globe size={100} />
                </div>
                <div className="relative z-10 flex flex-col gap-1">
                   <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-widest">Network Expansion</span>
                   <div className="flex items-end gap-3 mt-4 mb-2">
                      <span className="text-4xl font-black text-white tabular-nums">142</span>
                      <span className="text-[10px] font-black text-green-500 uppercase mb-2 tracking-widest">+12% Quarterly</span>
                   </div>
                   <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Institutional Nodes Bridged</span>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="terminal-panel p-6 rounded-3xl bg-white/[0.01] border-white/5">
                   <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Global Reach</span>
                   <span className="text-lg font-black text-white tracking-tight">24 Regions</span>
                </div>
                <div className="terminal-panel p-6 rounded-3xl bg-white/[0.01] border-white/5">
                   <span className="block text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Trust Score</span>
                   <span className="text-lg font-black text-green-500 tracking-tight">99.9%</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[500px]">
        {activeTab === 'collaborations' && (
          <div className="space-y-10 animate-fade-in">
             <div className="flex items-center justify-between px-4">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                   <Handshake size={18} className="text-[var(--gold)]" /> Institutional Alliances
                </h3>
                <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Shard: Active Collaborations</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {partners.map((partner, i) => (
                  <div key={i} className="terminal-panel p-8 rounded-[3.5rem] bg-gradient-to-br from-[var(--bg-panel)] to-white/[0.02] border-white/5 hover:border-[var(--gold)]/30 transition-all group flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
                     <div className="w-20 h-20 rounded-[2.5rem] bg-gradient-to-br from-[#0d1624] to-[#060b13] border border-white/10 flex items-center justify-center text-[var(--gold)] shrink-0 font-black text-2xl group-hover:scale-110 transition-all shadow-xl">
                        {partner.logo}
                     </div>
                     <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                           <h4 className="text-xl font-black text-white tracking-tighter uppercase">{partner.name}</h4>
                           <span className="px-3 py-1 rounded-full bg-white/5 text-[7px] font-black text-[var(--gold)] uppercase tracking-widest border border-[var(--gold)]/10">{partner.type}</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{partner.desc}</p>
                        <div className="flex items-center gap-6 justify-center sm:justify-start pt-2">
                           <button className="flex items-center gap-2 text-[9px] font-black text-white/40 uppercase hover:text-[var(--gold)] transition-colors">
                              <ShieldCheck size={14} /> View Audit
                           </button>
                           <button className="flex items-center gap-2 text-[9px] font-black text-white/40 uppercase hover:text-[var(--gold)] transition-colors">
                              <ExternalLink size={14} /> Principal Site
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>

             <div className="terminal-panel p-12 rounded-[4rem] border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center text-center">
                <Users size={48} className="text-white/10 mb-6" />
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-4">The Alliance Network is Expanding</h4>
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest max-w-sm leading-relaxed">
                   Synchronizing with new institutional nodes in Asia and EMEA regions. Full shard deployment expected Q4 2025.
                </p>
             </div>
          </div>
        )}

        {activeTab === 'affiliates' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 space-y-8">
                   <div className="terminal-panel p-10 sm:p-12 rounded-[3.5rem] bg-gradient-to-br from-indigo-900/10 to-[var(--gold)]/5 border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                         <Zap size={180} />
                      </div>
                      <div className="relative z-10">
                         <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--gold)] text-[#060b13] flex items-center justify-center shadow-[0_0_30px_var(--gold-glow)]">
                               <Award size={24} />
                            </div>
                            <h3 className="brand-font text-2xl font-black text-white uppercase tracking-tighter">Principal Reward <span className="gold-text">Protocol</span></h3>
                         </div>
                         <p className="text-[11px] font-bold text-white/60 uppercase tracking-widest max-w-lg mb-12 leading-relaxed">
                            Generate your unique network shard link and earn commissions on every terminal execution from your referred principals.
                         </p>
                         
                         <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                               <span className="text-[10px] font-black text-white/80 tracking-widest uppercase truncate mr-4">https://lfes.exchange/ref/PRINCIPAL_8420</span>
                               <button 
                                 onClick={copyReferral}
                                 className="shrink-0 p-2.5 rounded-xl bg-white/5 border border-white/10 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#060b13] transition-all"
                               >
                                  {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                               </button>
                            </div>
                            <button className="px-10 py-5 bg-[var(--gold)] text-[#060b13] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                               Invite Principal
                            </button>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {[
                        { label: 'Total Referrals', val: '24', icon: Users, color: 'text-blue-400' },
                        { label: 'Active Principals', val: '18', icon: Activity, color: 'text-green-500' },
                        { label: 'Accumulated Yield', val: '$842.10', icon: DollarSign, color: 'gold-text' }
                      ].map((stat, i) => (
                        <div key={i} className="terminal-panel p-6 rounded-3xl bg-white/[0.01] border-white/5 flex flex-col items-center text-center gap-3">
                           <stat.icon size={20} className={stat.color} />
                           <span className="text-2xl font-black text-white tabular-nums">{stat.val}</span>
                           <span className="text-[7px] font-black text-white/40 uppercase tracking-widest">{stat.label}</span>
                        </div>
                      ))}
                   </div>

                   <div className="terminal-panel p-8 rounded-[3rem] border-white/5 bg-[var(--text-primary)]/[0.01]">
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                         <BarChart3 size={16} className="text-[var(--gold)]" /> Commission Tiers
                      </h4>
                      <div className="space-y-4">
                         {[
                           { tier: 'Bronze Node', req: '0 - 10 Referrals', commission: '15% Share' },
                           { tier: 'Silver Shard', req: '11 - 50 Referrals', commission: '25% Share' },
                           { tier: 'Gold Principal', req: '50+ Referrals', commission: '40% Share' }
                         ].map((t, i) => (
                           <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                              <div className="flex flex-col">
                                 <span className="text-[11px] font-black text-white uppercase">{t.tier}</span>
                                 <span className="text-[7px] font-bold text-white/30 uppercase tracking-widest">{t.req}</span>
                              </div>
                              <span className="text-[11px] font-black gold-text uppercase">{t.commission}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="xl:col-span-4 space-y-8">
                   <div className="terminal-panel p-8 rounded-[3rem] border-white/5 flex flex-col gap-6">
                      <h4 className="text-[10px] font-black text-[var(--gold)] uppercase tracking-widest">Performance Matrix</h4>
                      <div className="h-[200px] flex items-center justify-center opacity-20 border-2 border-dashed border-white/10 rounded-2xl">
                         <TrendingUp size={48} />
                      </div>
                      <div className="space-y-4 pt-4">
                         <div className="flex justify-between items-center text-[10px]">
                            <span className="text-[var(--text-secondary)] font-bold uppercase">Conversion Rate</span>
                            <span className="text-white font-black">75%</span>
                         </div>
                         <div className="flex justify-between items-center text-[10px]">
                            <span className="text-[var(--text-secondary)] font-bold uppercase">Next Payout</span>
                            <span className="text-white font-black uppercase">Oct 15, 2025</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="terminal-panel p-8 rounded-[3rem] border border-[var(--gold)]/20 bg-[var(--gold)]/5">
                      <div className="flex items-center gap-3 mb-4">
                         <Gift size={16} className="text-[var(--gold)]" />
                         <span className="text-[9px] font-black text-white uppercase tracking-widest">Special Bonus</span>
                      </div>
                      <p className="text-[9px] text-[var(--text-secondary)] leading-relaxed font-bold uppercase">
                         Refer 5 VIP Principals this month to unlock a 1-year node maintenance fee waiver.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'inquiry' && (
          <div className="space-y-10 animate-fade-in max-w-4xl mx-auto">
             <div className="text-center space-y-4 mb-12">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-6">
                   <Mail size={32} />
                </div>
                <h3 className="brand-font text-3xl font-black text-white uppercase tracking-tighter">Initialize <span className="gold-text">Inquiry</span></h3>
                <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em] max-w-md mx-auto leading-relaxed">
                   Institutional partners and strategic ventures may submit a node bridge request for formal ecosystem review.
                </p>
             </div>

             <div className="terminal-panel p-10 sm:p-14 rounded-[4rem] border-white/5 bg-white/[0.01] space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-2">Organization Principal</label>
                      <input type="text" placeholder="Entity Name" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white focus:outline-none focus:border-[var(--gold)]/40 transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-2">Secure Link</label>
                      <input type="email" placeholder="contact@organization.node" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white focus:outline-none focus:border-[var(--gold)]/40 transition-all" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-2">Shard Category</label>
                   <select className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white/60 focus:outline-none focus:border-[var(--gold)]/40 transition-all appearance-none">
                      <option>Liquidity Bridge</option>
                      <option>Strategic Marketing</option>
                      <option>Infrastructure Node</option>
                      <option>DeFi Venture</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] ml-2">Synergy Proposal</label>
                   <textarea rows={4} placeholder="Describe the strategic advantage for the Lion Family Ecosystem..." className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white focus:outline-none focus:border-[var(--gold)]/40 transition-all resize-none"></textarea>
                </div>
                <button className="w-full py-5 rounded-[2rem] bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                   Transmit Proposal
                </button>
             </div>
             
             <div className="flex items-center justify-center gap-8 py-8 opacity-20">
                <Briefcase size={24} />
                <Globe size={24} />
                <ShieldCheck size={24} />
                <Award size={24} />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnershipHub;