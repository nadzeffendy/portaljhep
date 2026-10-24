import React, { useState } from 'react';
import {
  Bell,
  X,
  CheckCheck,
  Trash2,
  ShieldAlert,
  Users,
  FileCheck,
  Database,
  CloudCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppNotification } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    unreadCount,
    toasts,
    removeToast
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<'ALL' | AppNotification['category']>('ALL');

  const filteredNotifications = notifications.filter(n => {
    if (selectedFilter === 'ALL') return true;
    return n.category === selectedFilter;
  });

  const getCategoryIcon = (category: AppNotification['category']) => {
    switch (category) {
      case 'Keselamatan':
        return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      case 'Pelajar':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'Permohonan':
        return <FileCheck className="w-4 h-4 text-purple-500" />;
      case 'Sandaran Drive':
        return <CloudCheck className="w-4 h-4 text-emerald-500" />;
      default:
        return <Database className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <>
      {/* Toast Floating Alerts */}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border backdrop-blur-md flex items-start gap-3 transition-all animate-in slide-in-from-right duration-200 ${
              toast.type === 'success'
                ? 'bg-white border-emerald-200 text-slate-800'
                : toast.type === 'warning'
                ? 'bg-white border-amber-200 text-slate-800'
                : toast.type === 'error'
                ? 'bg-white border-rose-200 text-slate-800'
                : 'bg-white border-indigo-200 text-slate-800'
            }`}
          >
            <div className="mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
              {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-600" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-600" />}
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900">{toast.title}</h4>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Notification Center Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 border-l border-slate-100">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Pusat Notifikasi JHEP</h3>
                  <span className="text-[11px] text-slate-500">
                    {unreadCount > 0 ? `${unreadCount} belum dibaca` : 'Semua telah disemak'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg text-xs"
                    title="Tanda semua dibaca"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg text-xs"
                    title="Padam semua notifikasi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="px-4 py-2.5 border-b border-slate-100 bg-white flex gap-1.5 overflow-x-auto text-[11px]">
              {['ALL', 'Keselamatan', 'Pelajar', 'Permohonan', 'Sandaran Drive'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat as any)}
                  className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                    selectedFilter === cat
                      ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'ALL' ? 'Semua' : cat}
                </button>
              ))}
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
              {filteredNotifications.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-xs">
                  <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2 stroke-1" />
                  Tiada notifikasi aktif untuk paparan semasa.
                </div>
              ) : (
                filteredNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-colors flex items-start gap-3 ${
                      n.read ? 'bg-white hover:bg-slate-50' : 'bg-rose-50/40 hover:bg-rose-50/70'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                      {getCategoryIcon(n.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {n.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {n.timestamp}
                        </span>
                      </div>
                      <h4 className={`text-xs font-bold mt-0.5 ${n.read ? 'text-slate-800' : 'text-slate-900'}`}>
                        {n.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2" />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 text-center">
              Sistem Notifikasi Masa Nyata • Politeknik Tuanku Syed Sirajuddin
            </div>

          </div>
        </div>
      )}
    </>
  );
};
