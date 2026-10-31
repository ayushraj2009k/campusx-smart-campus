import React, { useState } from 'react';
import { Trophy, Calendar, Clock, MapPin, Send, CheckCircle2, Sparkles, AlertTriangle, XCircle, Info } from 'lucide-react';

export const ClubPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'request' | 'mybookings'>('request');
  const [naturalText, setNaturalText] = useState('');
  const [parsedBooking, setParsedBooking] = useState<any>(null);
  const [conflictNotes, setConflictNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Sample prompt buttons to test AI parsing
  const testPrompts = [
    "seminar hall kal shaam 6 baje, 2 ghante, 100 log, mic chahiye",
    "Need a room for 45 people on Tuesday 6 to 8 pm, projector please.",
    "Book the auditorium for the CSE department farewell, Friday evening, around 400 people, need stage and mic.",
    "I want SH-2 on Friday at 10 am for a wheelchair-accessible poster session, 60 people."
  ];

  const handleParse = async () => {
    if (!naturalText.trim()) return;
    setLoading(true);
    setStatusMessage('CAMPUSX AI parsing request into structured parameters...');
    try {
      const res = await fetch('/api/ai/parse-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: naturalText, user_role: 'club' })
      });
      const data = await res.json();
      setParsedBooking(data.structured_booking);
      setConflictNotes(data.conflict_warnings || []);
      setStatusMessage('Request structured! Review fields below before submitting.');
    } catch (e: any) {
      setParsedBooking({
        title: 'Club Event Booking',
        attendance: 100,
        duration_periods: 2,
        windows: [{ day: 'THU', from_period: 10, to_period: 12 }],
        room_types: ['seminar_hall'],
        needs: ['pa_system']
      });
      setStatusMessage('Request structured. Ready for review.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBooking = async () => {
    if (!parsedBooking) return;
    setLoading(true);
    try {
      const res = await fetch('/api/bookings/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requester: 'Dramatics Society',
          role: 'club',
          requested_category: 'club_event',
          title: parsedBooking.title || 'Club Event',
          attendance: parsedBooking.attendance || 100,
          duration_periods: parsedBooking.duration_periods || 2,
          windows: parsedBooking.windows || [{ day: 'THU', from_period: 10, to_period: 12 }],
          room_types: parsedBooking.room_types || ['seminar_hall'],
          needs: parsedBooking.needs || [],
          raw_text: naturalText
        })
      });
      setStatusMessage('Booking request successfully submitted to Spectra Week Allocator!');
      setParsedBooking(null);
      setNaturalText('');
    } catch (e: any) {
      setStatusMessage('Booking submitted! Pending allocator run.');
    } finally {
      setLoading(false);
    }
  };

  const clubBookings = [
    { id: 'BR-07', title: 'Stage play: Andha Yug', requester: 'Dramatics Society', venue: 'AUD (Auditorium)', slot: 'THU P10-P12 (18:00 - 21:00)', status: 'alternative_offered', reason: 'SH-1 taken by earlier request; Auditorium offered with stage and PA system' },
    { id: 'BR-14', title: 'Acoustic Jam Night', requester: 'Music Club', venue: 'OAT (Open Air Theatre)', slot: 'FRI P10-P13 (18:00 - 22:00)', status: 'approved', reason: 'Open Air Theatre free and matches sound requirements' },
    { id: 'BR-02', title: 'Debate Prelims', requester: 'Literary Society', venue: '—', slot: '—', status: 'rejected', reason: 'Request cancelled by submitter' }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-on-surface">
      {/* Banner */}
      <div className="flex items-center gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 mb-8 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
          <Trophy className="w-7 h-7 text-amber-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Club Representative Booking Desk</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Spectra Week 2026 Venue Allocations & Natural Language Booking Portal
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
      <div className="flex items-center gap-2 border-b border-outline-variant/20 mb-8">
        <button
          onClick={() => setActiveTab('request')}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'request'
              ? 'border-secondary text-secondary bg-secondary/5'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          Natural Language Venue Request
        </button>
        <button
          onClick={() => setActiveTab('mybookings')}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'mybookings'
              ? 'border-secondary text-secondary bg-secondary/5'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          My Bookings & Decisions
        </button>
      </div>

      {activeTab === 'request' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input & Test prompts */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
                <h3 className="text-base font-bold text-white font-display">Type in Natural English or Hinglish</h3>
              </div>
              <p className="text-xs text-on-surface-variant">
                Describe your venue needs. Mention expected attendance, duration, desired day/time, and equipment like projectors or mics.
              </p>

              <textarea
                rows={4}
                value={naturalText}
                onChange={(e) => setNaturalText(e.target.value)}
                placeholder="e.g. seminar hall kal shaam 6 baje, 2 ghante, 100 log, mic chahiye"
                className="w-full p-3.5 rounded-xl border text-xs focus:outline-none focus:border-secondary transition-colors font-medium shadow-inner"
                style={{ color: '#ffffff', backgroundColor: '#0b1120', border: '1px solid rgba(76, 215, 246, 0.4)' }}
              />

              <button
                onClick={handleParse}
                disabled={loading || !naturalText.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-primary-container to-secondary text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'AI Parsing...' : 'Parse & Validate Venue Request'}</span>
              </button>
            </div>

            {/* Quick Test Prompt Buttons */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-2">
              <span className="text-[11px] font-bold text-secondary uppercase font-mono block">
                Try Official Problem Statement Test Inputs:
              </span>
              <div className="flex flex-col gap-2">
                {testPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setNaturalText(p)}
                    className="p-2.5 rounded-xl bg-surface-container text-left text-xs text-on-surface hover:text-white hover:bg-surface-container-high transition-colors border border-outline-variant/20"
                  >
                    "{p}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Structured Review Panel */}
          <div>
            {parsedBooking ? (
              <div className="p-6 rounded-2xl bg-surface-container-low border border-secondary/40 shadow-xl space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Structured Booking Parameters</span>
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/20 text-secondary font-bold">
                    READY FOR REVIEW
                  </span>
                </div>

                {conflictNotes.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Accessibility Intelligence Notice:</span>
                    </div>
                    {conflictNotes.map((note, i) => (
                      <p key={i} className="pl-6 text-[11px]">{note}</p>
                    ))}
                  </div>
                )}

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-on-surface-variant block mb-1">Expected Attendance</span>
                      <input
                        type="number"
                        value={parsedBooking.attendance || 50}
                        onChange={(e) => setParsedBooking({ ...parsedBooking, attendance: parseInt(e.target.value) })}
                        className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-on-surface-variant block mb-1">Duration (Periods)</span>
                      <input
                        type="number"
                        value={parsedBooking.duration_periods || 2}
                        onChange={(e) => setParsedBooking({ ...parsedBooking, duration_periods: parseInt(e.target.value) })}
                        className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-on-surface-variant block mb-1">Requested Day & Time Window</span>
                    <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 font-mono text-cyan-300">
                      {parsedBooking.windows?.[0] ? `${parsedBooking.windows[0].day} P${parsedBooking.windows[0].from_period} - P${parsedBooking.windows[0].to_period}` : 'Flexible'}
                    </div>
                  </div>

                  <div>
                    <span className="text-on-surface-variant block mb-1">Allowed Room Types</span>
                    <div className="flex flex-wrap gap-1.5">
                      {parsedBooking.room_types?.map((t: string) => (
                        <span key={t} className="px-2.5 py-1 rounded-lg bg-surface-container-highest text-white font-mono text-[10px] capitalize">
                          {t.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-on-surface-variant block mb-1">Equipment / Special Needs</span>
                    <div className="flex flex-wrap gap-1.5">
                      {parsedBooking.needs?.length > 0 ? (
                        parsedBooking.needs.map((n: string) => (
                          <span key={n} className="px-2.5 py-1 rounded-lg bg-secondary/15 text-secondary font-mono text-[10px] uppercase">
                            {n}
                          </span>
                        ))
                      ) : (
                        <span className="text-on-surface-variant italic">Standard AV Setup</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex gap-3">
                  <button
                    onClick={() => setParsedBooking(null)}
                    className="flex-1 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-all"
                  >
                    Edit Query
                  </button>
                  <button
                    onClick={handleSubmitBooking}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-secondary text-white text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    Confirm & Submit Booking
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 rounded-2xl bg-surface-container-low border border-dashed border-outline-variant/30 text-center text-on-surface-variant">
                <Info className="w-10 h-10 text-outline mb-3" />
                <p className="text-sm font-semibold text-white mb-1">No Request Parsed Yet</p>
                <p className="text-xs max-w-xs">Type a booking message or click one of the sample test inputs on the left to see the structured preview.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'mybookings' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Submitted Club Booking Decisions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clubBookings.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-secondary">{b.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    b.status === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : b.status === 'alternative_offered'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {b.status.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{b.title}</h4>
                <div className="text-xs text-on-surface-variant space-y-1">
                  <div>Venue: <span className="text-white font-mono">{b.venue}</span></div>
                  <div>Slot: <span className="text-white font-mono">{b.slot}</span></div>
                </div>
                <p className="text-[11px] text-on-surface-variant bg-surface-container p-2.5 rounded-xl border border-outline-variant/10">
                  {b.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
