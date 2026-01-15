
'use client'
import React, { useRef, useState } from 'react';

const LiveStream: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<'idle' | 'active' | 'denied' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStatus('active');
        setErrorMessage('');
      }
    } catch (err: unknown) {
      console.error('Camera access error:', err);

      if (
        err instanceof DOMException &&
        (err.name === 'NotAllowedError' ||
          err.name === 'PermissionDeniedError' ||
          err.message.includes('dismissed'))
      ) {
        setStatus('denied');
        setErrorMessage(
          'Camera access required for secure terminal verification. Please update site settings.'
        );
      } else {
        setStatus('error');
        setErrorMessage('Hardware sync error. Ensure peripheral is connected.');
      }
    }
  };

  return (
    <div className="aspect-video bg-[#000000] relative group overflow-hidden rounded-b-2xl border-t border-[#1e2329]">
      {status === 'active' ? (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b0e11]">
          <img 
            src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&q=80&w=1200" 
            className="absolute inset-0 w-full h-full object-cover opacity-10" 
            alt="Static"
          />
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <div 
              onClick={startStream}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl ${
                status === 'denied' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-yellow-400 text-[#0b0e11] hover:scale-105 hover:bg-yellow-500'
              }`}
            >
              {status === 'denied' ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 17c-.77 1.333.192 3 1.732 3z" /></svg>
              ) : (
                <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4.516 7.548c0-.923.651-1.623 1.391-1.623.295 0 .566.106.746.281l5.222 5.092c.322.314.322.824 0 1.138l-5.222 5.092c-.18.175-.451.281-.746.281-.74 0-1.391-.7-1.391-1.623V7.548z" /></svg>
              )}
            </div>
            <h3 className="mt-6 text-[11px] font-black text-white uppercase tracking-[0.25em]">
              {status === 'denied' ? 'Access Restricted' : 'Terminal Uplink'}
            </h3>
            <p className={`mt-2 text-[9px] font-bold max-w-xs uppercase tracking-widest ${status === 'denied' ? 'text-red-400' : 'text-[#474d57]'}`}>
              {status === 'denied' ? errorMessage : 'Request encrypted video feed for live market analysis'}
            </p>
            {(status === 'denied' || status === 'error') && (
              <button 
                onClick={startStream}
                className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[9px] font-black text-white uppercase tracking-widest transition-all"
              >
                Retry Authorization
              </button>
            )}
          </div>
        </div>
      )}

      {/* Institutional Metadata Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-yellow-400 p-0.5 shadow-xl">
               <img src="https://i.pravatar.cc/100?u=analyst" className="w-full h-full object-cover rounded-[3px]" alt="Host" />
            </div>
            <div>
              <p className="text-[10px] font-black text-white leading-none">Market_Feed_V2</p>
              <p className="text-[8px] text-yellow-400 font-bold uppercase tracking-widest">HFT_SECURE_LINK</p>
            </div>
        </div>
        <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/5 flex items-center gap-2">
           <div className={`w-1 h-1 rounded-full ${status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
           <span className="text-[8px] font-black text-white/50 tracking-widest uppercase">Node_Connected</span>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
