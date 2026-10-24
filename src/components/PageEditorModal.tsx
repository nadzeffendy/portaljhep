import React, { useState } from 'react';
import {
  X,
  Sparkles,
  HelpCircle,
  Image,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Edit
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PageEditorModal: React.FC = () => {
  const {
    pageEditorOpen,
    setPageEditorOpen,
    faqs,
    updateFaq,
    addFaq,
    deleteFaq,
    banners,
    updateBanner,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'banners' | 'faqs'>('faqs');
  
  // New FAQ form
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  if (!pageEditorOpen) return null;

  const handleCreateFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return;
    addFaq(newQuestion, newAnswer);
    setNewQuestion('');
    setNewAnswer('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">
                Pengurusan Kandungan Laman Portal
              </h3>
              <p className="text-xs text-slate-400">
                Sunting maklumat sepanduk (hero banner), soalan lazim (FAQ), dan teks antarmuka secara langsung.
              </p>
            </div>
          </div>
          <button
            onClick={() => setPageEditorOpen(false)}
            className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex gap-2">
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'faqs'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Soalan Lazim (FAQ - {faqs.length})
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'banners'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sepanduk Utama ({banners.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* FAQ Editor */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              
              {/* Add New FAQ */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-rose-600" />
                  <span>Tambah Soalan Lazim Baharu</span>
                </h4>
                <form onSubmit={handleCreateFaq} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Contoh: Bilakah tarikh pendaftaran pelajar baharu bermula?"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Jawapan rasmi daripada pentadbir..."
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Terbitkan Soalan Baharu
                  </button>
                </form>
              </div>

              {/* Existing FAQs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700">Senarai Soalan Lazim Semasa:</h4>
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{faq.question}</span>
                      <button
                        onClick={() => deleteFaq(faq.id)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                        title="Padam soalan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Banner Editor */}
          {activeTab === 'banners' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Kemaskini teks tajuk dan keterangan sepanduk hero hadapan portal.
              </p>
              {banners.map((b) => (
                <div key={b.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      Tag: {b.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{b.id}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Tajuk Baris 1</label>
                      <input
                        type="text"
                        value={b.title}
                        onChange={(e) => updateBanner(b.id, { title: e.target.value })}
                        className="w-full p-2 bg-white border rounded-xl text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Teks Sorotan Warna</label>
                      <input
                        type="text"
                        value={b.highlight}
                        onChange={(e) => updateBanner(b.id, { highlight: e.target.value })}
                        className="w-full p-2 bg-white border rounded-xl text-xs font-bold text-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Penerangan Ringkas</label>
                    <textarea
                      rows={2}
                      value={b.description}
                      onChange={(e) => updateBanner(b.id, { description: e.target.value })}
                      className="w-full p-2 bg-white border rounded-xl text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={() => setPageEditorOpen(false)}
            className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
};
