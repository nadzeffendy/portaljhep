/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { CrudManagement } from './components/CrudManagement';
import { GoogleDriveStorage } from './components/GoogleDriveStorage';
import { KomunitiPage } from './components/KomunitiPage';
import { LoginModal } from './components/LoginModal';
import { ReportModal } from './components/ReportModal';
import { PageEditorModal } from './components/PageEditorModal';
import { StudentDetailModal } from './components/StudentDetailModal';
import { NotificationCenter } from './components/NotificationCenter';
import { CartaOrganisasiKakitangan } from './components/CartaOrganisasiKakitangan';
import { Footer } from './components/Footer';
import { ArrowLeft, BookOpen, Layers, Users2, Shield } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFDFE] flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      
      {/* Top Main Navigation */}
      <Navbar onOpenNotifications={() => setNotificationCenterOpen(true)} />

      {/* Main App Container - Full expansive width */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 pt-6">
        
        {/* Breadcrumb / Back button when not on home */}
        {activeTab !== 'utama' && (
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('utama')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-rose-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Laman Utama</span>
            </button>

            <span className="text-[11px] font-semibold text-slate-400 capitalize">
              Portal JHEP &gt; {activeTab === 'dashboard' ? 'Statistik' : activeTab}
            </span>
          </div>
        )}

        {/* Tab 1: Utama (Matches screenshots 1, 2, 3, 4, 5, 6) */}
        {activeTab === 'utama' && <LandingPage />}

        {/* Tab 2: Dashboard Real-time Statistics & Graphs */}
        {activeTab === 'dashboard' && <Dashboard />}

        {/* Tab 3: Full CRUD Management */}
        {activeTab === 'crud' && <CrudManagement />}

        {/* Tab 4: Google Drive Storage & Secure Backups */}
        {activeTab === 'drive' && <GoogleDriveStorage />}

        {/* Tab 5: Komuniti & Kelab */}
        {activeTab === 'komuniti' && <KomunitiPage />}

        {/* Tab: Carta Organisasi & Maklumat Kakitangan */}
        {activeTab === 'kakitangan' && <CartaOrganisasiKakitangan />}

        {/* Tab 6: Pengenalan view */}
        {activeTab === 'pengenalan' && (
          <div className="space-y-6 max-w-4xl mx-auto py-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                Mengenali JHEP PTSS
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900">
                Jabatan Hal Ehwal Pelajar Politeknik Tuanku Syed Sirajuddin
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Jabatan Hal Ehwal Pelajar (JHEP) adalah nadi kepada kebajikan dan kehidupan kampus para siswa-siswi di Politeknik Tuanku Syed Sirajuddin, Perlis. JHEP komited membimbing sahsiah holistik, memastikan kebajikan bantuan kewangan serta menyediakan ekosistem penempatan kolej kediaman yang kondusif.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm">Visi Jabatan</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Menjadi peneraju dalam pembangunan sahsiah, kebajikan dan kepimpinan pelajar politeknik ke arah melahirkan graduan TVET yang berdaya saing dan berintegriti.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm">Misi Jabatan</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Menyediakan perkhidmatan pengurusan pelajar berkualiti tinggi, telus dan bersepadu dengan sokongan teknologi digital terkini.
                  </p>
                </div>
              </div>
            </div>
            <LandingPage />
          </div>
        )}

        {/* Tab 7: Perkhidmatan view */}
        {activeTab === 'perkhidmatan' && (
          <div className="space-y-6 max-w-4xl mx-auto py-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h1 className="text-2xl font-extrabold text-slate-900">
                Skop Perkhidmatan Hal Ehwal Pelajar PTSS
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Segala urusan rasmi pelajar boleh diakses dan diuruskan melalui dua bahagian utama kami.
              </p>
            </div>
            <LandingPage />
          </div>
        )}

        {/* Tab 8: FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-6 max-w-4xl mx-auto py-6">
            <LandingPage />
          </div>
        )}

      </main>

      {/* Institutional Institutional Footer */}
      <Footer />

      {/* Two-Factor Authentication Modal */}
      <LoginModal />

      {/* Automated PDF Report Generator Modal */}
      <ReportModal />

      {/* Dynamic Page Editor Modal for Admin */}
      <PageEditorModal />

      {/* Detailed Student Dossier Modal */}
      <StudentDetailModal />

      {/* Real-time Notification Center & Toast Stack */}
      <NotificationCenter
        isOpen={notificationCenterOpen}
        onClose={() => setNotificationCenterOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
