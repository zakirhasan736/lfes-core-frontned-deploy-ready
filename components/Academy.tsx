import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, BookOpen, Rocket, PlayCircle, CheckCircle2, 
  ChevronRight, Brain, Lightbulb, Star, Search, Filter,
  FileText, Clock, Trophy, Map, Library, Sparkles
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Beginner' | 'Advanced' | 'Professional';
  duration: string;
  lessons: number;
  progress: number;
  tags: string[];
}

const COURSES: Course[] = [
  {
    id: 'intro-1',
    title: 'Principal Fundamentals',
    description: 'Master the core mechanics of the Lion Family Ecosystem and terminal navigation.',
    category: 'Beginner',
    duration: '45m',
    lessons: 6,
    progress: 100,
    tags: ['Ecosystem', 'Basics']
  },
  {
    id: 'market-1',
    title: 'Neuro-Market Dynamics',
    description: 'A deep dive into institutional psychology and how to spot whale accumulation patterns.',
    category: 'Advanced',
    duration: '2h 15m',
    lessons: 12,
    progress: 35,
    tags: ['Psychology', 'Whale Watch']
  },
  {
    id: 'trade-1',
    title: 'Alpha Trading Signals',
    description: 'Learning to interpret SmartLion AI signals for high-probability trade setups.',
    category: 'Professional',
    duration: '3h 40m',
    lessons: 18,
    progress: 0,
    tags: ['AI', 'Signals', 'Alpha']
  },
];

const ONBOARDING_STEPS = [
  { id: 1, title: 'Node Authentication', desc: 'Secure your terminal with 2FA.', status: 'completed' },
  { id: 2, title: 'Capital Allocation', desc: 'Deposit your first testnet funds.', status: 'current' },
  { id: 3, title: 'AI Neural Link', desc: 'Consult SmartLion for a market audit.', status: 'pending' },
  { id: 4, title: 'Strategic Execution', desc: 'Place your first order on the terminal.', status: 'pending' },
];

