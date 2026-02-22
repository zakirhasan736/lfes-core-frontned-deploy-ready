import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  MessageSquare, Mic, Users, Send, Hash, ShieldCheck, 
  Search, Plus, Zap, Radio, Globe, Briefcase, 
  ShieldAlert, Command, PlusCircle, MoreHorizontal,
  ChevronRight, UserCheck, ShieldX, Terminal, 
  MessageCircle, Video, Lock, Info, Activity
} from 'lucide-react';
import { apiService } from '../services/apiService';

type SocialTab = 'community' | 'business' | 'direct' | 'voice';

interface ChatMessage {
  id: string;
  user: string;
  content: string;
  time: string;
  tier: 'Principal' | 'VIP' | 'Node' | 'Admin' | 'AI';
  isMe?: boolean;
}

const TOPICS = [
  { id: 'general', name: 'Global General', icon: Globe, desc: 'Ecosystem-wide synchronization' },
  { id: 'technical', name: 'Technical Alpha', icon: Zap, desc: 'Node engineering & development' },
  { id: 'governance', name: 'DAO Governance', icon: ShieldCheck, desc: 'Voting & strategic proposals' },
  { id: 'news', name: 'Market Flux', icon: Radio, desc: 'Real-time liquidity alerts' }
];

const SocialHub: React.FC<{ initialTab?: SocialTab }> = ({ initialTab = 'community' }) => {
  const [activeTab, setActiveTab] = useState<SocialTab>(initialTab);
  const [activeTopic, setActiveTopic] = useState('general');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      const data = await apiService.fetchSocialMessages(activeTopic);
      setMessages(data);
      setIsLoading(false);
    };
    loadMessages();
  }, [activeTopic]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const sentMsg = await apiService.sendSocialMessage(activeTopic, input);
    setMessages(prev => [...prev, sentMsg]);
    setInput('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      <div className="terminal-panel p-10 sm:p-14 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-[var(--gold)]/5 border-[var(--gold)]/20 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex flex-col text-center lg:text-left">
            <h1 className="brand-font text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-6">Global <br/><span className="gold-text">Synchrony</span></h1>
            <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] max-w-lg leading-relaxed opacity-70">
              High-fidelity communication infrastructure. AI-shielded security for institutional principals.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 bg-white/5 p-2 rounded-[2rem] border border-white/5 shadow-inner">
             {(['community', 'business', 'direct', 'voice'] as const).map(tab => (
               <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase transition-all ${activeTab === tab ? 'bg-[var(--gold)] text-[#060b13]' : 'text-[var(--text-secondary)] hover:text-white'}`}>{tab}</button>
             ))}
          </div>
        </div>
      </div>

      <div className="terminal-panel rounded-[3.5rem] overflow-hidden border-[var(--border)] flex flex-col lg:flex-row h-[800px] bg-[var(--bg-panel)] shadow-2xl relative">
        <div className="w-full lg:w-80 border-r border-white/5 bg-black/20 flex flex-col">
           <div className="p-8 border-b border-white/5">
              <h3 className="text-[10px] font-black text-[var(--gold)] uppercase tracking-[0.4em] mb-6">Network Nodes</h3>
              <input type="text" placeholder="Search Matrix..." className="w-full bg-[#060b13] border border-white/10 rounded-xl py-2.5 px-4 text-[10px] font-bold text-white focus:outline-none" />
           </div>
           <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
              {activeTab === 'community' && TOPICS.map(topic => (
                <button key={topic.id} onClick={() => setActiveTopic(topic.id)} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTopic === topic.id ? 'bg-[var(--gold)]/10 border border-[var(--gold)]/20' : 'hover:bg-white/5'}`}>
                   <topic.icon size={18} className={activeTopic === topic.id ? 'text-[var(--gold)]' : 'text-white/20'} />
                   <div className="text-left"><span className={`block text-[10px] font-black uppercase tracking-widest ${activeTopic === topic.id ? 'text-white' : 'text-white/40'}`}>{topic.name}</span></div>
                </button>
              ))}
           </div>
        </div>

        <div className="flex-1 flex flex-col bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] relative">
           <div className="bg-black/60 border-b border-white/5 px-8 py-4 flex items-center justify-between backdrop-blur-xl">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40"><Hash size={18} /></div>
                 <div><h3 className="text-[12px] font-black text-white uppercase">{TOPICS.find(t => t.id === activeTopic)?.name}</h3></div>
              </div>
              <div className="flex items-center gap-4"><ShieldAlert size={14} className="text-blue-400" /><span className="text-[8px] font-black text-blue-400 uppercase">Neural Guard Active</span></div>
           </div>

           <div ref={chatScrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
              {isLoading ? (
                <div className="h-full flex items-center justify-center opacity-20"><Activity className="animate-spin" /></div>
              ) : messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10"><Terminal size={64} className="mb-6" /></div>
              ) : messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'} animate-fade-in group`}>
                   <div className={`flex items-center gap-2 mb-2 ${m.isMe ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">{m.user}</span>
                      <span className="text-[7px] font-bold text-white/10 uppercase">{m.time}</span>
                   </div>
                   <div className={`p-4 rounded-2xl text-[11px] font-medium leading-relaxed max-w-[80%] border shadow-2xl ${m.isMe ? 'bg-gradient-to-br from-[var(--gold)] to-[#aa8a22] text-[#060b13] border-[var(--gold)]/50' : 'bg-black/40 border-white/5 text-white/90'}`}>{m.content}</div>
                </div>
              ))}
           </div>

           <div className="p-8 bg-black/40 border-t border-white/5 backdrop-blur-3xl">
              <div className="flex gap-4 p-2 bg-[#060b13] border border-white/10 rounded-[2.5rem] focus-within:border-[var(--gold)]/40 transition-all shadow-2xl">
                 <button className="p-3.5 text-white/20 hover:text-[var(--gold)]"><PlusCircle size={22} /></button>
                 <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} placeholder="Transmit signal..." className="flex-1 bg-transparent px-4 text-xs font-bold text-white focus:outline-none" />
                 <button onClick={handleSendMessage} disabled={!input.trim()} className="bg-gradient-to-r from-[var(--gold)] to-[#aa8a22] text-[#060b13] px-8 rounded-full font-black text-[10px] uppercase transition-all">Transmit <Send size={16} /></button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SocialHub;