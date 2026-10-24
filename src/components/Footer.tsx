import React from 'react';
import {
  ShieldCheck,
  FolderLock,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Heart,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_DRIVE_FOLDER_URL } from '../data/mockData';

export const Footer: React.FC = () => {
  const { setActiveTab, setLoginModalOpen, currentUser } = useApp();

  const isStaffOrAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'staff');

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E11D48] to-[#BE123C] flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                J
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">
                  JHEP DIGITAL
                </span>
                <span className="text-[10px] tracking-wider font-semibold text-slate-400 uppercase block">
                  POLITEKNIK TUANKU SYED SIRAJUDDIN
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Portal rasmi bersepadu Jabatan Hal Ehwal Pelajar PTSS. Memperkasa pengurusan data siswa, penempatan kolej kediaman, kebajikan sahsiah serta analitik masa nyata.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 font-bold text-[10px] flex items-center gap-1 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                2FA TLS-256 Terjamin
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
                v2.6.4 Production
              </span>
            </div>
          </div>

          {/* Col 2: Navigasi Pantas */}
          <div>
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Navigasi Pantas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActiveTab('utama'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Laman Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Dashboard Analitik Masa Nyata
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('kakitangan'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Carta Organisasi & Kakitangan
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('komuniti'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Aktiviti & Kelab Kampus
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Soalan Lazim (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Pentadbiran & Storan */}
          <div>
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Akses Pentadbir & Storan
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                {isStaffOrAdmin ? (
                  <button
                    onClick={() => { setActiveTab('crud'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-white text-indigo-400 flex items-center gap-1"
                  >
                    <span>Modul CRUD Pelajar</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setLoginModalOpen(true)}
                    className="hover:text-white flex items-center gap-1"
                  >
                    <span>Log Masuk Admin (2FA)</span>
                  </button>
                )}
              </li>
              <li>
                {isStaffOrAdmin ? (
                  <button
                    onClick={() => { setActiveTab('drive'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-white text-emerald-400 flex items-center gap-1"
                  >
                    <FolderLock className="w-3 h-3" />
                    <span>Google Drive PTSS</span>
                  </button>
                ) : (
                  <a
                    href={OFFICIAL_DRIVE_FOLDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white text-slate-500 flex items-center gap-1"
                  >
                    <FolderLock className="w-3 h-3" />
                    <span>Drive Rasmi (Terkunci)</span>
                  </a>
                )}
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('dua-bahagian-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else setActiveTab('utama');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Pengambilan & Data Siswa
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('dua-bahagian-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else setActiveTab('utama');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Kebajikan & Disiplin
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Hubungi Kami */}
          <div>
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Hubungi Kami
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Politeknik Tuanku Syed Sirajuddin, Pauh Putra, 02600 Arau, Perlis</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+604-988 6200 (Talian Am)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>jhep@ptss.edu.my</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>www.ptss.edu.my</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 Jabatan Hal Ehwal Pelajar, Politeknik Tuanku Syed Sirajuddin (PTSS). Hak Cipta Terpelihara.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Dasar Privasi</span>
            <span className="hover:text-slate-400 cursor-pointer">Terma Perkhidmatan</span>
            <span className="hover:text-slate-400 cursor-pointer">Pekeliling ICT JPA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
