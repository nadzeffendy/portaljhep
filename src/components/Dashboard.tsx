import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  TrendingUp,
  Award,
  GraduationCap,
  Building2,
  FileDown,
  RefreshCw,
  Sparkles,
  Layers,
  CheckCircle,
  Calendar,
  Activity
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEPARTMENT_DETAILS } from '../data/mockData';
import { DepartmentCode } from '../types';

export const Dashboard: React.FC = () => {
  const {
    students,
    academicTrends,
    addStudent,
    setReportModalOpen,
    addNotification
  } = useApp();

  const [selectedDeptFilter, setSelectedDeptFilter] = useState<'ALL' | DepartmentCode>('ALL');
  const [selectedMetric, setSelectedMetric] = useState<'cgpa' | 'passRate' | 'deansList'>('cgpa');
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [isSimulatingLive, setIsSimulatingLive] = useState(false);

  // Live simulation ticker
  useEffect(() => {
    if (!isSimulatingLive) return;
    const interval = setInterval(() => {
      const sampleNames = ['Aiman Daniel', 'Nurul Fasihah', 'Haziq Firdaus', 'Siti Zulaikha', 'Muhammad Syamil'];
      const sampleDepts: DepartmentCode[] = ['JTMK', 'JKE', 'JKM', 'JP', 'JRKV'];
      const randomDept = sampleDepts[Math.floor(Math.random() * sampleDepts.length)];
      const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)] + ' ' + Math.floor(Math.random() * 100);
      const isFemale = randomName.includes('Nurul') || randomName.includes('Siti');
      const randomMatric = `18D${randomDept.slice(0, 2)}26F${Math.floor(1000 + Math.random() * 9000)}`;

      addStudent({
        matricNo: randomMatric,
        name: randomName,
        icNo: '060101-09-' + Math.floor(1000 + Math.random() * 9000),
        gender: isFemale ? 'Perempuan' : 'Lelaki',
        department: randomDept,
        program: `Diploma ${randomDept} PTSS`,
        semester: 1,
        cgpa: parseFloat((3.2 + Math.random() * 0.7).toFixed(2)),
        phone: '012-' + Math.floor(1000000 + Math.random() * 9000000),
        email: `${randomMatric.toLowerCase()}@siswa.ptss.edu.my`,
        hostelStatus: 'Menetap di Kolej Kediaman',
        sponsorshipStatus: 'PTPTN',
        meritPoints: 80,
        disciplinaryStatus: 'Bersih',
        enrollmentYear: 2026
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [isSimulatingLive, addStudent]);

  // Derived statistics
  const totalStudents = students.length;
  const maleCount = students.filter(s => s.gender === 'Lelaki').length;
  const femaleCount = students.filter(s => s.gender === 'Perempuan').length;
  const malePercentage = totalStudents > 0 ? Math.round((maleCount / totalStudents) * 100) : 0;
  const femalePercentage = totalStudents > 0 ? Math.round((femaleCount / totalStudents) * 100) : 0;

  const currentYearTrend = academicTrends[academicTrends.length - 1];
  const overallAvgCgpa = (students.reduce((acc, s) => acc + s.cgpa, 0) / (totalStudents || 1)).toFixed(2);
  const deansListCount = students.filter(s => s.cgpa >= 3.50).length;
  const deansListPercent = totalStudents > 0 ? Math.round((deansListCount / totalStudents) * 100) : 0;

  // Department counts
  const deptList: DepartmentCode[] = ['JTMK', 'JKE', 'JKM', 'JP', 'JRKV'];
  const departmentStats = deptList.map(code => {
    const list = students.filter(s => s.department === code);
    const m = list.filter(s => s.gender === 'Lelaki').length;
    const f = list.filter(s => s.gender === 'Perempuan').length;
    const avg = list.length > 0 ? (list.reduce((a, b) => a + b.cgpa, 0) / list.length).toFixed(2) : '3.50';
    return {
      code,
      meta: DEPARTMENT_DETAILS[code],
      count: list.length,
      male: m,
      female: f,
      avgCgpa: avg,
      percentage: totalStudents > 0 ? Math.round((list.length / totalStudents) * 100) : 0
    };
  });

  // Graph Data Calculation
  const getMetricValue = (trend: any) => {
    if (selectedMetric === 'passRate') return trend.passRate;
    if (selectedMetric === 'deansList') return trend.deansListRate;
    // cgpa
    if (selectedDeptFilter === 'ALL') return trend.overallCgpa;
    if (selectedDeptFilter === 'JTMK') return trend.jtmkCgpa;
    if (selectedDeptFilter === 'JKE') return trend.jkeCgpa;
    if (selectedDeptFilter === 'JKM') return trend.jkmCgpa;
    if (selectedDeptFilter === 'JP') return trend.jpCgpa;
    if (selectedDeptFilter === 'JRKV') return trend.jrkvCgpa;
    return trend.overallCgpa;
  };

  const metricLabel = {
    cgpa: 'Purata HPNM / CGPA (Skala 4.00)',
    passRate: 'Kadar Kelulusan Keseluruhan (%)',
    deansList: 'Peratusan Pelajar Cemerlang ANC / Dekan (%)'
  }[selectedMetric];

  // SVG Chart Dimensions
  const chartHeight = 220;
  const chartWidth = 600;
  const paddingX = 40;
  const paddingY = 30;

  const values = academicTrends.map(t => getMetricValue(t));
  const minVal = selectedMetric === 'cgpa' ? 3.0 : 20;
  const maxVal = selectedMetric === 'cgpa' ? 4.0 : 100;

  const getYCoord = (val: number) => {
    const ratio = (val - minVal) / (maxVal - minVal);
    return chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
  };

  const getXCoord = (index: number) => {
    const step = (chartWidth - paddingX * 2) / (academicTrends.length - 1);
    return paddingX + index * step;
  };

  // Generate SVG Path
  const points = academicTrends.map((t, idx) => ({
    x: getXCoord(idx),
    y: getYCoord(getMetricValue(t)),
    val: getMetricValue(t),
    year: t.year
  }));

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* Top Banner & Control Strip */}
      <div className="bg-gradient-to-r from-[#2E236C] via-[#382B7D] to-[#433D8B] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-rose-500/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-300 text-xs font-bold mb-3 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Sistem Pemantauan JHEP Digital Masa Nyata</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dashboard Analitik Pelajar PTSS
            </h1>
            <p className="text-sm text-indigo-200 mt-1 max-w-xl">
              Paparan menyeluruh statistik bilangan pelajar, nisbah jantina, taburan jabatan akademik, serta graf aliran prestasi tahunan interaktif.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live simulation button */}
            <button
              onClick={() => {
                setIsSimulatingLive(!isSimulatingLive);
                addNotification(
                  isSimulatingLive ? 'Simulasi Dimatikan' : 'Simulasi Masa Nyata Aktif',
                  isSimulatingLive ? 'Suapan data ujian dihentikan.' : 'Suapan penambahan data pelajar baharu secara langsung diaktifkan.',
                  'Sistem'
                );
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                isSimulatingLive
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600 ring-2 ring-emerald-300'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <Activity className={`w-4 h-4 ${isSimulatingLive ? 'animate-bounce' : ''}`} />
              <span>{isSimulatingLive ? 'Live Stream: Aktif' : 'Uji Kemasukan Masa Nyata'}</span>
            </button>

            {/* Quick PDF Report Trigger */}
            <button
              onClick={() => setReportModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white flex items-center gap-2 shadow-lg shadow-rose-500/30 transition-transform active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              <span>Jana Laporan PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Students */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Jumlah Pelajar Berdaftar
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {totalStudents.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              +12.4% <span className="text-slate-400 font-normal ml-1">sesi ini</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Merangkumi 5 Jabatan Akademik utama di Politeknik Tuanku Syed Sirajuddin.
          </p>
        </div>

        {/* Card 2: Gender Ratio */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pecahan Jantina
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm font-bold text-slate-800 mb-2">
            <span className="text-blue-600 flex items-center gap-1">
              Lelaki: {maleCount} ({malePercentage}%)
            </span>
            <span className="text-pink-600 flex items-center gap-1">
              Perempuan: {femaleCount} ({femalePercentage}%)
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden flex">
            <div
              className="bg-blue-500 h-full transition-all duration-500"
              style={{ width: `${malePercentage}%` }}
              title={`Lelaki: ${malePercentage}%`}
            />
            <div
              className="bg-pink-500 h-full transition-all duration-500"
              style={{ width: `${femalePercentage}%` }}
              title={`Perempuan: ${femalePercentage}%`}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Nisbah seimbang dengan sokongan penempatan asrama dan kebajikan menyeluruh.
          </p>
        </div>

        {/* Card 3: Academic Performance HPNM */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Purata HPNM Semasa
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">
              {overallAvgCgpa}
            </span>
            <span className="text-xs font-semibold text-slate-400">/ 4.00</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
              Cemerlang
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {deansListPercent}% pelajar memperoleh HPNM ≥ 3.50 (Anugerah Ketua Jabatan).
          </p>
        </div>

        {/* Card 4: Passing Rate & Welfare */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Kadar Kelulusan Sesi 2026
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentYearTrend?.passRate || 98.6}%
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              ↑ 0.5% peningkatan
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Sokongan bimbingan penasihat akademik dan kebajikan aktif melalui portal JHEP.
          </p>
        </div>

      </div>

      {/* Main Interactive Academic Trend Graph Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
        
        {/* Graph Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Graf Aliran Prestasi Akademik Tahunan Interaktif
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Pantau perkembangan HPNM, kadar kelulusan dan senarai dekan dari tahun 2021 hingga 2026 mengikut jabatan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Metric Switcher */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs">
              <button
                onClick={() => setSelectedMetric('cgpa')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedMetric === 'cgpa'
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Purata HPNM
              </button>
              <button
                onClick={() => setSelectedMetric('passRate')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedMetric === 'passRate'
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Kadar Kelulusan %
              </button>
              <button
                onClick={() => setSelectedMetric('deansList')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedMetric === 'deansList'
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pelajar Cemerlang %
              </button>
            </div>

            {/* Department Filter for CGPA */}
            {selectedMetric === 'cgpa' && (
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              >
                <option value="ALL">Semua Jabatan PTSS</option>
                <option value="JTMK">JTMK (Teknologi Maklumat)</option>
                <option value="JKE">JKE (Kejuruteraan Elektrik)</option>
                <option value="JKM">JKM (Kejuruteraan Mekanikal)</option>
                <option value="JP">JP (Perdagangan)</option>
                <option value="JRKV">JRKV (Rekabentuk Visual)</option>
              </select>
            )}
          </div>
        </div>

        {/* Current Filter Indicator */}
        <div className="py-3 flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-700">
            Metrik Dipaparkan: <strong className="text-rose-600">{metricLabel}</strong>
            {selectedMetric === 'cgpa' && ` [${selectedDeptFilter === 'ALL' ? 'Purata Keseluruhan Politeknik' : selectedDeptFilter}]`}
          </span>
          <span className="text-[11px] text-slate-400">
            *Layarkan kursor tetikus ke atas titik graf untuk butiran terperinci
          </span>
        </div>

        {/* Interactive SVG Chart Container */}
        <div className="relative w-full overflow-x-auto pt-4 pb-2">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-64 sm:h-72 overflow-visible select-none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E11D48" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#E11D48" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = chartHeight - paddingY - pct * (chartHeight - paddingY * 2);
              const labelVal = (minVal + pct * (maxVal - minVal)).toFixed(selectedMetric === 'cgpa' ? 2 : 0);
              return (
                <g key={idx}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="#F1F5F9"
                    strokeWidth="1"
                    strokeDasharray={idx === 0 ? "0" : "4 4"}
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[10px] fill-slate-400 font-mono"
                  >
                    {labelVal}{selectedMetric !== 'cgpa' ? '%' : ''}
                  </text>
                </g>
              );
            })}

            {/* Filled Area */}
            <path d={areaD} fill="url(#chartGradient)" />

            {/* Main Trend Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#E11D48"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Data Points */}
            {points.map((pt, idx) => {
              const isHovered = hoveredYear === pt.year;
              return (
                <g
                  key={idx}
                  onMouseEnter={() => setHoveredYear(pt.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulse */}
                  {isHovered && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="12"
                      className="fill-rose-500/20 animate-ping"
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 7 : 5}
                    className="fill-white stroke-rose-600 stroke-3 transition-all group-hover:scale-125"
                  />

                  {/* Year Label */}
                  <text
                    x={pt.x}
                    y={chartHeight - 10}
                    textAnchor="middle"
                    className={`text-[11px] font-bold ${
                      isHovered ? 'fill-rose-600' : 'fill-slate-600'
                    }`}
                  >
                    {pt.year}
                  </text>

                  {/* Tooltip on Node */}
                  {isHovered && (
                    <g transform={`translate(${pt.x}, ${pt.y - 45})`}>
                      <rect
                        x="-45"
                        y="0"
                        width="90"
                        height="35"
                        rx="8"
                        fill="#1E1B4B"
                        className="shadow-xl"
                      />
                      <polygon points="-5,35 5,35 0,40" fill="#1E1B4B" />
                      <text
                        x="0"
                        y="15"
                        textAnchor="middle"
                        fill="#F43F5E"
                        className="text-[9px] font-bold"
                      >
                        Tahun {pt.year}
                      </text>
                      <text
                        x="0"
                        y="28"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        className="text-[12px] font-black font-mono"
                      >
                        {pt.val.toFixed(2)}{selectedMetric !== 'cgpa' ? '%' : ''}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Annual Breakdown Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-100">
          {academicTrends.map((trend) => {
            const isHovered = hoveredYear === trend.year;
            return (
              <div
                key={trend.year}
                onMouseEnter={() => setHoveredYear(trend.year)}
                onMouseLeave={() => setHoveredYear(null)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isHovered
                    ? 'border-rose-500 bg-rose-50/50 shadow-md ring-1 ring-rose-500'
                    : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100'
                }`}
              >
                <span className="text-[11px] font-bold text-slate-500 block">
                  Tahun {trend.year}
                </span>
                <span className="text-base font-extrabold text-slate-900 block mt-0.5">
                  {trend.overallCgpa.toFixed(2)}
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 block mt-0.5">
                  Lulus: {trend.passRate}%
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Department Breakdown Section (Bilangan Pelajar Mengikut Jabatan) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <span>Taburan Pelajar Mengikut Jabatan Akademik PTSS</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Pecahan data bilangan pelajar lelaki dan perempuan bagi setiap jabatan serta ketua jabatan bertanggungjawab.
            </p>
          </div>

          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 self-start sm:self-auto">
            5 Jabatan Berdaftar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {departmentStats.map((item) => (
            <div
              key={item.code}
              className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 shadow-2xs">
                    {item.code}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 mt-2 line-clamp-1 group-hover:text-rose-600 transition-colors">
                    {item.meta.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Ketua: {item.meta.head}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-md"
                  style={{ backgroundColor: item.meta.color }}
                >
                  {item.percentage}%
                </div>
              </div>

              {/* Counts & Progress */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">Jumlah Pelajar:</span>
                  <span className="font-bold text-slate-900">{item.count} Orang</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">Lelaki / Perempuan:</span>
                  <span className="font-bold text-slate-700">{item.male} L / {item.female} P</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">Purata HPNM:</span>
                  <span className="font-bold text-emerald-600">{item.avgCgpa}</span>
                </div>

                {/* Bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage * 3.5}%`,
                      backgroundColor: item.meta.color
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
