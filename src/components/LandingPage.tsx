import React, { useState, useEffect } from 'react';
import {
  User,
  Search,
  FileText,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  FolderLock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_DRIVE_FOLDER_URL } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const {
    banners,
    faqs,
    setActiveTab,
    setLoginModalOpen,
    currentUser,
    setReportModalOpen
  } = useApp();

  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');
  const [openScopeId, setOpenScopeId] = useState<string>('kebajikan-1');

  // Auto carousel slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const currentBanner = banners[activeSlide] || banners[0];

  const scrollToBahagian = () => {
    const el = document.getElementById('dua-bahagian-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const isStaffOrAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'staff');

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">

      {/* Hero Section (Matching Screenshot 1) - Expansive Width */}
      <section className="pt-8 sm:pt-12 text-center w-full max-w-[1560px] mx-auto px-4 sm:px-6">
        
        {/* Main Catchy Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
          Satu portal. Semua urusan.
        </h1>
        
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium">
          Pengurusan hal ehwal pelajar yang lebih mudah, tersusun dan berhubung.
        </p>

        {/* Hero Interactive Carousel Card (Matching Screenshot 1) */}
        <div className="mt-10 relative">
          <div className="w-full bg-gradient-to-br from-[#2E236C] via-[#372A80] to-[#433D8B] rounded-3xl sm:rounded-4xl p-8 sm:p-14 text-left text-white shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between">
            
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Tag */}
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-extrabold uppercase tracking-widest border border-white/15 backdrop-blur-md">
                {currentBanner.tag}
              </span>

              {/* Big Headline */}
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                {currentBanner.title} <br />
                <span className="text-[#93C5FD] font-black">{currentBanner.highlight}</span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-indigo-100/90 max-w-2xl font-normal leading-relaxed">
                {currentBanner.description}
              </p>
            </div>

            {/* Carousel Dots & Controls */}
            <div className="relative z-10 flex items-center justify-center gap-2 pt-8">
              {banners.map((b, idx) => (
                <button
                  key={b.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slaid ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </section>

      {/* Section: Semua Urusan Pelajar Dalam Satu Sistem (Matching Screenshot 1 & 2) */}
      <section className="w-full max-w-[1560px] mx-auto px-4 sm:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Semua Urusan Pelajar Dalam Satu Sistem
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 font-normal">
            Semakan, permohonan asrama, rekod disiplin, dan pendaftaran aktiviti dalam satu platform bersepadu.
          </p>
        </div>

        {/* 4 Feature Cards (Matching Screenshot 2 exactly) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Portal Pelajar */}
          <div
            onClick={() => {
              if (isStaffOrAdmin) {
                setActiveTab('crud');
              } else {
                setActiveTab('dashboard');
              }
            }}
            className="group cursor-pointer bg-gradient-to-b from-[#243372] to-[#1C2652] rounded-3xl p-7 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-blue-300 mb-6 group-hover:bg-white/20 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                Portal Pelajar
              </h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Urus maklumat peribadi, status akademik, dan profil pelajar.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-blue-300 group-hover:text-white">
              <span>Buka modul</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Semakan Status */}
          <div
            onClick={() => {
              if (isStaffOrAdmin) {
                setActiveTab('crud');
              } else {
                setActiveTab('komuniti');
              }
            }}
            className="group cursor-pointer bg-gradient-to-b from-[#4F2582] to-[#3B1963] rounded-3xl p-7 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-purple-300 mb-6 group-hover:bg-white/20 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                Semakan Status
              </h3>
              <p className="text-xs text-purple-100/80 leading-relaxed">
                Semak rekod permohonan asrama dan bantuan kewangan dengan cepat.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-purple-300 group-hover:text-white">
              <span>Semak permohonan</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Muat Turun Borang */}
          <div
            onClick={() => {
              if (isStaffOrAdmin) {
                setActiveTab('drive');
              } else {
                setActiveTab('komuniti');
              }
            }}
            className="group cursor-pointer bg-gradient-to-b from-[#64214E] to-[#4A1639] rounded-3xl p-7 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-rose-300 mb-6 group-hover:bg-white/20 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-200 transition-colors">
                Muat Turun Borang
              </h3>
              <p className="text-xs text-rose-100/80 leading-relaxed">
                Akses pangkalan data borang rasmi aktiviti & kebajikan pelajar.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-rose-300 group-hover:text-white">
              <span>{isStaffOrAdmin ? 'Buka Google Drive PTSS' : 'Muat Turun Borang Pelajar'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 4: Aktiviti & Kelab */}
          <div
            onClick={() => setActiveTab('komuniti')}
            className="group cursor-pointer bg-gradient-to-b from-[#1C2028] to-[#111317] rounded-3xl p-7 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-slate-300 mb-6 group-hover:bg-white/20 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-200 transition-colors">
                Aktiviti & Kelab
              </h3>
              <p className="text-xs text-slate-300/80 leading-relaxed">
                Daftar kehadiran dan semak jadual aktiviti kelab secara masa nyata.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-slate-400 group-hover:text-white">
              <span>Jadual & Kehadiran</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

        </div>

      </section>

      {/* Section: Mengenali JHEP (Matching Screenshot 3) */}
      <section className="w-full max-w-[1560px] mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5">
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 block mb-3">
              MENGENALI JHEP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17153B] leading-tight tracking-tight">
              Bersama pelajar, di setiap langkah.
            </h2>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 block">
              PENGENALAN
            </span>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Jabatan Hal Ehwal Pelajar bertanggungjawab menjalankan segala urusan yang berkaitan dengan pelajar di Politeknik Tuanku Syed Sirajuddin.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Perkhidmatan jabatan terbahagi kepada dua bahagian utama yang menyokong perjalanan pelajar, daripada pendaftaran hingga kebajikan dan disiplin.
            </p>

            <button
              onClick={scrollToBahagian}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#433D8B] hover:text-rose-600 transition-colors pt-2 group"
            >
              <span>Kenali bahagian kami</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </button>
          </div>

        </div>
      </section>

      {/* Section: Dua Bahagian. Satu Komitmen (Matching Screenshot 4 & 5) */}
      <section id="dua-bahagian-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-28">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 block mb-1">
              FUNGSI & TANGGUNGJAWAB
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17153B]">
              Dua bahagian. Satu komitmen.
            </h2>
          </div>
          <span className="text-xs sm:text-sm text-slate-500 font-medium">
            Menyokong keperluan dan kesejahteraan pelajar.
          </span>
        </div>

        {/* Card 01: Bahagian Pengambilan Pelajar dan Data (Matching Screenshot 4) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-shadow hover:shadow-md">
          
          {/* Left Hero Box (Lavender Accent) */}
          <div className="lg:col-span-5 bg-[#F4F2FB] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-5xl font-black text-[#6B5B95]/40 block mb-4">
                01
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#5E4B8B] block mb-2">
                PENDAFTARAN & REKOD
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] leading-tight mb-4">
                Bahagian Pengambilan Pelajar dan Data
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mengurus urusan pengajian dan memastikan data pelajar sentiasa tersusun.
              </p>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => {
                  if (isStaffOrAdmin) {
                    setActiveTab('crud');
                  } else {
                    setActiveTab('dashboard');
                  }
                }}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5E4B8B] hover:text-rose-600 transition-colors"
              >
                <span>Ke urusan pelajar</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Scope List (Matching Screenshot 4 exactly) */}
          <div className="lg:col-span-7 p-8 sm:p-10">
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 block mb-6">
              SKOP PERKHIDMATAN
            </span>

            <div className="divide-y divide-slate-100">
              {[
                { no: '01', title: 'Pendaftaran Pelajar Baru dan Lapor Diri Pelajar Senior' },
                { no: '02', title: 'Permohonan Kad Pelajar' },
                { no: '03', title: 'Pertukaran Kursus dan Politeknik' },
                { no: '04', title: 'Penangguhan Semester' },
                { no: '05', title: 'Pengesahan Surat Pengajian Pelajar' },
                { no: '06', title: 'Pengesahan Pemberhentian Pengajian Pelajar' },
                { no: '07', title: 'Merekod dan Menyimpan Data Pelajar' }
              ].map((scope) => (
                <div key={scope.no} className="py-3.5 flex items-center gap-4 group">
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-rose-600 transition-colors">
                    {scope.no}
                  </span>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    {scope.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Card 02: Bahagian Kebajikan dan Disiplin (Matching Screenshot 5) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-shadow hover:shadow-md">
          
          {/* Left Hero Box (Rose Accent) */}
          <div className="lg:col-span-5 bg-[#FDF2F4] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-5xl font-black text-[#BE123C]/30 block mb-4">
                02
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#9F1239] block mb-2">
                KEBAJIKAN & SAHSIAH
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] leading-tight mb-4">
                Bahagian Kebajikan dan Disiplin
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Membantu kebajikan, pembangunan sahsiah dan pengurusan disiplin pelajar.
              </p>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => {
                  if (isStaffOrAdmin) {
                    setActiveTab('drive');
                  } else {
                    setLoginModalOpen(true);
                  }
                }}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#9F1239] hover:text-rose-700 transition-colors"
              >
                <span>Rujukan dan borang</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Accordion List (Matching Screenshot 5 exactly) */}
          <div className="lg:col-span-7 p-8 sm:p-10">
            <div className="space-y-4">
              
              {/* Accordion Item 1 */}
              <div className="border-b border-slate-100 pb-4">
                <button
                  onClick={() => setOpenScopeId(openScopeId === 'kebajikan-1' ? '' : 'kebajikan-1')}
                  className="w-full flex items-center justify-between text-left py-2 font-bold text-sm sm:text-base text-slate-900"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">01</span>
                    <span>Menguruskan Bantuan Kewangan</span>
                  </span>
                  <span className="text-slate-400 text-lg font-bold">
                    {openScopeId === 'kebajikan-1' ? '−' : '+'}
                  </span>
                </button>
                {openScopeId === 'kebajikan-1' && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pl-8 font-normal animate-in fade-in duration-150">
                    Kebanyakan pelajar kursus diploma mendapat tajaan daripada Perbadanan Tabung Pendidikan Tinggi Nasional (PTPTN). Sebilangan kecil pelajar mendapat tajaan daripada sumber lain seperti JPA, KUOK Foundation, Yayasan Sime Darby, Yayasan Negeri, MARA dan penaja lain.
                  </p>
                )}
              </div>

              {/* Accordion Item 2 */}
              <div className="border-b border-slate-100 pb-4">
                <button
                  onClick={() => setOpenScopeId(openScopeId === 'kebajikan-2' ? '' : 'kebajikan-2')}
                  className="w-full flex items-center justify-between text-left py-2 font-bold text-sm sm:text-base text-slate-900"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">02</span>
                    <span>Menguruskan Kebajikan Pelajar</span>
                  </span>
                  <span className="text-slate-400 text-lg font-bold">
                    {openScopeId === 'kebajikan-2' ? '−' : '+'}
                  </span>
                </button>
                {openScopeId === 'kebajikan-2' && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pl-8 font-normal animate-in fade-in duration-150">
                    Mengendalikan Skim Takaful Berkelompok Pelajar Politeknik, Tabung Kebajikan Siswa, bantuan kecemasan dan pengurusan kenderaan serta kesihatan pelajar di kolej kediaman.
                  </p>
                )}
              </div>

              {/* Accordion Item 3 */}
              <div className="border-b border-slate-100 pb-4">
                <button
                  onClick={() => setOpenScopeId(openScopeId === 'kebajikan-3' ? '' : 'kebajikan-3')}
                  className="w-full flex items-center justify-between text-left py-2 font-bold text-sm sm:text-base text-slate-900"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">03</span>
                    <span>Pengurusan Disiplin Pelajar</span>
                  </span>
                  <span className="text-slate-400 text-lg font-bold">
                    {openScopeId === 'kebajikan-3' ? '−' : '+'}
                  </span>
                </button>
                {openScopeId === 'kebajikan-3' && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pl-8 font-normal animate-in fade-in duration-150">
                    Memastikan pematuhan Akta Institusi-Institusi Pelajaran (Tatatertib) 1976 (Akta 174), etika pakaian rupa diri, dan bimbingan kaunseling sahsiah berterusan.
                  </p>
                )}
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* FAQ Section (Matching Screenshot 6) */}
      <section className="w-full max-w-[1500px] mx-auto px-4 sm:px-8">
        
        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 block mb-2">
            KAMI SEDIA MEMBANTU
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17153B] tracking-tight">
            Soalan lazim
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-normal">
            Panduan ringkas untuk memulakan urusan anda.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs hover:border-slate-300"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-rose-600 transition-colors"
                >
                  <span className="text-sm sm:text-base font-extrabold">
                    {faq.question}
                  </span>
                  <span className="text-slate-400 text-xl font-bold shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
};
