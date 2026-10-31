import React, { useState } from 'react';
import { Ticket, QrCode, Calendar, MapPin, Navigation, CheckCircle2, Award, Sparkles, ShieldCheck } from 'lucide-react';

interface ParticipantPortalProps {
  onOpenNavigation?: (venue: string) => void;
}

export const ParticipantPortal: React.FC<ParticipantPortalProps> = ({ onOpenNavigation }) => {
  const [activeTab, setActiveTab] = useState<'pass' | 'events' | 'certificates'>('pass');
  const [turnstileUnlocked, setTurnstileUnlocked] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['EVT-HACK-01']);

  const participantInfo = {
    name: 'Rohan Sen',
    email: 'participant@campusx.edu',
    college: 'Bhubaneswar Engineering College',
    passId: 'CX-SPECTRA-2026-9841',
    accessZone: 'All Zones (AUD, SAC, Labs, Dining)'
  };

  const festEvents = [
    { id: 'EVT-HACK-01', title: 'CrunchWeek 2026: Smart Campus Hackathon', category: 'Hackathon', venue: 'Main Auditorium (AUD)', building: 'Admin Block', time: 'MON 09:00 - 18:00', seatsLeft: 160 },
    { id: 'EVT-DRAMA-02', title: 'Stage Play: Andha Yug (Dramatics Society)', category: 'Cultural', venue: 'Seminar Hall 1 (SH-1)', building: 'Library Building', time: 'THU 18:00 - 21:00', seatsLeft: 20 },
    { id: 'EVT-ROBOTICS-03', title: 'RoboWars & Autonomous Drone League', category: 'Technical', venue: 'Open Air Theatre (OAT)', building: 'Campus Green', time: 'FRI 17:00 - 21:00', seatsLeft: 150 }
  ];

  const handleSimulateTurnstile = () => {
    setTurnstileUnlocked(true);
    setTimeout(() => setTurnstileUnlocked(false), 4000);
  };

  const handleRegisterEvent = (id: string) => {
    if (!registeredEvents.includes(id)) {
      setRegisteredEvents([...registeredEvents, id]);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-on-surface">
      {/* Banner */}
      <div className="flex items-center gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 mb-8 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center">
          <Ticket className="w-7 h-7 text-fuchsia-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Participant Experience & Digital Pass</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Spectra Week 2026 • Delegate ID: {participantInfo.passId}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/20 mb-8">
        <button
          onClick={() => setActiveTab('pass')}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'pass'
              ? 'border-secondary text-secondary bg-secondary/5'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          Digital Badge & Turnstile Pass
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'events'
              ? 'border-secondary text-secondary bg-secondary/5'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          Event Schedule & Registrations
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'certificates'
              ? 'border-secondary text-secondary bg-secondary/5'
              : 'border-transparent text-on-surface-variant hover:text-white'
          }`}
        >
          Certificates & Ledger
        </button>
      </div>

      {/* TAB 1: DIGITAL BADGE */}
      {activeTab === 'pass' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl">
          {/* Badge Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-surface-container-high via-surface-container to-surface-container-low border border-fuchsia-500/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-bl-full pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-5">
              <div className="flex items-center gap-2">
                <img src="/iit-logo.png" alt="IIT Crest" className="w-6 h-6 object-contain" />
                <span className="text-xs font-bold tracking-wider text-white uppercase font-display">IIT Bhubaneswar</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-bold">
                SPECTRA FEST 2026
              </span>
            </div>

            <div className="flex flex-col items-center text-center my-4">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-fuchsia-500/40 mb-3 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80"
                  alt="Delegate"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white font-display">{participantInfo.name}</h3>
              <p className="text-xs text-on-surface-variant">{participantInfo.college}</p>
            </div>

            {/* QR Mock Turnstile Code */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col items-center my-4">
              <div className="w-40 h-40 bg-white rounded-xl p-2 flex items-center justify-center shadow-md">
                <QrCode className="w-36 h-36 text-black" />
              </div>
              <span className="text-[10px] font-mono text-secondary mt-2 tracking-widest uppercase">
                {participantInfo.passId}
              </span>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 text-xs text-on-surface-variant flex justify-between">
              <span>Access Level:</span>
              <span className="font-semibold text-white">{participantInfo.accessZone}</span>
            </div>
          </div>

          {/* Turnstile Unlock Action */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <h3 className="text-base font-bold text-white font-display">Campus Turnstile Scanner</h3>
            </div>
            <p className="text-xs text-on-surface-variant">
              When arriving at Main Gate, Auditorium, or Lab complexes, tap your digital badge at any smart turnstile scanner to verify cryptographic access.
            </p>

            <button
              onClick={handleSimulateTurnstile}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-primary-container to-secondary text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Simulate NFC / QR Turnstile Tap
            </button>

            {turnstileUnlocked && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 animate-fade-in text-xs font-semibold">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Turnstile Unlocked! Gate A-01 Open. Welcome to IIT Bhubaneswar.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: EVENTS */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {festEvents.map((evt) => {
            const isRegistered = registeredEvents.includes(evt.id);
            return (
              <div key={evt.id} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 flex flex-col justify-between hover:border-secondary/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-highest text-secondary uppercase font-bold">
                      {evt.category}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                      {evt.seatsLeft} seats open
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{evt.title}</h4>
                  <div className="text-xs text-on-surface-variant space-y-1 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-outline-variant/20 flex gap-2">
                  <button
                    onClick={() => handleRegisterEvent(evt.id)}
                    disabled={isRegistered}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isRegistered
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-primary-container hover:bg-blue-600 text-white shadow-sm'
                    }`}
                  >
                    {isRegistered ? 'Registered' : 'Register Pass'}
                  </button>
                  {onOpenNavigation && (
                    <button
                      onClick={() => onOpenNavigation(evt.building)}
                      className="p-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-secondary transition-colors"
                      title="Navigate to Venue"
                    >
                      <Navigation className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            <h3 className="text-base font-bold text-white font-display">Post-Event Certificate Verification Ledger</h3>
          </div>
          <p className="text-xs text-on-surface-variant">
            Official participation and achievement certificates are cryptographically verifiable on the institutional ledger.
          </p>

          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/20 space-y-2 text-xs">
            <div className="flex justify-between font-semibold text-white">
              <span>CrunchWeek 2026 National Hackathon</span>
              <span className="text-secondary font-mono">Verified Issued</span>
            </div>
            <p className="text-[11px] text-on-surface-variant font-mono">
              Certificate Hash: 0x9f4a...88b2 • Issued by Directorate of Student Affairs
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
