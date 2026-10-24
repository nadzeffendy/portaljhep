import React, { useState } from 'react';
import {
  FolderLock,
  ExternalLink,
  ShieldAlert,
  Database,
  CloudCheck,
  Download,
  Upload,
  RefreshCw,
  FileText,
  FileCheck2,
  Lock,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Plus,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_DRIVE_FOLDER_URL, OFFICIAL_DRIVE_FOLDER_ID } from '../data/mockData';
import { DriveFileItem } from '../types';

export const GoogleDriveStorage: React.FC = () => {
  const {
    currentUser,
    driveFiles,
    backupLogs,
    triggerDriveBackup,
    addDriveFile,
    deleteDriveFile,
    setLoginModalOpen,
    addToast
  } = useApp();

  const [isBackingUp, setIsBackingUp] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newCategory, setNewCategory] = useState<DriveFileItem['category']>('Borang Rasmi');
  const [newSize, setNewSize] = useState('1.2 MB');

  // Strict Access Control Guard
  const isAuthorized = currentUser && (currentUser.role === 'admin' || currentUser.role === 'staff');

  if (!isAuthorized) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl border border-rose-100 shadow-xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-rose-50 border border-rose-200 rounded-3xl flex items-center justify-center text-rose-600 mx-auto mb-6 shadow-inner">
            <Lock className="w-10 h-10" />
          </div>

          <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-bold uppercase tracking-wider">
            Kawalan Keselamatan Ketat (RBAC + 2FA)
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">
            Akses Google Drive Dihadkan
          </h2>
          
          <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
            Folder rasmi storan dan sandaran fail jabatan{' '}
            <strong className="text-slate-900 font-mono text-xs block mt-1 p-2 bg-slate-50 border rounded-lg break-all">
              {OFFICIAL_DRIVE_FOLDER_URL}
            </strong>{' '}
            hanya dibenarkan untuk kegunaan <strong>Pentadbir dan Staf JHEP yang disahkan</strong> dengan Pengesahan Dua Faktor (2FA).
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setLoginModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#E11D48] to-[#E60049] hover:from-[#BE123C] hover:to-[#D90429] text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <KeyRound className="w-4 h-4" />
              <span>Log Masuk Staf / Admin (2FA)</span>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-400">
            Sebarang cubaan capaian tanpa kebenaran direkodkan dalam log audit sistem JHEP Digital PTSS.
          </div>
        </div>
      </div>
    );
  }

  const handleRunBackup = async () => {
    setIsBackingUp(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const log = await triggerDriveBackup();
      addToast('success', 'Sandaran Disegerakkan', `Fail ${log.fileName} berjaya disegerakkan ke Google Drive.`);
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName) return;
    addDriveFile({
      name: newFileName.endsWith('.pdf') || newFileName.endsWith('.docx') ? newFileName : newFileName + '.pdf',
      category: newCategory,
      fileSize: newSize,
      mimeType: 'application/pdf',
      driveUrl: OFFICIAL_DRIVE_FOLDER_URL,
      uploadedBy: currentUser.name
    });
    setUploadModalOpen(false);
    setNewFileName('');
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-300">
      
      {/* Top Banner with Strict Security Badge & Direct Drive Link */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Pengesahan 2FA Aktif: {currentUser.name} ({currentUser.role.toUpperCase()})</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[11px] font-mono">
                Folder ID: {OFFICIAL_DRIVE_FOLDER_ID}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Repositori Storan & Sandaran Google Drive PTSS
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Penyimpanan fail terpusat, pengarkiban dokumen rasmi jabatan dan enjin sandaran automatik pangkalan data pelajar yang mematuhi protokol keselamatan ICT PTSS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Primary Google Drive Link */}
            <a
              href={OFFICIAL_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>Buka Folder Google Drive PTSS</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Run Auto Backup */}
            <button
              onClick={handleRunBackup}
              disabled={isBackingUp}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isBackingUp ? 'animate-spin' : ''}`} />
              <span>{isBackingUp ? 'Menyegerakkan...' : 'Mulakan Sandaran Data'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CloudCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Status Segerak Drive</span>
            <p className="text-base font-extrabold text-slate-900 mt-0.5">Disegerakkan (Aktif)</p>
            <span className="text-[10px] text-emerald-600 font-bold">Semua data terkini disahkan</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Dokumen & Fail Rasmi</span>
            <p className="text-base font-extrabold text-slate-900 mt-0.5">{driveFiles.length} Fail Berdaftar</p>
            <span className="text-[10px] text-blue-600 font-bold">Termasuk borang & pekeliling</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Log Sandaran Lengkap</span>
            <p className="text-base font-extrabold text-slate-900 mt-0.5">{backupLogs.length} Titik Pemulihan</p>
            <span className="text-[10px] text-purple-600 font-bold">Dilindungi checksum SHA-256</span>
          </div>
        </div>
      </div>

      {/* Drive Files Directory Table */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <FolderLock className="w-5 h-5 text-emerald-600" />
              <span>Direktori Fail & Borang Rasmi JHEP (Google Drive)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Fail yang dihoskan di bawah repositori Google Drive rasmi PTSS untuk akses pentadbir & staf.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Daftar Dokumen Baharu</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Nama Dokumen / Fail</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Saiz Fail</th>
                <th className="py-3 px-4">Tarikh Muat Naik</th>
                <th className="py-3 px-4">Status Awan</th>
                <th className="py-3 px-4 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {driveFiles.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{file.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 pl-6 block">
                      Dimuat naik oleh: {file.uploadedBy}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {file.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {file.fileSize}
                  </td>

                  <td className="py-3.5 px-4 text-slate-500">
                    {file.lastModified}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Google Drive Terpaut
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href={OFFICIAL_DRIVE_FOLDER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        title="Buka dalam Google Drive"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => deleteDriveFile(file.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        title="Padam dari senarai"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log of System Backups */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            Log Sejarah Sandaran Pangkalan Data ke Google Drive
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Setiap sandaran mengandungi snapshot data lengkap pelajar, permohonan, dan analisis prestasi.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                <th className="py-2.5 px-4">Tarikh & Masa</th>
                <th className="py-2.5 px-4">Nama Fail Arkib</th>
                <th className="py-2.5 px-4">Jumlah Rekod</th>
                <th className="py-2.5 px-4">Status Sandaran</th>
                <th className="py-2.5 px-4">Pegawai / Pencetus</th>
                <th className="py-2.5 px-4">Integriti SHA-256</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {backupLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono text-slate-600">{log.timestamp}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{log.fileName}</td>
                  <td className="py-3 px-4 font-bold text-indigo-700">{log.recordsCount} rekod</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{log.initiatedBy}</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">{log.checksum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Metadata Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-bold text-base text-slate-900">Daftar Dokumen Google Drive</h3>
              <button onClick={() => setUploadModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddFile} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Dokumen</label>
                <input
                  required
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
                  placeholder="Contoh: Borang Rayuan Semakan Semula 2026.pdf"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Kategori Dokumen</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-semibold"
                >
                  <option value="Borang Rasmi">Borang Rasmi</option>
                  <option value="Pekeliling">Pekeliling</option>
                  <option value="Panduan Pelajar">Panduan Pelajar</option>
                  <option value="Laporan">Laporan</option>
                  <option value="Sandaran Pangkalan Data">Sandaran Pangkalan Data</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Anggaran Saiz</label>
                <input
                  type="text"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-mono"
                  placeholder="1.5 MB"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Fail akan didaftarkan ke folder Google Drive PTSS ID: {OFFICIAL_DRIVE_FOLDER_ID}.
              </p>
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow"
              >
                Simpan Dokumen ke Google Drive
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
