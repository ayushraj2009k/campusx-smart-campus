import React, { useState } from 'react';
import { 
  Users, Calendar, Clock, Building, PlusCircle, CheckCircle2, 
  AlertCircle, FileText, Send, Check, X, RotateCcw, Filter, 
  Sparkles, ShieldCheck, Cpu, ArrowRight, Laptop, Award, History
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface LabRequest {
  id: string;
  lab: string;
  group: string;
  title: string;
  faculty: string;
  day: string;
  periods: string;
  time: string;
  capacityNeeded: number;
  softwareStack: string;
  status: 'pending' | 'approved' | 'rejected';
  decidedAt?: string;
  decisionNote?: string;
  decidedBy?: string;
}

interface ScheduleChangeRequest {
  id: string;
  course: string;
  group: string;
  faculty: string;
  requestText: string;
  submittedAt: string;
  status: 'approved' | 'under_review' | 'rejected';
  sanctionedVenue?: string;
  sanctionedTime?: string;
  adminNote?: string;
}

export const CoordinatorPortal: React.FC = () => {
  const { effectiveAppearance } = useTheme();
  const isDark = effectiveAppearance === 'dark';

  const [activeTab, setActiveTab] = useState<'timetable' | 'faculty' | 'labs' | 'requests'>('labs');
  const [labFilter, setLabFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [requestText, setRequestText] = useState('');
  const [selectedCourseForReq, setSelectedCourseForReq] = useState('CS202');
  const [statusBanner, setStatusBanner] = useState<{ text: string; type: 'success' | 'warning' | 'info' } | null>(null);

  // Faculty Workload & Availability Directory
  const cseFaculty = [
    { id: 'F01', name: 'Prof. Anita Roy', courses: 'CS101, EC201', maxHours: 4, todayHours: 2, status: 'Normal', designation: 'Associate Professor' },
    { id: 'F02', name: 'Dr. Vikram Malhotra', courses: 'CS201, CS204', maxHours: 4, todayHours: 3, status: 'Normal', designation: 'Assistant Professor' },
    { id: 'F03', name: 'Dr. Sunita Rao', courses: 'CS202, CS301', maxHours: 4, todayHours: 2, status: 'Normal', designation: 'Associate Professor' },
    { id: 'F06', name: 'Prof. Alok Gupta', courses: 'CS202-T1, CS202-T2', maxHours: 4, todayHours: 2, status: 'Normal', designation: 'Professor' },
    { id: 'F07', name: 'Prof. Deepa Nair', courses: 'CS302, CS303', maxHours: 4, todayHours: 0, status: 'On Leave (Mon Travel)', designation: 'Professor' },
  ];

  // Interactive Stateful Lab Session Requests
  const [labRequests, setLabRequests] = useState<LabRequest[]>([
    { 
      id: 'LAB-REQ-01', 
      lab: 'CS-LAB-1', 
      group: 'CSE-2 (Batch A)', 
      title: 'Data Structures Practical Extended Run (Trees & Balanced Search)', 
      faculty: 'Dr. Vikram Malhotra',
      day: 'THU', 
      periods: 'P6-P8', 
      time: '14:00 - 17:00',
      capacityNeeded: 60,
      softwareStack: 'GCC 13, Valgrind, GDB, VS Code Linux',
      status: 'pending'
    },
    { 
      id: 'LAB-REQ-02', 
      lab: 'CS-LAB-2', 
      group: 'CSE-3 (Batch B)', 
      title: 'Operating Systems Kernel Benchmark (QEMU / xv6 System Calls)', 
      faculty: 'Prof. Alok Gupta',
      day: 'FRI', 
      periods: 'P2-P4', 
      time: '09:00 - 12:00',
      capacityNeeded: 60,
      softwareStack: 'QEMU 8.2, RISC-V Cross Compiler, Ubuntu 24.04',
      status: 'pending'
    },
    { 
      id: 'LAB-REQ-03', 
      lab: 'AI-GPU-LAB', 
      group: 'CSE-4 / M.Tech AI', 
      title: 'Deep Learning Vision Transformer Training Run', 
      faculty: 'Dr. Sunita Rao',
      day: 'WED', 
      periods: 'P6-P8', 
      time: '14:00 - 17:00',
      capacityNeeded: 45,
      softwareStack: 'CUDA 12.4, PyTorch 2.3, 40x NVIDIA RTX 4090 Workstations',
      status: 'approved',
      decidedAt: '31 Oct 2026, 16:45',
      decidedBy: 'Dr. Rajesh Sharma (Timetable Coordinator)',
      decisionNote: 'Approved. Reserved dedicated cluster node with priority 3.0.'
    },
    { 
      id: 'LAB-REQ-04', 
      lab: 'CS-LAB-1', 
      group: 'CSE-1 (First Year)', 
      title: 'Remedial Linux Shell & Python Hands-On Bootcamp', 
      faculty: 'Prof. Anita Roy',
      day: 'MON', 
      periods: 'P9-P10', 
      time: '17:00 - 19:00',
      capacityNeeded: 55,
      softwareStack: 'Python 3.11, JupyterLab, Bash',
      status: 'rejected',
      decidedAt: '30 Oct 2026, 11:20',
      decidedBy: 'Dr. Rajesh Sharma (Timetable Coordinator)',
      decisionNote: 'Declined: Overlaps with scheduled campus network infrastructure maintenance.'
    }
  ]);

  // Live Department Schedule Change Requests Ledger
  const [scheduleChanges, setScheduleChanges] = useState<ScheduleChangeRequest[]>([
    {
      id: 'CR-CSE-01',
      course: 'CS301 (Algorithms)',
      group: 'CSE-3 Combined',
      faculty: 'Dr. Sunita Rao',
      requestText: 'Need an extra 1-hour problem solving tutorial on Graph Algorithms before Week 8 Midsem examinations.',
      submittedAt: '31 Oct 2026, 14:15',
      status: 'approved',
      sanctionedVenue: 'LH-4 (Lalitgiri)',
      sanctionedTime: 'WED P5 (12:00 - 13:00)',
      adminNote: 'Sanctioned by Dean of Academics. Zero clash with academic cohort.'
    },
    {
      id: 'CR-CSE-02',
      course: 'CS202 (Discrete Math)',
      group: 'CSE-2 Combined',
      faculty: 'Prof. Alok Gupta',
      requestText: 'Request shifting Thursday tutorial slot P7 to Wednesday morning P2 due to departmental colloquium.',
      submittedAt: '31 Oct 2026, 18:40',
      status: 'under_review',
      adminNote: 'CP-SAT constraint solver validated 0 hard violations. Awaiting classroom allocator confirmation.'
    }
  ]);

  // Handle Lab Approval
  const handleApproveLab = (id: string) => {
    const nowStr = `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    setLabRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: 'approved',
          decidedAt: nowStr,
          decidedBy: 'Dr. Rajesh Sharma (Timetable Coordinator)',
          decisionNote: `Approved by Coordinator. Slot locked in ${req.lab} timetable with 0 academic conflict.`
        };
      }
      return req;
    }));
    setStatusBanner({
      text: `✓ LAB SESSION APPROVED: ${id} has been formally sanctioned and locked in the departmental timetable.`,
      type: 'success'
    });
  };

  // Handle Lab Rejection
  const handleRejectLab = (id: string) => {
    const nowStr = `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    setLabRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: 'rejected',
          decidedAt: nowStr,
          decidedBy: 'Dr. Rajesh Sharma (Timetable Coordinator)',
          decisionNote: 'Declined by Coordinator due to workstation capacity constraints or maintenance schedule.'
        };
      }
      return req;
    }));
    setStatusBanner({
      text: `✕ LAB SESSION DECLINED: ${id} marked as rejected. An official notification has been dispatched to the faculty instructor.`,
      type: 'warning'
    });
  };

  // Handle Reopening/Resetting a decision
  const handleResetLabDecision = (id: string) => {
    setLabRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: 'pending',
          decidedAt: undefined,
          decidedBy: undefined,
          decisionNote: undefined
        };
      }
      return req;
    }));
    setStatusBanner({
      text: `Decision for ${id} reset to Pending Review.`,
      type: 'info'
    });
  };

  // Handle Submitting Schedule Modification Request
  const handleExtraSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    const newReqId = `CR-CSE-0${scheduleChanges.length + 1}`;
    const nowStr = `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newRequest: ScheduleChangeRequest = {
      id: newReqId,
      course: selectedCourseForReq,
      group: 'CSE Department Cohort',
      faculty: 'Dr. Rajesh Sharma (Coordinator)',
      requestText: requestText.trim(),
      submittedAt: nowStr,
      status: 'under_review',
      adminNote: 'Submitted to Directorate & Google OR-Tools CP-SAT integer engine for conflict validation.'
    };

    setScheduleChanges(prev => [newRequest, ...prev]);
    setRequestText('');
    setStatusBanner({
      text: `✓ Request ${newReqId} successfully submitted to Directorate! Visible in the live tracking ledger below.`,
      type: 'success'
    });
  };

  const filteredLabRequests = labRequests.filter(req => {
    if (labFilter === 'all') return true;
    return req.status === labFilter;
  });

  const pendingCount = labRequests.filter(r => r.status === 'pending').length;
  const approvedCount = labRequests.filter(r => r.status === 'approved').length;
  const rejectedCount = labRequests.filter(r => r.status === 'rejected').length;

  return (
    <div className={`flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 transition-colors ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      
      {/* Enterprise Coordinator Command Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border mb-6 transition-all shadow-xl ${
        isDark 
          ? 'bg-slate-900/90 border-slate-800 backdrop-blur-xl' 
          : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
              isDark 
                ? 'bg-purple-600/20 border border-purple-500/40 text-purple-400' 
                : 'bg-purple-600 text-white shadow-purple-500/30'
            }`}>
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold tracking-wider border ${
                  isDark ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-purple-50 text-purple-800 border-purple-200'
                }`}>
                  ACADEMIC COORDINATION SUITE
                </span>
                <span className={`text-[11px] font-mono font-bold ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  CSE CURRICULUM DESK
                </span>
              </div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Department Coordinator Portal
              </h1>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                Dr. Rajesh Sharma &bull; Department of Computer Science & Engineering &bull; School of Electrical Sciences &bull; IIT Bhubaneswar
              </p>
            </div>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className={`px-3.5 py-2 rounded-2xl border text-center ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[10px] uppercase font-mono font-bold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Pending Lab Slots
              </span>
              <span className={`text-lg font-extrabold ${pendingCount > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                {pendingCount}
              </span>
            </div>

            <div className={`px-3.5 py-2 rounded-2xl border text-center ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[10px] uppercase font-mono font-bold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Approved Slots
              </span>
              <span className="text-lg font-extrabold text-emerald-500">
                {approvedCount}
              </span>
            </div>

            <div className={`px-3.5 py-2 rounded-2xl border text-center ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[10px] uppercase font-mono font-bold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Active Faculty
              </span>
              <span className="text-lg font-extrabold text-blue-500">
                {cseFaculty.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Status Notification Banner */}
      {statusBanner && (
        <div className={`mb-6 p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-semibold shadow-md animate-in fade-in duration-200 ${
          statusBanner.type === 'success'
            ? (isDark ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-900')
            : statusBanner.type === 'warning'
            ? (isDark ? 'bg-amber-950/60 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900')
            : (isDark ? 'bg-blue-950/60 border-blue-500/40 text-blue-200' : 'bg-blue-50 border-blue-300 text-blue-900')
        }`}>
          <div className="flex items-center gap-2.5">
            {statusBanner.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            ) : statusBanner.type === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
            )}
            <span>{statusBanner.text}</span>
          </div>
          <button 
            onClick={() => setStatusBanner(null)}
            className="p-1 rounded-lg hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Navigation Tabs */}
      <div className={`flex items-center gap-2 border-b mb-6 overflow-x-auto no-scrollbar ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        {[
          { id: 'labs', label: `Lab Booking Approvals (${pendingCount} Pending)`, icon: Laptop },
          { id: 'timetable', label: 'Department Timetables', icon: Calendar },
          { id: 'faculty', label: 'Faculty Workload & Availability', icon: Users },
          { id: 'requests', label: 'Request Schedule Change & Ledger', icon: PlusCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? (isDark ? 'border-purple-400 text-purple-400 bg-purple-500/10' : 'border-purple-600 text-purple-700 bg-purple-50')
                  : (isDark ? 'border-transparent text-slate-400 hover:text-white' : 'border-transparent text-slate-600 hover:text-slate-950')
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: LAB BOOKING APPROVALS WITH REAL LIVE STATUS TRACKING */}
      {/* ============================================================== */}
      {activeTab === 'labs' && (
        <div className="space-y-6">
          
          {/* Subheader & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className={`text-lg font-extrabold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Computer Science Laboratory Allocation Queue
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Approve, reject, or modify laboratory sessions. All decisions are timestamped and signed in the departmental audit ledger.
              </p>
            </div>

            {/* Filter Pills */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setLabFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  labFilter === 'all'
                    ? (isDark ? 'bg-purple-600 text-white shadow-sm' : 'bg-purple-600 text-white shadow-sm')
                    : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                All ({labRequests.length})
              </button>
              <button
                onClick={() => setLabFilter('pending')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  labFilter === 'pending'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setLabFilter('approved')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  labFilter === 'approved'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                Approved ({approvedCount})
              </button>
              <button
                onClick={() => setLabFilter('rejected')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  labFilter === 'rejected'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                Declined ({rejectedCount})
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredLabRequests.map((req) => (
              <div 
                key={req.id} 
                className={`p-6 rounded-3xl border transition-all duration-200 shadow-lg flex flex-col justify-between ${
                  req.status === 'approved'
                    ? (isDark 
                        ? 'bg-emerald-950/20 border-emerald-500/50 shadow-emerald-950/30' 
                        : 'bg-emerald-50/70 border-emerald-300 shadow-emerald-100')
                    : req.status === 'rejected'
                    ? (isDark 
                        ? 'bg-rose-950/20 border-rose-500/50 shadow-rose-950/30' 
                        : 'bg-rose-50/70 border-rose-300 shadow-rose-100')
                    : (isDark 
                        ? 'bg-slate-900/90 border-slate-800 hover:border-purple-500/40 shadow-slate-950/50' 
                        : 'bg-white border-slate-200 hover:border-purple-300 shadow-slate-200/60')
                }`}
              >
                <div>
                  {/* Top Bar: ID + Dynamic Live Status Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs text-purple-500 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/30">
                        {req.id}
                      </span>
                      <span className={`text-xs font-mono font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {req.lab}
                      </span>
                    </div>

                    {req.status === 'approved' ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-emerald-500 text-slate-950 shadow-sm animate-in fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>APPROVED & LOCKED</span>
                      </span>
                    ) : req.status === 'rejected' ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-rose-600 text-white shadow-sm animate-in fade-in">
                        <X className="w-3.5 h-3.5" />
                        <span>DECLINED BY COORD</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-amber-500/20 text-amber-500 border border-amber-500/40 animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                        <span>AWAITING APPROVAL</span>
                      </span>
                    )}
                  </div>

                  <h4 className={`text-base font-extrabold font-display mb-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {req.title}
                  </h4>

                  {/* Metadata Specs Grid */}
                  <div className={`p-3.5 rounded-2xl border text-xs space-y-1.5 mb-4 ${
                    isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Lead Faculty:</span>
                      <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{req.faculty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Target Cohort:</span>
                      <span className={`font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{req.group}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Slot & Time:</span>
                      <span className="font-mono font-bold text-purple-500">{req.day} {req.periods} &bull; {req.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Capacity / Software:</span>
                      <span className={`font-mono truncate max-w-[200px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {req.capacityNeeded} Seats &bull; {req.softwareStack}
                      </span>
                    </div>
                  </div>

                  {/* Decision Audit Trail Notice (If already decided) */}
                  {req.decidedAt && (
                    <div className={`p-3 rounded-2xl border text-xs mb-4 ${
                      req.status === 'approved'
                        ? (isDark ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-emerald-100/70 border-emerald-200 text-emerald-900')
                        : (isDark ? 'bg-rose-950/40 border-rose-500/30 text-rose-300' : 'bg-rose-100/70 border-rose-200 text-rose-900')
                    }`}>
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <History className="w-3.5 h-3.5" />
                        <span>Decision Record: {req.decidedAt}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        {req.decisionNote}
                      </p>
                      <p className="text-[10px] font-mono mt-1 opacity-80">
                        Signed: {req.decidedBy}
                      </p>
                    </div>
                  )}
                </div>

                {/* Interactive Action Decision Buttons */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  {req.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApproveLab(req.id)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Approve Lab Slot</span>
                      </button>
                      
                      <button
                        onClick={() => handleRejectLab(req.id)}
                        className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        <X className="w-4 h-4 stroke-[3]" />
                        <span>Decline</span>
                      </button>
                    </>
                  ) : req.status === 'approved' ? (
                    <div className="w-full flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approved & Synced to CP-SAT Timetable</span>
                      </div>
                      <button
                        onClick={() => handleResetLabDecision(req.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all flex items-center gap-1 ${
                          isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                        }`}
                        title="Revert decision to pending review"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reopen</span>
                      </button>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                        <X className="w-4 h-4" />
                        <span>Declined by Coordinator</span>
                      </div>
                      <button
                        onClick={() => handleApproveLab(req.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-sm"
                        title="Reconsider and approve this request"
                      >
                        <span>Reconsider & Approve</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: DEPARTMENT TIMETABLE */}
      {/* ============================================================== */}
      {activeTab === 'timetable' && (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 shadow-xl ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div>
            <h3 className={`text-lg font-extrabold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CSE Department Core Academic Schedule &bull; Spring 2026
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Verified by Google OR-Tools CP-SAT solver. 0 faculty double-bookings, 0 group room clashes, 100% lab continuous slot adherence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Year 2 CSE */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-3 border-b pb-2 border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-purple-500 uppercase font-mono">
                  Year 2 CSE &bull; Batch 2024–2028 (CSE-2)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 font-bold">
                  60 Students
                </span>
              </div>
              <ul className="text-xs space-y-2.5">
                <li className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>CS201: Data Structures</span>
                  <span className="font-mono text-purple-500 font-bold">MON P2 in LH-3</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>CS202: Discrete Mathematics</span>
                  <span className="font-mono text-purple-500 font-bold">TUE P3 in LH-4</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>CS203: Digital Logic Design</span>
                  <span className="font-mono text-purple-500 font-bold">WED P2 in CR-101</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>CS291: Computing Laboratory 1</span>
                  <span className="font-mono text-emerald-500 font-bold">THU P6-P8 in CS-LAB-1 (Continuous)</span>
                </li>
              </ul>
            </div>

            {/* Year 3 CSE */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-3 border-b pb-2 border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-purple-500 uppercase font-mono">
                  Year 3 CSE &bull; Batch 2023–2027 (CSE-3)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 font-bold">
                  80 Students
                </span>
              </div>
              <ul className="text-xs space-y-2.5">
                <li className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>CS301: Algorithms & Complexity</span>
                  <span className="font-mono text-purple-500 font-bold">MON P4 in LH-4</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>CS302: Operating Systems</span>
                  <span className="font-mono text-purple-500 font-bold">WED P3 in LH-5</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>CS303: Computer Networks</span>
                  <span className="font-mono text-purple-500 font-bold">FRI P2 in LH-3</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">Open Elective Basket (OEB-1)</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">SAT P2-P4 (Synchronized 400+)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: FACULTY WORKLOAD & AVAILABILITY */}
      {/* ============================================================== */}
      {activeTab === 'faculty' && (
        <div className={`rounded-3xl border overflow-hidden shadow-xl ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className={`text-lg font-extrabold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CSE Department Faculty Teaching Load & Availability Directory
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Enforcing Problem Statement Constraint H12: Maximum 4 contact hours per day per faculty member.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`uppercase font-mono text-[10px] ${
                isDark ? 'bg-slate-950 text-slate-400' : 'bg-slate-50 text-slate-600 border-b border-slate-200'
              }`}>
                <tr>
                  <th className="p-4">Faculty ID</th>
                  <th className="p-4">Name & Title</th>
                  <th className="p-4">Assigned Courses</th>
                  <th className="p-4">Daily Hours Limit (H12)</th>
                  <th className="p-4">Availability Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {cseFaculty.map((f) => (
                  <tr key={f.id} className={`transition-colors ${
                    isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
                  }`}>
                    <td className="p-4 font-mono font-bold text-purple-500">{f.id}</td>
                    <td className="p-4">
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{f.name}</div>
                      <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{f.designation}</div>
                    </td>
                    <td className={`p-4 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{f.courses}</td>
                    <td className="p-4 font-mono font-semibold">Max {f.maxHours} hrs/day</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                        f.status.includes('Leave')
                          ? (isDark ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-rose-100 text-rose-800')
                          : (isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-emerald-100 text-emerald-800')
                      }`}>
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: REQUEST SCHEDULE MODIFICATION & LIVE AUDIT LEDGER */}
      {/* ============================================================== */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          
          {/* Submission Form Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-lg font-extrabold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Submit Department Schedule Change Request
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Enter schedule modification in natural language. The CP-SAT engine will automatically test feasibility against H1–H13 before Directorate review.
                </p>
              </div>
            </div>

            <form onSubmit={handleExtraSessionSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Target Course
                  </label>
                  <select
                    value={selectedCourseForReq}
                    onChange={(e) => setSelectedCourseForReq(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="CS201">CS201: Data Structures</option>
                    <option value="CS202">CS202: Discrete Mathematics</option>
                    <option value="CS301">CS301: Algorithms & Complexity</option>
                    <option value="CS302">CS302: Operating Systems</option>
                    <option value="CS391">CS391: Systems Programming Lab</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Quick Prompt Templates
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setRequestText('Need an extra 1-hour tutorial for Year 2 CSE on Wednesday afternoon in LH-3.')}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg border font-medium truncate ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      + Extra Tutorial
                    </button>
                    <button
                      type="button"
                      onClick={() => setRequestText('Postpone Thursday laboratory session to Friday P6-P8 to accommodate student hackathon.')}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg border font-medium truncate ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      + Shift Lab Slot
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Schedule Modification Description
                </label>
                <textarea
                  rows={3}
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  placeholder="e.g. Need an extra 1-hour remedial problem solving session for CS301 with Year 3 CSE students on Wednesday afternoon."
                  className={`w-full p-3.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!requestText.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-extrabold shadow-md shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request to Directorate</span>
                </button>
              </div>
            </form>
          </div>

          {/* Live Request Tracking Ledger */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-base font-extrabold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Live Department Schedule Change Ledger
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Real-time status of all submitted requests: Approved, Under CP-SAT Review, or Declined.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-purple-500">
                {scheduleChanges.length} Requests Logged
              </span>
            </div>

            <div className="space-y-3">
              {scheduleChanges.map((change) => (
                <div 
                  key={change.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    change.status === 'approved'
                      ? (isDark ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-emerald-50 border-emerald-300')
                      : change.status === 'rejected'
                      ? (isDark ? 'bg-rose-950/20 border-rose-500/40' : 'bg-rose-50 border-rose-300')
                      : (isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200')
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded">
                        {change.id}
                      </span>
                      <span className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {change.course} &bull; {change.group}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      change.status === 'approved'
                        ? 'bg-emerald-500 text-slate-950'
                        : change.status === 'rejected'
                        ? 'bg-rose-600 text-white'
                        : 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                    }`}>
                      {change.status === 'approved' ? '✓ APPROVED BY DIRECTORATE' : change.status === 'rejected' ? '✕ DECLINED' : '⏳ UNDER CP-SAT SOLVER REVIEW'}
                    </span>
                  </div>

                  <p className={`text-xs mb-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    "{change.requestText}"
                  </p>

                  <div className={`text-[11px] font-mono flex flex-wrap items-center justify-between gap-2 pt-2 border-t ${
                    isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
                  }`}>
                    <div>
                      {change.sanctionedVenue && (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-3">
                          Sanctioned: {change.sanctionedVenue} ({change.sanctionedTime})
                        </span>
                      )}
                      <span>Note: {change.adminNote}</span>
                    </div>
                    <span className="opacity-75">{change.submittedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
