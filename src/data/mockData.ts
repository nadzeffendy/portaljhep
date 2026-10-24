import {
  Student,
  AcademicTrendYear,
  HostelApplication,
  DisciplinaryRecord,
  AppNotification,
  DriveFileItem,
  FaqItem,
  BannerSlide,
  UserProfile,
  StaffMember,
  OrgChartConfig,
  UserAccount,
  EventRegistration
} from '../types';

export const OFFICIAL_DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1pHjWF-WYlZolWwqpP0STOeSYAen4IEkw";
export const OFFICIAL_DRIVE_FOLDER_ID = "1pHjWF-WYlZolWwqpP0STOeSYAen4IEkw";

// Pusat Muat Turun Google Drive khusus untuk akses pelajar:
export const STUDENT_DOWNLOAD_DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/182780ntCyphzKmo92gWfxNfyrhx8UUvA?usp=drive_link";
export const STUDENT_DOWNLOAD_DRIVE_FOLDER_ID = "182780ntCyphzKmo92gWfxNfyrhx8UUvA";

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'stf-1',
    bil: 1,
    name: 'Nasrul Effendy bin Mat Nasir',
    position: 'Ketua Jabatan',
    extension: '6202',
    emailPrefix: 'nasrul.effendy',
    departmentScope: 'Pengurusan Tertinggi JHEP'
  },
  {
    id: 'stf-2',
    bil: 2,
    name: 'Syazwani binti Sobri',
    position: 'Pegawai Pengambilan dan Data I',
    extension: '6204',
    emailPrefix: 'syazwani',
    departmentScope: 'Bahagian Pengambilan Pelajar dan Data'
  },
  {
    id: 'stf-3',
    bil: 3,
    name: 'Nur Zatihanani binti Zuraini',
    position: 'Pegawai Pengambilan dan Data II',
    extension: '6204',
    emailPrefix: 'zatihanani',
    departmentScope: 'Bahagian Pengambilan Pelajar dan Data'
  },
  {
    id: 'stf-4',
    bil: 4,
    name: 'Mohd Ridzuan bin Omar',
    position: 'Pegawai Kebajikan dan Disiplin I',
    extension: '6205',
    emailPrefix: 'ridzuan',
    departmentScope: 'Bahagian Kebajikan dan Disiplin'
  },
  {
    id: 'stf-5',
    bil: 5,
    name: 'Siti Fatimah binti Ahmad',
    position: 'Pegawai Kebajikan dan Disiplin II',
    extension: '6205',
    emailPrefix: 's.fatimah',
    departmentScope: 'Bahagian Kebajikan dan Disiplin'
  },
  {
    id: 'stf-6',
    bil: 6,
    name: 'Dr. Ahmad Fauzi bin Hashim',
    position: 'Penyelaras ICT & Portal Siswa',
    extension: '6206',
    emailPrefix: 'ahmad.fauzi',
    departmentScope: 'Unit Digital & Pengurusan Rekod'
  }
];

export const INITIAL_ORG_CHART: OrgChartConfig = {
  imageUrl: '',
  title: 'Carta Organisasi Jabatan Hal Ehwal Pelajar PTSS',
  lastUpdated: '2026-10-24',
  viewMode: 'placeholder'
};

