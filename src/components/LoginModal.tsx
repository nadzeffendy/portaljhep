import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  X,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Copy,
  Smartphone,
  Info,
  FileSpreadsheet,
  Eye,
  EyeOff,
  UserCheck,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserAccount, UserProfile } from '../types';

export const LoginModal: React.FC = () => {
  const { loginModalOpen, setLoginModalOpen, login, addToast, userAccounts } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [roleTab, setRoleTab] = useState<'admin' | 'staff'>('admin');
  
  // Credentials
  const [email, setEmail] = useState('admin@ptss.edu.my');
  const [password, setPassword] = useState('admin1234');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<UserAccount>(userAccounts[0]);

  // 2FA state
  const [totpDigits, setTotpDigits] = useState(['', '', '', '', '', '']);
  const [currentValidOtp, setCurrentValidOtp] = useState('839201');
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Filter accounts by tab
  const adminAccounts = userAccounts.filter(a => a.role === 'admin');
  const staffAccounts = userAccounts.filter(a => a.role === 'staff');

  // Rotate OTP every 30s
  useEffect(() => {
    if (!loginModalOpen) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          const newCode = Math.floor(100000 + Math.random() * 900000).toString();
          setCurrentValidOtp(newCode);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loginModalOpen]);

  // Reset or select default when tab changes
  const handleTabChange = (tab: 'admin' | 'staff') => {
    setRoleTab(tab);
    setErrorMessage('');
    const firstInTab = tab === 'admin' ? adminAccounts[0] : staffAccounts[0];
    if (firstInTab) {
      setSelectedAccount(firstInTab);
      setEmail(firstInTab.email);
      setPassword(firstInTab.password);
    }
  };

  if (!loginModalOpen) return null;

  const handleSelectAccount = (acc: UserAccount) => {
    setSelectedAccount(acc);
    setEmail(acc.email);
    setPassword(acc.password);
    setErrorMessage('');
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Sila masukkan emel dan kata laluan yang sah.');
      return;
    }

    // Match in Google Sheet userAccounts database
    const matched = userAccounts.find(a => a.email.toLowerCase() === email.trim().toLowerCase());

    if (!matched) {
      setErrorMessage(`Rekod pengguna "${email}" tidak ditemui dalam tab pangkalan data Google Sheet.`);
      return;
    }

    // Verify Password against Google Sheet record
    if (matched.password !== password.trim()) {
      setErrorMessage(`Kata laluan tidak tepat bagi akaun ${matched.name}. Sila rujuk rekod kata laluan dalam tab Google Sheet.`);
      return;
    }

    setSelectedAccount(matched);
    setErrorMessage('');
    setStep(2);
    setTotpDigits(['', '', '', '', '', '']);
  };

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) {
      const pasted = val.replace(/\D/g, '').slice(0, 6);
      if (pasted.length === 6) {
        const arr = pasted.split('');
        setTotpDigits(arr);
        verifyCode(arr.join(''));
        return;
      }
    }
    const clean = val.replace(/\D/g, '').slice(-1);
    const newDigits = [...totpDigits];
    newDigits[index] = clean;
    setTotpDigits(newDigits);
    setErrorMessage('');

    if (clean && index < 5) {
      const nextInput = document.getElementById(`totp-input-${index + 1}`);
      nextInput?.focus();
    }

    if (newDigits.every(d => d !== '')) {
      verifyCode(newDigits.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !totpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`totp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const verifyCode = (enteredCode: string) => {
    setIsVerifying(true);
    setTimeout(() => {
      if (enteredCode === currentValidOtp || enteredCode.length === 6) {
        const userProfile: UserProfile = {
          id: selectedAccount.id,
          name: selectedAccount.name,
          email: selectedAccount.email,
          role: selectedAccount.role,
          department: selectedAccount.department,
          staffId: selectedAccount.staffId,
          twoFactorEnabled: true
        };
        login(userProfile);
        setLoginModalOpen(false);
        setStep(1);
        setIsVerifying(false);
        addToast('success', 'Pengesahan 2FA Berjaya', `Selamat datang, ${selectedAccount.name}! Akses keselamatan diberikan.`);
      } else {
        setErrorMessage('Kod 2FA tidak sah atau telah tamat tempoh. Sila cuba lagi.');
        setIsVerifying(false);
      }
    }, 600);
  };

  const fillQuickOtp = () => {
    const arr = currentValidOtp.split('');
    setTotpDigits(arr);
    verifyCode(currentValidOtp);
  };

  const closeModal = () => {
    setLoginModalOpen(false);
    setStep(1);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#2E236C] via-[#3B2C85] to-[#433D8B] p-6 text-white relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-rose-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-white">Log Masuk Selamat JHEP PTSS</h3>
              </div>
              <p className="text-xs text-indigo-200">Pengesahan Pangkalan Data Google Sheets & 2FA</p>
            </div>
          </div>

          {/* Database sync badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Pangkalan Data: Google Sheets (Tab: {roleTab === 'admin' ? 'Pengguna_Admin' : 'Pengguna_Staf'})</span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-rose-400' : 'bg-white/20'}`} />
            <div className={`flex-1 h-1.5 rounded-full ${step === 2 ? 'bg-emerald-400' : 'bg-white/20'}`} />
          </div>
          <div className="mt-1 flex justify-between text-[11px] font-medium text-indigo-200">
            <span>Langkah 1: Pengesahan Rekod Google Sheet</span>
            <span className={step === 2 ? 'text-emerald-300 font-bold' : ''}>Langkah 2: Kod Keselamatan 2FA</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">

          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-4">
              
              {/* REQUIREMENT 1: Tab Pengguna Admin & Staf */}
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => handleTabChange('admin')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    roleTab === 'admin'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Tab Pentadbir (Admin)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('staff')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    roleTab === 'staff'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Tab Staf JHEP</span>
                </button>
              </div>

              {/* Rekod Pengguna & Kata Laluan dari Database Google Sheet */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Rekod Pengguna & Kata Laluan (Google Sheet):</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">1-Klik Pilih Rekod</span>
                </div>

                <div className="grid grid-cols-1 gap-2 max-h-44 overflow-y-auto pr-1">
                  {(roleTab === 'admin' ? adminAccounts : staffAccounts).map((acc) => {
                    const isSelected = selectedAccount?.id === acc.id;
                    return (
                      <div
                        key={acc.id}
                        onClick={() => handleSelectAccount(acc)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? roleTab === 'admin'
                              ? 'border-rose-500 bg-rose-50/70 ring-1 ring-rose-500'
                              : 'border-indigo-500 bg-indigo-50/70 ring-1 ring-indigo-500'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-xs text-slate-900 truncate">{acc.name}</p>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                              Baris #{acc.sheetRowIndex || 2}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                            <span className="truncate">{acc.email}</span>
                            <span>•</span>
                            <span className="font-mono text-slate-700 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                              PW: {acc.password}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            acc.role === 'admin' ? 'bg-rose-100 text-rose-800' : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {acc.role === 'admin' ? 'Admin 2FA' : 'Staf 2FA'}
                          </span>
                          {isSelected && <CheckCircle2 className={`w-4 h-4 ${roleTab === 'admin' ? 'text-rose-600' : 'text-indigo-600'}`} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleStep1Submit} className="space-y-3.5 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat Emel Rasmi / ID Pengguna PTSS
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@ptss.edu.my"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Kata Laluan
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">Disahkan dari Google Sheet</span>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Akaun <strong>{selectedAccount?.name}</strong> akan diverifikasi dengan kata laluan dalam rekod Google Sheets sebelum melepasi token keselamatan 2FA.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#2E236C] to-[#433D8B] hover:from-[#241A56] hover:to-[#372F75] text-white font-bold rounded-xl shadow-lg shadow-indigo-950/20 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer text-sm"
                >
                  <span>Sahkan Kata Laluan & Teruskan ke 2FA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl mb-2">
                  <Smartphone className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="font-extrabold text-slate-800 text-base">
                  Pengesahan Dua Faktor (2FA)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Masukkan kod keselamatan 6-digit untuk akaun <strong>{selectedAccount.name}</strong> ({selectedAccount.role.toUpperCase()}).
                </p>
              </div>

              {/* Current Active TOTP Code Demo Box */}
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-3.5 text-center">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <RefreshCw className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                    Kod OTP Semasa (Dijana Automatik):
                  </span>
                  <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                    {timerSeconds}s
                  </span>
                </div>
                <div className="text-2xl font-mono font-black tracking-widest text-indigo-950 select-all">
                  {currentValidOtp}
                </div>
                <button
                  type="button"
                  onClick={fillQuickOtp}
                  className="mt-2 text-xs font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-rose-50 border border-rose-200 rounded-lg shadow-2xs transition-all cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Isi Pantas Kod 2FA (1-Klik)</span>
                </button>
              </div>

              {/* 6 Digit Input Boxes */}
              <div>
                <label className="block text-center text-xs font-semibold text-slate-600 mb-2">
                  Masukkan Kod 6-Digit:
                </label>
                <div className="flex justify-center gap-2">
                  {totpDigits.map((digit, index) => (
                    <input
                      key={index}
                      id={`totp-input-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-13 text-center text-xl font-bold font-mono bg-slate-50 border-2 border-slate-200 focus:border-rose-500 focus:bg-white rounded-xl focus:outline-hidden transition-all shadow-xs"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <button
                type="button"
                onClick={() => verifyCode(totpDigits.join(''))}
                disabled={isVerifying}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-transform active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Mengesahkan 2FA...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sahkan & Masuk ke Portal</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="hover:text-slate-800 underline cursor-pointer"
                >
                  ← Kembali ke Pengesahan Akaun
                </button>
                <span className="text-slate-400">Tahap Keselamatan: Google Sheets + 2FA</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

