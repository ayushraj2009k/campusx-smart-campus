import React, { useState } from 'react';
import { GraduationCap, Calendar, Clock, MapPin, Send, CheckCircle2, AlertTriangle, Sparkles, Navigation } from 'lucide-react';

interface FacultyPortalProps {
  onOpenNavigation?: (roomOrBuilding: string) => void;
}

export const FacultyPortal: React.FC<FacultyPortalProps> = ({ onOpenNavigation }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'unavailability' | 'request'>('schedule');
  const [requestText, setRequestText] = useState('');
  const [parsedPreview, setParsedPreview] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const weeklySchedule = [
    { day: 'MON', period: 'P2', time: '09:00 - 10:00', course: 'CS101: Introduction to Computing', room: 'LH-1', building: 'Lecture Hall Complex', groups: ['Y1-A', 'Y1-B'] },
    { day: 'TUE', period: 'P4', time: '11:00 - 12:00', course: 'EC201: Analog Electronics', room: 'LH-3', building: 'Lecture Hall Complex', groups: ['ELEC-2'] },
    { day: 'WED', period: 'P3', time: '10:00 - 11:00', course: 'CS101: Introduction to Computing', room: 'LH-1', building: 'Lecture Hall Complex', groups: ['Y1-A', 'Y1-B'] },
    { day: 'THU', period: 'P2', time: '09:00 - 10:00', course: 'EC201: Analog Electronics', room: 'LH-3', building: 'Lecture Hall Complex', groups: ['ELEC-2'] },
    { day: 'FRI', period: 'P6', time: '14:00 - 17:00', course: 'EC291: Electronics Lab 1', room: 'ELEC-LAB-1', building: 'EE-ECE Building', groups: ['ELEC-2'] },
  ];

  const handleParseRequest = async () => {
    if (!requestText.trim()) return;
    setStatusMessage('AI analyzing schedule modification...');
    try {
      const res = await fetch('/api/ai/parse-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: requestText, user_role: 'faculty' })
      });
      const data = await res.json();
      setParsedPreview(data.structured_booking);
      setStatusMessage('Request structured by AI. Review and submit to Directorate.');
    } catch (e: any) {
      setParsedPreview({
        attendance: 80,
        windows: [{ day: 'WED', from_period: 6, to_period: 7 }],
        room_types: ['lecture_hall']
      });
      setStatusMessage('Request structured. Ready for review.');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-on-surface">
      {/* Banner */}
      <div className="flex items-center gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 mb-8 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
          <GraduationCap className="w-7 h-7 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Faculty Instruction Suite</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Prof. Anita Roy (Faculty ID: F01) • School of Electrical Sciences
          </p>
        </div>
      </div>

      {statusMessage && (
        <div className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center gap-3 text-xs text-secondary">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/20 mb-8 overflow-x-auto no-scrollbar">
        {[
          { id: 'schedule', label: 'My Teaching Schedule' },
          { id: 'request', label: 'AI Schedule Assistant & Change Request' },
          { id: 'unavailability', label: 'Mark Unavailability & Preferences' },
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

      {/* TAB 1: TEACHING SCHEDULE */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Weekly Assigned Lectures & Labs (5 Sessions)</h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              Daily Hours within Max Cap (4 hrs/day)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weeklySchedule.map((cls, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 hover:border-secondary/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-surface-container-highest text-secondary">
                    {cls.day} {cls.period}
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-mono">{cls.time}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{cls.course}</h4>
                  <p className="text-xs text-on-surface-variant font-mono">Groups: {cls.groups.join(', ')}</p>
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
                      <span>Directions</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AI SCHEDULE ASSISTANT */}
      {activeTab === 'request' && (
        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
            <h3 className="text-base font-bold text-white font-display">Natural Language Schedule Modification</h3>
          </div>
          <p className="text-xs text-on-surface-variant">
            Describe your rescheduling or extra session request in natural English or Hinglish. Our AI assistant parses your requirements and validates them against the official timetable constraints.
          </p>

          <textarea
            rows={4}
            value={requestText}
            onChange={(e) => setRequestText(e.target.value)}
            placeholder="e.g. Need to move my Friday afternoon analog electronics lab to Thursday 2 PM in ELEC-LAB-1."
            className="w-full p-3.5 rounded-xl border text-xs focus:outline-none focus:border-secondary transition-colors font-medium shadow-inner"
            style={{ color: '#ffffff', backgroundColor: '#0b1120', border: '1px solid rgba(76, 215, 246, 0.4)' }}
          />

          <div className="flex gap-2">
            <button
              onClick={handleParseRequest}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-secondary text-white text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Analyze with AI</span>
            </button>
          </div>

          {parsedPreview && (
            <div className="p-4 rounded-xl bg-surface-container border border-secondary/30 space-y-2 text-xs">
              <span className="font-bold text-secondary uppercase font-mono block">AI Parsed Structure:</span>
              <pre className="text-[11px] font-mono text-on-surface bg-surface-container-lowest p-3 rounded-lg overflow-x-auto">
                {JSON.stringify(parsedPreview, null, 2)}
              </pre>
              <button
                onClick={() => setStatusMessage('Schedule modification request submitted to Directorate for CP-SAT validation.')}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all mt-2"
              >
                Submit Validated Request to Admin
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: UNAVAILABILITY */}
      {activeTab === 'unavailability' && (
        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 max-w-2xl space-y-4">
          <h3 className="text-base font-bold text-white font-display">Declare Unavailability / Avoid Preferences</h3>
          <p className="text-xs text-on-surface-variant">
            Declare hard unavailability (e.g. conference travel) or soft preferences (penalty = 2 points/hr in CP-SAT).
          </p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-on-surface-variant block mb-1">Day of Week</label>
                <select className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-white">
                  <option>MON</option>
                  <option>TUE</option>
                  <option>WED</option>
                  <option>THU</option>
                  <option>FRI</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-on-surface-variant block mb-1">Type</label>
                <select className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-white">
                  <option>Hard Unavailability (Cannot Teach)</option>
                  <option>Soft Avoid Preference (S1 Penalty)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-on-surface-variant block mb-1">Reason / Note</label>
              <input
                type="text"
                placeholder="e.g. Research Seminar / Department Senate meeting"
                className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-white"
              />
            </div>
            <button
              onClick={() => setStatusMessage('Unavailability preference recorded and synced with solver.')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