export const INITIAL_USER_ACCOUNTS: UserAccount[] = [
  // TAB PENGGUNA ADMIN (Google Sheets Tab: "Pengguna_Admin")
  {
    id: 'acc-admin-1',
    name: 'Dr. Ahmad Fauzi bin Hashim',
    email: 'admin@ptss.edu.my',
    password: 'admin1234',
    role: 'admin',
    staffId: 'PTSS-JHEP-001',
    department: 'Pentadbiran Utama / JHEP',
    twoFactorEnabled: true,
    status: 'Aktif',
    sheetRowIndex: 2
  },
  {
    id: 'acc-admin-2',
    name: 'Nasrul Effendy bin Mat Nasir',
    email: 'nasrul.effendy@ptss.edu.my',
    password: 'ketua1234',
    role: 'admin',
    staffId: 'PTSS-JHEP-002',
    department: 'Pengurusan Tertinggi JHEP',
    twoFactorEnabled: true,
    status: 'Aktif',
    sheetRowIndex: 3
  },
  
  // TAB PENGGUNA STAF (Google Sheets Tab: "Pengguna_Staf")
  {
    id: 'acc-staff-1',
    name: 'Puan Siti Nurhaliza binti Ramli',
    email: 'staf.jhep@ptss.edu.my',
    password: 'staf1234',
    role: 'staff',
    staffId: 'PTSS-JHEP-042',
    department: 'Bahagian Pengambilan & Data',
    twoFactorEnabled: true,
    status: 'Aktif',
    sheetRowIndex: 4
  },
  {
    id: 'acc-staff-2',
    name: 'Encik Muhammad Ridzuan bin Omar',
    email: 'ridzuan.kebajikan@ptss.edu.my',
    password: 'kebajikan1234',
    role: 'staff',
    staffId: 'PTSS-JHEP-077',
    department: 'Bahagian Kebajikan & Disiplin',
    twoFactorEnabled: true,
    status: 'Aktif',
    sheetRowIndex: 5
  },
  {
    id: 'acc-staff-3',
    name: 'Cik Syazwani binti Sobri',
    email: 'syazwani@ptss.edu.my',
    password: 'syazwani1234',
    role: 'staff',
    staffId: 'PTSS-JHEP-019',
    department: 'Bahagian Pengambilan Pelajar dan Data',
    twoFactorEnabled: true,
    status: 'Aktif',
    sheetRowIndex: 6
  }
];

export const INITIAL_EVENT_REGISTRATIONS: EventRegistration[] = [
  {
    id: 'reg-001',
    eventId: 'evt-1',
    eventTitle: 'Karnival Sahsiah & Kerjaya Siswa PTSS 2026',
    eventDate: '15 November 2026',
    studentName: 'Muhammad Danish bin Akmal',
    matricNo: '18DDT24F1001',
    department: 'JTMK',
    phone: '012-3456789',
    registeredAt: '2026-10-24 09:15 AM',
    meritPoints: 25,
    status: 'Disahkan',
    qrCodeValue: 'PTSS-EVT-EVT-1-18DDT24F1001'
  },
  {
    id: 'reg-002',
    eventId: 'evt-2',
    eventTitle: 'Bengkel Persediaan Temuduga & Penulisan Resume Profesional',
    eventDate: '22 November 2026',
    studentName: 'Nur Aina Nadhirah binti Azman',
    matricNo: '18DDT24F1002',
    department: 'JTMK',
    phone: '017-5678912',
    registeredAt: '2026-10-24 10:00 AM',
    meritPoints: 15,
    status: 'Disahkan',
    qrCodeValue: 'PTSS-EVT-EVT-2-18DDT24F1002'
  },
  {
    id: 'reg-003',
    eventId: 'evt-3',
    eventTitle: 'Kejohanan E-Sukan Politeknik Malaysia Zon Utara',
    eventDate: '05 Disember 2026',
    studentName: 'Amirul Harith bin Zulkifli',
    matricNo: '18DEP23F2045',
    department: 'JKE',
    phone: '019-8976523',
    registeredAt: '2026-10-24 10:30 AM',
    meritPoints: 20,
    status: 'Disahkan',
    qrCodeValue: 'PTSS-EVT-EVT-3-18DEP23F2045'
  },
  {
    id: 'reg-004',
    eventId: 'evt-1',
    eventTitle: 'Karnival Sahsiah & Kerjaya Siswa PTSS 2026',
    eventDate: '15 November 2026',
    studentName: 'Siti Sarah binti Mustapha',
    matricNo: '18DEP24F1018',
    department: 'JKE',
    phone: '013-3345129',
    registeredAt: '2026-10-24 11:15 AM',
    meritPoints: 25,
    status: 'Disahkan',
    qrCodeValue: 'PTSS-EVT-EVT-1-18DEP24F1018'
  },
  {
    id: 'reg-005',
    eventId: 'evt-1',
    eventTitle: 'Karnival Sahsiah & Kerjaya Siswa PTSS 2026',
    eventDate: '15 November 2026',
    studentName: 'Nor Syakila binti Razak',
    matricNo: '18DAT23F1034',
    department: 'JP',
    phone: '016-7788992',
    registeredAt: '2026-10-24 11:45 AM',
    meritPoints: 25,
    status: 'Disahkan',
    qrCodeValue: 'PTSS-EVT-EVT-1-18DAT23F1034'
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-admin-1',
    name: 'Dr. Ahmad Fauzi bin Hashim',
    email: 'admin@ptss.edu.my',
    role: 'admin',
    department: 'Pentadbiran Utama / JHEP',
    staffId: 'PTSS-JHEP-001',
    twoFactorEnabled: true,
  },
  {
    id: 'user-staff-1',
    name: 'Puan Siti Nurhaliza binti Ramli',
    email: 'staf.jhep@ptss.edu.my',
    role: 'staff',
    department: 'Bahagian Pengambilan & Data',
    staffId: 'PTSS-JHEP-042',
    twoFactorEnabled: true,
  },
  {
    id: 'user-staff-2',
    name: 'Encik Muhammad Ridzuan bin Omar',
    email: 'ridzuan.kebajikan@ptss.edu.my',
    role: 'staff',
    department: 'Bahagian Kebajikan & Disiplin',
    staffId: 'PTSS-JHEP-077',
    twoFactorEnabled: true,
  },
  {
    id: 'user-student-1',
    name: 'Muhammad Haziq bin Danial',
    email: 'pelajar@ptss.edu.my',
    role: 'pelajar',
    department: 'JTMK',
    staffId: '18DDT24F1022',
    twoFactorEnabled: false,
  }
];

