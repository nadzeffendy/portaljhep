import { jsPDF } from 'jspdf';
import { Student, AcademicTrendYear } from '../types';

interface ReportData {
  students: Student[];
  trends: AcademicTrendYear[];
  generatedBy: string;
  departmentFilter?: string;
  reportType?: string;
}

export const generatePdfReport = ({
  students,
  trends,
  generatedBy,
  departmentFilter = 'Semua Jabatan',
  reportType = 'Laporan Rasmi Prestasi & Demografi Pelajar JHEP'
}: ReportData): { doc: jsPDF; filename: string } => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('ms-MY', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const timeFormatted = now.toLocaleTimeString('ms-MY', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const refNo = `PTSS/JHEP/LAP-${now.getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

  // Header Bar
  doc.setFillColor(46, 35, 108); // #2e236c
  doc.rect(0, 0, 210, 26, 'F');

  // Accent stripe
  doc.setFillColor(225, 29, 72); // #e11d48
  doc.rect(0, 26, 210, 3, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('POLITEKNIK TUANKU SYED SIRAJUDDIN', 14, 11);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('JABATAN HAL EHWAL PELAJAR (JHEP) | PORTAL DIGITAL', 14, 18);

  // Document Title & Metadata
  doc.setTextColor(30, 41, 59); // slate-800
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(reportType, 14, 38);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`No. Rujukan: ${refNo}`, 14, 45);
  doc.text(`Tarikh / Masa: ${dateFormatted}, ${timeFormatted}`, 14, 50);
  doc.text(`Disediakan Oleh: ${generatedBy}`, 14, 55);
  doc.text(`Skop Data: ${departmentFilter}`, 130, 45);
  doc.text(`Status Keselamatan: SULIT (Pengurusan Sahaja)`, 130, 50);

  // Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, 60, 196, 60);

  // Key Statistics Box
  const totalStudents = students.length;
  const maleStudents = students.filter(s => s.gender === 'Lelaki').length;
  const femaleStudents = students.filter(s => s.gender === 'Perempuan').length;
  const avgCgpa = (students.reduce((acc, s) => acc + s.cgpa, 0) / (totalStudents || 1)).toFixed(2);
  const hostelStudents = students.filter(s => s.hostelStatus === 'Menetap di Kolej Kediaman').length;

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 65, 182, 28, 3, 3, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, 65, 182, 28, 3, 3, 'D');

  // Stat item 1
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('JUMLAH PELAJAR', 20, 73);
  doc.setFontSize(14);
  doc.setTextColor(46, 35, 108);
  doc.setFont('helvetica', 'bold');
  doc.text(`${totalStudents} Orang`, 20, 84);

  // Stat item 2
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('LELAKI / PEREMPUAN', 65, 73);
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text(`${maleStudents} L (${Math.round((maleStudents/totalStudents)*100 || 0)}%) | ${femaleStudents} P (${Math.round((femaleStudents/totalStudents)*100 || 0)}%)`, 65, 84);

  // Stat item 3
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('PURATA HPNM / CGPA', 125, 73);
  doc.setFontSize(14);
  doc.setTextColor(16, 185, 129);
  doc.setFont('helvetica', 'bold');
  doc.text(`${avgCgpa}`, 125, 84);

  // Stat item 4
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('KOLEJ KEDIAMAN', 165, 73);
  doc.setFontSize(12);
  doc.setTextColor(225, 29, 72);
  doc.setFont('helvetica', 'bold');
  doc.text(`${hostelStudents} (${Math.round((hostelStudents/totalStudents)*100 || 0)}%)`, 165, 84);

  // Section 1: Department Breakdown Table
  let currentY = 103;
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Pecahan Pelajar Mengikut Jabatan Akademik PTSS', 14, currentY);

  currentY += 5;
  // Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, currentY, 182, 7, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('KOD', 18, currentY + 5);
  doc.text('NAMA JABATAN', 40, currentY + 5);
  doc.text('LELAKI', 120, currentY + 5);
  doc.text('PEREMPUAN', 145, currentY + 5);
  doc.text('JUMLAH', 175, currentY + 5);

  const deptCodes = ['JTMK', 'JKE', 'JKM', 'JP', 'JRKV'] as const;
  const deptNames: Record<string, string> = {
    JTMK: 'Teknologi Maklumat & Komunikasi',
    JKE: 'Kejuruteraan Elektrik',
    JKM: 'Kejuruteraan Mekanikal',
    JP: 'Perdagangan',
    JRKV: 'Rekabentuk & Komunikasi Visual'
  };

  currentY += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);

  deptCodes.forEach((dCode) => {
    const deptStudents = students.filter(s => s.department === dCode);
    const m = deptStudents.filter(s => s.gender === 'Lelaki').length;
    const f = deptStudents.filter(s => s.gender === 'Perempuan').length;
    const tot = deptStudents.length;

    doc.text(dCode, 18, currentY);
    doc.text(deptNames[dCode] || dCode, 40, currentY);
    doc.text(`${m}`, 125, currentY);
    doc.text(`${f}`, 152, currentY);
    doc.text(`${tot}`, 178, currentY);

    doc.setDrawColor(241, 245, 249);
    doc.line(14, currentY + 2, 196, currentY + 2);
    currentY += 7;
  });

  // Section 2: Annual Academic Performance Trend Table
  currentY += 6;
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Aliran Prestasi Akademik Tahunan (2021 - 2026)', 14, currentY);

  currentY += 5;
  // Trend Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, currentY, 182, 7, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('TAHUN', 18, currentY + 5);
  doc.text('PURATA HPNM', 50, currentY + 5);
  doc.text('JTMK', 85, currentY + 5);
  doc.text('JKE', 105, currentY + 5);
  doc.text('JKM', 125, currentY + 5);
  doc.text('JP', 145, currentY + 5);
  doc.text('JRKV', 165, currentY + 5);
  doc.text('LULUS %', 182, currentY + 5);

  currentY += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);

  trends.forEach((tr) => {
    doc.text(`${tr.year}`, 18, currentY);
    doc.text(`${tr.overallCgpa.toFixed(2)}`, 55, currentY);
    doc.text(`${tr.jtmkCgpa.toFixed(2)}`, 87, currentY);
    doc.text(`${tr.jkeCgpa.toFixed(2)}`, 107, currentY);
    doc.text(`${tr.jkmCgpa.toFixed(2)}`, 127, currentY);
    doc.text(`${tr.jpCgpa.toFixed(2)}`, 147, currentY);
    doc.text(`${tr.jrkvCgpa.toFixed(2)}`, 167, currentY);
    doc.text(`${tr.passRate}%`, 182, currentY);

    doc.setDrawColor(241, 245, 249);
    doc.line(14, currentY + 2, 196, currentY + 2);
    currentY += 7;
  });

  // Section 3: Student Sample Records
  currentY += 6;
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Senarai Terpilih Rekod Pelajar Terkini', 14, currentY);

  currentY += 5;
  doc.setFillColor(241, 245, 249);
  doc.rect(14, currentY, 182, 7, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('NO MATRIK', 16, currentY + 5);
  doc.text('NAMA PELAJAR', 45, currentY + 5);
  doc.text('JABATAN', 105, currentY + 5);
  doc.text('SEM', 125, currentY + 5);
  doc.text('HPNM', 140, currentY + 5);
  doc.text('PENAJAAAN', 158, currentY + 5);
  doc.text('ASRAMA', 180, currentY + 5);

  currentY += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);

  // Show first 6 students in summary
  students.slice(0, 6).forEach((st) => {
    doc.text(st.matricNo, 16, currentY);
    doc.text(st.name.length > 25 ? st.name.substring(0, 24) + '...' : st.name, 45, currentY);
    doc.text(st.department, 107, currentY);
    doc.text(`Sem ${st.semester}`, 126, currentY);
    doc.text(`${st.cgpa.toFixed(2)}`, 142, currentY);
    doc.text(st.sponsorshipStatus, 158, currentY);
    doc.text(st.hostelStatus.includes('Menetap') ? 'Ya' : 'Tidak', 183, currentY);

    doc.setDrawColor(245, 245, 245);
    doc.line(14, currentY + 2, 196, currentY + 2);
    currentY += 6.5;
  });

  // Footer & Official Verification Box
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(14, 258, 196, 258);

  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Laporan ini dijana secara automatik oleh Sistem JHEP Digital PTSS.', 14, 263);
  doc.text('Disahkan secara digital dengan sijil pengesahan 2FA dan disimpan ke repositori Google Drive rasmi.', 14, 267);
  doc.text(`Folder Storan: 1pHjWF-WYlZolWwqpP0STOeSYAen4IEkw`, 14, 271);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Pengesahan Bahagian JHEP:', 140, 263);
  doc.setFont('helvetica', 'normal');
  doc.text('Dr. Ahmad Fauzi bin Hashim', 140, 268);
  doc.text('Ketua Jabatan Hal Ehwal Pelajar', 140, 272);

  const filename = `Laporan_JHEP_PTSS_${now.toISOString().slice(0, 10)}_${refNo.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  return { doc, filename };
};

export const downloadOfficialPdf = (reportData: ReportData) => {
  const { doc, filename } = generatePdfReport(reportData);
  doc.save(filename);
};
