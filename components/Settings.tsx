import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Lock, Save, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const Settings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Auto-dismiss message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: "New password and confirmation do not match." });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: "New password must be at least 8 characters." });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      await apiService.changePassword(currentPassword, newPassword);
      setMessage({ type: 'success', text: "Security credentials updated successfully." });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || "Failed to update password." });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = calculateStrength(newPassword);

  const getStrengthColor = (s: number) => {
    if (s <= 2) return 'bg-red-500';
    if (s <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = (s: number) => {
    if (s === 0) return '';
    if (s <= 2) return 'Weak';
    if (s <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="brand-font text-3xl font-black text-white uppercase tracking-tighter">
          Security <span className="gold-text">Settings</span>
        </h2>
        <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">
          Manage your account security and access credentials
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <div className="terminal-panel p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] border-[var(--border)] bg-[var(--bg-panel)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-20"></div>
            
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)]">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Change Password</h3>
                <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Update your access key</p>
              </div>
            </div>

            {message && (
              <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 animate-fade-in ${
                message.type === 'success' 
                  ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                  : 'bg-red-500/10 border-red-500/20 text-red-500'
              }`}>
                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">{message.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] ml-2">Current Password</label>
                <div className="relative">
                  <input 
                    type={showCurrent ? "text" : "password"} 
                    className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-2xl p-4 pr-12 text-sm font-bold focus:outline-none focus:border-[var(--gold)]/50 transition-all text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/30"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--gold)]">
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] ml-2">New Password</label>
                <div className="relative">
                  <input 
                    type={showNew ? "text" : "password"} 
                    className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-2xl p-4 pr-12 text-sm font-bold focus:outline-none focus:border-[var(--gold)]/50 transition-all text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/30"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--gold)]">
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {newPassword && (
                  <div className="px-2 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Strength</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                        strength <= 2 ? 'text-red-500' : strength <= 3 ? 'text-yellow-500' : 'text-green-500'
                      }`}>{getStrengthLabel(strength)}</span>
                    </div>
                    <div className="h-1 w-full bg-[var(--bg-main)] rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${getStrengthColor(strength)}`} 
                        style={{ width: `${(strength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] ml-2">Confirm New Password</label>
                <div className="relative">
                  <input 
                    type={showConfirm ? "text" : "password"} 
                    className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-2xl p-4 pr-12 text-sm font-bold focus:outline-none focus:border-[var(--gold)]/50 transition-all text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/30"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--gold)]">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-[var(--gold)] text-[#060b13] font-black py-4 px-8 rounded-2xl transition-all shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-3 text-[10px] uppercase tracking-widest"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-[#060b13]/20 border-t-[#060b13] rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save size={16} /> Update Credentials
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="terminal-panel p-6 rounded-[2rem] border-[var(--border)] bg-[var(--bg-panel)]">
            <h4 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-4">Security Status</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border)]">
                <span className="text-[10px] font-bold text-[var(--text-primary)]">2FA Authentication</span>
                <span className="text-[9px] font-black text-green-500 uppercase bg-green-500/10 px-2 py-1 rounded">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border)]">
                <span className="text-[10px] font-bold text-[var(--text-primary)]">Last Login</span>
                <span className="text-[9px] font-mono text-[var(--text-secondary)]">Today, 10:42 AM</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border)]">
                <span className="text-[10px] font-bold text-[var(--text-primary)]">Password Age</span>
                <span className="text-[9px] font-mono text-[var(--text-secondary)]">14 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