export const INITIAL_BANNERS: BannerSlide[] = [
  {
    id: 'banner-1',
    tag: 'AKTIVITI & KELAB',
    title: 'Kenali Warga.',
    highlight: 'Temui Komuniti.',
    description: 'Sertai pelbagai kelab dan persatuan untuk memperkayakan pengalaman kehidupan kampus anda di PTSS.',
    gradientFrom: 'from-[#2e236c]',
    gradientTo: 'to-[#433d8b]'
  },
  {
    id: 'banner-2',
    tag: 'PENGAMBILAN & REKOD',
    title: 'Pengesahan Pendaftaran.',
    highlight: 'Semakan Mudah.',
    description: 'Semak status pendaftaran kursus, kad pintar pelajar dan rekod akademik rasmi dalam satu klik.',
    gradientFrom: 'from-[#1e1b4b]',
    gradientTo: 'to-[#312e81]'
  },
  {
    id: 'banner-3',
    tag: 'KEBAJIKAN & DISIPLIN',
    title: 'Bantuan Kewangan &',
    highlight: 'Kolej Kediaman.',
    description: 'Salurkan permohonan penajaan PTPTN, zakat, bantuan kecemasan dan penempatan asrama secara telus.',
    gradientFrom: 'from-[#4c0519]',
    gradientTo: 'to-[#831843]'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-001',
    matricNo: '18DDT24F1001',
    name: 'Muhammad Danish bin Akmal',
    icNo: '040512-09-5431',
    gender: 'Lelaki',
    department: 'JTMK',
    program: 'Diploma Teknologi Maklumat (Teknologi Digital)',
    semester: 4,
    cgpa: 3.82,
    phone: '012-4458921',
    email: 'danish.akmal@siswa.ptss.edu.my',
    hostelStatus: 'Menetap di Kolej Kediaman',
    sponsorshipStatus: 'PTPTN',
    meritPoints: 125,
    disciplinaryStatus: 'Bersih',
    enrollmentYear: 2024,
    createdAt: '2024-07-15T09:00:00Z'
  },
  {
    id: 'std-002',
    matricNo: '18DDT24F1002',
    name: 'Nur Aina Nadhirah binti Azman',
    icNo: '040823-02-6124',
    gender: 'Perempuan',
    department: 'JTMK',
    program: 'Diploma Teknologi Maklumat (Keselamatan Maklumat)',
    semester: 4,
    cgpa: 3.91,
    phone: '017-5678912',
    email: 'aina.nadhirah@siswa.ptss.edu.my',
    hostelStatus: 'Menetap di Kolej Kediaman',
    sponsorshipStatus: 'JPA',
    meritPoints: 140,
    disciplinaryStatus: 'Bersih',
    enrollmentYear: 2024,
    createdAt: '2024-07-15T09:15:00Z'
  },
  {
    id: 'std-003',
    matricNo: '18DEP23F2045',
    name: 'Amirul Harith bin Zulkifli',
    icNo: '031105-09-5117',
    gender: 'Lelaki',
    department: 'JKE',
    program: 'Diploma Kejuruteraan Elektronik (Komunikasi)',
    semester: 5,
    cgpa: 3.45,
    phone: '019-8976523',
    email: 'amirul.harith@siswa.ptss.edu.my',
    hostelStatus: 'Luar Kampus (NR)',
    sponsorshipStatus: 'PTPTN',
    meritPoints: 90,
    disciplinaryStatus: 'Bersih',
    enrollmentYear: 2023,
    createdAt: '2023-12-01T10:00:00Z'
  },
  {
    id: 'std-004',
    matricNo: '18DEP24F1018',
    name: 'Siti Sarah binti Mustapha',
    icNo: '040214-08-5922',
    gender: 'Perempuan',
    department: 'JKE',
    program: 'Diploma Kejuruteraan Elektrik & Elektronik',
    semester: 3,
    cgpa: 3.68,
    phone: '013-3345129',
    email: 'siti.sarah@siswa.ptss.edu.my',
    hostelStatus: 'Menetap di Kolej Kediaman',
    sponsorshipStatus: 'Yayasan Negeri',
    meritPoints: 110,
    disciplinaryStatus: 'Bersih',
    enrollmentYear: 2024,
    createdAt: '2024-07-15T11:00:00Z'
  },
  {
    id: 'std-005',
    matricNo: '18DKM23F1099',
    name: 'Muhammad Faris bin Zainal',
    icNo: '030919-09-5833',
    gender: 'Lelaki',
    department: 'JKM',
    program: 'Diploma Kejuruteraan Mekanikal',
    semester: 6,
    cgpa: 3.32,
    phone: '011-23456789',
    email: 'faris.zainal@siswa.ptss.edu.my',
    hostelStatus: 'Luar Kampus (NR)',
    sponsorshipStatus: 'PTPTN',
    meritPoints: 85,
    disciplinaryStatus: 'Bersih',
    enrollmentYear: 2023,
    createdAt: '2023-06-20T08:30:00Z'
  },
  {
    id: 'std-006',
    matricNo: '18DKM24F2012',
    name: 'Nurul Izzah binti Mansor',
    icNo: '041201-09-6014',
    gender: 'Perempuan',
    department: 'JKM',
    program: 'Diploma Kejuruteraan Mekanikal (Pembuatan)',
    semester: 2,
    cgpa: 3.55,
    phone: '018-9988771',
    email: 'nurul.izzah@siswa.ptss.edu.my',
    hostelStatus: 'Menetap di Kolej Kediaman',
    sponsorshipStatus: 'PTPTN',
    meritPoints: 95,
    disciplinaryStatus: 'Bersih',
    enrollmentYear: 2025,
    createdAt: '2025-01-10T09:20:00Z'
  },
  {
    id: 'std-007',
    matricNo: '18DAT23F1034',
    name: 'Nor Syakila binti Razak',
    icNo: '030422-02-5346',
    gender: 'Perempuan',
    department: 'JP',
    program: 'Diploma Akauntansi',
    semester: 5,
    cgpa: 3.88,
    phone: '016-7788992',
    email: 'syakila.razak@siswa.ptss.edu.my',
    hostelStatus: 'Menetap di Kolej Kediaman',
    sponsorshipStatus: 'MARA',
    meritPoints: 130,
    disciplinaryStatus: 'Bersih',
    enrollmentYear: 2023,
    createdAt: '2023-06-20T10:00:00Z'
  },
  {
    id: 'std-008',
    matricNo: '18DPM24F1055',
    name: 'Adam Luqman bin Shafiq',
    icNo: '040715-09-6231',
    gender: 'Lelaki',
    department: 'JP',
    program: 'Diploma Pengurusan Pemasaran',
    semester: 3,
    cgpa: 3.40,
    phone: '014-5566778',
    email: 'adam.luqman@siswa.ptss.edu.my',
    hostelStatus: 'Luar Kampus (NR)',
    sponsorshipStatus: 'PTPTN',
    meritPoints: 75,
    disciplinaryStatus: 'Amaran Ringan',
    enrollmentYear: 2024,
    createdAt: '2024-07-15T13:40:00Z'
  },
  {
    id: 'std-009',
    matricNo: '18DRG24F1011',
    name: 'Khairul Anuar bin Basir',
    icNo: '040118-09-5677',
    gender: 'Lelaki',
    department: 'JRKV',
    program: 'Diploma Rekabentuk Grafik',
    semester: 4,
    cgpa: 3.75,
    phone: '012-9876543',
    email: 'khairul.anuar@siswa.ptss.edu.my',
    hostelStatus: 'Menetap di Kolej Kediaman',
    sponsorshipStatus: 'PTPTN',
    meritPoints: 115,
    disciplinaryStatus: 'Bersih',
    enrollmentYear: 2024,
    createdAt: '2024-07-15T14:10:00Z'
  },
  {
    id: 'std-010',
    matricNo: '18DAG25F1008',
    name: 'Farah Nadia binti Kamaruddin',
    icNo: '050302-09-5562',
    gender: 'Perempuan',
    department: 'JRKV',
    program: 'Diploma Animasi & Media Digital',
    semester: 2,
    cgpa: 3.80,
    phone: '017-8899001',
    email: 'farah.nadia@siswa.ptss.edu.my',
    hostelStatus: 'Menetap di Kolej Kediaman',
    sponsorshipStatus: 'Yayasan Negeri',
    meritPoints: 105,
    disciplinaryStatus: 'Bersih',
    enrollmentYear: 2025,
    createdAt: '2025-01-10T11:00:00Z'
  },
  {
    id: 'std-011',
    matricNo: '18DDT25F1040',
    name: 'Imran Hakim bin Roslan',
    icNo: '050619-09-5991',
    gender: 'Lelaki',
    department: 'JTMK',
    program: 'Diploma Teknologi Maklumat (Teknologi Digital)',
    semester: 2,
    cgpa: 3.62,
    phone: '019-3322110',
    email: 'imran.hakim@siswa.ptss.edu.my',
    hostelStatus: 'Menetap di Kolej Kediaman',
    sponsorshipStatus: 'PTPTN',
    meritPoints: 80,
    disciplinaryStatus: 'Bersih',
    enrollmentYear: 2025,
    createdAt: '2025-01-10T12:00:00Z'
  },
  {
    id: 'std-012',
    matricNo: '18DAT24F2009',
    name: 'Anis Sofea binti Mohd Noor',
    icNo: '041011-09-6444',
    gender: 'Perempuan',
    department: 'JP',
    program: 'Diploma Kewangan & Perbankan Islam',
    semester: 3,
    cgpa: 3.94,
    phone: '013-4455667',
    email: 'anis.sofea@siswa.ptss.edu.my',
    hostelStatus: 'Menetap di Kolej Kediaman',
    sponsorshipStatus: 'PTPTN',
    meritPoints: 135,
    disciplinaryStatus: 'Bersih',
    enrollmentYear: 2024,
    createdAt: '2024-07-15T15:00:00Z'
  }
];

