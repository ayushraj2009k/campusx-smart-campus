import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Calendar, Clock, MapPin, Navigation, Bell, 
  AlertTriangle, CheckCircle2, ChevronRight, Sparkles, 
  Flame, ShieldCheck, QrCode, Unlock, Lock, Download, 
  Copy, Check, ExternalLink, Play, Film, Award, UserCheck
} from 'lucide-react';

interface StudentPortalProps {
  onOpenNavigation?: (roomOrBuilding: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ onOpenNavigation }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'exams' | 'pass' | 'alerts'>('schedule');
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('ALL');
  const [turnstileUnlocked, setTurnstileUnlocked] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  // Student Profile Data
  const student = {
    name: 'Priya Nayak',
    rollNo: '23CS01048',
    branch: 'Computer Science & Engineering',
    year: 'Year 3 (Semester 6)',
    group: 'CSE-3',
    advisor: 'Dr. Sunita Rao',
    cgpa: '9.24',
    attendance: '94.8%'
  };

  // Real QR Code String for Smartphone Readers
  const qrRawData = `STUDENT PASS: Chilika Institute of Technology / IIT Bhubaneswar | Student: Priya Nayak | Roll: 23CS01048 | Branch: CSE Year 3 | Status: ACTIVE & ENROLLED | Valid Thru: Dec 2026`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(qrRawData)}`;

  // Live Exam Countdown (Week 8 Midsems)
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 14,
    minutes: 28,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const studentSchedule = [
    { 
      day: 'MON', 
      period: 'P4', 
      time: '11:00 - 12:00', 
      course: 'CS301: Algorithms & Complexity', 
      room: 'LH-4', 
      building: 'Lalitgiri Hall of Learning (LHL)', 
      faculty: 'Dr. Sunita Rao', 
      type: 'Core Lecture',
      isNow: true,
      desc: 'Dynamic programming, minimum spanning trees, amortized analysis'
    },
    { 
      day: 'TUE', 
      period: 'P2', 
      time: '09:00 - 10:00', 
      course: 'OE301: Renewable Energy Systems', 
      room: 'LH-3', 
      building: 'Lalitgiri Hall of Learning (LHL)', 
      faculty: 'Prof. R. Mishra', 
      type: 'Elective Basket OEB-1',
      isNow: false,
      desc: 'Synchronized cross-department elective slot with no clashing'
    },
    { 
      day: 'WED', 
      period: 'P3', 
      time: '10:00 - 11:00', 
      course: 'CS302: Operating Systems Internals', 
      room: 'LH-1', 
      building: 'Lalitgiri Hall of Learning (LHL)', 
      faculty: 'Prof. Deepa Nair', 
      type: 'Core Lecture',
      isNow: false,
      desc: 'Virtual memory paging, TLB hierarchies, and kernel mutex concurrency'
    },
    { 
      day: 'THU', 
      period: 'P6-P8', 
      time: '14:00 - 17:00', 
      course: 'CS391: Networks & Distributed Systems Lab', 
      room: 'CS-LAB-2', 
      building: 'School of Electrical Sciences (SES)', 
      faculty: 'Prof. Alok Gupta', 
      type: 'Hands-on Lab',
      isNow: false,
      desc: '3-hour lab block scheduled strictly post-lunch (P6 to P8) per hard constraints'
    },
    { 
      day: 'FRI', 
      period: 'P2', 
      time: '09:00 - 10:00', 
      course: 'CS303: Computer Networks & Protocols', 
      room: 'LH-3', 
      building: 'Lalitgiri Hall of Learning (LHL)', 
      faculty: 'Prof. Deepa Nair', 
      type: 'Core Lecture',
      isNow: false,
      desc: 'BGP routing, TCP congestion control and software-defined networks'
    },
  ];

  const studentExams = [
    { 
      id: 'EX-CS301', 
      course: 'CS301: Algorithms & Complexity', 
      day: 'MON (Week 8)', 
      session: 'AM Session', 
      time: '09:30 - 11:30', 
      room: 'LH-1, LH-2', 
      capacityRule: 'Halved (Max 50/hall)',
      seat: 'Hall LH-1, Desk 24'
    },
    { 
      id: 'EX-CS302', 
      course: 'CS302: Operating Systems Internals', 
      day: 'WED (Week 8)', 
      session: 'AM Session', 
      time: '09:30 - 11:30', 
      room: 'LH-4', 
      capacityRule: 'Halved (Max 40/hall)',
      seat: 'Hall LH-4, Desk 12'
    },
    { 
      id: 'EX-CS303', 
      course: 'CS303: Computer Networks', 
      day: 'FRI (Week 8)', 
      session: 'AM Session', 
      time: '09:30 - 11:30', 
      room: 'LH-3', 
      capacityRule: 'Halved (Max 40/hall)',
      seat: 'Hall LH-3, Desk 31'
    },
    { 
      id: 'EX-OE-BASKET', 
      course: 'Open Elective (OE301 / OE302 / OE303)', 
      day: 'SAT (Week 8)', 
      session: 'AM Session', 
      time: '09:30 - 11:30', 
      room: 'AUD, LH-1', 
      capacityRule: 'Halved (300 in AUD, 50 in LH-1)',
      seat: 'Auditorium Bay B, Desk 104'
    }
  ];

  const handleSimulateTurnstile = () => {
    setTurnstileUnlocked(true);
    setTimeout(() => setTurnstileUnlocked(false), 5000);
  };

  const handleCopyPass = () => {
    navigator.clipboard.writeText(qrRawData);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2500);
  };

  const filteredSchedule = selectedDayFilter === 'ALL'
    ? studentSchedule
    : studentSchedule.filter(s => s.day === selectedDayFilter);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-on-surface">
      
      {/* Netflix-Style Spotlight Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-red-950/50 via-slate-900/90 to-purple-950/60 border border-red-500/30 mb-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-purple-500/30 border border-red-500/50 flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20">
              <Film className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-[10px] font-bold tracking-wider">
                  NETFLIX-INSPIRED STUDENT COMMAND
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  SEMESTER 6 LIVE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {student.name}
              </h1>
              <p className="text-xs text-surface-variant mt-1">
                Roll No: <strong className="text-white font-mono">{student.rollNo}</strong> &bull; {student.branch} ({student.group}) &bull; CGPA: <span className="text-emerald-400 font-bold">{student.cgpa}</span>
              </p>
            </div>
          </div>

          {/* "NOW PLAYING" Live Class Showcase Card */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-red-500/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 shrink-0">
                <Play className="w-5 h-5 fill-red-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-bold uppercase">
                    Now Happening &bull; P4
                  </span>
                  <span className="text-[10px] text-surface-variant font-mono">11:00 - 12:00</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-0.5 truncate max-w-[200px]">CS301: Algorithms</h4>
                <p className="text-[10px] text-cyan-300 font-mono">Hall LH-4 &bull; Lalitgiri Complex</p>
              </div>
            </div>

            {onOpenNavigation && (
              <button
                onClick={() => onOpenNavigation('Lalitgiri Hall of Learning (LHL)')}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Teleport to Hall</span>
              </button>
            )}
          </div>
        </div>

        {/* Ambient Gradient Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Netflix-Style Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/20 mb-8 pb-1">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold rounded-2xl border transition-all ${
            activeTab === 'schedule'
              ? 'bg-red-500/15 border-red-500/50 text-red-300 shadow-md shadow-red-500/10'
              : 'border-transparent text-surface-variant hover:text-white hover:bg-surface-container'
          }`}
        >
          <Calendar className="w-4 h-4 text-red-400" />
          <span>Weekly Episode Queue (Timetable)</span>
        </button>

        <button
          onClick={() => setActiveTab('exams')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold rounded-2xl border transition-all ${
            activeTab === 'exams'
              ? 'bg-red-500/15 border-red-500/50 text-red-300 shadow-md shadow-red-500/10'
              : 'border-transparent text-surface-variant hover:text-white hover:bg-surface-container'
          }`}
        >
          <Clock className="w-4 h-4 text-red-400" />
          <span>Midsem Exam Premiere (Week 8)</span>
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
        </button>

        <button
          onClick={() => setActiveTab('pass')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold rounded-2xl border transition-all ${
            activeTab === 'pass'
              ? 'bg-red-500/15 border-red-500/50 text-red-300 shadow-md shadow-red-500/10'
              : 'border-transparent text-surface-variant hover:text-white hover:bg-surface-container'
          }`}
        >
          <QrCode className="w-4 h-4 text-red-400" />
          <span>Digital Student Pass &amp; RFID</span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold rounded-2xl border transition-all ${
            activeTab === 'alerts'
              ? 'bg-red-500/15 border-red-500/50 text-red-300 shadow-md shadow-red-500/10'
              : 'border-transparent text-surface-variant hover:text-white hover:bg-surface-container'
          }`}
        >
          <Bell className="w-4 h-4 text-red-400" />
          <span>Disruptions &amp; Resilience</span>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold">2 Live</span>
        </button>
      </div>

      {/* 1. WEEKLY EPISODE QUEUE (Timetable) */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Spring Semester 2026 Core Timetable</h3>
              <p className="text-xs text-surface-variant">
                Strict hard constraint verification &bull; Zero double bookings &bull; Synchronized Elective Basket OEB-1
              </p>
            </div>

            {/* Day Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface-container border border-outline-variant/30 self-start sm:self-auto">
              {['ALL', 'MON', 'TUE', 'WED', 'THU', 'FRI'].map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDayFilter(day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                    selectedDayFilter === day
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-surface-variant hover:text-white'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Episode Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchedule.map((cls, idx) => (
              <div 
                key={idx}
                className={`relative rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-2xl ${
                  cls.isNow
                    ? 'bg-gradient-to-br from-red-950/40 via-slate-900/90 to-slate-950 border-red-500/50 shadow-red-950/40'
                    : 'bg-surface-container-low border-outline-variant/30 hover:border-red-500/40 shadow-xl'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-surface-container-high text-red-400 border border-red-500/20">
                      {cls.day} &bull; {cls.period}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      cls.type === 'Core Lecture' 
                        ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' 
                        : cls.type === 'Hands-on Lab'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                    }`}>
                      {cls.type}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1 group-hover:text-red-300 transition-colors">
                    {cls.course}
                  </h4>
                  <p className="text-xs text-surface-variant mb-3 leading-relaxed">
                    {cls.desc}
                  </p>

                  <div className="text-xs text-surface-variant font-mono mb-4 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-secondary" />
                    <span>Instructor: <strong className="text-white">{cls.faculty}</strong></span>
                  </div>
                </div>

                {/* Bottom Room & Navigate Action */}
                <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-semibold truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                    <span className="truncate">{cls.room} ({cls.building.split(' ')[0]})</span>
                  </div>

                  {onOpenNavigation && (
                    <button
                      onClick={() => onOpenNavigation(cls.building)}
                      className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-[11px] font-bold text-white flex items-center gap-1 hover:text-red-300 transition-all shrink-0"
                    >
                      <Navigation className="w-3 h-3 text-red-400" />
                      <span>Directions</span>
                    </button>
                  )}
                </div>

                {cls.isNow && (
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span className="text-[9px] font-mono text-red-400 font-bold uppercase">LIVE</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. MIDSEM EXAM PREMIERE (Week 8 Countdown & Seating) */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          
          {/* Netflix-Style Cinematic Premiere Countdown Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/60 via-slate-900/90 to-purple-950/60 border border-red-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold">
                  OFFICIAL WEEK 8 MIDSEM PREMIERE
                </span>
                <span className="text-xs text-surface-variant font-mono">Starts Monday 09:30 AM</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                Spring Midsemester Examination Countdown
              </h3>
              <p className="text-xs text-surface-variant mt-1 max-w-xl">
                Halved Room Capacity Rule strictly enforced across all 4 examination sessions. Desks spaced with 1 vacant seat buffer.
              </p>
            </div>

            {/* Countdown Digits */}
            <div className="flex items-center gap-2 bg-slate-950/80 p-3 rounded-2xl border border-red-500/40 backdrop-blur-md">
              <div className="text-center px-2">
                <span className="text-2xl font-extrabold text-white font-mono block">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[9px] font-mono text-surface-variant uppercase">Days</span>
              </div>
              <span className="text-red-500 font-bold">:</span>
              <div className="text-center px-2">
                <span className="text-2xl font-extrabold text-white font-mono block">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] font-mono text-surface-variant uppercase">Hours</span>
              </div>
              <span className="text-red-500 font-bold">:</span>
              <div className="text-center px-2">
                <span className="text-2xl font-extrabold text-white font-mono block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[9px] font-mono text-surface-variant uppercase">Mins</span>
              </div>
              <span className="text-red-500 font-bold">:</span>
              <div className="text-center px-2">
                <span className="text-2xl font-extrabold text-red-400 font-mono block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[9px] font-mono text-surface-variant uppercase">Secs</span>
              </div>
            </div>
          </div>

          {/* Exam Table Card */}
          <div className="rounded-3xl border border-outline-variant/30 overflow-hidden bg-surface-container-low shadow-xl">
            <div className="p-4 bg-surface-container-high border-b border-outline-variant/20 flex items-center justify-between">
              <span className="text-xs font-bold text-white font-display">Personalized Seating Matrix &bull; Group CSE-3</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ✓ 0 Clashes Verified
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container text-surface-variant uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3.5">Exam ID</th>
                    <th className="p-3.5">Course Name</th>
                    <th className="p-3.5">Day &amp; Session</th>
                    <th className="p-3.5">Time Slot</th>
                    <th className="p-3.5">Assigned Hall</th>
                    <th className="p-3.5">Assigned Seat</th>
                    <th className="p-3.5 text-right">Wayfinding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {studentExams.map((e) => (
                    <tr key={e.id} className="hover:bg-surface-container/60 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-red-400">{e.id}</td>
                      <td className="p-3.5 font-bold text-white">{e.course}</td>
                      <td className="p-3.5 font-mono font-bold text-secondary">{e.day} &bull; {e.session}</td>
                      <td className="p-3.5 font-mono text-surface-variant">{e.time}</td>
                      <td className="p-3.5">
                        <span className="font-mono font-semibold text-cyan-300 block">{e.room}</span>
                        <span className="text-[10px] text-surface-variant font-mono">{e.capacityRule}</span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-emerald-400">{e.seat}</td>
                      <td className="p-3.5 text-right">
                        {onOpenNavigation && (
                          <button
                            onClick={() => onOpenNavigation('Lalitgiri Hall of Learning (LHL)')}
                            className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-[10px] font-bold text-secondary hover:text-white transition-all inline-flex items-center gap-1"
                          >
                            <Navigation className="w-3 h-3 text-red-400" />
                            <span>Navigate</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* 3. DIGITAL STUDENT PASS & RFID (Real Scannable QR Code) */}
      {activeTab === 'pass' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Holographic Delegate Badge */}
            <div className="lg:col-span-2 relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-red-950/60 via-slate-900 to-black border border-red-500/40 shadow-2xl flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-red-600/30">
                      CX
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white tracking-wider">CHILIKA INSTITUTE OF TECHNOLOGY</h4>
                      <p className="text-[10px] text-surface-variant font-mono">IIT Bhubaneswar Academic Collaborative Hub</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-[10px] font-bold">
                    OFFICIAL STUDENT ID
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 p-4 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30">
                  <div>
                    <span className="text-[9px] text-surface-variant font-mono uppercase block">Student Name</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{student.name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-surface-variant font-mono uppercase block">Roll Number</span>
                    <span className="text-xs font-mono font-bold text-red-400 block mt-0.5">{student.rollNo}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-surface-variant font-mono uppercase block">Department</span>
                    <span className="text-xs font-bold text-white block mt-0.5">CSE (Year 3)</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-surface-variant font-mono uppercase block">Gate Turnstile</span>
                    <span className="text-xs font-bold text-emerald-400 block mt-0.5">Auto RFID Access</span>
                  </div>
                </div>
              </div>

              {/* Turnstile Simulation Action */}
              <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs text-surface-variant font-mono">Biometric &amp; NFC Enabled Card</span>
                </div>

                <button
                  onClick={handleSimulateTurnstile}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                    turnstileUnlocked
                      ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30'
                  }`}
                >
                  {turnstileUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  <span>{turnstileUnlocked ? 'Turnstile Gate A-01 UNLOCKED' : 'Simulate NFC Tap at Gate'}</span>
                </button>
              </div>
            </div>

            {/* Scannable Real QR Matrix Card */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 shadow-2xl flex flex-col items-center justify-between text-center">
              <div>
                <span className="text-[10px] font-mono text-secondary font-bold uppercase tracking-wider block mb-1">
                  Optical Security Matrix
                </span>
                <h4 className="text-sm font-bold text-white">Scan with Camera or Lens</h4>
                <p className="text-[10px] text-surface-variant mt-1">
                  Instant verification for library, hostels, dining &amp; lab entry
                </p>
              </div>

              {/* Scannable QR Image */}
              <div className="my-4 p-3 bg-white rounded-2xl shadow-xl ring-4 ring-red-500/30">
                <img
                  src={qrCodeUrl}
                  alt="Official Student Gate Pass QR"
                  className="w-44 h-44 object-contain"
                />
              </div>

              <div className="w-full space-y-2">
                <button
                  onClick={handleCopyPass}
                  className="w-full py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all"
                >
                  {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-red-400" />}
                  <span>{copiedPass ? 'Pass Payload Copied!' : 'Copy Verification String'}</span>
                </button>
                <span className="text-[9px] text-surface-variant font-mono block">
                  Encodes student credentials &amp; institute authentication
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. DISRUPTIONS & RESILIENCE */}
      {activeTab === 'alerts' && (
        <div className="space-y-4 max-w-3xl">
          <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300 font-display">
                  CR-102 Maintenance Emergency Relocation
                </span>
                <span className="text-[9px] font-mono px-2 py-0.2 rounded bg-amber-500/20 text-amber-300">
                  DISPLACEMENT: MINIMAL
                </span>
              </div>
              <p className="text-xs text-surface-variant leading-relaxed">
                Due to water leak repairs in Academic Block A (CR-102), scheduled classes have been automatically relocated to Lalitgiri LH-1 and CR-101. Zero classes were cancelled.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-300 font-display">
                  Spectra Tech Fest Week 7 Venue Buffer
                </span>
                <span className="text-[9px] font-mono px-2 py-0.2 rounded bg-blue-500/20 text-blue-300">
                  PRIORITY TIER 1
                </span>
              </div>
              <p className="text-xs text-surface-variant leading-relaxed">
                Main Campus Auditorium &amp; OAT reserved for Spectra 2026. Academic tutorials originally scheduled in Auditorium Annex have been moved to LH-2 and LH-3.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
