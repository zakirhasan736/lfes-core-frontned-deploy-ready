
'use client'
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { Message } from '@/types/index';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: 'Protocol active. Awaiting your analysis parameters.', timestamp: new Date() }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const resp = await getGeminiResponse(input, messages.map(m => ({ role: m.role, content: m.content })));
      setMessages(prev => [...prev, { role: 'assistant', content: resp, timestamp: new Date() }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Protocol link disrupted. System recalibrating...', timestamp: new Date() }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="terminal-panel rounded-2xl border border-[#d4af37]/20 flex flex-col shadow-2xl relative overflow-hidden h-150 xl:h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 blur-3xl pointer-events-none"></div>
      <div className="p-5 border-b border-white/5 bg-white/2 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse shadow-[0_0_5px_#d4af37]"></div>
            <h2 className="text-[9px] font-black text-white uppercase tracking-[0.3em] brand-font">Lion Intelligence Core</h2>
         </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[90%] p-4 rounded-xl text-[11px] leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-[#d4af37] text-[#060b13] font-bold' : 'bg-[#060b13]/80 border border-white/5 text-white/90'}`}>
              <div className="whitespace-pre-wrap">{m.content}</div>
              <div className={`mt-2 text-[7px] font-black uppercase tracking-widest ${m.role === 'user' ? 'text-black/40' : 'text-[#475569]'}`}>
                {m.role === 'assistant' ? 'Intelligence_Node' : 'Principal_User'}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-[#060b13]/80 border border-white/5 px-4 py-2 rounded-xl"><span className="text-[8px] font-black text-[#475569] uppercase tracking-widest">Processing Protocol...</span></div>
          </div>
        )}
      </div>
      <div className="p-4 bg-[#0d1624] border-t border-white/5">
        <div className="flex gap-2 p-1.5 bg-[#060b13] border border-white/10 rounded-xl focus-within:border-[#d4af37]/40 transition-all group">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Initiate query..." className="flex-1 bg-transparent px-4 py-2 text-xs font-bold text-white focus:outline-none placeholder:text-[#334155]" />
          <button onClick={handleSend} disabled={isLoading} className="bg-[#d4af37] text-[#060b13] px-5 py-2 rounded-lg font-black transition-all hover:scale-105 active:scale-95 disabled:opacity-20 flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