export const INITIAL_ACADEMIC_TRENDS: AcademicTrendYear[] = [
  {
    year: 2021,
    overallCgpa: 3.28,
    jtmkCgpa: 3.32,
    jkeCgpa: 3.20,
    jkmCgpa: 3.18,
    jpCgpa: 3.38,
    jrkvCgpa: 3.34,
    passRate: 94.2,
    deansListRate: 24.5
  },
  {
    year: 2022,
    overallCgpa: 3.35,
    jtmkCgpa: 3.40,
    jkeCgpa: 3.27,
    jkmCgpa: 3.24,
    jpCgpa: 3.44,
    jrkvCgpa: 3.41,
    passRate: 95.6,
    deansListRate: 28.0
  },
  {
    year: 2023,
    overallCgpa: 3.42,
    jtmkCgpa: 3.48,
    jkeCgpa: 3.33,
    jkmCgpa: 3.30,
    jpCgpa: 3.52,
    jrkvCgpa: 3.47,
    passRate: 96.8,
    deansListRate: 31.4
  },
  {
    year: 2024,
    overallCgpa: 3.49,
    jtmkCgpa: 3.55,
    jkeCgpa: 3.41,
    jkmCgpa: 3.38,
    jpCgpa: 3.58,
    jrkvCgpa: 3.53,
    passRate: 97.4,
    deansListRate: 34.8
  },
  {
    year: 2025,
    overallCgpa: 3.54,
    jtmkCgpa: 3.61,
    jkeCgpa: 3.46,
    jkmCgpa: 3.43,
    jpCgpa: 3.63,
    jrkvCgpa: 3.57,
    passRate: 98.1,
    deansListRate: 37.5
  },
  {
    year: 2026,
    overallCgpa: 3.58,
    jtmkCgpa: 3.66,
    jkeCgpa: 3.50,
    jkmCgpa: 3.47,
    jpCgpa: 3.67,
    jrkvCgpa: 3.60,
    passRate: 98.6,
    deansListRate: 39.2
  }
];

