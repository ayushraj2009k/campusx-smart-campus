import React, { useState } from 'react';
import { 
  Ticket, QrCode, Calendar, MapPin, Navigation, CheckCircle2, 
  Award, Sparkles, ShieldCheck, Clock, Download, Share2, 
  ExternalLink, Check, Copy, Flame, UserCheck, Unlock, Lock
} from 'lucide-react';

interface ParticipantPortalProps {
  onOpenNavigation?: (venue: string) => void;
}

export const ParticipantPortal: React.FC<ParticipantPortalProps> = ({ onOpenNavigation }) => {
  const [activeTab, setActiveTab] = useState<'pass' | 'events' | 'certificates'>('pass');
  const [turnstileUnlocked, setTurnstileUnlocked] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['EVT-HACK-01']);
  const [copiedPass, setCopiedPass] = useState(false);

  const participantInfo = {
    name: 'Rohan Sen',
    email: 'participant@campusx.edu',
    college: 'Bhubaneswar Engineering College',
    passId: 'CX-SPECTRA-2026-9841',
    accessZone: 'All Zones (AUD, SAC, Labs, Dining)',
    tier: 'VIP Hackathon Delegate'
  };

  // QR Code Raw Text for Smartphone Scanners
  const qrRawData = `GATE PASS: Spectra Tech Fest 2026 | Participant: Rohan Sen | Pass ID: CX-SPECTRA-2026-9841 | Access: All Campus Zones | Verified: Chilika Institute of Technology & IIT Bhubaneswar`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=8&data=${encodeURIComponent(qrRawData)}`;

  const festEvents = [
    { 
      id: 'EVT-HACK-01', 
      title: 'CrunchWeek 2026: Smart Campus Hackathon', 
      category: 'Hackathon', 
      venue: 'Main Auditorium (AUD)', 
      building: 'Admin Block', 
      time: 'MON 09:00 - 18:00', 
      seatsLeft: 160,
      badge: 'PRIORITY TIER 1',
      desc: 'Build smart campus scheduling, geospatial navigation, and autonomous integer disruption solvers.'
    },
    { 
      id: 'EVT-DRAMA-02', 
      title: 'Stage Play: Andha Yug (Dramatics Society)', 
      category: 'Cultural', 
      venue: 'Main Auditorium (AUD)', 
      building: 'Admin Block', 
      time: 'THU 18:00 - 21:00 (P10-P12)', 
      seatsLeft: 20,
      badge: 'LIMITED SEATING',
      desc: 'Renowned annual play performance. Stage setups and acoustic lighting checks.'
    },
    { 
      id: 'EVT-ROBOTICS-03', 
      title: 'RoboWars & Autonomous Drone League', 
      category: 'Technical', 
      venue: 'Open Air Theatre (OAT)', 
      building: 'Campus Green', 
      time: 'FRI 17:00 - 21:00 (P9-P12)', 
      seatsLeft: 150,
      badge: 'OPEN ARENA',
      desc: 'Combat robotics cage match and autonomous drone obstacle navigation.'
    },
    { 
      id: 'EVT-LAN-04', 
      title: 'eSports LAN Championship: Valorant & CS2', 
      category: 'Gaming', 
      venue: 'LHL-102 (Alt Offered: LH-2)', 
      building: 'Lecture Hall Complex', 
      time: 'SAT 14:00 - 21:00 (P6-P12)', 
      seatsLeft: 40,
      badge: 'HIGH DEMAND',
      desc: 'Inter-college competitive LAN arena. Gigabit local server setup.'
    }
  ];

  const handleSimulateTurnstile = () => {
    setTurnstileUnlocked(true);
    setTimeout(() => setTurnstileUnlocked(false), 5000);
  };

  const handleRegisterEvent = (id: string) => {
    if (!registeredEvents.includes(id)) {
      setRegisteredEvents([...registeredEvents, id]);
    }
  };

  const handleCopyPassDetails = () => {
    navigator.clipboard.writeText(qrRawData);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2500);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-on-surface">
      
      {/* Netflix-Style Spotlight Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-fuchsia-950/60 via-slate-900/90 to-purple-950/60 border border-fuchsia-500/30 mb-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/30 border border-fuchsia-500/50 flex items-center justify-center shrink-0 shadow-lg shadow-fuchsia-500/20">
              <Ticket className="w-8 h-8 text-fuchsia-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-300 font-mono text-[10px] font-bold">
                  SPECTRA FEST DELEGATE
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  RFID PASS ACTIVE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Participant Portal &amp; Digital Access Pass
              </h1>
              <p className="text-xs text-surface-variant mt-1">
                Spectra Week 2026 &bull; Delegate Pass ID: <strong className="text-white font-mono">{participantInfo.passId}</strong> &bull; {participantInfo.college}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenNavigation && onOpenNavigation('AUD')}
              className="px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              <span>Wayfind to AUD</span>
            </button>
            <button
              onClick={handleCopyPassDetails}
              className="px-4 py-2.5 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-fuchsia-500/25"
            >
              {copiedPass ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPass ? 'Pass Copied!' : 'Copy Pass Text'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/20 mb-8 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('pass')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'pass'
              ? 'border-fuchsia-500 text-fuchsia-400 bg-fuchsia-500/10 shadow-sm'
              : 'border-transparent text-surface-variant hover:text-white'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Digital QR Badge &amp; Smart Turnstile</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'events'
              ? 'border-fuchsia-500 text-fuchsia-400 bg-fuchsia-500/10 shadow-sm'
              : 'border-transparent text-surface-variant hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Event Schedule &amp; Registrations</span>
          <span className="px-1.5 py-0.2 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-[10px]">
            {festEvents.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'certificates'
              ? 'border-fuchsia-500 text-fuchsia-400 bg-fuchsia-500/10 shadow-sm'
              : 'border-transparent text-surface-variant hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certificates &amp; Ledger Verification</span>
        </button>
      </div>

      {/* TAB 1: DIGITAL BADGE & REAL SCANNABLE QR CODE */}
      {activeTab === 'pass' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Badge Card (Left 6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#141026] via-[#0d0a1a] to-[#07050f] border border-fuchsia-500/40 shadow-2xl relative overflow-hidden group">
            {/* Holographic Watermark */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-fuchsia-500/20 via-purple-500/10 to-transparent rounded-bl-full pointer-events-none" />

            {/* Pass Header */}
            <div className="flex items-center justify-between pb-4 border-b border-fuchsia-500/20 mb-6">
              <div className="flex items-center gap-2.5">
                <img src="/iit-logo.png" alt="IIT Crest" className="w-8 h-8 object-contain" />
                <div>
                  <span className="text-xs font-black tracking-wider text-white uppercase font-display block">
                    IIT Bhubaneswar
                  </span>
                  <span className="text-[10px] text-fuchsia-400 font-mono">Chilika Institute of Technology</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500/30 to-purple-500/30 text-fuchsia-300 font-bold border border-fuchsia-500/40 shadow-sm">
                SPECTRA FEST 2026
              </span>
            </div>

            {/* Delegate Profile Card */}
            <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-fuchsia-500/60 shrink-0 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80"
                  alt="Delegate Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white font-display truncate">
                    {participantInfo.name}
                  </h3>
                  <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
                <p className="text-xs text-fuchsia-300 font-medium truncate mt-0.5">
                  {participantInfo.college}
                </p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-fuchsia-500/20 text-[10px] font-mono font-bold text-fuchsia-200 border border-fuchsia-500/30">
                  {participantInfo.tier}
                </span>
              </div>
            </div>

            {/* REAL SCANNABLE QR CODE MATRIX */}
            <div className="p-5 rounded-2xl bg-black/60 border border-fuchsia-500/30 flex flex-col items-center my-4 text-center">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
                Scan with any Smartphone Camera / Google Lens
              </span>

              {/* Verified QR Image */}
              <div className="w-52 h-52 bg-white rounded-2xl p-2.5 flex items-center justify-center shadow-2xl ring-4 ring-fuchsia-500/30">
                <img
                  src={qrCodeUrl}
                  alt="Official Cryptographic Delegate Pass QR"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="mt-3.5 flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-fuchsia-300 tracking-wider">
                  {participantInfo.passId}
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  VERIFIED ADMIT
                </span>
              </div>

              <p className="text-[11px] text-surface-variant mt-2 max-w-sm">
                Decodes: &ldquo;{qrRawData}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-fuchsia-500/20 text-xs text-surface-variant flex items-center justify-between">
              <span>Security Access Level:</span>
              <span className="font-semibold text-white font-mono">{participantInfo.accessZone}</span>
            </div>
          </div>

          {/* Turnstile Access Simulation & Verification (Right 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Turnstile Gate Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-surface-container-low border border-outline-variant/30 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  turnstileUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-fuchsia-500/20 text-fuchsia-400'
                }`}>
                  {turnstileUnlocked ? <Unlock className="w-5 h-5 animate-pulse" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Smart Turnstile &amp; NFC Access Gate
                  </h3>
                  <p className="text-xs text-surface-variant mt-0.5">
                    Main Gate, Auditorium Portico &bull; Fast-Track Barrier A-01
                  </p>
                </div>
              </div>

              <p className="text-xs text-surface-variant leading-relaxed mb-6">
                Tap your digital pass or QR code at any IIT Bhubaneswar turnstile reader to simulate RFID barrier access. Validated by the real-time Spectra access ledger.
              </p>

              {/* Interactive Barrier Simulation Bar */}
              <div className={`p-5 rounded-2xl border transition-all mb-6 ${
                turnstileUnlocked 
                  ? 'bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.25)]' 
                  : 'bg-surface-container border-outline-variant/20'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-surface-variant">BARRIER STATUS</span>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    turnstileUnlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {turnstileUnlocked ? 'GATE UNLOCKED (OPEN)' : 'LOCKED (STANDBY)'}
                  </span>
                </div>

                {/* Animated Gate Barrier Visual */}
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden relative">
                  <div className={`h-full rounded-full transition-all duration-700 ${
                    turnstileUnlocked 
                      ? 'w-full bg-gradient-to-r from-emerald-500 to-teal-300' 
                      : 'w-1/4 bg-fuchsia-500/50'
                  }`} />
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-surface-variant">
                  <span>Turnstile Gate: <strong>Main Auditorium Entrance</strong></span>
                  <span className="font-mono text-emerald-400">{turnstileUnlocked ? 'ACCESS GRANTED' : 'READY TO SCAN'}</span>
                </div>
              </div>

              <button
                onClick={handleSimulateTurnstile}
                disabled={turnstileUnlocked}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
                  turnstileUnlocked
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white shadow-fuchsia-500/25 active:scale-95'
                }`}
              >
                {turnstileUnlocked ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white animate-spin" />
                    <span>Turnstile Gate Open &bull; Step Through</span>
                  </>
                ) : (
                  <>
                    <QrCode className="w-5 h-5" />
                    <span>Tap QR Code to Open Turnstile</span>
                  </>
                )}
              </button>

              {turnstileUnlocked && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 animate-in fade-in text-xs font-semibold">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span>Turnstile Unlocked! Gate A-01 Open for 5 seconds. Welcome to Spectra 2026!</span>
                </div>
              )}
            </div>

            {/* Quick Venue Navigation Card */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 shadow-lg">
              <h4 className="text-sm font-bold text-white font-display mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Primary Delegate Venue Destinations</span>
              </h4>
              <p className="text-xs text-surface-variant mb-4">
                Instant 3D spatial wayfinding from campus gates to event stages:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { name: 'Main Auditorium (AUD)', id: 'AUD', dist: '320m' },
                  { name: 'Open Air Theatre (OAT)', id: 'OAT-ZONE', dist: '480m' },
                  { name: 'Lalitgiri Lecture Hall (LHL)', id: 'LHC', dist: '250m' },
                  { name: 'Computer Labs (SECS)', id: 'SECS-LAB', dist: '390m' },
                ].map((venue, idx) => (
                  <button
                    key={idx}
                    onClick={() => onOpenNavigation && onOpenNavigation(venue.id)}
                    className="p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/20 hover:border-secondary/40 text-left transition-all group"
                  >
                    <span className="text-xs font-bold text-white block group-hover:text-secondary transition-colors">
                      {venue.name}
                    </span>
                    <span className="text-[10px] text-surface-variant font-mono mt-0.5 block">
                      Distance: {venue.dist} &bull; Navigate &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: EVENTS SCHEDULE & REGISTRATIONS (Netflix Style Cards) */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Spectra Tech Fest 2026 Official Events
              </h2>
              <p className="text-xs text-surface-variant mt-0.5">
                All venues strictly scheduled in Period P10 to P13 (18:00 - 22:00) with zero academic overlaps
              </p>
            </div>
            <span className="text-xs font-mono text-fuchsia-300 bg-fuchsia-500/10 px-3 py-1 rounded-full border border-fuchsia-500/30">
              {registeredEvents.length} of {festEvents.length} Events Registered
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {festEvents.map((evt) => {
              const isRegistered = registeredEvents.includes(evt.id);
              return (
                <div 
                  key={evt.id} 
                  className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between hover:scale-[1.01] ${
                    isRegistered
                      ? 'bg-gradient-to-br from-fuchsia-950/40 via-surface-container-low to-surface-container border-fuchsia-500/40 shadow-xl shadow-fuchsia-500/10'
                      : 'bg-surface-container-low border-outline-variant/30 hover:border-fuchsia-500/30 shadow-lg'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-bold border border-fuchsia-500/30">
                        {evt.badge}
                      </span>
                      <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        {evt.seatsLeft} seats available
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white font-display mb-1.5">
                      {evt.title}
                    </h3>
                    
                    <p className="text-xs text-surface-variant leading-relaxed mb-4">
                      {evt.desc}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-surface-container/60 border border-outline-variant/20 text-xs mb-4">
                      <div className="flex items-center gap-1.5 font-mono text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                        <span className="truncate">{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium text-cyan-300">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-outline-variant/20 flex items-center gap-3">
                    <button
                      onClick={() => handleRegisterEvent(evt.id)}
                      disabled={isRegistered}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                        isRegistered
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white shadow-md shadow-fuchsia-500/20 active:scale-95'
                      }`}
                    >
                      {isRegistered ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Registered &bull; Admitted</span>
                        </>
                      ) : (
                        <>
                          <Ticket className="w-4 h-4" />
                          <span>Register Free Pass</span>
                        </>
                      )}
                    </button>

                    {onOpenNavigation && (
                      <button
                        onClick={() => onOpenNavigation(evt.building)}
                        className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-cyan-400 transition-colors"
                        title="Navigate to Venue on Map"
                      >
                        <Navigation className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 max-w-3xl space-y-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Post-Event Certificate Verification Ledger
              </h3>
              <p className="text-xs text-surface-variant mt-0.5">
                Official participation and merit achievement certificates signed by Chilika Institute of Technology
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 space-y-3 text-xs">
            <div className="flex items-center justify-between font-bold text-white text-sm">
              <span>CrunchWeek 2026: Autonomous Campus Management</span>
              <span className="text-emerald-400 font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                Verified Issued
              </span>
            </div>
            <p className="text-xs text-surface-variant leading-relaxed">
              Awarded to <strong>{participantInfo.name}</strong> for participation in the National Smart Campus Optimization &amp; Disruption Resolution Hackathon.
            </p>
            <div className="pt-2 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-surface-variant">
              <span>Hash: 0x9f4a...88b2 &bull; Directorate of Student Affairs</span>
              <span className="text-secondary font-bold">SHA-256 Validated</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
