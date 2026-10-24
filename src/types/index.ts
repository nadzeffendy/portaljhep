export type UserRole = 'admin' | 'staff' | 'pelajar' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  staffId?: string;
  avatar?: string;
  twoFactorEnabled: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string; // Stored in Google Sheets database tab "Pengguna_Sistem"
  role: 'admin' | 'staff';
  staffId: string;
  department: string;
  twoFactorEnabled: boolean;
  status: 'Aktif' | 'Digantung';
  sheetRowIndex?: number;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  studentName: string;
  matricNo: string;
  department: DepartmentCode;
  phone?: string;
  registeredAt: string;
  meritPoints: number;
  status: 'Disahkan' | 'Hadir (Selesai)' | 'Batal';
  qrCodeValue: string;
}

export type DepartmentCode = 'JTMK' | 'JKE' | 'JKM' | 'JP' | 'JRKV';

export interface DepartmentInfo {
  code: DepartmentCode;
  name: string;
  shortName: string;
  color: string;
  studentCount: number;
  maleCount: number;
  femaleCount: number;
  averageCgpa: number;
}

export interface Student {
  id: string;
  matricNo: string;
  name: string;
  icNo: string;
  gender: 'Lelaki' | 'Perempuan';
  department: DepartmentCode;
  program: string;
  semester: number;
  cgpa: number;
  phone: string;
  email: string;
  hostelStatus: 'Menetap di Kolej Kediaman' | 'Luar Kampus (NR)' | 'Dalam Permohonan';
  sponsorshipStatus: 'PTPTN' | 'JPA' | 'MARA' | 'Yayasan Negeri' | 'Persendirian' | 'Lain-lain';
  meritPoints: number;
  disciplinaryStatus: 'Bersih' | 'Amaran Ringan' | 'Dalam Siasatan';
  enrollmentYear: number;
  createdAt: string;
}

export interface AcademicTrendYear {
  year: number;
  overallCgpa: number;
  jtmkCgpa: number;
  jkeCgpa: number;
  jkmCgpa: number;
  jpCgpa: number;
  jrkvCgpa: number;
  passRate: number; // percentage e.g. 96.4
  deansListRate: number; // percentage with CGPA >= 3.50
}

export interface HostelApplication {
  id: string;
  studentId: string;
  studentName: string;
  matricNo: string;
  department: DepartmentCode;
  roomType: 'Bilik Berdua' | 'Bilik Berempat';
  block: string;
  reason: string;
  submissionDate: string;
  status: 'Dalam Semakan' | 'Lulus' | 'Ditolak';
  reviewedBy?: string;
}

export interface DisciplinaryRecord {
  id: string;
  studentId: string;
  studentName: string;
  matricNo: string;
  department: DepartmentCode;
  incidentType: 'Merit Aktiviti' | 'Ketepatan Masa' | 'Pelanggaran Sahsiah Rupa Diri' | 'Tatatertib Asrama' | 'Akademik';
  points: number; // positive for merit, negative for demerit
  description: string;
  date: string;
  officerInCharge: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'Keselamatan' | 'Pelajar' | 'Permohonan' | 'Sistem' | 'Sandaran Drive';
  read: boolean;
  priority: 'low' | 'normal' | 'high';
}

export interface DriveFileItem {
  id: string;
  name: string;
  category: 'Borang Rasmi' | 'Pekeliling' | 'Panduan Pelajar' | 'Laporan' | 'Sandaran Pangkalan Data';
  fileSize: string;
  mimeType: string;
  lastModified: string;
  driveUrl: string;
  uploadedBy: string;
  isBackedUpToCloud: boolean;
}

export interface DriveBackupLog {
  id: string;
  timestamp: string;
  fileName: string;
  recordsCount: number;
  fileSizeBytes: number;
  status: 'Berjaya' | 'Dalam Proses' | 'Gagal';
  targetFolder: string;
  checksum: string;
  initiatedBy: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
}

export interface BannerSlide {
  id: string;
  tag: string;
  title: string;
  highlight: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface StaffMember {
  id: string;
  bil: number;
  name: string;
  position: string;
  extension: string;
  emailPrefix: string;
  departmentScope?: string;
  avatar?: string;
}

export interface OrgChartConfig {
  imageUrl: string;
  title: string;
  lastUpdated: string;
  viewMode: 'placeholder' | 'image' | 'interactive';
}