export const INITIAL_APPLICATIONS: HostelApplication[] = [
  {
    id: 'app-001',
    studentId: 'std-001',
    studentName: 'Muhammad Danish bin Akmal',
    matricNo: '18DDT24F1001',
    department: 'JTMK',
    roomType: 'Bilik Berdua',
    block: 'Blok A (Lelaki)',
    reason: 'Memerlukan kemudahan makmal komputer waktu malam untuk projek tahun akhir.',
    submissionDate: '2026-09-12',
    status: 'Lulus',
    reviewedBy: 'Encik Muhammad Ridzuan'
  },
  {
    id: 'app-002',
    studentId: 'std-008',
    studentName: 'Adam Luqman bin Shafiq',
    matricNo: '18DPM24F1055',
    department: 'JP',
    roomType: 'Bilik Berempat',
    block: 'Blok C (Lelaki)',
    reason: 'Kediaman keluarga di luar negeri Perlis (Ipoh, Perak). Mengalami masalah pengangkutan harian.',
    submissionDate: '2026-10-15',
    status: 'Dalam Semakan'
  },
  {
    id: 'app-003',
    studentId: 'std-005',
    studentName: 'Muhammad Faris bin Zainal',
    matricNo: '18DKM23F1099',
    department: 'JKM',
    roomType: 'Bilik Berdua',
    block: 'Blok B (Lelaki)',
    reason: 'Permohonan rayuan penempatan semester akhir latihan bengkel.',
    submissionDate: '2026-10-18',
    status: 'Ditolak',
    reviewedBy: 'Puan Siti Nurhaliza'
  }
];

