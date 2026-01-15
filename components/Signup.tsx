
'use client';
import React, { useState } from 'react';
import { apiService } from '@/services/apiService';
import {  Mail, User as UserIcon, Lock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { User } from '@/types/index';

export interface SignupProps {
  onSignup: (user: User) => void;
  onToggleLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({  onToggleLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await apiService.signup(formData.name, formData.email, formData.password);

    // ✅ Signup successful → go to login
    onToggleLogin();
  } catch (error) {
    console.error('Signup failed:', error);
    alert('Signup failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#060b13] px-4 py-8 sm:py-12 selection:bg-[#d4af37] selection:text-[#060b13] overflow-y-auto">
      <div className="absolute inset-0 bg-[radial-lenear(circle_at_center,var(--tw-lenear-stops))] from-[#d4af37]/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="w-full max-w-lg bg-[#0d1624] rounded-3xl sm:rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-[#1e293b] overflow-hidden relative group">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-lenear-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>

        <div className="p-8 sm:p-12 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-lenear-to-br from-[#f3cf65] via-[#d4af37] to-[#aa8a22] rounded-2xl sm:rounded-4xl flex items-center justify-center mx-auto mb-8 sm:mb-10 shadow-[0_0_50px_rgba(212,175,55,0.3)] rotate-3">
            <Image
              src={'/lfes-core-logo.png'}
              alt="brand log image"
              width={80}
              height={80}
              className="w-20 h-20 sm:w-26 sm:h-26 object-cover"
            />
          </div>

          <h1 className="brand-font text-2xl sm:text-3xl font-black gold-text mb-3 tracking-tighter">
            Initialize Matrix
          </h1>
          <p className="text-[#475569] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-8 sm:mb-12">
            New Node Registration • Secure Hub
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] ml-2">
                Display Alias
              </label>
              <div className="relative">
                <UserIcon
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#334155]"
                />
                <input
                  type="text"
                  placeholder="Principal Name"
                  className="w-full bg-[#060b13] border border-[#1e293b] rounded-2xl p-4 pl-12 text-sm font-bold focus:outline-none focus:border-[#d4af37]/50 transition-all text-white placeholder:text-[#334155]"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] ml-2">
                Comm Identifier
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#334155]"
                />
                <input
                  type="email"
                  placeholder="identity@lfes.exchange"
                  className="w-full bg-[#060b13] border border-[#1e293b] rounded-2xl p-4 pl-12 text-sm font-bold focus:outline-none focus:border-[#d4af37]/50 transition-all text-white placeholder:text-[#334155]"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] ml-2">
                Access Key Cipher
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#334155]"
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#060b13] border border-[#1e293b] rounded-2xl p-4 pl-12 text-sm font-bold focus:outline-none focus:border-[#d4af37]/50 transition-all text-white placeholder:text-[#334155]"
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-[var(--gold)] to-[#aa8a22] hover:scale-[1.02] disabled:opacity-50 text-[#060b13] font-black py-5 rounded-3xl transition-all shadow-[0_15px_40px_rgba(212,175,55,0.2)] active:scale-95 flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em] mt-8"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-4 border-[#060b13]/20 border-t-[#060b13] rounded-full animate-spin"></div>
              ) : (
                <>
                  Generate Access
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 sm:mt-10 pt-6 border-t border-[#1e293b]">
            <p className="text-[10px] font-black text-[#475569] uppercase tracking-widest">
              Already initialized?{' '}
              <button
                onClick={onToggleLogin}
                className="text-[#d4af37] hover:underline"
              >
                Return to Terminal
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
