import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  AcademicTrendYear,
  HostelApplication,
  DisciplinaryRecord,
  AppNotification,
  DriveFileItem,
  DriveBackupLog,
  FaqItem,
  BannerSlide,
  UserProfile,
  UserRole,
  StaffMember,
  OrgChartConfig,
  UserAccount,
  EventRegistration
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_ACADEMIC_TRENDS,
  INITIAL_APPLICATIONS,
  INITIAL_DISCIPLINE,
  INITIAL_NOTIFICATIONS,
  INITIAL_DRIVE_FILES,
  INITIAL_FAQS,
  INITIAL_BANNERS,
  INITIAL_USERS,
  INITIAL_STAFF,
  INITIAL_ORG_CHART,
  INITIAL_USER_ACCOUNTS,
  INITIAL_EVENT_REGISTRATIONS,
  OFFICIAL_DRIVE_FOLDER_URL,
  OFFICIAL_DRIVE_FOLDER_ID
} from '../data/mockData';

export interface ToastItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Auth & 2FA
  currentUser: UserProfile | null;
  activeRole: UserRole;
  isLoggedIn: boolean;
  login: (user: UserProfile) => void;
  logout: () => void;
  users: UserProfile[];

  // Google Sheets User Database (Admin & Staf Accounts with Passwords)
  userAccounts: UserAccount[];
  addUserAccount: (acc: Omit<UserAccount, 'id'>) => void;
  updateUserAccount: (id: string, updated: Partial<UserAccount>) => void;
  deleteUserAccount: (id: string) => void;

  // Student Event Registrations
  eventRegistrations: EventRegistration[];
  addEventRegistration: (reg: Omit<EventRegistration, 'id' | 'registeredAt'>) => EventRegistration;
  updateEventRegistrationStatus: (id: string, status: EventRegistration['status']) => void;
  deleteEventRegistration: (id: string) => void;

  // Navigation
  activeTab: 'utama' | 'dashboard' | 'crud' | 'drive' | 'kandungan' | 'laporan' | 'pengenalan' | 'faq' | 'perkhidmatan' | 'komuniti' | 'kakitangan';
  setActiveTab: (tab: any) => void;

  // Staff & Org Chart
  staffList: StaffMember[];
  addStaff: (staff: Omit<StaffMember, 'id' | 'bil'>) => void;
  updateStaff: (id: string, updated: Partial<StaffMember>) => void;
  deleteStaff: (id: string) => void;
  orgChartConfig: OrgChartConfig;
  updateOrgChartConfig: (config: Partial<OrgChartConfig>) => void;

  // Students CRUD
  students: Student[];
  addStudent: (student: Omit<Student, 'id' | 'createdAt'>) => void;
  updateStudent: (id: string, updated: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  // Applications
  applications: HostelApplication[];
  updateApplicationStatus: (id: string, status: 'Dalam Semakan' | 'Lulus' | 'Ditolak', reviewedBy?: string) => void;
  addApplication: (app: Omit<HostelApplication, 'id' | 'submissionDate'>) => void;

  // Disciplinary records
  disciplinaryRecords: DisciplinaryRecord[];
  addDisciplinaryRecord: (record: Omit<DisciplinaryRecord, 'id' | 'date'>) => void;
  deleteDisciplinaryRecord: (id: string) => void;

  // Academic Trends
  academicTrends: AcademicTrendYear[];
  updateAcademicTrend: (year: number, trend: Partial<AcademicTrendYear>) => void;

  // Notifications
  notifications: AppNotification[];
  addNotification: (title: string, message: string, category: AppNotification['category'], priority?: AppNotification['priority']) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  unreadCount: number;

  // Toasts
  toasts: ToastItem[];
  addToast: (type: ToastItem['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Google Drive & Backups
  driveFiles: DriveFileItem[];
  backupLogs: DriveBackupLog[];
  triggerDriveBackup: () => Promise<DriveBackupLog>;
  addDriveFile: (file: Omit<DriveFileItem, 'id' | 'lastModified' | 'isBackedUpToCloud'>) => void;
  deleteDriveFile: (id: string) => void;

  // Landing Page dynamic content
  faqs: FaqItem[];
  updateFaq: (id: string, updated: Partial<FaqItem>) => void;
  addFaq: (question: string, answer: string) => void;
  deleteFaq: (id: string) => void;
  banners: BannerSlide[];
  updateBanner: (id: string, updated: Partial<BannerSlide>) => void;

  // UI Modals
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  reportModalOpen: boolean;
  setReportModalOpen: (open: boolean) => void;
  pageEditorOpen: boolean;
  setPageEditorOpen: (open: boolean) => void;
  selectedStudentForDetail: Student | null;
  setSelectedStudentForDetail: (student: Student | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'ptss_jhep_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial local storage hydration helper
  const getStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  // Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getStored('user', null));
  const [users] = useState<UserProfile[]>(INITIAL_USERS);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [pageEditorOpen, setPageEditorOpen] = useState(false);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);

  // Active Navigation
  const [activeTab, setActiveTab] = useState<'utama' | 'dashboard' | 'crud' | 'drive' | 'kandungan' | 'laporan' | 'pengenalan' | 'faq' | 'perkhidmatan' | 'komuniti' | 'kakitangan'>('utama');

  // Core Data States
  const [students, setStudents] = useState<Student[]>(() => getStored('students', INITIAL_STUDENTS));
  const [academicTrends, setAcademicTrends] = useState<AcademicTrendYear[]>(() => getStored('academicTrends', INITIAL_ACADEMIC_TRENDS));
  const [applications, setApplications] = useState<HostelApplication[]>(() => getStored('applications', INITIAL_APPLICATIONS));
  const [disciplinaryRecords, setDisciplinaryRecords] = useState<DisciplinaryRecord[]>(() => getStored('discipline', INITIAL_DISCIPLINE));
  const [notifications, setNotifications] = useState<AppNotification[]>(() => getStored('notifications', INITIAL_NOTIFICATIONS));
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>(() => getStored('driveFiles', INITIAL_DRIVE_FILES));
  const [faqs, setFaqs] = useState<FaqItem[]>(() => getStored('faqs', INITIAL_FAQS));
  const [banners, setBanners] = useState<BannerSlide[]>(() => getStored('banners', INITIAL_BANNERS));
  const [staffList, setStaffList] = useState<StaffMember[]>(() => getStored('staffList', INITIAL_STAFF));
  const [orgChartConfig, setOrgChartConfig] = useState<OrgChartConfig>(() => getStored('orgChartConfig', INITIAL_ORG_CHART));
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(() => getStored('userAccounts', INITIAL_USER_ACCOUNTS));
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>(() => getStored('eventRegistrations', INITIAL_EVENT_REGISTRATIONS));
  const [backupLogs, setBackupLogs] = useState<DriveBackupLog[]>(() => getStored('backupLogs', [
    {
      id: 'bk-init-1',
      timestamp: '2026-10-24 07:30 AM',
      fileName: 'Sandaran_PangkalanData_JHEP_PTSS_AutoBackup_2026.json',
      recordsCount: 12,
      fileSizeBytes: 2726297,
      status: 'Berjaya',
      targetFolder: OFFICIAL_DRIVE_FOLDER_ID,
      checksum: 'sha256:4f8e91a27b...',
      initiatedBy: 'Sistem Sandaran Automatik'
    }
  ]));

  // Toast notifications
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'user', JSON.stringify(currentUser));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'students', JSON.stringify(students));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'academicTrends', JSON.stringify(academicTrends));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'applications', JSON.stringify(applications));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'discipline', JSON.stringify(disciplinaryRecords));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'notifications', JSON.stringify(notifications));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'driveFiles', JSON.stringify(driveFiles));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'backupLogs', JSON.stringify(backupLogs));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'faqs', JSON.stringify(faqs));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'banners', JSON.stringify(banners));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'staffList', JSON.stringify(staffList));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'orgChartConfig', JSON.stringify(orgChartConfig));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'userAccounts', JSON.stringify(userAccounts));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'eventRegistrations', JSON.stringify(eventRegistrations));
    } catch (err) {
      console.warn('Storage sync error:', err);
    }
  }, [currentUser, students, academicTrends, applications, disciplinaryRecords, notifications, driveFiles, backupLogs, faqs, banners, staffList, orgChartConfig, userAccounts, eventRegistrations]);

  const addToast = (type: ToastItem['type'], title: string, message: string) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addNotification = (
    title: string,
    message: string,
    category: AppNotification['category'],
    priority: AppNotification['priority'] = 'normal'
  ) => {
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title,
      message,
      timestamp: 'Baru sahaja',
      category,
      read: false,
      priority
    };
    setNotifications(prev => [newNotif, ...prev]);
    addToast(
      category === 'Keselamatan' ? 'warning' : 'success',
      title,
      message
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('info', 'Notifikasi Dikemaskini', 'Semua notifikasi telah ditandakan sebagai dibaca.');
  };

  const clearNotifications = () => {
    setNotifications([]);
    addToast('info', 'Peti Notifikasi Kosong', 'Semua notifikasi telah dipadam.');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const login = (user: UserProfile) => {
    setCurrentUser(user);
    addNotification(
      'Log Masuk 2FA Berjaya',
      `${user.name} (${user.role.toUpperCase()}) berjaya melepasi pengesahan dua faktor.`,
      'Keselamatan',
      'high'
    );
  };

  const logout = () => {
    const name = currentUser?.name || 'Pengguna';
    setCurrentUser(null);
    addToast('info', 'Log Keluar', `${name} telah log keluar dari portal.`);
  };

  // Student CRUD
  const addStudent = (studentData: Omit<Student, 'id' | 'createdAt'>) => {
    const newStudent: Student = {
      ...studentData,
      id: 'std-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setStudents(prev => [newStudent, ...prev]);
    addNotification(
      'Pelajar Baharu Didaftarkan',
      `${newStudent.name} (${newStudent.matricNo}) didaftarkan di bawah ${newStudent.department}.`,
      'Pelajar'
    );
  };

  const updateStudent = (id: string, updated: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    const target = students.find(s => s.id === id);
    addNotification(
      'Rekod Pelajar Dikemaskini',
      `Maklumat ${target?.name || 'Pelajar'} (${target?.matricNo || id}) telah berjaya dikemaskini.`,
      'Pelajar'
    );
  };

  const deleteStudent = (id: string) => {
    const target = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    addNotification(
      'Rekod Pelajar Dipadam',
      `Rekod ${target?.name || id} (${target?.matricNo || ''}) telah dipadam dari pangkalan data.`,
      'Pelajar',
      'high'
    );
  };

  // Applications
  const updateApplicationStatus = (id: string, status: 'Dalam Semakan' | 'Lulus' | 'Ditolak', reviewedBy?: string) => {
    setApplications(prev => prev.map(a => a.id === id ? {
      ...a,
      status,
      reviewedBy: reviewedBy || currentUser?.name || 'Pegawai JHEP'
    } : a));
    const target = applications.find(a => a.id === id);
    addNotification(
      'Status Permohonan Dikemaskini',
      `Permohonan kolej bagi ${target?.studentName || id} ditukar kepada "${status}".`,
      'Permohonan'
    );
  };

  const addApplication = (appData: Omit<HostelApplication, 'id' | 'submissionDate'>) => {
    const newApp: HostelApplication = {
      ...appData,
      id: 'app-' + Date.now(),
      submissionDate: new Date().toISOString().slice(0, 10)
    };
    setApplications(prev => [newApp, ...prev]);
    addNotification(
      'Permohonan Kolej Diterima',
      `Permohonan baharu daripada ${newApp.studentName} (${newApp.matricNo}) telah direkodkan.`,
      'Permohonan'
    );
  };

  // Disciplinary
  const addDisciplinaryRecord = (recData: Omit<DisciplinaryRecord, 'id' | 'date'>) => {
    const newRec: DisciplinaryRecord = {
      ...recData,
      id: 'disc-' + Date.now(),
      date: new Date().toISOString().slice(0, 10)
    };
    setDisciplinaryRecords(prev => [newRec, ...prev]);

    // Update student merit points
    setStudents(prev => prev.map(s => s.id === recData.studentId ? {
      ...s,
      meritPoints: Math.max(0, s.meritPoints + recData.points)
    } : s));

    addNotification(
      'Rekod Sahsiah Ditambah',
      `${recData.incidentType} (${recData.points > 0 ? '+' : ''}${recData.points} mata) direkodkan untuk ${recData.studentName}.`,
      'Pelajar'
    );
  };

  const deleteDisciplinaryRecord = (id: string) => {
    setDisciplinaryRecords(prev => prev.filter(r => r.id !== id));
    addToast('info', 'Rekod Dipadam', 'Rekod sahsiah telah dibuang.');
  };

  // Academic Trends
  const updateAcademicTrend = (year: number, updated: Partial<AcademicTrendYear>) => {
    setAcademicTrends(prev => prev.map(t => t.year === year ? { ...t, ...updated } : t));
    addNotification(
      'Aliran Prestasi Dikemaskini',
      `Statistik akademik bagi tahun ${year} telah diselaraskan.`,
      'Sistem'
    );
  };

  // Google Drive Integration & Auto Backup
  const triggerDriveBackup = async (): Promise<DriveBackupLog> => {
    // Generate snapshot payload
    const snapshot = {
      version: '2.0-PTSS-JHEP',
      exportDate: new Date().toISOString(),
      folderTarget: OFFICIAL_DRIVE_FOLDER_ID,
      folderUrl: OFFICIAL_DRIVE_FOLDER_URL,
      operator: currentUser ? `${currentUser.name} (${currentUser.role})` : 'Sistem Automatik',
      stats: {
        totalStudents: students.length,
        totalApplications: applications.length,
        totalDisciplinary: disciplinaryRecords.length,
        totalTrends: academicTrends.length
      },
      data: {
        students,
        applications,
        disciplinaryRecords,
        academicTrends,
        driveFiles
      }
    };

    const jsonStr = JSON.stringify(snapshot, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const size = blob.size;
    const now = new Date();
    const stamp = now.toISOString().replace(/[:.]/g, '-');
    const fileName = `Sandaran_PangkalanData_PTSS_JHEP_${stamp}.json`;

    // Simulate cryptographic checksum
    const checksum = 'sha256:' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);

    const log: DriveBackupLog = {
      id: 'bk-' + Date.now(),
      timestamp: `${now.toLocaleDateString('ms-MY')} ${now.toLocaleTimeString('ms-MY')}`,
      fileName,
      recordsCount: students.length + applications.length + disciplinaryRecords.length,
      fileSizeBytes: size,
      status: 'Berjaya',
      targetFolder: OFFICIAL_DRIVE_FOLDER_ID,
      checksum,
      initiatedBy: currentUser?.name || 'Sistem Sandaran Terjadual'
    };

    setBackupLogs(prev => [log, ...prev]);

    // Add to drive files list
    const newDriveItem: DriveFileItem = {
      id: 'drive-bk-' + Date.now(),
      name: fileName,
      category: 'Sandaran Pangkalan Data',
      fileSize: `${(size / (1024 * 1024)).toFixed(2)} MB`,
      mimeType: 'application/json',
      lastModified: now.toISOString().slice(0, 10),
      driveUrl: OFFICIAL_DRIVE_FOLDER_URL,
      uploadedBy: currentUser?.name || 'Sandaran Automatik',
      isBackedUpToCloud: true
    };
    setDriveFiles(prev => [newDriveItem, ...prev]);

    addNotification(
      'Sandaran Google Drive Berjaya',
      `Fail ${fileName} (${(size / (1024 * 1024)).toFixed(2)} MB) telah dimuat naik dan diselaraskan ke Google Drive folder ID: ${OFFICIAL_DRIVE_FOLDER_ID}.`,
      'Sandaran Drive',
      'high'
    );

    return log;
  };

  const addDriveFile = (fileData: Omit<DriveFileItem, 'id' | 'lastModified' | 'isBackedUpToCloud'>) => {
    const newFile: DriveFileItem = {
      ...fileData,
      id: 'file-' + Date.now(),
      lastModified: new Date().toISOString().slice(0, 10),
      isBackedUpToCloud: true
    };
    setDriveFiles(prev => [newFile, ...prev]);
    addNotification(
      'Fail Disimpan ke Google Drive',
      `Dokumen "${newFile.name}" telah dimuat naik ke folder rasmi Drive PTSS.`,
      'Sandaran Drive'
    );
  };

  const deleteDriveFile = (id: string) => {
    const file = driveFiles.find(f => f.id === id);
    setDriveFiles(prev => prev.filter(f => f.id !== id));
    addNotification(
      'Fail Dipadam Dari Direktori',
      `Dokumen "${file?.name || id}" telah dibuang dari repositori.`,
      'Sandaran Drive'
    );
  };

  // Dynamic FAQs
  const updateFaq = (id: string, updated: Partial<FaqItem>) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
    addToast('success', 'Soalan Lazim Dikemaskini', 'Kandungan FAQ telah disimpan.');
  };

  const addFaq = (question: string, answer: string) => {
    const newFaq: FaqItem = {
      id: 'faq-' + Date.now(),
      question,
      answer,
      isOpen: false
    };
    setFaqs(prev => [...prev, newFaq]);
    addToast('success', 'FAQ Baharu Ditambah', 'Soalan lazim baharu telah diterbitkan.');
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    addToast('info', 'FAQ Dipadam', 'Soalan lazim telah dipadam.');
  };

  // Dynamic Banners
  const updateBanner = (id: string, updated: Partial<BannerSlide>) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, ...updated } : b));
    addToast('success', 'Sepanduk Disunting', 'Paparan sepanduk hadapan telah dikemaskini.');
  };

  // Staff & Org Chart Handlers
  const addStaff = (staffData: Omit<StaffMember, 'id' | 'bil'>) => {
    const newStaff: StaffMember = {
      ...staffData,
      id: 'stf-' + Date.now(),
      bil: staffList.length + 1
    };
    setStaffList(prev => [...prev, newStaff]);
    addNotification(
      'Kakitangan Baharu Ditambah',
      `${newStaff.name} (${newStaff.position}) telah didaftarkan dalam direktori staf PTSS.`,
      'Sistem'
    );
  };

  const updateStaff = (id: string, updated: Partial<StaffMember>) => {
    setStaffList(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    const target = staffList.find(s => s.id === id);
    addNotification(
      'Maklumat Kakitangan Dikemaskini',
      `Profil kakitangan ${target?.name || id} telah berjaya dikemaskini.`,
      'Sistem'
    );
  };

  const deleteStaff = (id: string) => {
    const target = staffList.find(s => s.id === id);
    setStaffList(prev => prev.filter(s => s.id !== id).map((s, idx) => ({ ...s, bil: idx + 1 })));
    addNotification(
      'Kakitangan Dikeluarkan',
      `Rekod kakitangan ${target?.name || id} telah dikeluarkan daripada senarai.`,
      'Sistem',
      'high'
    );
  };

  const updateOrgChartConfig = (config: Partial<OrgChartConfig>) => {
    setOrgChartConfig(prev => ({
      ...prev,
      ...config,
      lastUpdated: new Date().toISOString().slice(0, 10)
    }));
    addNotification(
      'Carta Organisasi Dikemaskini',
      'Tetapan dan carta organisasi jabatan telah dikemaskini oleh pentadbir.',
      'Sistem'
    );
  };

  // User Accounts (Admin & Staff from Google Sheets Database)
  const addUserAccount = (accData: Omit<UserAccount, 'id'>) => {
    const newAcc: UserAccount = {
      ...accData,
      id: 'acc-' + Date.now(),
      sheetRowIndex: userAccounts.length + 2
    };
    setUserAccounts(prev => [...prev, newAcc]);
    addNotification(
      'Akaun Pengguna Ditambah',
      `Akaun ${newAcc.name} (${newAcc.role.toUpperCase()}) telah direkodkan dalam Google Sheets database.`,
      'Keselamatan'
    );
  };

  const updateUserAccount = (id: string, updated: Partial<UserAccount>) => {
    setUserAccounts(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
    const target = userAccounts.find(a => a.id === id);
    addNotification(
      'Akaun Pengguna Dikemaskini',
      `Kata laluan / maklumat akaun ${target?.name || id} telah dikemaskini dalam pangkalan data.`,
      'Keselamatan'
    );
  };

  const deleteUserAccount = (id: string) => {
    const target = userAccounts.find(a => a.id === id);
    setUserAccounts(prev => prev.filter(a => a.id !== id));
    addNotification(
      'Akaun Pengguna Dibuang',
      `Akaun ${target?.name || id} telah dipadamkan daripada rekod pangkalan data.`,
      'Keselamatan',
      'high'
    );
  };

  // Event Registrations
  const addEventRegistration = (regData: Omit<EventRegistration, 'id' | 'registeredAt'>): EventRegistration => {
    const now = new Date();
    const timeStr = `${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' })}`;
    const newReg: EventRegistration = {
      ...regData,
      id: 'reg-' + Date.now(),
      registeredAt: timeStr,
      qrCodeValue: `PTSS-EVT-${regData.eventId.toUpperCase()}-${regData.matricNo.toUpperCase()}`
    };
    setEventRegistrations(prev => [newReg, ...prev]);

    // Update merit if student exists
    setStudents(prev => prev.map(s => s.matricNo.toUpperCase() === regData.matricNo.toUpperCase() ? {
      ...s,
      meritPoints: s.meritPoints + regData.meritPoints
    } : s));

    addNotification(
      'Pendaftaran Aktiviti Pelajar Diterima',
      `${regData.studentName} (${regData.matricNo}) telah berjaya didaftarkan untuk "${regData.eventTitle}".`,
      'Pelajar'
    );
    return newReg;
  };

  const updateEventRegistrationStatus = (id: string, status: EventRegistration['status']) => {
    setEventRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    const target = eventRegistrations.find(r => r.id === id);
    addNotification(
      'Status Kehadiran Dikemaskini',
      `Status kehadiran ${target?.studentName || id} ditukar kepada "${status}".`,
      'Pelajar'
    );
  };

  const deleteEventRegistration = (id: string) => {
    const target = eventRegistrations.find(r => r.id === id);
    setEventRegistrations(prev => prev.filter(r => r.id !== id));
    addToast('info', 'Pendaftaran Dibatalkan', `Pendaftaran aktiviti untuk ${target?.studentName || id} telah dikeluarkan.`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRole: currentUser?.role || 'guest',
        isLoggedIn: !!currentUser,
        login,
        logout,
        users,

        userAccounts,
        addUserAccount,
        updateUserAccount,
        deleteUserAccount,

        eventRegistrations,
        addEventRegistration,
        updateEventRegistrationStatus,
        deleteEventRegistration,

        activeTab,
        setActiveTab,

        students,
        addStudent,
        updateStudent,
        deleteStudent,

        applications,
        updateApplicationStatus,
        addApplication,

        disciplinaryRecords,
        addDisciplinaryRecord,
        deleteDisciplinaryRecord,

        academicTrends,
        updateAcademicTrend,

        notifications,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        unreadCount,

        toasts,
        addToast,
        removeToast,

        driveFiles,
        backupLogs,
        triggerDriveBackup,
        addDriveFile,
        deleteDriveFile,

        faqs,
        updateFaq,
        addFaq,
        deleteFaq,

        banners,
        updateBanner,

        staffList,
        addStaff,
        updateStaff,
        deleteStaff,
        orgChartConfig,
        updateOrgChartConfig,

        loginModalOpen,
        setLoginModalOpen,
        reportModalOpen,
        setReportModalOpen,
        pageEditorOpen,
        setPageEditorOpen,
        selectedStudentForDetail,
        setSelectedStudentForDetail
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
