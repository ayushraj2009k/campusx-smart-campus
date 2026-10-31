import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, MapPin, Navigation, Bell, AlertTriangle, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface StudentPortalProps {
  onOpenNavigation?: (roomOrBuilding: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ onOpenNavigation }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'exams' | 'alerts'>('schedule');

  const studentSchedule = [
    { day: 'MON', period: 'P4', time: '11:00 - 12:00', course: 'CS301: Algorithms & Complexity', room: 'LH-4', building: 'Lecture Hall Complex', faculty: 'Dr. Sunita Rao' },
    { day: 'TUE', period: 'P2', time: '09:00 - 10:00', course: 'OE301: Renewable Energy Systems (Basket OEB-1)', room: 'LH-3', building: 'Lecture Hall Complex', faculty: 'Prof. R. Mishra' },
    { day: 'WED', period: 'P3', time: '10:00 - 11:00', course: 'CS302: Operating Systems', room: 'LH-5', building: 'Lecture Hall Complex', faculty: 'Prof. Deepa Nair' },
    { day: 'THU', period: 'P6', time: '14:00 - 17:00', course: 'CS391: Networks & Systems Lab', room: 'CS-LAB-2', building: 'CSE Building', faculty: 'Prof. Alok Gupta' },
    { day: 'FRI', period: 'P2', time: '09:00 - 10:00', course: 'CS303: Computer Networks', room: 'LH-3', building: 'Lecture Hall Complex', faculty: 'Prof. Deepa Nair' },
  ];

  const studentExams = [
    { id: 'EX-CS301', course: 'CS301: Algorithms', day: 'MON', session: 'AM', time: '09:30 - 11:30', room: 'LH-1, LH-2' },
    { id: 'EX-CS302', course: 'CS302: Operating Systems', day: 'WED', session: 'AM', time: '09:30 - 11:30', room: 'LH-4' },
    { id: 'EX-CS303', course: 'CS303: Computer Networks', day: 'FRI', session: 'AM', time: '09:30 - 11:30', room: 'LH-3' },
    { id: 'EX-OE-BASKET', course: 'Open Elective (OE301/302/303)', day: 'SAT', session: 'AM', time: '09:30 - 11:30', room: 'AUD, LH-5' }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-on-surface">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 mb-8 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-display">Student Workspace</h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Priya Nayak • Year 3 Computer Science & Engineering (Group: CSE-3)
            </p>
          </div>
        </div>

        {/* Live Class Indicator */}
        <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div>
            <span className="text-[10px] text-cyan-300 font-mono uppercase tracking-wider block">Upcoming Class</span>
            <span className="text-xs font-bold text-white">CS301 in LH-4 (11:00 AM)</span>
          </div>
          {onOpenNavigation && (
            <button
              onClick={() => onOpenNavigation('Lecture Hall Complex')}
              className="ml-2 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/20 mb-8">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'schedule'
              ? 'border-secondary text-secondary bg-secondary/5'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          My Weekly Timetable
        </button>
        <button
          onClick={() => setActiveTab('exams')}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'exams'
              ? 'border-secondary text-secondary bg-secondary/5'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          Midsem Exam Schedule
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'alerts'
              ? 'border-secondary text-secondary bg-secondary/5'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          Room Change & Disruption Alerts
        </button>
      </div>

      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Spring Semester 2026 Core Timetable</h3>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
              Synchronized Open Elective Basket OEB-1
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentSchedule.map((cls, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 hover:border-cyan-400/50 transition-all shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-surface-container-highest text-secondary">
                    {cls.day} {cls.period}
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-mono">{cls.time}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{cls.course}</h4>
                  <p className="text-xs text-on-surface-variant">Instructor: {cls.faculty}</p>
                </div>

                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{cls.room} ({cls.building})</span>
                  </div>
                  {onOpenNavigation && (
                    <button
                      onClick={() => onOpenNavigation(cls.building)}
                      className="flex items-center gap-1 text-[11px] text-secondary hover:underline"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Navigate</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'exams' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Midsemester Examination Schedule</h3>
          <div className="rounded-2xl border border-outline-variant/30 overflow-hidden bg-surface-container-low">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-high text-secondary uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">Exam ID</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Day & Session</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Assigned Exam Hall</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {studentExams.map((e) => (
                  <tr key={e.id} className="hover:bg-surface-container">
                    <td className="p-3 font-mono font-bold text-white">{e.id}</td>
                    <td className="p-3 font-semibold text-white">{e.course}</td>
                    <td className="p-3 font-mono font-bold text-secondary">{e.day} ({e.session})</td>
                    <td className="p-3 font-mono text-on-surface-variant">{e.time}</td>
                    <td className="p-3 font-mono font-semibold text-cyan-300">{e.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-4 max-w-2xl">
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-amber-300 block">CR-102 Maintenance Relocation</span>
              <p className="text-on-surface-variant">
                Due to water leak repairs in Academic Block A (CR-102), classes have been safely rescheduled to Lalitgiri LH-1 and CR-101. No classes have been cancelled.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-blue-300 block">Spectra Week Relocation Notice</span>
              <p className="text-on-surface-variant">
                Approved institute events in Week 7 will occupy the Auditorium. Check your live timetable tab for alternate room allocations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