export const INITIAL_DISCIPLINE: DisciplinaryRecord[] = [
  {
    id: 'disc-001',
    studentId: 'std-002',
    studentName: 'Nur Aina Nadhirah binti Azman',
    matricNo: '18DDT24F1002',
    department: 'JTMK',
    incidentType: 'Merit Aktiviti',
    points: 25,
    description: 'Pengarah Program Minggu Haluan Siswa (MHS) Sesi I 2026/2027.',
    date: '2026-08-20',
    officerInCharge: 'Dr. Ahmad Fauzi'
  },
  {
    id: 'disc-002',
    studentId: 'std-008',
    studentName: 'Adam Luqman bin Shafiq',
    matricNo: '18DPM24F1055',
    department: 'JP',
    incidentType: 'Pelanggaran Sahsiah Rupa Diri',
    points: -10,
    description: 'Tidak mematuhi etika pakaian rasmi kolej semasa hari kuliah.',
    date: '2026-09-05',
    officerInCharge: 'Encik Muhammad Ridzuan'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Sistem Sandaran Google Drive Aktif',
    message: 'Folder rasmi Drive 1pHjWF-WYlZolWwqpP0STOeSYAen4IEkw bersedia untuk sandaran automatik fail dan pangkalan data.',
    timestamp: 'Baru sahaja',
    category: 'Sandaran Drive',
    read: false,
    priority: 'high'
  },
  {
    id: 'notif-2',
    title: 'Pengesahan Dua Faktor (2FA) Diperketatkan',
    message: 'Semua akaun Admin dan Staf diwajibkan melepasi token OTP 6-digit sebelum mengakses rekod pelajar.',
    timestamp: '10 minit lalu',
    category: 'Keselamatan',
    read: false,
    priority: 'high'
  },
  {
    id: 'notif-3',
    title: 'Permohonan Asrama Baharu Diterima',
    message: 'Pelajar 18DPM24F1055 (Adam Luqman) telah menghantar borang rayuan penempatan kolej kediaman.',
    timestamp: '1 jam lalu',
    category: 'Permohonan',
    read: false,
    priority: 'normal'
  },
  {
    id: 'notif-4',
    title: 'Prestasi Akademik Sesi Terkini Dikemaskini',
    message: 'Purata HPNM semester terkini meningkat kepada 3.58 dengan kadar kelulusan 98.6%.',
    timestamp: 'Semalam',
    category: 'Pelajar',
    read: true,
    priority: 'normal'
  }
];

