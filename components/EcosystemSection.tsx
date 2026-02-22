
import React from 'react';
import { TabID } from '../types';
import { 
  Rocket, Shield, Clock, BookOpen, Users, Globe, 
  Gamepad2, Trophy, Heart, Newspaper, HelpCircle, Lock, 
  TrendingUp, Star, Zap, Activity, Repeat, Landmark,
  LineChart, Mail, Megaphone, ShieldCheck, Briefcase, PieChart
} from 'lucide-react';

const ECOSYSTEM_CONFIG: Record<string, { title: string, subtitle: string, icon: any, vision: string, features: string[], status?: string }> = {
  'futures': {
    title: 'Institutional Futures',
    subtitle: 'High-Leverage Execution Matrix',
    icon: Activity,
    vision: 'A sophisticated derivative engine providing perpetual and quarterly contracts with cross-margin optimization and institutional-grade risk parameters.',
    features: ['Up to 125x Leverage', 'Institutional Liquidity Aggregator', 'Advanced Order Archetypes'],
    status: 'Roadmap Alpha'
  },
  'p2p': {
    title: 'P2P Escrow Terminal',
    subtitle: 'Direct Merchant Settlement',
    icon: Repeat,
    vision: 'The global P2P protocol of the LFES Ecosystem, enabling secure, direct trade between principals with multi-asset escrow protection.',
    features: ['Encrypted Transaction Chat', 'Verified Merchant Shield', 'Instant Escrow Arbitration'],
    status: 'Strategic Build'
  },
  'academy': {
    title: 'Lion Academy',
    subtitle: 'AI-Driven Knowledge Matrix',
    icon: BookOpen,
    vision: 'A specialized educational ecosystem designed to transform principals into high-performing traders through AI-personalized curriculum.',
    features: ['Strategic Trading Certifications', 'Live Analyst Workshops', 'Simulated Node Training'],
    status: 'Live Beta'
  },
  'token-economy': {
    title: 'FAMILY Token Page',
    subtitle: 'Ecosystem Vitality & Governance',
    icon: PieChart,
    vision: 'The economic heartbeat of the LFES Hub. FAMILY token drives fee reductions, staking yields, and strategic governance.',
    features: ['Staking Rewards Program', 'Governance Voting Rights', 'Fee Tier Multipliers'],
    status: 'Core Asset'
  },
  'investors': {
    title: 'Investor Portal',
    subtitle: 'Transparency & Strategic Growth',
    icon: Users,
    vision: 'Dedicated hub for strategic partners to monitor the LFES Roadmap, access Litepapers, and review quarterly reports.',
    features: ['Verified Roadmap Progression', 'Strategic Media Kit', 'Institutional Comms'],
    status: 'Alpha Access'
  },
  'security': {
    title: 'Security Control',
    subtitle: 'AES-256 Multi-Layer Defense',
    icon: Lock,
    vision: 'The central security dashboard for managing principal identification, trusted device parameters, and advanced 2FA configurations.',
    features: ['Hardware Security Management', 'Real-time Account Audit Logs', 'Anti-Phishing Verification'],
    status: 'Operational'
  },
  'charity': {
    title: 'Lion Heart Fund',
    subtitle: 'Verified Global Impact',
    icon: Heart,
    vision: 'Our commitment to philanthropic excellence. A percentage of all ecosystem yields are directed toward verifiable global impact projects.',
    features: ['Live Transparency Reports', 'Donor-Tracked Funding', 'Lion Conservation Initiatives'],
    status: 'Active Protocol'
  },
  'status': {
    title: 'System Node Status',
    subtitle: 'Real-time Infrastructure Monitoring',
    icon: Activity,
    vision: 'Complete transparency into the LFES Hub health, showing node latency and database synchronicity across all global regions.',
    features: ['Real-time Ping Metrics', 'Shard Health Visualization', 'Maintenance Calendars'],
    status: 'Live Tracking'
  },
  'support': {
    title: 'Principal Support',
    subtitle: 'Institutional Ticketing Matrix',
    icon: HelpCircle,
    vision: '24/7 dedicated assistance for institutional users. Connect with our senior terminal agents via high-fidelity ticketing.',
    features: ['VIP Priority Queues', 'Live Technical Support', 'Strategic Documentation'],
    status: 'Operational'
  }
};

