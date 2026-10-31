import React, { useState } from 'react';
import { Users, Calendar, Clock, Building, PlusCircle, CheckCircle2, AlertCircle, FileText, Send } from 'lucide-react';

export const CoordinatorPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timetable' | 'faculty' | 'labs' | 'requests'>('timetable');
  const [requestText, setRequestText] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const cseFaculty = [
    { id: 'F01', name: 'Prof. Anita Roy', courses: 'CS101, EC201', maxHours: 4, todayHours: 2, status: 'Normal' },
    { id: 'F02', name: 'Dr. Vikram Malhotra', courses: 'CS201, CS204', maxHours: 4, todayHours: 3, status: 'Normal' },
    { id: 'F03', name: 'Dr. Sunita Rao', courses: 'CS202, CS301', maxHours: 4, todayHours: 2, status: 'Normal' },
    { id: 'F06', name: 'Prof. Alok Gupta', courses: 'CS202-T1, CS202-T2', maxHours: 4, todayHours: 2, status: 'Normal' },
    { id: 'F07', name: 'Prof. Deepa Nair', courses: 'CS302, CS303', maxHours: 4, todayHours: 0, status: 'On Leave (Mon)' },
  ];

  const pendingLabRequests = [
    { id: 'LAB-REQ-01', lab: 'CS-LAB-1', group: 'CSE-2', title: 'Data Structures Practical Extended Run', day: 'THU', periods: 'P6-P8', status: 'Pending Review' },
    { id: 'LAB-REQ-02', lab: 'CS-LAB-2', group: 'CSE-3', title: 'Operating Systems Kernel Benchmark', day: 'FRI', periods: 'P2-P4', status: 'Pending Review' }
  ];

  const handleExtraSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;
    setSubmittedMessage('Department schedule request submitted to Admin Directorate for validation.');
    setRequestText('');
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-on-surface">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 mb-8 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
          <Users className="w-7 h-7 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Department Coordinator Portal</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Department of Computer Science & Engineering (School of Electrical & Computer Sciences)
          </p>
        </div>
      </div>

      {submittedMessage && (
        <div className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center gap-3 text-xs text-secondary">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{submittedMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/20 mb-8 overflow-x-auto no-scrollbar">
        {[
          { id: 'timetable', label: 'Department Timetable' },
          { id: 'faculty', label: 'Faculty Workload & Availability' },
          { id: 'labs', label: 'Lab Booking Approvals' },
          { id: 'requests', label: 'Request Extra Session / Change' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-secondary text-secondary bg-secondary/5'
                : 'border-transparent text-on-surface-variant hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'timetable' && (
        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4">
          <h3 className="text-base font-bold text-white font-display">CSE Department Core Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/20">
              <span className="text-xs font-bold text-secondary uppercase font-mono block mb-1">Year 2 CSE (CSE-2)</span>
              <ul className="text-xs space-y-2 mt-2">
                <li className="flex justify-between py-1 border-b border-outline-variant/10">
                  <span className="font-semibold text-white">CS201: Data Structures</span>
                  <span className="font-mono text-on-surface-variant">MON P2 in LH-3</span>
                </li>
                <li className="flex justify-between py-1 border-b border-outline-variant/10">
                  <span className="font-semibold text-white">CS202: Discrete Mathematics</span>
                  <span className="font-mono text-on-surface-variant">TUE P3 in LH-4</span>
                </li>
                <li className="flex justify-between py-1 border-b border-outline-variant/10">
                  <span className="font-semibold text-white">CS203: Digital Logic</span>
                  <span className="font-mono text-on-surface-variant">WED P2 in CR-101</span>
                </li>
                <li className="flex justify-between py-1 border-b border-outline-variant/10">
                  <span className="font-semibold text-white">CS291: Computing Lab 1</span>
                  <span className="font-mono text-purple-300 font-bold">THU P6-P8 in CS-LAB-1</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/20">
              <span className="text-xs font-bold text-secondary uppercase font-mono block mb-1">Year 3 CSE (CSE-3)</span>
              <ul className="text-xs space-y-2 mt-2">
                <li className="flex justify-between py-1 border-b border-outline-variant/10">
                  <span className="font-semibold text-white">CS301: Algorithms & Complexity</span>
                  <span className="font-mono text-on-surface-variant">MON P4 in LH-4</span>
                </li>
                <li className="flex justify-between py-1 border-b border-outline-variant/10">
                  <span className="font-semibold text-white">CS302: Operating Systems</span>
                  <span className="font-mono text-on-surface-variant">WED P3 in LH-5</span>
                </li>
                <li className="flex justify-between py-1 border-b border-outline-variant/10">
                  <span className="font-semibold text-white">CS303: Computer Networks</span>
                  <span className="font-mono text-on-surface-variant">FRI P2 in LH-3</span>
                </li>
                <li className="flex justify-between py-1 border-b border-outline-variant/10">
                  <span className="font-semibold text-cyan-300">Open Elective (OEB-1..4)</span>
                  <span className="font-mono text-cyan-400 font-bold">Synchronized Slots</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'faculty' && (
        <div className="rounded-2xl border border-outline-variant/30 overflow-hidden bg-surface-container-low">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-high text-secondary uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Faculty ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Assigned Courses</th>
                <th className="p-3">Daily Hours Cap (H12)</th>
                <th className="p-3">Workload Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {cseFaculty.map((f) => (
                <tr key={f.id} className="hover:bg-surface-container">
                  <td className="p-3 font-mono font-bold text-white">{f.id}</td>
                  <td className="p-3 font-semibold text-white">{f.name}</td>
                  <td className="p-3 text-on-surface-variant font-mono">{f.courses}</td>
                  <td className="p-3 font-mono">Max {f.maxHours} hrs/day</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'labs' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Pending Laboratory Session Requests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingLabRequests.map((req) => (
              <div key={req.id} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-secondary">{req.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                    {req.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{req.title}</h4>
                <div className="text-xs text-on-surface-variant space-y-1">
                  <div>Venue: <span className="text-white font-mono">{req.lab}</span></div>
                  <div>Cohort: <span className="text-white font-mono">{req.group}</span></div>
                  <div>Time: <span className="text-white font-mono">{req.day} {req.periods}</span></div>
                </div>
                <div className="pt-3 border-t border-outline-variant/20 flex gap-2">
                  <button
                    onClick={() => setSubmittedMessage(`Approved ${req.id} for ${req.lab}!`)}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all"
                  >
                    Approve Lab Slot
                  </button>
                  <button
                    onClick={() => setSubmittedMessage(`Declined ${req.id}.`)}
                    className="py-2 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant text-xs font-semibold transition-all"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 max-w-2xl">
          <h3 className="text-base font-bold text-white font-display mb-2">Request Schedule Modification / Extra Class</h3>
          <p className="text-xs text-on-surface-variant mb-4">
            Enter your request in natural language. The CP-SAT constraint solver will check faculty limits and group clashes before admin sanction.
          </p>
          <form onSubmit={handleExtraSessionSubmit} className="space-y-4">
            <textarea
              rows={4}
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="e.g. Need an extra 1-hour tutorial for CS202 with Year 2 CSE students on Wednesday afternoon after lunch."
              className="w-full p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-white focus:outline-none focus:border-secondary transition-colors"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-secondary text-white text-xs font-semibold shadow-md shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit to Directorate</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
