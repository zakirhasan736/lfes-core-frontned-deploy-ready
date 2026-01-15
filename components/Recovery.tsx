'use client';
import React, { useState } from 'react';
import { apiService } from '@/services/apiService';
import {
  Mail,
  RefreshCcw,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';

interface RecoveryProps {
  onToggleLogin: () => void;
}

type RecoveryStep = 'request' | 'verify' | 'reset' | 'complete';

const Recovery: React.FC<RecoveryProps> = ({ onToggleLogin }) => {
  const [step, setStep] = useState<RecoveryStep>('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await apiService.requestKeyRecovery(email);
      setStep('verify');
    } catch (error) {
      setError('Protocol disruption. Check communication channel.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const isValid = await apiService.verifyRecoveryCode(email, code);
      if (isValid) {
        setStep('reset');
      } else {
        setError('Invalid verification cipher. Access denied.');
      }
    } catch (error) {
      setError('Sync error during verification.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Key mismatch. Ciphers must be identical.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await apiService.resetAccessKey(email, newPassword);
      setStep('complete');
    } catch (error) {
      setError('Reset sequence failed. Internal hub error.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeader = (icon: React.ReactNode, title: string) => (
    <>
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#f3cf65] via-[#d4af37] to-[#aa8a22] rounded-2xl sm:rounded-4xl flex items-center justify-center mx-auto mb-8 sm:mb-10 shadow-[0_0_50px_rgba(212,175,55,0.3)] rotate-3 transition-transform duration-500 group-hover:rotate-6">
        {icon}
      </div>
      <h1 className="brand-font text-2xl sm:text-3xl font-black gold-text mb-3 tracking-tighter">
        {title}
      </h1>
      <p className="text-[#475569] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-8 sm:mb-12">
        Security Protocol • Access Restoration
      </p>
    </>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#060b13] px-4 py-8 sm:py-12 selection:bg-[#d4af37] selection:text-[#060b13] overflow-y-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="w-full max-w-lg bg-[#0d1624] rounded-3xl sm:rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-[#1e293b] overflow-hidden relative group">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>

        <div className="p-8 sm:p-12 text-center">
          {step === 'request' && (
            <div className="animate-fade-in">
              {renderHeader(
                <RefreshCcw size={40} className="text-[#060b13]" />,
                'Key Recovery'
              )}
              <form onSubmit={handleRequest} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] ml-2">
                    Verification Email
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
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {error && (
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest px-2">
                    {error}
                  </p>
                )}
                <p className="text-[9px] text-[#475569] leading-relaxed italic px-2">
                  Note: Restoration instructions will be sent exclusively to the
                  verified email linked to your institutional account.
                </p>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-[var(--gold)] to-[#aa8a22] hover:scale-[1.02] disabled:opacity-50 text-[#060b13] font-black py-5 rounded-[1.5rem] transition-all shadow-[0_15px_40px_rgba(212,175,55,0.2)] active:scale-95 flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em] mt-4"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-4 border-[#060b13]/20 border-t-[#060b13] rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Request Restoration <RefreshCcw size={18} />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onToggleLogin}
                  className="w-full text-center text-[10px] font-black text-[#475569] hover:text-[#d4af37] uppercase tracking-widest transition-colors mt-2"
                >
                  Cancel Protocol
                </button>
              </form>
            </div>
          )}

          {step === 'verify' && (
            <div className="animate-fade-in">
              {renderHeader(
                <ShieldCheck size={40} className="text-[#060b13]" />,
                'Verify Identity'
              )}
              <p className="text-xs text-[#64748b] mb-8">
                A 6-digit verification cipher has been sent to your terminal
                mailbox.
              </p>
              <form onSubmit={handleVerify} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] ml-2">
                    Authentication Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    className="w-full bg-[#060b13] border border-[#1e293b] rounded-2xl p-5 text-center text-2xl font-black tracking-[0.5em] focus:outline-none focus:border-[#d4af37]/50 transition-all text-[var(--gold)] placeholder:text-[#334155]/30"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest px-2">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-[var(--gold)] to-[#aa8a22] hover:scale-[1.02] disabled:opacity-50 text-[#060b13] font-black py-5 rounded-3xl transition-all shadow-[0_15px_40px_rgba(212,175,55,0.2)] active:scale-95 flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em] mt-4"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-4 border-[#060b13]/20 border-t-[#060b13] rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Validate Code <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('request')}
                  className="w-full text-center text-[10px] font-black text-[#475569] hover:text-[#d4af37] uppercase tracking-widest transition-colors mt-2"
                >
                  Return to Input
                </button>
              </form>
            </div>
          )}

          {step === 'reset' && (
            <div className="animate-fade-in">
              {renderHeader(
                <Lock size={40} className="text-[#060b13]" />,
                'Access Reset'
              )}
              <form onSubmit={handleReset} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] ml-2">
                    New Access Key
                  </label>
                  <div className="relative">
                    <input
                      type={showPass1 ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full bg-[#060b13] border border-[#1e293b] rounded-2xl p-4 pr-12 text-sm font-bold focus:outline-none focus:border-[#d4af37]/50 transition-all text-white placeholder:text-[#334155]"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass1(!showPass1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#334155] hover:text-[#d4af37]"
                    >
                      {showPass1 ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] ml-2">
                    Confirm Cipher
                  </label>
                  <div className="relative">
                    <input
                      type={showPass2 ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full bg-[#060b13] border border-[#1e293b] rounded-2xl p-4 pr-12 text-sm font-bold focus:outline-none focus:border-[#d4af37]/50 transition-all text-white placeholder:text-[#334155]"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass2(!showPass2)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#334155] hover:text-[#d4af37]"
                    >
                      {showPass2 ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                {error && (
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest px-2">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-[var(--gold)] to-[#aa8a22] hover:scale-[1.02] disabled:opacity-50 text-[#060b13] font-black py-5 rounded-[1.5rem] transition-all shadow-[0_15px_40px_rgba(212,175,55,0.2)] active:scale-95 flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em] mt-4"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-4 border-[#060b13]/20 border-t-[#060b13] rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Update Access Key <CheckCircle2 size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 'complete' && (
            <div className="space-y-8 animate-fade-in">
              {renderHeader(
                <CheckCircle2 size={40} className="text-[#060b13]" />,
                'Hub Synced'
              )}
              <div className="bg-[#060b13] border border-green-500/30 p-8 rounded-4xl">
                <p className="text-base font-bold text-white mb-2">
                  Protocol Successful
                </p>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  Your institutional Access Key has been recalibrated. You may
                  now return to the main terminal entry point.
                </p>
              </div>
              <button
                onClick={onToggleLogin}
                className="w-full bg-[#d4af37] text-[#060b13] font-black py-5 rounded-3xl transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(212,175,55,0.3)] hover:scale-[1.03]"
              >
                <ArrowLeft size={18} />
                Return to Terminal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recovery;
