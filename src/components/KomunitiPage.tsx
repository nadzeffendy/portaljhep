import React, { useState } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Filter,
  Award,
  ChevronRight,
  ExternalLink,
  Download,
  FileText,
  Lock,
  LogIn,
  UserPlus,
  ShieldCheck,
  FolderOpen,
  ArrowRight,
  X,
  QrCode,
  CheckCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STUDENT_DOWNLOAD_DRIVE_FOLDER_URL, OFFICIAL_DRIVE_FOLDER_URL, INITIAL_USERS } from '../data/mockData';
import { DepartmentCode, UserProfile, EventRegistration } from '../types';

export const KomunitiPage: React.FC = () => {
  const {
    currentUser,
    login,
    addStudent,
    addNotification,
    addToast,
    students,
    eventRegistrations,
    addEventRegistration,
    setLoginModalOpen
  } = useApp();

  // Activity registration modal
  const [activeRegisterEvent, setActiveRegisterEvent] = useState<any | null>(null);
  const [regStudentName, setRegStudentName] = useState(currentUser?.role === 'pelajar' ? currentUser.name : '');
  const [regMatricNo, setRegMatricNo] = useState(currentUser?.role === 'pelajar' && currentUser.staffId ? currentUser.staffId : '');
  const [regDept, setRegDept] = useState<DepartmentCode>('JTMK');
  const [regPhone, setRegPhone] = useState('012-3456789');

  // Digital Pass Modal
  const [selectedEventForPass, setSelectedEventForPass] = useState<any | null>(null);

  // Form preview modal
  const [previewDocModal, setPreviewDocModal] = useState<any | null>(null);

  const clubs = [
    {
      id: 'club-1',
      name: 'Kelab Inovasi & Robotik PTSS',
      department: 'JTMK & JKE',
      members: 142,
      category: 'Teknologi & Inovasi',
      lead: 'Ahmad Danial (18DDT24F1001)',
      desc: 'Membangunkan projek IoT, pengaturcaraan robotik dan mewakili politeknik dalam pertandingan kebangsaan.'
    },
    {
      id: 'club-2',
      name: 'Kor Sukarelawan Siswa Siswi (SUKSIS)',
      department: 'JHEP Umum',
      members: 98,
      category: 'Kepimpinan & Beruniform',
      lead: 'Nur Aina (18DDT24F1002)',
      desc: 'Latihan kepimpinan, disiplin pertahanan diri dan khidmat komuniti masyarakat setempat.'
    },
    {
      id: 'club-3',
      name: 'Kelab Seni Reka & Media Kreatif',
      department: 'JRKV',
      members: 115,
      category: 'Kesenian & Media',
      lead: 'Khairul Anuar (18DRG24F1011)',
      desc: 'Bengkel videografi, animasi kreatif, rekaan identiti visual jenama dan fotografi kampus.'
    },
    {
      id: 'club-4',
      name: 'Kelab Usahawan Muda Siswa (KUM)',
      department: 'JP',
      members: 130,
      category: 'Keusahawanan',
      lead: 'Nor Syakila (18DAT23F1034)',
      desc: 'Pendedahan perniagaan e-dagang, karnival bazar siswa dan latihan pitching pembiayaan modal.'
    }
  ];

  // REQUIREMENT 2: Pusat muat turun Google Drive rasmi bagi pelajar
  const clubForms = [
    {
      id: 'form-01',
      code: 'PTSS/JHEP/KOKO-01',
      title: 'Borang Penubuhan & Pembaharuan Kelab/Persatuan',
      description: 'Digunakan oleh persatuan siswa untuk pendaftaran sesi akademik baharu serta penyerahan senarai majlis jawatankuasa (AJK).',
      type: 'Borang Rasmi (DOCX & PDF)',
      size: '240 KB',
      driveUrl: STUDENT_DOWNLOAD_DRIVE_FOLDER_URL
    },
    {
      id: 'form-02',
      code: 'PTSS/JHEP/AKT-02',
      title: 'Kertas Kerja Rasmi Penganjuran Program & Aktiviti',
      description: 'Templat standard cadangan perancangan aktiviti, bajet kewangan, objektif pembelajaran dan jadual tentatif program.',
      type: 'Templat Format JHEP',
      size: '520 KB',
      driveUrl: STUDENT_DOWNLOAD_DRIVE_FOLDER_URL
    },
    {
      id: 'form-03',
      code: 'PTSS/JHEP/KEW-03',
      title: 'Borang Permohonan Peruntukan Tabung Aktiviti Pelajar',
      description: 'Borang tuntutan pembiayaan modal pelaksanaan projek kelab yang telah mendapat kelulusan Pegawai Hal Ehwal Pelajar.',
      type: 'Kewangan & Belanjawan',
      size: '310 KB',
      driveUrl: STUDENT_DOWNLOAD_DRIVE_FOLDER_URL
    },
    {
      id: 'form-04',
      code: 'PTSS/JHEP/LP-04',
      title: 'Format Laporan Post-Mortem & Penyata Resit Program',
      description: 'Format serahan laporan akhir selepas program selesai beserta bukti gambar aktiviti dan penyata perbelanjaan sebenar.',
      type: 'Laporan Pasca Program',
      size: '415 KB',
      driveUrl: STUDENT_DOWNLOAD_DRIVE_FOLDER_URL
    },
    {
      id: 'form-05',
      code: 'PTSS/JHEP/LEPAS-05',
      title: 'Borang Kebenaran Pelepasan Kuliah Peserta Aktiviti',
      description: 'Borang rasmi untuk kelulusan ketua jabatan bagi membolehkan wakil kelab menyertai pertandingan di luar kampus.',
      type: 'Pelepasan Akademik',
      size: '180 KB',
      driveUrl: STUDENT_DOWNLOAD_DRIVE_FOLDER_URL
    }
  ];

  const events = [
    {
      id: 'evt-1',
      title: 'Karnival Sahsiah & Kerjaya Siswa PTSS 2026',
      date: '15 November 2026',
      time: '08:30 AM - 05:00 PM',
      venue: 'Dewan Harumanis & Dataran Pavilion',
      merit: '+25 Mata Merit',
      badge: 'Utama',
      points: 25
    },
    {
      id: 'evt-2',
      title: 'Bengkel Persediaan Temuduga & Penulisan Resume Profesional',
      date: '22 November 2026',
      time: '09:00 AM - 01:00 PM',
      venue: 'Auditorium JHEP Aras 2',
      merit: '+15 Mata Merit',
      badge: 'Akademik',
      points: 15
    },
    {
      id: 'evt-3',
      title: 'Kejohanan E-Sukan Politeknik Malaysia Zon Utara',
      date: '05 Disember 2026',
      time: '10:00 AM - 06:00 PM',
      venue: 'Pusat Siber JTMK',
      merit: '+20 Mata Merit',
      badge: 'Sukan',
      points: 20
    }
  ];

  // Open registration modal for an event
  const handleOpenRegisterEvent = (evt: typeof events[0]) => {
    // Check if current student has already registered
    const matricToCheck = (currentUser?.role === 'pelajar' ? currentUser.staffId : regMatricNo) || '';
    const existing = eventRegistrations.find(r => r.eventId === evt.id && r.matricNo.toUpperCase() === matricToCheck.toUpperCase());

    if (existing) {
      setSelectedEventForPass({
        ...evt,
        studentName: existing.studentName,
        matricNo: existing.matricNo,
        qrCodeValue: existing.qrCodeValue
      });
      addToast('info', 'Sudah Berdaftar', `Pas digital bagi ${existing.studentName} dipaparkan.`);
      return;
    }

    // Pre-populate if student is logged in
    if (currentUser?.role === 'pelajar') {
      setRegStudentName(currentUser.name);
      setRegMatricNo(currentUser.staffId || '18DDT24F1001');
    } else if (!regStudentName) {
      setRegStudentName('Muhammad Danish bin Akmal');
      setRegMatricNo('18DDT24F1001');
    }

    setActiveRegisterEvent(evt);
  };

  // Submit activity registration (Requirement 3: Pelajar masukkan nama dan nombor matrik)
  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regStudentName.trim() || !regMatricNo.trim() || !activeRegisterEvent) {
      addToast('warning', 'Maklumat Tidak Lengkap', 'Sila masukkan nama penuh dan nombor matrik pelajar.');
      return;
    }

    // Add to eventRegistrations database
    const newReg = addEventRegistration({
      eventId: activeRegisterEvent.id,
      eventTitle: activeRegisterEvent.title,
      eventDate: activeRegisterEvent.date,
      studentName: regStudentName.trim(),
      matricNo: regMatricNo.trim().toUpperCase(),
      department: regDept,
      phone: regPhone,
      meritPoints: activeRegisterEvent.points,
      status: 'Disahkan',
      qrCodeValue: `PTSS-EVT-${activeRegisterEvent.id.toUpperCase()}-${regMatricNo.trim().toUpperCase()}`
    });

    // Close registration modal & open digital pass with student's real entered info
    setActiveRegisterEvent(null);
    setSelectedEventForPass({
      ...activeRegisterEvent,
      studentName: regStudentName.trim(),
      matricNo: regMatricNo.trim().toUpperCase(),
      department: regDept,
      qrCodeValue: newReg.qrCodeValue
    });

    addToast('success', 'Pendaftaran Berjaya!', `Pas Kehadiran Digital telah dijana untuk ${regStudentName.trim()}.`);
  };

  const handleQuickSelectStudent = (st: typeof students[0]) => {
    setRegStudentName(st.name);
    setRegMatricNo(st.matricNo);
    setRegDept(st.department);
    setRegPhone(st.phone);
  };

  return (
    <div className="w-full space-y-10 pb-20 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#2E236C] via-[#3B2C85] to-[#433D8B] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-rose-500/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              Komuniti & Sahsiah Kampus PTSS
            </span>
            {currentUser && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold inline-flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Log Masuk Sebagai: {currentUser.name} ({currentUser.role.toUpperCase()})
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Kenali Warga. Temui Komuniti.
          </h1>
          <p className="text-sm sm:text-base text-indigo-100 mt-3 leading-relaxed">
            Sertai pelbagai kelab dan persatuan untuk memperkayakan pengalaman kehidupan kampus anda di Politeknik Tuanku Syed Sirajuddin. Kumpul mata merit sahsiah dengan menyertai aktiviti berfaedah!
          </p>

          {!currentUser ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setLoginModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Log Masuk Admin & Staf (2FA)</span>
              </button>
            </div>
          ) : (
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs text-xs font-semibold text-rose-200">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Log masuk sebagai: <strong>{currentUser.name}</strong> ({currentUser.role.toUpperCase()})</span>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events Section with Student Authentication Gate */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Aktiviti & Program Terdekat</h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                Wajib Daftar / Log Masuk
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar kehadiran untuk mengumpul mata merit kolej kediaman. Pengesahan identiti siswa diperlukan bagi tujuan keselamatan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt) => {
            return (
              <div
                key={evt.id}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {evt.badge}
                    </span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      {evt.merit}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">{evt.title}</h3>

                  <div className="mt-4 space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="font-medium">{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="font-medium">{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="font-medium">{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  {(() => {
                    const studentMatric = (currentUser?.role === 'pelajar' ? currentUser.staffId : regMatricNo) || '';
                    const regMatch = eventRegistrations.find(r => r.eventId === evt.id && studentMatric && r.matricNo.toUpperCase() === studentMatric.toUpperCase());

                    return (
                      <button
                        onClick={() => handleOpenRegisterEvent(evt)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                          regMatch
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                            : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
                        }`}
                      >
                        {regMatch ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                            <span>Telah Berdaftar (Lihat Pas Digital)</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4" />
                            <span>Daftar Kehadiran Siswa ({evt.merit})</span>
                          </>
                        )}
                      </button>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Directory of Clubs */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Kelab & Persatuan Berdaftar PTSS</h2>
          <p className="text-xs text-slate-500 mt-0.5">Direktori aktiviti kokurikulum, inovasi, kesenian dan kepimpinan siswa/siswi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clubs.map((c) => (
            <div
              key={c.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-100">
                    {c.category}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {c.members} Ahli Aktif
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900">{c.name}</h3>
                <p className="text-xs text-indigo-700 font-bold mt-1">Jabatan Gabungan: {c.department}</p>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{c.desc}</p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap justify-between items-center text-xs gap-2">
                <span className="text-slate-500 font-medium">Pengerusi: {c.lead}</span>
                <span className="text-rose-600 font-bold hover:text-rose-700 flex items-center gap-1 cursor-pointer">
                  Hubungi Exco Kelab <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REQUIREMENT 2: Pusat Muat Turun Borang Aktiviti & Kelab Siswa (Google Drive Link rasmi pelajar) */}
      <div className="bg-gradient-to-br from-indigo-50/70 via-white to-rose-50/50 rounded-3xl border border-indigo-100/80 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Header with Exact User Google Drive link */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Pusat Muat Turun Borang Aktiviti & Kelab (Google Drive)
                </h3>
                <span className="hidden sm:inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Akses Terbuka Pelajar
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Pelajar dan majlis pimpinan kelab boleh memuat turun borang rasmi, templat kertas kerja serta panduan aktiviti terus daripada repositori storan Google Drive rasmi pelajar PTSS.
              </p>
            </div>
          </div>

          <a
            href={STUDENT_DOWNLOAD_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all shrink-0 cursor-pointer"
          >
            <FolderOpen className="w-4 h-4" />
            <span>Buka Semua Borang di Google Drive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Form Download Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clubForms.map((form) => (
            <div
              key={form.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {form.code}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {form.size}
                  </span>
                </div>

                <div className="flex items-start gap-2.5 mt-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs leading-snug group-hover:text-rose-600 transition-colors">
                      {form.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {form.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewDocModal(form)}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Pratonton Info
                </button>
                <a
                  href={STUDENT_DOWNLOAD_DRIVE_FOLDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Muat Turun (Drive)</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Guidance Notice */}
        <div className="bg-white/80 p-4 rounded-2xl border border-indigo-100 flex items-start gap-3 text-xs text-slate-600">
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            <strong>Peringatan Penting Penyerahan Kertas Kerja:</strong> Sila pastikan setiap cadangan aktiviti dihantar sekurang-kurangnya <strong>14 hari sebelum tarikh program</strong> ke Bahagian Pengurusan Pelajar & Sahsiah JHEP Aras 2, PTSS untuk kelulusan Pegawai Hal Ehwal Pelajar.
          </p>
        </div>

      </div>

      {/* REQUIREMENT 3: MODAL PENDAFTARAN AKTIVITI (Pelajar Masukkan Nama & No. Matrik) */}
      {activeRegisterEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2E236C] via-[#3B2C85] to-[#433D8B] p-6 text-white relative">
              <button
                onClick={() => setActiveRegisterEvent(null)}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-rose-300 text-[10px] font-extrabold uppercase tracking-wider inline-block mb-1">
                Pendaftaran Kehadiran Aktiviti
              </span>
              <h3 className="font-extrabold text-base text-white leading-snug">{activeRegisterEvent.title}</h3>
              <div className="mt-2 flex items-center gap-2 text-xs text-indigo-200">
                <span>{activeRegisterEvent.date}</span>
                <span>•</span>
                <span className="font-bold text-emerald-300">{activeRegisterEvent.merit}</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmitRegistration} className="p-6 space-y-4">
              
              {/* Quick Select Student */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Pilih Profil Pelajar Contoh (1-Klik Isi Cepat):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {students.slice(0, 4).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleQuickSelectStudent(s)}
                      className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        regMatricNo.toUpperCase() === s.matricNo.toUpperCase()
                          ? 'border-rose-500 bg-rose-50 text-rose-900 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <p className="font-bold truncate">{s.name.split(' ')[0]}</p>
                      <p className="text-[10px] text-slate-500">{s.matricNo} ({s.department})</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Penuh Pelajar *
                </label>
                <input
                  type="text"
                  required
                  value={regStudentName}
                  onChange={(e) => setRegStudentName(e.target.value)}
                  placeholder="Contoh: Muhammad Danial bin Azhar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombor Matrik Pelajar *
                  </label>
                  <input
                    type="text"
                    required
                    value={regMatricNo}
                    onChange={(e) => setRegMatricNo(e.target.value.toUpperCase())}
                    placeholder="18DDT24F1001"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase focus:ring-2 focus:ring-rose-500 focus:outline-hidden font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jabatan Akademik
                  </label>
                  <select
                    value={regDept}
                    onChange={(e) => setRegDept(e.target.value as DepartmentCode)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-hidden font-semibold"
                  >
                    <option value="JTMK">JTMK</option>
                    <option value="JKE">JKE</option>
                    <option value="JKM">JKM</option>
                    <option value="JP">JP</option>
                    <option value="JRKV">JRKV</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombor Telefon (WhatsApp)
                </label>
                <input
                  type="text"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="012-3456789"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                />
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-start gap-2">
                <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Sebanyak <strong>{activeRegisterEvent.merit}</strong> akan direkodkan dan dikreditkan ke akaun sahsiah anda selepas imbasan QR kod di lokasi program.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold rounded-xl shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer text-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sahkan Pendaftaran & Jana Pas Digital</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* REQUIREMENT 3: DIGITAL ATTENDANCE PASS MODAL (Matches user screenshot image_686e00a8.png with entered Student info) */}
      {selectedEventForPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
            
            {/* Header: Exact green gradient like user screenshot */}
            <div className="bg-gradient-to-r from-[#00897B] to-[#00796B] p-6 text-white relative">
              <button
                onClick={() => setSelectedEventForPass(null)}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="inline-block px-2.5 py-1 rounded-md bg-white/20 text-white text-[10px] font-black uppercase tracking-wider mb-2">
                PAS DIGITAL SAHSIAH SISWA
              </div>
              <h3 className="text-lg font-black text-white leading-tight">{selectedEventForPass.title}</h3>
              <p className="text-xs text-emerald-100 mt-1">Status: Disahkan Hadir & Berdaftar</p>
            </div>

            <div className="p-6 space-y-4">
              
              {/* QR Code Container */}
              <div className="flex flex-col items-center justify-center p-5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                <div className="w-36 h-36 bg-white p-2.5 rounded-2xl shadow-xs border border-slate-200 flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-slate-900" />
                </div>
                <span className="mt-3 text-[10px] font-mono text-slate-400">
                  {selectedEventForPass.qrCodeValue || `PTSS-EVT-${selectedEventForPass.id.toUpperCase()}-${selectedEventForPass.matricNo || 'SISWA'}`}
                </span>
                <span className="text-xs font-extrabold text-emerald-700 mt-1">
                  Imbas QR Code di Kaunter Pendaftaran
                </span>
              </div>

              {/* Student Details Card */}
              <div className="space-y-2.5 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Nama Pelajar:</span>
                  <span className="font-extrabold text-slate-900">{selectedEventForPass.studentName || 'Muhammad Danish bin Akmal'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">No. Matrik:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedEventForPass.matricNo || '18DDT24F1001'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Mata Merit Sahsiah:</span>
                  <span className="font-black text-emerald-600">{selectedEventForPass.merit || '+25 Mata Merit'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Tarikh & Masa:</span>
                  <span className="font-medium text-slate-800">{selectedEventForPass.date} ({selectedEventForPass.time})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Lokasi:</span>
                  <span className="font-medium text-slate-800">{selectedEventForPass.venue}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEventForPass(null)}
                className="w-full py-3 bg-[#111827] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
              >
                Tutup Paparan Pas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {previewDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
            <div className="bg-[#2E236C] p-6 text-white relative">
              <button
                onClick={() => setPreviewDocModal(null)}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-white/20 text-rose-300">
                {previewDocModal.code}
              </span>
              <h3 className="text-base font-bold text-white mt-1.5 leading-snug">{previewDocModal.title}</h3>
              <p className="text-xs text-indigo-200 mt-0.5">{previewDocModal.type}</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="font-semibold text-slate-800 mb-1">Penerangan Dokumen:</p>
                <p>{previewDocModal.description}</p>
                <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between text-slate-500">
                  <span>Saiz fail: {previewDocModal.size}</span>
                  <span>Folder: Google Drive Pelajar PTSS</span>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={STUDENT_DOWNLOAD_DRIVE_FOLDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Buka di Google Drive Pelajar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewDocModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

