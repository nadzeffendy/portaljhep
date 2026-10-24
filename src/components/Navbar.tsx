import React, { useState } from 'react';
import {
  Bell,
  Lock,
  LogOut,
  FolderLock,
  BarChart3,
  Database,
  FileText,
  ShieldCheck,
  Menu,
  X,
  UserCheck,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications }) => {
  const {
    currentUser,
    isLoggedIn,
    logout,
    activeTab,
    setActiveTab,
    unreadCount,
    setLoginModalOpen,
    setReportModalOpen,
    setPageEditorOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isStaffOrAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'staff');

  const navLinks = [
    { id: 'utama', label: 'Utama' },
    { id: 'pengenalan', label: 'Pengenalan' },
    { id: 'kakitangan', label: 'Kakitangan' },
    { id: 'komuniti', label: 'Komuniti' },
    { id: 'perkhidmatan', label: 'Perkhidmatan' },
    { id: 'faq', label: 'FAQ' },
    { id: 'dashboard', label: 'Statistik', badge: 'Masa Nyata', icon: BarChart3 }
  ];

  const handleNavClick = (tabId: any) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Smooth scroll if element exists or tab switches
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Institution Branding */}
          <div
            onClick={() => handleNavClick('utama')}
            className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 min-w-[40px] max-w-[40px] aspect-square rounded-xl bg-gradient-to-br from-[#E11D48] to-[#BE123C] flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
              J
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors leading-none">
                JHEP DIGITAL
              </span>
              <span className="text-[10px] tracking-wider font-semibold text-slate-400 uppercase mt-1">
                POLITEKNIK TUANKU SYED SIRAJUDDIN
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-rose-600 font-semibold bg-rose-50/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />}
                  {link.label}
                  {link.badge && (
                    <span className="ml-0.5 text-[9px] font-bold px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded-full animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-rose-500 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Admin / Staff Dedicated Links (Strictly for staff/admin only) */}
            {isStaffOrAdmin && (
              <>
                <button
                  onClick={() => handleNavClick('crud')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'crud'
                      ? 'text-indigo-600 font-semibold bg-indigo-50'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  <Database className="w-4 h-4 text-indigo-500" />
                  <span>Pengurusan Data</span>
                  <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">
                    CRUD
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('drive')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'drive'
                      ? 'text-emerald-700 font-semibold bg-emerald-50'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <FolderLock className="w-4 h-4 text-emerald-600" />
                  <span>Google Drive</span>
                  <span className="text-[9px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                    Selamat
                  </span>
                </button>
              </>
            )}
          </nav>

          {/* Right Action Icons & Auth Button */}
          <div className="flex items-center gap-3">
            
            {/* Quick PDF Report Button: ONLY FOR ADMIN & STAFF */}
            {isStaffOrAdmin && (
              <button
                onClick={() => setReportModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shadow-2xs"
                title="Jana Laporan PDF Automatik untuk Pengurusan"
              >
                <FileText className="w-4 h-4 text-rose-500" />
                <span>Laporan PDF</span>
              </button>
            )}

            {/* Notification Center Trigger */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Peti Notifikasi"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Authentication Action Button */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-slate-100 border border-slate-200 transition-all select-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                    {currentUser?.name.charAt(0) || 'U'}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser?.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-semibold text-rose-600 uppercase flex items-center gap-0.5">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      {currentUser?.role === 'admin' ? 'Pentadbir (2FA)' : 'Staf (2FA)'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          2FA Disahkan
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">
                          {currentUser?.staffId}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveTab('crud');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                      >
                        <Database className="w-4 h-4 text-indigo-500" />
                        Pengurusan CRUD Pelajar & Rekod
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('drive');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                      >
                        <FolderLock className="w-4 h-4 text-emerald-600" />
                        Repositori Google Drive (PTSS)
                      </button>

                      <button
                        onClick={() => {
                          setPageEditorOpen(true);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                      >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        Sunting Kandungan Laman & FAQ
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#E11D48] to-[#E60049] hover:from-[#BE123C] hover:to-[#D90429] rounded-full shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/35 active:scale-95 transition-all duration-150 flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Log Masuk</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === link.id
                  ? 'bg-rose-50 text-rose-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}

          {isStaffOrAdmin && (
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <button
                onClick={() => handleNavClick('crud')}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50/70 flex items-center justify-between"
              >
                <span>Pengurusan CRUD Rekod</span>
                <span className="text-[10px] font-bold bg-indigo-200 px-1.5 py-0.5 rounded">Admin/Staf</span>
              </button>

              <button
                onClick={() => handleNavClick('drive')}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-emerald-800 bg-emerald-50/70 flex items-center justify-between"
              >
                <span>Google Drive Storan PTSS</span>
                <span className="text-[10px] font-bold bg-emerald-200 px-1.5 py-0.5 rounded">Selamat</span>
              </button>
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => {
                setReportModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-center"
            >
              Jana Laporan PDF
            </button>
            {!isLoggedIn && (
              <button
                onClick={() => {
                  setLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg text-center"
              >
                Log Masuk (2FA)
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
