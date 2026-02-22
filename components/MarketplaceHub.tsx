import React, { useState, useMemo, useEffect } from 'react';
import { 
  Megaphone, Search, Users, TrendingUp, Briefcase, Zap, 
  Globe, ShieldCheck, Filter, ChevronRight, MessageSquare,
  DollarSign, Rocket, Building2, Star, Timer, Eye, 
  ExternalLink, Layers, Sparkles, Plus, FileText,
  Handshake, PieChart, Activity, ShieldAlert, BadgeCheck,
  ArrowRight, LayoutGrid, List, SortAsc, MapPin,
  TrendingDown, Shield, Target, Award, BarChart3,
  Globe2, Network, Clock
} from 'lucide-react';
import { apiService } from '../services/apiService';

type MarketplaceTab = 'announcements' | 'partners' | 'investors' | 'startups' | 'services';

interface Listing {
  id: string;
  title: string;
  author: string;
  category: string;
  desc: string;
  tags: string[];
  metrics: { label: string; val: string; trend?: 'up' | 'down' }[];
  status: 'active' | 'hot' | 'closed' | 'verified';
  type: string;
  tier: 'Institutional' | 'Premium' | 'Standard';
  location?: string;
  postedAt: string;
}

const MarketplaceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MarketplaceTab>('announcements');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadListings = async () => {
      setIsLoading(true);
      const data = await apiService.fetchMarketplaceListings();
      setListings(data);
      setIsLoading(false);
    };
    loadListings();
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter(l => {
      // Map activeTab to actual mock data 'type'
      const typeMapping: Record<string, string> = {
        'announcements': 'announcements',
        'partners': 'partners',
        'investors': 'investments',
        'startups': 'startups',
        'services': 'services'
      };
      
      const matchesTab = l.type === typeMapping[activeTab];
      const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           l.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, listings]);

  const sidebarItems = [
    { id: 'announcements', label: 'Strategic Board', icon: Megaphone, status: 'LIVE' },
    { id: 'partners', label: 'Partner Search', icon: Handshake, status: 'ALPHA' },
    { id: 'investors', label: 'Venture Capital', icon: PieChart, status: 'LIVE' },
    { id: 'startups', label: 'Startup Matrix', icon: Rocket, status: 'ROADMAP' },
    { id: 'services', label: 'B2B Services', icon: Briefcase, status: 'LIVE' },
  ];

  const bannerStats = [
    { label: 'Ecosystem Shards', val: '1,402', icon: Layers, color: 'text-[var(--gold)]' },
    { label: 'Aggregated Liquidity', val: '$240.5M', icon: DollarSign, color: 'text-green-500' },
    { label: 'Verified Principals', val: '42.4K', icon: Users, color: 'text-blue-400' },
    { label: 'Network Uptime', val: '99.98%', icon: Activity, color: 'text-emerald-400' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-fade-in pb-16 min-h-screen">
      
      {/* FULL WIDTH HERO BANNER */}
      <div className="terminal-panel p-12 sm:p-20 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[#0d1624] via-[#060b13] to-blue-900/10 border-blue-500/20 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[180px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[var(--gold)]/5 blur-[100px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
               <Globe2 size={16} className="text-blue-400 animate-pulse" />
               <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Global Strategic Hub</span>
            </div>
            <h1 className="brand-font text-5xl sm:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              Strategic <br/><span className="gold-text">Marketplace</span>
            </h1>
            <p className="text-lg font-medium text-[var(--text-secondary)] max-w-xl leading-relaxed italic border-l-4 border-[var(--gold)]/40 pl-6">
              "The central institutional gateway for discovering venture-grade shards and cross-node collaborations within the Lion Family architecture."
            </p>
            <div className="flex gap-6">
               <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                  Initialize Discovery
               </button>
               <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  Documentation Hub
               </button>
            </div>
          </div>

          {/* Banner Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {bannerStats.map((stat, i) => (
              <div key={i} className="terminal-panel p-8 rounded-[2.5rem] bg-black/40 border-white/5 flex flex-col gap-4 group hover:border-blue-500/30 transition-all">
                 <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                       <stat.icon size={22} />
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">{stat.label}</span>
                    <div className="text-3xl font-black text-white tabular-nums tracking-tighter">{stat.val}</div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS - FULL WIDTH */}
      <div className="terminal-panel p-8 rounded-[3rem] bg-[var(--bg-panel)] border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
         <div className="relative w-full md:w-[600px]">
            <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Filter institutional shards, venture seeds, or partner nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#060b13] border border-white/10 rounded-[1.75rem] p-5 pl-16 text-sm font-bold text-white focus:outline-none focus:border-blue-500/40 transition-all placeholder:text-white/10"
            />
         </div>
         <div className="flex items-center gap-10">
            <div className="flex flex-col gap-1 items-end mr-4">
               <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Active Search Matrix</span>
               <span className="text-[11px] font-black text-white uppercase tracking-widest">{filteredListings.length} Nodes Found</span>
            </div>
            <div className="flex bg-black/60 p-2 rounded-[1.25rem] border border-white/5">
               <button onClick={() => setViewMode('grid')} className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white/10 text-[var(--gold)] shadow-inner' : 'text-white/20 hover:text-white'}`}><LayoutGrid size={20} /></button>
               <button onClick={() => setViewMode('list')} className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white/10 text-[var(--gold)] shadow-inner' : 'text-white/20 hover:text-white'}`}><List size={20} /></button>
            </div>
         </div>
      </div>

      {/* CORE LAYOUT: CARDS LEFT, SIDEBAR RIGHT */}
      <div className="flex flex-col lg:flex-row-reverse gap-10">
        
        {/* RIGHT SIDEBAR (Strategic Discovery) */}
        <aside className="w-full lg:w-80 shrink-0 space-y-8 order-1 lg:order-2">
          <div className="terminal-panel p-8 rounded-[3rem] bg-[var(--bg-panel)] border-[var(--border)] shadow-2xl relative overflow-hidden">
             <div className="flex items-center gap-3 mb-10 px-2">
                <Network size={18} className="text-blue-400" />
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] brand-font">Directory</h3>
             </div>
             <nav className="space-y-2 relative z-10">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as MarketplaceTab)}
                    className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.5rem] transition-all group border ${
                      activeTab === item.id 
                        ? 'bg-[var(--gold)] text-[#060b13] border-[var(--gold)] shadow-xl scale-[1.03]' 
                        : 'text-[var(--text-secondary)] border-transparent hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={20} className={activeTab === item.id ? 'text-[#060b13]' : 'group-hover:text-[var(--gold)] transition-colors'} />
                      <div className="flex flex-col items-start">
                         <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                         <span className={`text-[6px] font-black px-1 rounded ${activeTab === item.id ? 'bg-black/20 text-[#060b13]' : 'bg-white/5 text-white/30'}`}>{item.status}</span>
                      </div>
                    </div>
                    {activeTab === item.id && <ChevronRight size={14} className="text-[#060b13]" />}
                  </button>
                ))}
             </nav>
          </div>

          <div className="terminal-panel p-10 rounded-[3rem] bg-gradient-to-br from-blue-600/10 to-transparent border-blue-500/20 flex flex-col items-center text-center">
             <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
                <Megaphone size={28} />
             </div>
             <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Expansion Shard</h4>
             <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest leading-relaxed mb-8">
                Want to list your strategic venture in the core matrix?
             </p>
             <button className="w-full py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95">
                <Plus size={18} /> Transmit Listing
             </button>
          </div>

          {/* Security Node Widget */}
          <div className="terminal-panel p-8 rounded-[2.5rem] bg-white/[0.01] border-white/5">
             <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={16} className="text-green-500" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">Safe Discovery</span>
             </div>
             <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed italic">
                All shards in the Marketplace undergo 72-hour neural verification before inclusion in the primary matrix.
             </p>
          </div>
        </aside>

        {/* LEFT MAIN CONTENT (Card Matrix) */}
        <main className="flex-1 flex flex-col gap-10 order-2 lg:order-1">
          <div className={viewMode === 'grid' ? "grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8" : "space-y-6"}>
            {isLoading ? (
              <div className="col-span-full py-48 flex flex-col items-center justify-center gap-4 opacity-30">
                 <Activity size={64} className="animate-spin text-blue-500" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">Synchronizing Matrix...</span>
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="col-span-full py-48 flex flex-col items-center justify-center opacity-30 grayscale border-2 border-dashed border-white/5 rounded-[4rem]">
                 <Layers size={120} strokeWidth={0.5} className="mb-8 opacity-20" />
                 <p className="text-xl font-black uppercase tracking-[0.6em]">No Strategic Shards Detected</p>
                 <span className="text-[9px] font-bold text-white/20 uppercase mt-4">Node synchronization in progress...</span>
              </div>
            ) : (
              filteredListings.map(item => (
                <div key={item.id} className="terminal-panel bg-[var(--bg-panel)] border-[var(--border)] p-10 rounded-[3.5rem] flex flex-col justify-between hover:border-blue-500/20 hover:bg-blue-500/[0.01] transition-all min-h-[500px] shadow-xl group/card">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/card:border-blue-500/30 transition-colors shadow-lg">
                             <span className="text-lg font-black gold-text">{item?.author?.charAt(0) || ""}</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[13px] font-black text-white uppercase tracking-widest">{item.author}</span>
                             <div className="flex items-center gap-2">
                                <Clock size={10} className="text-white/20" />
                                <span className="text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{item.postedAt}</span>
                             </div>
                          </div>
                       </div>
                       {item.status === 'verified' ? (
                         <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <BadgeCheck size={20} />
                         </div>
                       ) : (
                         <div className="p-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
                            <Zap size={18} className="animate-pulse" />
                         </div>
                       )}
                    </div>
                    
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[6px] font-black text-white/40 uppercase tracking-widest">{item.tier} Shard</span>
                       </div>
                       <h4 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter group-hover/card:gold-text transition-colors">
                          {item.title}
                       </h4>
                       <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, idx) => (
                             <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[7px] font-black text-white/40 uppercase tracking-widest">
                                {tag}
                             </span>
                          ))}
                       </div>
                       <p className="text-[12px] text-[var(--text-secondary)] italic opacity-70 group-hover/card:opacity-100 transition-opacity leading-relaxed">
                          "{item.desc}"
                       </p>
                    </div>
                  </div>

                  <div className="mt-12 space-y-8">
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                      {item.metrics.map((m, i) => (
                        <div key={i} className="flex flex-col gap-1">
                           <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{m.label}</span>
                           <div className="flex items-center gap-2">
                              <span className="text-[18px] font-black text-white tabular-nums tracking-tighter">{m.val}</span>
                              {m.trend === 'up' && <TrendingUp size={12} className="text-green-500" />}
                           </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-[#f1f5f9] group-hover/card:bg-[var(--gold)] group-hover/card:text-[#060b13] group-hover/card:border-transparent font-black uppercase text-[10px] tracking-widest transition-all shadow-xl flex items-center justify-center gap-3">
                       Initialize Secure Uplink <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* LOAD MORE / NAVIGATION */}
          {!isLoading && filteredListings.length > 0 && (
            <div className="flex justify-center py-10">
               <button className="px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all text-white/60 hover:text-white">
                  Synchronize Additional Shards
               </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default MarketplaceHub;