const EcosystemSection: React.FC<{ tabId: TabID }> = ({ tabId }) => {
  const config = ECOSYSTEM_CONFIG[tabId as string];
  
  if (!config) {
    return (
      <div className="terminal-panel p-24 rounded-[4rem] text-center opacity-30 animate-fade-in border-dashed border-2">
        <Activity size={64} className="mx-auto mb-8 animate-pulse text-[var(--gold)]" />
        <h3 className="text-xl font-black uppercase tracking-[0.8em] brand-font mb-4">Module Syncing</h3>
        <p className="text-[10px] font-black uppercase tracking-widest">Bridging node matrix for {tabId}...</p>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      <div className="terminal-panel p-12 sm:p-20 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 border-[var(--gold)]/20 shadow-2xl">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--gold)]/5 blur-[150px] pointer-events-none"></div>
         <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-[2.5rem] bg-gradient-to-br from-[#f3cf65] to-[#aa8a22] flex items-center justify-center text-[#060b13] shadow-[0_20px_60px_rgba(212,175,55,0.4)] rotate-3">
               <Icon size={56} strokeWidth={1.5} />
            </div>
            <div className="text-center md:text-left">
               <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.5em] mb-6 block">{config.subtitle}</span>
               <h2 className="brand-font text-4xl sm:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-8 leading-none">{config.title}</h2>
               <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 px-5 py-2 rounded-full flex items-center gap-3">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">{config.status || 'Active Protocol'}</span>
                  </div>
                  <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-5 py-2 rounded-full flex items-center gap-3">
                     <Clock size={14} className="text-[var(--gold)]" />
                     <span className="text-[9px] font-black text-[var(--gold)] uppercase tracking-widest">Q3 2025 Roadmap</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-7 space-y-10">
            <div className="terminal-panel p-10 sm:p-14 rounded-[3.5rem] bg-[var(--text-primary)]/[0.01] border-[var(--border)] relative group">
               <h3 className="text-[12px] font-black text-[var(--text-primary)] uppercase tracking-[0.5em] brand-font mb-10 border-b border-[var(--border)] pb-6">Module Vision</h3>
               <p className="text-[16px] font-medium text-[var(--text-secondary)] leading-[2] italic relative">
                  {config.vision}
               </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="terminal-panel p-8 rounded-[2.5rem] text-center hover:bg-[var(--gold)]/5 transition-all cursor-pointer group">
                  <TrendingUp size={24} className="mx-auto mb-4 text-[var(--gold)] group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">Market Impact</span>
               </div>
               <div className="terminal-panel p-8 rounded-[2.5rem] text-center hover:bg-[var(--gold)]/5 transition-all cursor-pointer group">
                  <ShieldCheck size={24} className="mx-auto mb-4 text-[var(--gold)] group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">Verified Hub</span>
               </div>
            </div>
         </div>

         <div className="lg:col-span-5">
            <div className="terminal-panel p-10 sm:p-14 rounded-[3.5rem] bg-[var(--gold)]/5 border-[var(--gold)]/20 h-full flex flex-col justify-between">
               <div>
                  <h3 className="text-[12px] font-black text-[var(--gold)] uppercase tracking-[0.5em] brand-font mb-12">Capabilities</h3>
                  <div className="space-y-8">
                     {config.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-8 group">
                           <div className="w-12 h-12 rounded-2xl bg-[#060b13] border border-[var(--border)] flex items-center justify-center text-[var(--gold)] font-black text-sm transition-all group-hover:scale-110">
                              {i + 1}
                           </div>
                           <span className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-widest group-hover:gold-text transition-all leading-tight">{feature}</span>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="mt-16 pt-10 border-t border-[var(--border)]">
                  <button className="w-full py-6 rounded-[2rem] bg-gradient-to-r from-[var(--gold)] to-[#aa8a22] text-[#060b13] text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.03] transition-all">
                     Initialize Interest
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default EcosystemSection;
