import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  X,
  CheckCircle2,
  Calendar,
  Building,
  User,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generatePdfReport, downloadOfficialPdf } from '../utils/pdfGenerator';
import { DepartmentCode } from '../types';

export const ReportModal: React.FC = () => {
  const {
    reportModalOpen,
    setReportModalOpen,
    students,
    academicTrends,
    currentUser,
    addNotification,
    addToast
  } = useApp();

  const [deptFilter, setDeptFilter] = useState<'Semua Jabatan' | DepartmentCode>('Semua Jabatan');
  const [reportType, setReportType] = useState('Laporan Rasmi Prestasi & Demografi Pelajar JHEP');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!reportModalOpen) return null;

  const filteredStudents = deptFilter === 'Semua Jabatan'
    ? students
    : students.filter(s => s.department === deptFilter);

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedBy = currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : 'Pegawai Penyelaras JHEP PTSS';
      downloadOfficialPdf({
        students: filteredStudents,
        trends: academicTrends,
        generatedBy,
        departmentFilter: deptFilter,
        reportType
      });
      setIsGenerating(false);
      addNotification(
        'Laporan PDF Berjaya Dijana',
        `Fail PDF "${reportType}" telah dimuat turun untuk kegunaan pengurusan pentadbiran.`,
        'Sistem'
      );
      addToast('success', 'Laporan PDF Siap', 'Laporan pengurusan telah berjaya dimuat turun ke peranti anda.');
    }, 400);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-[#2E236C] via-[#382B7D] to-[#433D8B] text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-rose-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">
                Penjana Laporan PDF Pengurusan JHEP
              </h3>
              <p className="text-xs text-indigo-200">
                Politeknik Tuanku Syed Sirajuddin • Eksport Automatik Eksekutif
              </p>
            </div>
          </div>
          <button
            onClick={() => setReportModalOpen(false)}
            className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Options Controls */}
        <div className="p-6 bg-slate-50 border-b border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Pilih Jenis Laporan Pengurusan:
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            >
              <option value="Laporan Rasmi Prestasi & Demografi Pelajar JHEP">
                Laporan Prestasi & Demografi Pelajar Penuh
              </option>
              <option value="Laporan Tahunan Penempatan Kolej Kediaman & Bantuan">
                Laporan Kolej Kediaman & Penajaan Kewangan
              </option>
              <option value="Laporan Analisis Sahsiah, Merit & Tatatertib Siswa">
                Laporan Sahsiah, Merit & Tatatertib Siswa
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tapisan Skop Jabatan:
            </label>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value as any)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            >
              <option value="Semua Jabatan">Semua Jabatan PTSS (Menyeluruh)</option>
              <option value="JTMK">JTMK - Jabatan Teknologi Maklumat & Komunikasi</option>
              <option value="JKE">JKE - Jabatan Kejuruteraan Elektrik</option>
              <option value="JKM">JKM - Jabatan Kejuruteraan Mekanikal</option>
              <option value="JP">JP - Jabatan Perdagangan</option>
              <option value="JRKV">JRKV - Jabatan Rekabentuk & Komunikasi Visual</option>
            </select>
          </div>
        </div>

        {/* Live Preview Paper Document Box */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100/60">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-200 text-slate-800 max-w-2xl mx-auto text-xs space-y-5">
            
            {/* Document Header in Preview */}
            <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-start">
              <div>
                <p className="font-extrabold text-sm text-[#2E236C] tracking-wide">
                  POLITEKNIK TUANKU SYED SIRAJUDDIN
                </p>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">
                  JABATAN HAL EHWAL PELAJAR (JHEP) | PAUH PUTRA, PERLIS
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded">
                DOKUMEN RASMI PENGURUSAN
              </span>
            </div>

            {/* Title & Metadata */}
            <div>
              <h2 className="text-base font-extrabold text-slate-900">{reportType}</h2>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 mt-2">
                <div>Tarikh Cetakan: <strong>{new Date().toLocaleDateString('ms-MY')}</strong></div>
                <div>Skop Data: <strong>{deptFilter}</strong></div>
                <div>Status: <strong>SULIT / TADBIR URUS</strong></div>
                <div>Disediakan: <strong>{currentUser?.name || 'Pegawai JHEP'}</strong></div>
              </div>
            </div>

            {/* Quick Metrics in Preview */}
            <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">JUMLAH</span>
                <span className="text-sm font-extrabold text-slate-900">{filteredStudents.length}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">LELAKI</span>
                <span className="text-sm font-extrabold text-blue-600">
                  {filteredStudents.filter(s => s.gender === 'Lelaki').length}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">PEREMPUAN</span>
                <span className="text-sm font-extrabold text-pink-600">
                  {filteredStudents.filter(s => s.gender === 'Perempuan').length}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">PURATA HPNM</span>
                <span className="text-sm font-extrabold text-emerald-600">
                  {(filteredStudents.reduce((a, b) => a + b.cgpa, 0) / (filteredStudents.length || 1)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Sample Table */}
            <div>
              <p className="font-bold text-slate-700 mb-2 text-[11px]">Ringkasan Sampel Pelajar:</p>
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b bg-slate-50 text-slate-500">
                    <th className="p-1.5">No Matrik</th>
                    <th className="p-1.5">Nama</th>
                    <th className="p-1.5">Jabatan</th>
                    <th className="p-1.5 text-center">HPNM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.slice(0, 4).map((st) => (
                    <tr key={st.id}>
                      <td className="p-1.5 font-mono">{st.matricNo}</td>
                      <td className="p-1.5 font-medium truncate max-w-[140px]">{st.name}</td>
                      <td className="p-1.5">{st.department}</td>
                      <td className="p-1.5 text-center font-bold text-emerald-700">{st.cgpa.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t text-[10px] text-slate-400 flex justify-between items-center">
              <span>Dijana oleh Enjin PDF JHEP Digital PTSS</span>
              <span>Disahkan: Pengesahan 2FA TLS-256</span>
            </div>

          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Format PDF A4 standard institusi sedia untuk muat turun segera.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Terus</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 flex-1 sm:flex-initial active:scale-95 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'Menjana PDF...' : 'Muat Turun Fail PDF'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