const Academy: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Advanced' | 'Professional'>('All');

  const filteredCourses = useMemo(() => {
    return COURSES.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = filter === 'All' || c.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filter]);

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* HERO SECTION */}
      <div className="terminal-panel p-10 sm:p-16 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 border-[var(--gold)]/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold)]/5 blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex flex-col flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
               <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)]">
                  <Brain size={18} />
               </div>
               <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.6em]">Lion Academy Hub</span>
            </div>
            <h1 className="brand-font text-4xl sm:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-8 leading-none">The Principal's <br/><span className="gold-text">Path</span></h1>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] max-w-lg leading-relaxed mb-10 opacity-70">
              Welcome to the elite education matrix. Transform from a market spectator into an institutional principal through AI-enhanced strategic training.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
               <button className="px-8 py-4 bg-gradient-to-r from-[var(--gold)] to-[#aa8a22] text-[#060b13] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                  <Rocket size={16} /> Resume Learning
               </button>
               <button className="px-8 py-4 bg-white/5 border border-white/10 text-[var(--text-primary)] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                  <Map size={16} /> View Roadmap
               </button>
            </div>
          </div>
          
          <div className="w-full lg:w-[400px] flex flex-col gap-4">
             <div className="terminal-panel p-6 rounded-[2.5rem] bg-white/[0.02] border-white/5">
                <div className="flex items-center justify-between mb-6">
                   <h4 className="text-[9px] font-black text-[var(--text-primary)] uppercase tracking-widest">Global Progress</h4>
                   <Trophy size={16} className="text-[var(--gold)]" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                   <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--gold)] w-[42%] shadow-[0_0_10px_var(--gold)]"></div>
                   </div>
                   <span className="text-[10px] font-black gold-text">42%</span>
                </div>
                <p className="text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">2 of 5 Strategic Certifications Earned</p>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="terminal-panel p-6 rounded-3xl text-center bg-white/[0.01] border-white/5">
                   <span className="block text-2xl font-black text-white mb-1">12</span>
                   <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Active Lessons</span>
                </div>
                <div className="terminal-panel p-6 rounded-3xl text-center bg-white/[0.01] border-white/5">
                   <span className="block text-2xl font-black text-white mb-1">840</span>
                   <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Academy XP</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* ONBOARDING PATH */}
        <div className="xl:col-span-4 space-y-8">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                 <Rocket size={18} className="text-[var(--gold)]" /> Start Here
              </h3>
              <span className="text-[8px] font-black text-[var(--gold)] uppercase">Phase 1/4</span>
           </div>

           <div className="space-y-4">
              {ONBOARDING_STEPS.map((step, idx) => (
                <div key={step.id} className={`terminal-panel p-6 rounded-3xl border transition-all flex items-start gap-5 ${
                  step.status === 'completed' ? 'bg-green-500/5 border-green-500/20' :
                  step.status === 'current' ? 'bg-[var(--gold)]/5 border-[var(--gold)]/30 scale-[1.02] shadow-xl' :
                  'bg-white/[0.01] border-white/5 opacity-50'
                }`}>
                   <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border ${
                     step.status === 'completed' ? 'bg-green-500/20 border-green-500 text-green-500' :
                     step.status === 'current' ? 'bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold)] animate-pulse' :
                     'bg-white/5 border-white/10 text-white/20'
                   }`}>
                      {step.status === 'completed' ? <CheckCircle2 size={20} /> : <span className="text-xs font-black">{step.id}</span>}
                   </div>
                   <div className="flex-1 flex flex-col gap-1">
                      <h4 className={`text-[11px] font-black uppercase tracking-widest ${step.status === 'current' ? 'text-white' : 'text-[var(--text-secondary)]'}`}>{step.title}</h4>
                      <p className="text-[9px] font-medium text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                   </div>
                   {step.status === 'current' && <ChevronRight size={16} className="text-[var(--gold)]" />}
                </div>
              ))}
           </div>
           
           <div className="terminal-panel p-8 rounded-[2.5rem] bg-gradient-to-br from-[var(--gold)]/10 to-transparent border-[var(--gold)]/20">
              <div className="flex items-center gap-3 mb-4">
                 <Sparkles size={18} className="text-[var(--gold)]" />
                 <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Neural Tip</h4>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed font-medium">
                 "Principals who complete Phase 1 within 24 hours of initialization show a 34% higher net profit margin on first-month executions."
              </p>
           </div>
        </div>

        {/* COURSE LIBRARY */}
        <div className="xl:col-span-8 space-y-8">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
              <h3 className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-[0.4em] brand-font flex items-center gap-3">
                 <Library size={18} className="text-[var(--gold)]" /> Course Matrix
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                 <div className="relative group">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search signals..."
                      className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-[10px] font-bold text-white focus:outline-none focus:border-[var(--gold)]/40 transition-all w-full sm:w-48"
                    />
                 </div>
                 <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                    {(['All', 'Beginner', 'Advanced', 'Professional'] as const).map(cat => (
                       <button 
                         key={cat} 
                         onClick={() => setFilter(cat)}
                         className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                           filter === cat ? 'bg-[var(--gold)] text-[#060b13]' : 'text-[var(--text-secondary)] hover:text-white'
                         }`}
                       >
                         {cat}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map(course => (
                <div key={course.id} className="terminal-panel p-8 rounded-[3rem] border-white/5 hover:border-[var(--gold)]/20 transition-all group cursor-pointer flex flex-col justify-between min-h-[300px] bg-white/[0.01]">
                   <div className="space-y-6">
                      <div className="flex justify-between items-start">
                         <div className="flex flex-wrap gap-2">
                            {course.tags.map(t => (
                              <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">{t}</span>
                            ))}
                         </div>
                         <span className={`text-[8px] font-black uppercase tracking-widest ${
                           course.category === 'Beginner' ? 'text-blue-400' :
                           course.category === 'Advanced' ? 'text-[var(--gold)]' :
                           'text-purple-400'
                         }`}>{course.category}</span>
                      </div>
                      <div className="space-y-3">
                         <h4 className="text-xl font-black text-white group-hover:gold-text transition-all leading-tight">{course.title}</h4>
                         <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">{course.description}</p>
                      </div>
                   </div>

                   <div className="mt-8 space-y-4">
                      {course.progress > 0 && (
                        <div className="space-y-2">
                           <div className="flex justify-between items-center text-[8px] font-black uppercase">
                              <span className="text-[var(--text-secondary)]">Progress</span>
                              <span className="text-[var(--gold)]">{course.progress}%</span>
                           </div>
                           <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-[var(--gold)] transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                           </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4 text-[9px] font-bold text-[var(--text-secondary)] uppercase">
                            <div className="flex items-center gap-1.5"><Clock size={12} /> {course.duration}</div>
                            <div className="flex items-center gap-1.5"><FileText size={12} /> {course.lessons} Units</div>
                         </div>
                         <div className="w-10 h-10 rounded-2xl bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-[#060b13] transition-all">
                            {course.progress === 100 ? <CheckCircle2 size={18} /> : <PlayCircle size={18} />}
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           
           {/* TUTORIALS & GUIDES QUICK LINKS */}
           <div className="pt-6">
              <div className="flex items-center gap-3 px-6 mb-6">
                 <FileText size={18} className="text-[var(--gold)]" />
                 <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Resource Library</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 {['Terminal Hotkeys', 'Asset Security 101', 'SmartLion Prompting'].map(guide => (
                    <div key={guide} className="terminal-panel p-5 rounded-2xl border-white/5 hover:border-[var(--gold)]/20 bg-white/[0.01] flex items-center justify-between group cursor-pointer">
                       <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest group-hover:text-white transition-colors">{guide}</span>
                       <ChevronRight size={14} className="text-[var(--text-secondary)] group-hover:text-[var(--gold)] group-hover:translate-x-1 transition-all" />
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Academy;