export const INITIAL_DRIVE_FILES: DriveFileItem[] = [
  {
    id: 'drive-01',
    name: 'Borang Permohonan Kemasukan Asrama PTSS Sesi 2026.pdf',
    category: 'Borang Rasmi',
    fileSize: '1.4 MB',
    mimeType: 'application/pdf',
    lastModified: '2026-10-18',
    driveUrl: OFFICIAL_DRIVE_FOLDER_URL,
    uploadedBy: 'JHEP Pentadbir',
    isBackedUpToCloud: true
  },
  {
    id: 'drive-02',
    name: 'Borang Bantuan Kebajikan & Tabung Amanah Pelajar.pdf',
    category: 'Borang Rasmi',
    fileSize: '890 KB',
    mimeType: 'application/pdf',
    lastModified: '2026-10-12',
    driveUrl: OFFICIAL_DRIVE_FOLDER_URL,
    uploadedBy: 'Bahagian Kebajikan',
    isBackedUpToCloud: true
  },
  {
    id: 'drive-03',
    name: 'Buku Panduan Sahsiah & Disiplin Pelajar PTSS Edisi 2026.pdf',
    category: 'Panduan Pelajar',
    fileSize: '4.8 MB',
    mimeType: 'application/pdf',
    lastModified: '2026-08-01',
    driveUrl: OFFICIAL_DRIVE_FOLDER_URL,
    uploadedBy: 'JHEP Pentadbir',
    isBackedUpToCloud: true
  },
  {
    id: 'drive-04',
    name: 'Pekeliling Tatatertib & Peraturan Kolej Kediaman.pdf',
    category: 'Pekeliling',
    fileSize: '1.1 MB',
    mimeType: 'application/pdf',
    lastModified: '2026-07-20',
    driveUrl: OFFICIAL_DRIVE_FOLDER_URL,
    uploadedBy: 'Ketua Warden',
    isBackedUpToCloud: true
  },
  {
    id: 'drive-05',
    name: 'Laporan Tahunan Prestasi Pelajar JHEP 2025-2026.pdf',
    category: 'Laporan',
    fileSize: '3.2 MB',
    mimeType: 'application/pdf',
    lastModified: '2026-10-20',
    driveUrl: OFFICIAL_DRIVE_FOLDER_URL,
    uploadedBy: 'Penyelaras Data JHEP',
    isBackedUpToCloud: true
  },
  {
    id: 'drive-06',
    name: 'Sandaran_PangkalanData_JHEP_PTSS_AutoBackup_2026.json',
    category: 'Sandaran Pangkalan Data',
    fileSize: '2.6 MB',
    mimeType: 'application/json',
    lastModified: '2026-10-24',
    driveUrl: OFFICIAL_DRIVE_FOLDER_URL,
    uploadedBy: 'Sistem Sandaran Automatik',
    isBackedUpToCloud: true
  }
];

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Bagaimana saya menggunakan portal ini?',
    answer: 'Maklumat komuniti boleh dibaca tanpa log masuk. Untuk mengurus permohonan atau rekod, log masuk menggunakan akaun yang didaftarkan oleh pentadbir.',
    isOpen: true
  },
  {
    id: 'faq-2',
    question: 'Di mana saya boleh mendapatkan borang dan dokumen?',
    answer: 'Pilih Dokumen & Borang untuk meneroka direktori. Butang Google Drive membuka repositori jabatan mengikut kebenaran akaun Google anda.',
    isOpen: true
  },
  {
    id: 'faq-3',
    question: 'Bagaimana pentadbir menambah halaman baharu?',
    answer: 'Pentadbir yang telah log masuk dengan pengesahan dua faktor (2FA) boleh menggunakan menu CRUD & Pengurusan Laman untuk menyunting teks pengenalan, menambah borang, atau mengemaskini maklumat staf secara masa nyata.',
    isOpen: false
  },
  {
    id: 'faq-4',
    question: 'Siapakah yang layak memohon penempatan Kolej Kediaman PTSS?',
    answer: 'Keutamaan penempatan diberikan kepada pelajar semester 1 (kemasukan baharu), Majlis Perwakilan Pelajar (MPP), Jawatankuasa Kolej Kediaman (JKK), atlet politeknik, dan pelajar yang mempunyai merit sahsiah yang cemerlang serta faktor jarak luar kawasan.',
    isOpen: false
  },
  {
    id: 'faq-5',
    question: 'Bagaimanakah integrasi storan Google Drive diuruskan?',
    answer: 'Penyimpanan dan sandaran fail disambungkan terus ke folder rasmi Google Drive PTSS (ID: 1pHjWF-WYlZolWwqpP0STOeSYAen4IEkw). Hanya akaun Admin dan Staf dengan kebenaran sah boleh mengakses pautan dan memulakan sandaran.',
    isOpen: false
  }
];

export const DEPARTMENT_DETAILS = {
  JTMK: {
    name: 'Jabatan Teknologi Maklumat & Komunikasi',
    shortName: 'JTMK',
    head: 'Ts. Noor Hidayah binti Che Mat',
    color: '#3B82F6',
    accent: 'bg-blue-500'
  },
  JKE: {
    name: 'Jabatan Kejuruteraan Elektrik',
    shortName: 'JKE',
    head: 'Ir. Zulkifli bin Ismail',
    color: '#8B5CF6',
    accent: 'bg-purple-500'
  },
  JKM: {
    name: 'Jabatan Kejuruteraan Mekanikal',
    shortName: 'JKM',
    head: 'Ts. Dr. Roslan bin Abdul Aziz',
    color: '#EC4899',
    accent: 'bg-pink-500'
  },
  JP: {
    name: 'Jabatan Perdagangan',
    shortName: 'JP',
    head: 'Puan Salmah binti Othman',
    color: '#10B981',
    accent: 'bg-emerald-500'
  },
  JRKV: {
    name: 'Jabatan Rekabentuk & Komunikasi Visual',
    shortName: 'JRKV',
    head: 'Encik Azizi bin Mansor',
    color: '#F59E0B',
    accent: 'bg-amber-500'
  }
};
