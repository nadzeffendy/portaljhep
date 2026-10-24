import React, { useState, useRef } from 'react';
import {
  Users,
  Network,
  Phone,
  Mail,
  Search,
  Plus,
  Edit2,
  Trash2,
  Upload,
  CheckCircle2,
  Image as ImageIcon,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  X,
  ExternalLink,
  Layers,
  Copy,
  FileImage,
  RefreshCw,
  Eye,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StaffMember } from '../types';

export const CartaOrganisasiKakitangan: React.FC = () => {
  const {
    staffList,
    addStaff,
    updateStaff,
    deleteStaff,
    orgChartConfig,
    updateOrgChartConfig,
    currentUser,
    addToast
  } = useApp();

  // Strict check: Only Admin & Staff see admin controls
  const isStaffOrAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'staff');

  const [searchTerm, setSearchTerm] = useState('');
  
  // Staff Modal
  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [formName, setFormName] = useState('');
  const [formPosition, setFormPosition] = useState('');
  const [formExtension, setFormExtension] = useState('');
  const [formEmailPrefix, setFormEmailPrefix] = useState('');
  const [formScope, setFormScope] = useState('Bahagian Pengambilan Pelajar dan Data');

  // Org Chart Upload Modal (Admin only)
  const [orgChartModalOpen, setOrgChartModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(orgChartConfig.imageUrl || '');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [selectedFileSize, setSelectedFileSize] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>(orgChartConfig.imageUrl || '');
  const [selectedMode, setSelectedMode] = useState<'placeholder' | 'image' | 'interactive'>(orgChartConfig.viewMode || 'placeholder');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lightbox view for uploaded image
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        addToast('error', 'Format Tidak Sah', 'Sila muat naik fail imej sahaja (PNG, JPG, WEBP).');
        return;
      }
      setSelectedFileName(file.name);
      setSelectedFileSize(`${(file.size / 1024).toFixed(1)} KB`);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setPreviewImage(base64);
        setUrlInput('');
        setSelectedMode('image');
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddStaff = () => {
    setEditingStaff(null);
    setFormName('');
    setFormPosition('Pegawai JHEP');
    setFormExtension('6207');
    setFormEmailPrefix('');
    setFormScope('Bahagian Pengambilan Pelajar dan Data');
    setStaffModalOpen(true);
  };

  const openEditStaff = (staff: StaffMember) => {
    setEditingStaff(staff);
    setFormName(staff.name);
    setFormPosition(staff.position);
    setFormExtension(staff.extension);
    setFormEmailPrefix(staff.emailPrefix);
    setFormScope(staff.departmentScope || 'Bahagian Pengambilan Pelajar dan Data');
    setStaffModalOpen(true);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPosition || !formExtension || !formEmailPrefix) return;

    if (editingStaff) {
      updateStaff(editingStaff.id, {
        name: formName,
        position: formPosition,
        extension: formExtension,
        emailPrefix: formEmailPrefix.replace('@ptss.edu.my', '').trim(),
        departmentScope: formScope
      });
      addToast('success', 'Kakitangan Dikemaskini', `Maklumat ${formName} telah disimpan.`);
    } else {
      addStaff({
        name: formName,
        position: formPosition,
        extension: formExtension,
        emailPrefix: formEmailPrefix.replace('@ptss.edu.my', '').trim(),
        departmentScope: formScope
      });
      addToast('success', 'Kakitangan Baharu', `${formName} berjaya ditambah.`);
    }
    setStaffModalOpen(false);
  };

  const handleSaveOrgChart = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = previewImage || urlInput;
    const finalMode = finalImage ? 'image' : selectedMode;

    updateOrgChartConfig({
      imageUrl: finalImage,
      viewMode: finalMode
    });
    setOrgChartModalOpen(false);
    addToast('success', 'Carta Organisasi Disimpan', 'Tetapan carta organisasi telah dikemaskini oleh pentadbir.');
  };

  const handleCopyEmail = (emailPrefix: string) => {
    const fullEmail = `${emailPrefix}@ptss.edu.my`;
    navigator.clipboard.writeText(fullEmail);
    addToast('info', 'Emel Disalin', `${fullEmail} telah disalin ke papan klip.`);
  };

  // Filtered staff
  const filteredStaff = staffList.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.extension.includes(searchTerm) ||
    s.emailPrefix.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-300">
      
      {/* CARD 1: CARTA ORGANISASI (Exact Match to User Screenshot) */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header: Exact Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
            CARTA ORGANISASI
          </h2>

          {/* Admin-Only Control Button: HIDDEN IN REGULAR VIEW */}
          {isStaffOrAdmin && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-600" />
                <span>Panel Admin Sahaja</span>
              </span>
              <button
                onClick={() => {
                  setPreviewImage(orgChartConfig.imageUrl || '');
                  setUrlInput(orgChartConfig.imageUrl || '');
                  setSelectedMode(orgChartConfig.viewMode || 'placeholder');
                  setOrgChartModalOpen(true);
                }}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
              >
                <Upload className="w-3.5 h-3.5 text-rose-400" />
                <span>Muat Naik / Urus Imej Carta</span>
              </button>
            </div>
          )}
        </div>

        {/* Inner Content Area */}
        {/* Case A: If admin uploaded an image and viewMode is 'image' */}
        {orgChartConfig.viewMode === 'image' && orgChartConfig.imageUrl ? (
          <div className="w-full border border-slate-200 rounded-2xl overflow-hidden p-3 bg-slate-50 relative group">
            <img
              src={orgChartConfig.imageUrl}
              alt="Carta Organisasi JHEP PTSS"
              className="max-h-[640px] w-full object-contain rounded-xl mx-auto cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            />
            <div className="absolute top-5 right-5 flex items-center gap-2">
              <button
                onClick={() => setLightboxOpen(true)}
                className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5 shadow-md"
                title="Besarkan Paparan"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[11px]">Besarkan</span>
              </button>
            </div>
          </div>
        ) : orgChartConfig.viewMode === 'interactive' ? (
          /* Case B: Interactive Hierarchy Tree */
          <div className="w-full border border-slate-200 rounded-2xl p-6 sm:p-8 bg-slate-50/50 space-y-8 overflow-x-auto">
            {/* Level 1: Ketua Jabatan */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-[#2E236C] to-[#433D8B] text-white p-5 rounded-2xl shadow-lg border border-indigo-200 max-w-sm w-full text-center">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-500 text-white inline-block mb-2">
                  Pengurusan Tertinggi
                </span>
                <h3 className="font-extrabold text-base text-white">Nasrul Effendy bin Mat Nasir</h3>
                <p className="text-xs text-indigo-200 font-semibold mt-0.5">Ketua Jabatan Hal Ehwal Pelajar</p>
                <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-center gap-4 text-[11px] text-indigo-100">
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3 text-rose-400" />
                    Samb. 6202
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-emerald-400" />
                    nasrul.effendy@ptss.edu.my
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-4">
              <div className="w-0.5 h-8 bg-slate-300" />
            </div>

            {/* Level 2: 2 Core Branches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <div className="bg-white p-5 rounded-2xl border-2 border-indigo-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-indigo-50 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      Bahagian 01
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 mt-1">
                      Pengambilan Pelajar dan Data
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold">Samb. 6204</span>
                </div>
                <div className="space-y-2.5">
                  {staffList.filter(s => s.position.includes('Pengambilan')).map(staff => (
                    <div key={staff.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{staff.name}</span>
                        <span className="text-[11px] text-slate-500">{staff.position}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-indigo-600 block">{staff.extension}</span>
                        <span className="text-[10px] text-slate-400">{staff.emailPrefix}@ptss</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border-2 border-rose-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-rose-50 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                      Bahagian 02
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 mt-1">
                      Kebajikan dan Disiplin
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold">Samb. 6205</span>
                </div>
                <div className="space-y-2.5">
                  {staffList.filter(s => s.position.includes('Kebajikan')).map(staff => (
                    <div key={staff.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{staff.name}</span>
                        <span className="text-[11px] text-slate-500">{staff.position}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-rose-600 block">{staff.extension}</span>
                        <span className="text-[10px] text-slate-400">{staff.emailPrefix}@ptss</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Case C: Placeholder (Exact match to screenshot image_abc7c564.png) */
          <div
            onClick={() => {
              if (isStaffOrAdmin) {
                setOrgChartModalOpen(true);
              }
            }}
            className={`w-full min-h-[320px] sm:min-h-[360px] border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/40 transition-colors select-none ${
              isStaffOrAdmin ? 'hover:bg-slate-50/90 cursor-pointer group' : ''
            }`}
          >
            {/* Custom SVG Tree Structure Icon matching screenshot */}
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 transition-colors">
              <svg
                className="w-10 h-10 stroke-current fill-none"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M12 7v5" />
                <path d="M5 12h14" />
                <path d="M5 12v3" />
                <path d="M19 12v3" />
                <rect x="2" y="15" width="6" height="4" rx="1" />
                <rect x="16" y="15" width="6" height="4" rx="1" />
              </svg>
            </div>

            <p className="text-sm font-semibold text-slate-500">
              Ruang Imej Carta Organisasi
            </p>
            <p className="text-xs text-slate-400 mt-1">
              (Sila muat naik imej di panel admin)
            </p>

            {isStaffOrAdmin && (
              <button
                type="button"
                onClick={() => setOrgChartModalOpen(true)}
                className="mt-4 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Upload className="w-3.5 h-3.5 text-rose-400" />
                <span>Klik untuk Muat Naik Imej (Admin)</span>
              </button>
            )}
          </div>
        )}

      </section>

      {/* CARD 2: MAKLUMAT KAKITANGAN (Exact Match to User Image Table) */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
            MAKLUMAT KAKITANGAN
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari nama atau jawatan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500 w-48 sm:w-56"
              />
            </div>

            {/* Add Staff Button: HIDDEN IN REGULAR VIEW, ONLY IN ADMIN */}
            {isStaffOrAdmin && (
              <button
                onClick={openAddStaff}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Kakitangan</span>
              </button>
            )}
          </div>
        </div>

        {/* Table Matching Screenshot Exactly */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-700 font-bold">
                  <th className="py-3.5 px-4 text-center w-16">
                    Bil.
                  </th>
                  <th className="py-3.5 px-4 min-w-[200px]">
                    Nama
                  </th>
                  <th className="py-3.5 px-4 min-w-[220px]">
                    Jawatan
                  </th>
                  <th className="py-3.5 px-4 text-center min-w-[170px]">
                    <div className="font-bold">Samb. No. Telefon</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">( 04 988 6200 )</div>
                  </th>
                  <th className="py-3.5 px-4 text-center min-w-[170px]">
                    <div className="font-bold">E-mel</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">( @ptss.edu.my )</div>
                  </th>
                  {isStaffOrAdmin && (
                    <th className="py-3.5 px-4 text-center w-24">
                      Tindakan
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80">
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan={isStaffOrAdmin ? 6 : 5} className="py-10 text-center text-slate-400">
                      Tiada maklumat kakitangan dijumpai untuk carian "{searchTerm}".
                    </td>
                  </tr>
                ) : (
                  filteredStaff.map((staff, idx) => (
                    <tr
                      key={staff.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Bil. */}
                      <td className="py-4 px-4 text-center font-bold text-slate-500">
                        {idx + 1}
                      </td>

                      {/* Nama */}
                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                          {staff.name}
                        </span>
                        {staff.departmentScope && (
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {staff.departmentScope}
                          </span>
                        )}
                      </td>

                      {/* Jawatan */}
                      <td className="py-4 px-4 text-slate-700 font-medium">
                        {staff.position}
                      </td>

                      {/* Samb. No Telefon (04 988 6200) */}
                      <td className="py-4 px-4 text-center font-mono font-bold text-slate-800">
                        <a
                          href={`tel:+6049886200`}
                          className="hover:text-rose-600 transition-colors inline-flex items-center gap-1.5"
                          title="Talian Am PTSS 04-988 6200"
                        >
                          <span>{staff.extension}</span>
                        </a>
                      </td>

                      {/* E-mel (@ptss.edu.my) */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleCopyEmail(staff.emailPrefix)}
                          className="font-mono text-slate-700 hover:text-rose-600 transition-colors inline-flex items-center gap-1.5"
                          title="Klik untuk salin emel penuh"
                        >
                          <span>{staff.emailPrefix}</span>
                          <Copy className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </td>

                      {/* Actions: ONLY VISIBLE IN ADMIN */}
                      {isStaffOrAdmin && (
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => openEditStaff(staff)}
                              className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Sunting Kakitangan"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteStaff(staff.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Padam Rekod Kakitangan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              Menunjukkan <strong>{filteredStaff.length}</strong> kakitangan berdaftar di Jabatan Hal Ehwal Pelajar PTSS.
            </span>
            <span className="text-slate-400">
              Talian Utama Politeknik: <strong>04-988 6200</strong>
            </span>
          </div>
        </div>

      </section>

      {/* Staff CRUD Modal (Admin Only) */}
      {staffModalOpen && isStaffOrAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingStaff ? 'Kemaskini Maklumat Kakitangan' : 'Daftar Kakitangan Baharu'}
              </h3>
              <button onClick={() => setStaffModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Penuh Kakitangan *</label>
                <input
                  required
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold"
                  placeholder="Contoh: Nasrul Effendy bin Mat Nasir"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Jawatan Rasmi *</label>
                <input
                  required
                  type="text"
                  value={formPosition}
                  onChange={(e) => setFormPosition(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  placeholder="Contoh: Pegawai Pengambilan dan Data I"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Samb. Telefon *</label>
                  <input
                    required
                    type="text"
                    value={formExtension}
                    onChange={(e) => setFormExtension(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono font-bold"
                    placeholder="6204"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Awalan E-mel *</label>
                  <input
                    required
                    type="text"
                    value={formEmailPrefix}
                    onChange={(e) => setFormEmailPrefix(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono"
                    placeholder="nama.staf"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Bahagian / Skop</label>
                <select
                  value={formScope}
                  onChange={(e) => setFormScope(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold"
                >
                  <option value="Pengurusan Tertinggi JHEP">Pengurusan Tertinggi JHEP</option>
                  <option value="Bahagian Pengambilan Pelajar dan Data">Bahagian Pengambilan Pelajar dan Data</option>
                  <option value="Bahagian Kebajikan dan Disiplin">Bahagian Kebajikan dan Disiplin</option>
                  <option value="Unit Digital & Pengurusan Rekod">Unit Digital & Pengurusan Rekod</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setStaffModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-md"
                >
                  Simpan Maklumat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Org Chart Image Upload Modal (Strictly Admin Only, Matching Image 589a5c3b) */}
      {orgChartModalOpen && isStaffOrAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 space-y-5">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                Urus Imej Carta Organisasi
              </h3>
              <button
                onClick={() => setOrgChartModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Anda boleh memuat naik fail imej dari peranti anda, memasukkan URL imej carta organisasi atau memilih mod paparan lalai/interaktif.
            </p>

            <form onSubmit={handleSaveOrgChart} className="space-y-4 text-xs">
              
              {/* Option 1: File Upload Box */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
                  <span>Muat Naik Fail Imej (PNG / JPG / WEBP)</span>
                  <span className="text-[10px] text-rose-600 font-normal">Dari Komputer / Telefon</span>
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-rose-400 rounded-2xl p-4 text-center cursor-pointer bg-slate-50/60 hover:bg-rose-50/30 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">
                      {selectedFileName ? selectedFileName : 'Klik untuk Pilih Fail Imej'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {selectedFileSize ? `Saiz fail: ${selectedFileSize}` : 'Sokongan format PNG, JPG, JPEG, WEBP'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Option 2: Image URL Input */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Pautan URL Imej Carta (Pilihan Lain)
                </label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (e.target.value) {
                      setPreviewImage(e.target.value);
                      setSelectedMode('image');
                    }
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  placeholder="https://contoh.com/carta_organisasi.png"
                />
              </div>

              {/* Image Thumbnail Preview if available */}
              {previewImage && (
                <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={previewImage}
                      alt="Pratonton"
                      className="w-14 h-14 object-cover rounded-xl border border-slate-300 bg-white"
                    />
                    <div className="overflow-hidden">
                      <span className="font-bold text-slate-800 text-xs block truncate">
                        Imej Bersedia Dimuat Naik
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Pratonton Disahkan
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage('');
                      setUrlInput('');
                      setSelectedFileName('');
                      setSelectedFileSize('');
                      setSelectedMode('placeholder');
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold"
                  >
                    Batal Imej
                  </button>
                </div>
              )}

              {/* Quick Preset Buttons matching screenshot 589a5c3b */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Pilihan Pantas:
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage('');
                      setUrlInput('');
                      setSelectedFileName('');
                      setSelectedMode('placeholder');
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                      selectedMode === 'placeholder' && !previewImage
                        ? 'bg-slate-200 text-slate-900 ring-2 ring-slate-400'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Guna Kotak Lalai
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMode('interactive');
                      setPreviewImage('');
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                      selectedMode === 'interactive'
                        ? 'bg-rose-100 text-rose-800 ring-2 ring-rose-400'
                        : 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                    }`}
                  >
                    Hierarki Interaktif
                  </button>
                </div>
              </div>

              {/* Actions Footer matching screenshot */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOrgChartModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md transition-all active:scale-95"
                >
                  Simpan Tetapan
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Fullscreen Image View */}
      {lightboxOpen && orgChartConfig.imageUrl && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-rose-400 font-bold text-sm flex items-center gap-1"
            >
              <X className="w-5 h-5" />
              <span>Tutup</span>
            </button>
            <img
              src={orgChartConfig.imageUrl}
              alt="Carta Organisasi Penuh"
              className="max-h-[85vh] w-auto object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
