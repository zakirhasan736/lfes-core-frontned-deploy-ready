'use client'
import React, { useState } from 'react';
import { User } from '@/types/index';
import { apiService } from '@/services/apiService';
import {  ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { TerminalError } from '@/services/errors';
interface LoginProps {
  onLogin: (user: User) => void;
  onToggleSignup: () => void;
  onToggleRecovery: () => void;
}

const Login: React.FC<LoginProps> = ({
  onLogin,
  onToggleSignup,
  onToggleRecovery,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Identification parameters missing.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const user = await apiService.login(email, password);
      onLogin(user);
    } catch (err: unknown) {
      console.error(err);
      setError(
        err instanceof TerminalError
          ? err.message
          : 'Authentication node timeout.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#060b13] px-4 pt-8 pb-14 sm:py-12 selection:bg-[#d4af37] selection:text-[#060b13] overflow-y-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="w-full max-w-lg bg-[#0d1624] rounded-3xl sm:rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-[#1e293b] overflow-hidden relative group">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-lenear-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>

        <div className="px-6 py-8 sm:p-12 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-lenear-to-br from-[#f3cf65] via-[#d4af37] to-[#aa8a22] rounded-2xl sm:rounded-4xl flex items-center justify-center mx-auto mb-6 sm:mb-10 shadow-[0_0_50px_rgba(212,175,55,0.3)] rotate-3">
            <Image
              src={'/lfes-core-logo.png'}
              alt="brand log image"
              width={80}
              height={80}
              className="w-20 h-20 sm:w-26 sm:h-26 object-cover"
            />
          </div>

          <h1 className="brand-font text-2xl sm:text-3xl font-black gold-text mb-1 sm:mb-3 tracking-tighter">
            Terminal Entry
          </h1>
          <p className="text-[#475569] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-12">
            Lion Family Eco System • Secure Hub
          </p>
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-fade-in text-left">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-relaxed">
                {error}
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6 text-left">
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] ml-2">
                Secure Identifier
              </label>
              <input
                type="email"
                placeholder="identity@lfes.exchange"
                className="w-full bg-[#060b13] border border-[#1e293b] rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-[#d4af37]/50 transition-all text-white placeholder:text-[#334155]"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label className="block text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] ml-2">
                Access Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-[#060b13] border border-[#1e293b] rounded-2xl p-4 pr-12 text-sm font-bold focus:outline-none focus:border-[#d4af37]/50 transition-all text-white placeholder:text-[#334155]"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#334155] hover:text-[#d4af37] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col xs:flex-row xs:items-center justify-between py-2 gap-2 sm:gap-4">
              <label className="flex items-center gap-3 cursor-pointer group/check">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-lg border-[#1e293b] bg-[#060b13] text-[#d4af37] focus:ring-[#d4af37]/50"
                />
                <span className="text-[9px] sm:text-[10px] font-black text-[#475569] uppercase tracking-widest group-hover/check:text-[#d4af37] transition-colors">
                  Maintain Session
                </span>
              </label>
              <button
                type="button"
                onClick={onToggleRecovery}
                className="text-[9px] sm:text-[10px] font-black text-[#d4af37]/50 hover:text-[#d4af37] uppercase tracking-widest transition-colors text-right"
              >
                Key Recovery
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-[var(--gold)] to-[#aa8a22] hover:scale-[1.02] disabled:opacity-50 text-[#060b13] font-black py-3 sm:py-5 rounded-xl transition-all shadow-[0_15px_40px_rgba(212,175,55,0.2)] active:scale-95 flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-4 border-[#060b13]/20 border-t-[#060b13] rounded-full animate-spin"></div>
              ) : (
                <>
                  Engage Terminal
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-10 pt-3 sm:pt-6 border-t border-[#1e293b]">
            <p className="text-[10px] font-black text-[#475569] uppercase tracking-widest">
              New Principal?{' '}
              <button
                onClick={onToggleSignup}
                className="text-[#d4af37] hover:underline"
              >
                Initialize Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
