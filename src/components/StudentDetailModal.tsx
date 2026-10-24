import React from 'react';
import {
  X,
  User,
  GraduationCap,
  Award,
  Phone,
  Mail,
  Home,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudentDetailModal: React.FC = () => {
  const { selectedStudentForDetail, setSelectedStudentForDetail } = useApp();

  if (!selectedStudentForDetail) return null;
  const st = selectedStudentForDetail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Banner */}
        <div className="p-6 bg-gradient-to-r from-[#2E236C] to-[#433D8B] text-white flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white font-extrabold text-lg border border-white/20">
              {st.name.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500 text-white">
                {st.department}
              </span>
              <h3 className="font-extrabold text-lg text-white mt-1">{st.name}</h3>
              <p className="text-xs text-indigo-200 font-mono">{st.matricNo} • {st.icNo}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedStudentForDetail(null)}
            className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold">PROGRAM PENGAJIAN</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block">{st.program}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold">SEMESTER & TAHUN ENROL</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block">Semester {st.semester} (Sesi {st.enrollmentYear})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold">PURATA HPNM (CGPA)</span>
              <span className="font-extrabold text-emerald-600 text-sm mt-0.5 block">{st.cgpa.toFixed(2)} / 4.00</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold">MATA MERIT SAHSIAH</span>
              <span className="font-extrabold text-indigo-600 text-sm mt-0.5 block">{st.meritPoints} Mata (Aktif)</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Maklumat Peribadi & Asrama:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Home className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Status: <strong>{st.hostelStatus}</strong></span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <DollarSign className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Tajaan: <strong>{st.sponsorshipStatus}</strong></span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Telefon: <strong>{st.phone}</strong></span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">Emel: <strong>{st.email}</strong></span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Rekod tatatertib disahkan bersih mengikut Peraturan Tatatertib Politeknik Tuanku Syed Sirajuddin.</span>
          </div>

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={() => setSelectedStudentForDetail(null)}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
