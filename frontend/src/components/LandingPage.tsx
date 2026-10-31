import React, { useState } from 'react';
import { 
  Shield, Users, GraduationCap, Trophy, BookOpen, Ticket, 
  Compass, Sparkles, Building, ArrowRight, CheckCircle2, 
  MapPin, Clock, Calendar, AlertCircle, ChevronRight, Activity,
  Play, Radio, Layers, Bot, Zap, Flame, ExternalLink, ShieldAlert
} from 'lucide-react';
import { UserRole } from '../types';
import { useTheme } from '../context/ThemeContext';

interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
  onOpenNavigation: () => void;
  onOpenAI: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectRole,
  onOpenNavigation,
  onOpenAI,
}) => {
  const { uiMode, effectiveAppearance } = useTheme();
  const isBharat = uiMode === 'bharat';
  const isDark = effectiveAppearance === 'dark';

  const [activeCategory, setActiveCategory] = useState<'all' | 'academic' | 'facilities' | 'recreation'>('all');

  const portalCards = [
    {
      role: 'admin' as UserRole,
      title: 'Admin Portal',
      subtitle: 'Directorate Control & CP-SAT Solver',
      desc: 'Orchestrate 189 course sessions, solve integer constraints, approve disruptions, and enforce venue priority caps.',
      icon: Shield,
      accentColor: 'text-blue-400',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      borderGlow: 'hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]',
      gradient: 'from-blue-900/40 via-surface-container/60 to-surface-container-low',
      judgeTag: 'Judge Demo Account 1',
      highlights: ['CP-SAT Solver Engine', 'Disruption Matrix Diff', 'Audit Ledger & Demo Reset']
    },
    {
      role: 'department_coordinator' as UserRole,
      title: 'Department Coordinator',
      subtitle: 'Academic Scheduling Desk',
      desc: 'Supervise CSE department branches, monitor faculty contact hours, allocate specialized labs, and manage remedial sessions.',
      icon: Users,
      accentColor: 'text-purple-400',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      borderGlow: 'hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.25)]',
      gradient: 'from-purple-900/40 via-surface-container/60 to-surface-container-low',
      judgeTag: 'Judge Demo Account 2',
      highlights: ['CSE Branch Timetable', 'Faculty Workload Balancer', 'Lab Session Allocation']
    },
    {
      role: 'faculty' as UserRole,
      title: 'Faculty Portal',
      subtitle: 'Prof. Anita Roy (F01)',
      desc: 'Review personalized teaching calendars, declare research or leave unavailability, and submit rescheduling requests via AI.',
      icon: GraduationCap,
      accentColor: 'text-emerald-400',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      borderGlow: 'hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
      gradient: 'from-emerald-900/40 via-surface-container/60 to-surface-container-low',
      judgeTag: 'Judge Demo Account 3',
      highlights: ['Weekly Lecture Matrix', 'Leave Window Declarations', 'NLP Schedule Mod Requests']
    },
    {
      role: 'club' as UserRole,
      title: 'Club Representative',
      subtitle: 'Spectra Week Venue Desk',
      desc: 'Submit requests in English or Hinglish, track priority approvals, explore alternative rooms, and manage festival spaces.',
      icon: Trophy,
      accentColor: 'text-amber-400',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      borderGlow: 'hover:border-amber-500/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
      gradient: 'from-amber-900/40 via-surface-container/60 to-surface-container-low',
      judgeTag: 'Judge Demo Account 4',
      highlights: ['English/Hinglish NLP Booking', 'Spectra Auditorium Allocations', 'Alternative Room Offers']
    },
    {
      role: 'student' as UserRole,
      title: 'Student Portal',
      subtitle: 'Timetables & Classroom Finder',
      desc: 'Personalized course timetable, live class status, midsem exam room allotments, and one-click 3D indoor directions.',
      icon: BookOpen,
      accentColor: 'text-cyan-400',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      borderGlow: 'hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
      gradient: 'from-cyan-900/40 via-surface-container/60 to-surface-container-low',
      judgeTag: 'Full Student Access',
      highlights: ['Active Class Indicator', 'Room Change Alerts', '1-Click Wayfinding Links']
    },
    {
      role: 'participant' as UserRole,
      title: 'Participant Portal',
      subtitle: 'Digital Turnstile Badge & Fest Entry',
      desc: 'Dynamic QR event gate pass, hackathon schedules, simulated turnstile scanner, campus wayfinding, and certificates.',
      icon: Ticket,
      accentColor: 'text-fuchsia-400',
      badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
      borderGlow: 'hover:border-fuchsia-500/60 hover:shadow-[0_0_30px_rgba(217,70,239,0.25)]',
      gradient: 'from-fuchsia-900/40 via-surface-container/60 to-surface-container-low',
      judgeTag: 'CrunchWeek Delegate',
      highlights: ['Digital Gate Pass QR', 'Turnstile Unlock Simulation', 'Event Discovery & Map']
    }
  ];

  const liveCampusFeed = [
    {
      id: 'live-1',
      badge: 'LIVE CLASS',
      badgeColor: 'bg-rose-500 text-white',
      title: 'Lalitgiri LHL-101 (LH-1)',
      subtitle: 'CS301 Algorithms & Complexity',
      detail: 'Dr. Sunita Rao • 84/100 Seats Occupied • Period 4',
      image: '/Lalitgiri-Hall-of-Learning-scaled.jpg',
      target: 'LHL'
    },
    {
      id: 'live-2',
      badge: 'DISRUPTION RESOLVED',
      badgeColor: 'bg-emerald-500 text-white',
      title: 'Emergency Pipe Maintenance Repaired',
      subtitle: 'CR-102 & LHL-101 Scheduled Shift',
      detail: 'Only 14 sessions displaced • 0 Hard Violations • Stability 92.6%',
      image: '/lab-complex.jpg',
      target: 'LHL'
    },
    {
      id: 'live-3',
      badge: 'SPECTRA WEEK VENUE',
      badgeColor: 'bg-amber-500 text-black font-bold',
      title: 'Main Auditorium (AUD)',
      subtitle: 'Robotics & Autonomous Drone League',
      detail: 'Approved BR-01 • 200 Attendees • Fri 18:00–21:00',
      image: '/Auditorium-1.png',
      target: 'AUD'
    },
    {
      id: 'live-4',
      badge: '24/7 OPEN',
      badgeColor: 'bg-cyan-500 text-black font-bold',
      title: 'Central Library Commons',
      subtitle: 'Silent Research Pods & Digital RFID Desks',
      detail: 'Air-conditioned digital lounge open 24/7 for exam week',
      image: '/main-building.jpg',
      target: 'LIB'
    },
    {
      id: 'live-5',
      badge: 'HEALTHCARE ACTIVE',
      badgeColor: 'bg-indigo-500 text-white',
      title: 'Sanjeevan Health Centre',
      subtitle: 'Trauma Unit & 24x7 Ambulance On-Duty',
      detail: 'Doctor on duty: Dr. P. K. Das • Emergency ext: 5114',
      image: '/Sanjeevan-Health-Center-scaled.jpg',
      target: 'HC'
    }
  ];

  const campusGalleries = [
    { title: 'Lalitgiri Complex (LHL)', category: 'academic', image: '/Lalitgiri-Hall-of-Learning-scaled.jpg', desc: 'Central academic complex housing Lecture Halls LH-1 through LH-6 with 15 topological indoor nodes.' },
    { title: 'Administrative Secretariat', category: 'academic', image: '/main-building.jpg', desc: 'Central administrative headquarters, Directorate, Academic Senate Hall, and Registrar offices.' },
    { title: 'Community Auditorium', category: 'recreation', image: '/Auditorium-1.png', desc: 'Acoustically treated auditorium seating 600 delegates with professional theatrical lighting.' },
    { title: 'School of Basic Sciences', category: 'academic', image: '/School-of-Basic-Science-scaled.jpg', desc: 'Physics, Chemistry, and Advanced Materials research labs equipped with clean-room bays.' },
    { title: 'Student Activity Centre (SAC)', category: 'recreation', image: '/SAC-Building-1-scaled.jpg', desc: 'Indoor badminton stadiums, state-of-the-art gymnasium, music practice rooms, and student council.' },
    { title: 'Sanjeevan Health Centre', category: 'facilities', image: '/Sanjeevan-Health-Center-scaled.jpg', desc: 'Campus hospital with emergency trauma bays, pathology lab, optical unit, and 24-hour pharmacy.' },
    { title: 'Olympic Swimming Pool', category: 'recreation', image: '/swimming-pool-scaled.jpg', desc: 'International standard 50-meter outdoor aquatic facility with automated water filtration.' },
    { title: 'Brahmaputra Boys Residence', category: 'facilities', image: '/BHR-Boys-Hostel-scaled.jpg', desc: 'Multi-story hostel residence accommodating 800 scholars with high-speed campus Wi-Fi.' },
  ];

  const filteredGalleries = activeCategory === 'all' 
    ? campusGalleries 
    : campusGalleries.filter(g => g.category === activeCategory);

  return (
    <div className="flex flex-col w-full text-on-surface">
      
      {/* 1. CINEMATIC BILLBOARD HERO (Netflix-Style Spotlight) */}
      <section className="relative w-full rounded-3xl overflow-hidden mb-12 border border-outline-variant/30 shadow-2xl bg-surface-container-lowest">
        
        {/* Ambient IIT Campus Backdrop Image with Gradient Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Lalitgiri-Hall-of-Learning-scaled.jpg"
            alt="IIT Bhubaneswar Campus"
            onError={(e) => { (e.target as HTMLImageElement).src = '/campus-gallery.png'; }}
            className="w-full h-full object-cover object-center filter brightness-50 scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Netflix-style Multi-Layer Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1f] via-[#070e1f]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070e1f] via-[#070e1f]/60 to-transparent" />
        </div>

        {/* Hero Content Stage */}
        <div className="relative z-10 px-6 sm:px-12 py-16 sm:py-24 max-w-4xl">
          
          {/* Accreditation Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            {isBharat && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/25 via-amber-500/20 to-orange-500/25 border border-orange-500/50 backdrop-blur-xl shadow-lg shadow-orange-500/10">
                <span className="text-xs">🇮🇳</span>
                <span className="text-xs font-bold text-orange-300 font-mono tracking-wide uppercase">
                  Bharat Innovation Challenge 2026
                </span>
              </div>
            )}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-high/90 border border-secondary/40 backdrop-blur-xl shadow-lg shadow-cyan-500/10">
              <img src="/iit-logo.png" alt="IIT Crest" onError={(e) => { (e.target as HTMLImageElement).src = '/campus-gallery.png'; }} className="w-6 h-6 object-contain" />
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-white uppercase tracking-wider font-mono">IIT Bhubaneswar</span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary font-mono">CrunchWeek 2026</span>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 font-display leading-[1.08] drop-shadow-md">
            ONE CAMPUS.<br />
            <span className={`text-transparent bg-clip-text ${
              isBharat
                ? 'bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400'
                : 'bg-gradient-to-r from-secondary via-primary-fixed to-tertiary'
            }`}>
              ONE CONNECTED EXPERIENCE.
            </span>
          </h1>

          {/* Slogan & Description */}
          <p className="text-base sm:text-lg text-surface-variant max-w-2xl mb-8 leading-relaxed font-normal">
            The next-generation smart campus operations matrix. Featuring <strong>Google OR-Tools CP-SAT</strong> optimization with zero schedule clashes, multi-floor indoor navigation, and natural language AI venue bookings.
          </p>

          {/* Netflix-Style Primary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="#portals"
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all transform hover:scale-105 active:scale-95 ${
                isBharat
                  ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-orange-500/25 hover:shadow-orange-500/40'
                  : 'bg-gradient-to-r from-secondary to-primary-container text-on-secondary shadow-secondary/25 hover:shadow-secondary/40'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Enter Portal Workspace</span>
            </a>

            <button
              onClick={onOpenNavigation}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-high/90 hover:bg-surface-container-highest border border-outline-variant/40 text-white font-semibold text-sm backdrop-blur-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4 text-secondary" />
              <span>3D Spatial Wayfinding</span>
            </button>

            <button
              onClick={onOpenAI}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 font-semibold text-sm backdrop-blur-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Ask AI Assistant</span>
            </button>
          </div>

          {/* Live System Indicator */}
          <div className="mt-8 flex items-center gap-3 text-xs text-surface-variant/90">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-300 font-mono font-medium">Solver Engine: ONLINE</span>
            </div>
            <span>•</span>
            <span className="font-mono text-[11px]">20 Buildings Geocoded</span>
            <span>•</span>
            <span className="font-mono text-[11px]">0 Hard Violations</span>
          </div>

        </div>
      </section>

      {/* 2. NETFLIX-STYLE "TRENDING ON CAMPUS / LIVE TELEMETRY ROW" */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
            <h2 className="text-xl font-bold text-white font-display tracking-tight">Live Campus Telemetry & Trending Hubs</h2>
          </div>
          <span className="text-xs font-mono text-secondary uppercase tracking-wider hidden sm:inline">
            Real-Time Grid Status
          </span>
        </div>

        {/* Horizontal Card Scroller with Netflix Hover Scale */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
          {liveCampusFeed.map((item, idx) => (
            <div
              key={item.id}
              onClick={onOpenNavigation}
              className="group relative flex-shrink-0 w-80 sm:w-96 rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/30 cursor-pointer cinematic-card-hover"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/campus-gallery.png'; }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent" />
                
                {/* Ranking / Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${item.badgeColor} shadow-md`}>
                    {item.badge}
                  </span>
                </div>

                <div className="absolute bottom-2 left-3 right-3">
                  <h3 className="font-bold text-white text-base font-display truncate drop-shadow">
                    {item.title}
                  </h3>
                  <p className="text-xs text-secondary font-medium truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/20">
                <p className="text-xs text-surface-variant line-clamp-1">
                  {item.detail}
                </p>
                <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors shrink-0 ml-2">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ENTERPRISE TELEMETRY METRIC RIBBON */}
      <section className="mb-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 relative overflow-hidden group hover:border-secondary/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center mb-3 text-secondary">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white font-display">18,400+</div>
          <div className="text-xs text-secondary font-medium mt-0.5">Active Campus Citizens</div>
          <p className="text-[11px] text-surface-variant mt-1">Students, scholars & faculty</p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3 text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white font-display">94.8%</div>
          <div className="text-xs text-emerald-400 font-medium mt-0.5">Room Allocation Efficiency</div>
          <p className="text-[11px] text-surface-variant mt-1">LHL & academic complexes</p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-3 text-purple-400">
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white font-display">0 Clashes</div>
          <div className="text-xs text-purple-400 font-medium mt-0.5">Google CP-SAT Certified</div>
          <p className="text-[11px] text-surface-variant mt-1">Zero hard constraint violations</p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3 text-cyan-400">
            <Compass className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white font-display">15 Nodes</div>
          <div className="text-xs text-cyan-400 font-medium mt-0.5">Multi-Floor Indoor Graph</div>
          <p className="text-[11px] text-surface-variant mt-1">Elevators, ramps & fire exits</p>
        </div>
      </section>

      {/* 4. SIX INTERACTIVE ROLE PORTALS (Netflix-Style Spotlight Cards) */}
      <section id="portals" className="mb-16 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/40 text-xs font-semibold text-secondary uppercase tracking-widest mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Role-Based Campus Workspaces</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Select Your Campus Portal
          </h2>
          <p className="text-surface-variant text-sm mt-2">
            Each portal is tailored with authorized capabilities and ready-to-test Judge Demo accounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portalCards.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.role}
                onClick={() => onSelectRole(portal.role)}
                className={`group relative rounded-2xl bg-gradient-to-b ${portal.gradient} border border-outline-variant/30 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 ${portal.borderGlow} hover:-translate-y-1`}
              >
                <div>
                  {/* Top Header: Icon & Judge Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shadow-md">
                      <Icon className={`w-6 h-6 ${portal.accentColor}`} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${portal.badgeColor}`}>
                      {portal.judgeTag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display group-hover:text-secondary transition-colors">
                    {portal.title}
                  </h3>
                  <p className="text-xs font-medium text-surface-variant mt-0.5 mb-3">
                    {portal.subtitle}
                  </p>
                  <p className="text-xs text-surface-variant/90 leading-relaxed mb-4">
                    {portal.desc}
                  </p>

                  {/* Highlights Pill List */}
                  <div className="space-y-1.5 pt-3 border-t border-outline-variant/20 mb-6">
                    {portal.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-surface-variant">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${portal.accentColor} shrink-0`} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enter Workspace Button */}
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high/90 group-hover:bg-secondary group-hover:text-on-secondary text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Enter {portal.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CAMPUS FACILITIES & PHOTOGRAPHY SHOWCASE (Netflix Thumbnail Carousel) */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white font-display">Campus Infrastructure & Facilities</h2>
            <p className="text-xs text-surface-variant mt-1">Official IIT Bhubaneswar Argul Permanent Campus photography</p>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2">
            {(['all', 'academic', 'facilities', 'recreation'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  activeCategory === cat
                    ? 'bg-secondary text-on-secondary shadow-md shadow-secondary/20'
                    : 'bg-surface-container text-surface-variant hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Netflix Thumbnail Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredGalleries.map((item, idx) => (
            <div
              key={idx}
              onClick={onOpenNavigation}
              className="group relative rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/30 cursor-pointer cinematic-card-hover"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/campus-gallery.png'; }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent" />
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-surface-container-lowest/80 backdrop-blur-md text-[10px] font-mono text-secondary uppercase border border-outline-variant/30">
                  {item.category}
                </span>
              </div>

              <div className="p-4 bg-surface-container-low">
                <h4 className="font-bold text-white text-sm font-display group-hover:text-secondary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-surface-variant mt-1 line-clamp-2">
                  {item.desc}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-secondary font-medium">
                  <Compass className="w-3.5 h-3.5" />
                  <span>View on 3D Map</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. AUTONOMOUS CAMPUS GRID & INNOVATION HIGHLIGHT */}
      <section className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-blue-950/60 via-surface-container to-purple-950/60 border border-secondary/30 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-xs font-semibold text-secondary uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Twin Integration</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white font-display mb-3">
            Autonomous Scheduling & Spatial Telemetry
          </h2>
          <p className="text-sm text-surface-variant leading-relaxed mb-6">
            Equipped with mathematical integer programming to solve room allocations and course collisions instantly. If unforeseen disruptions occur—such as emergency maintenance or faculty travel—the system repairs the schedule in seconds with minimal displacement.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onOpenNavigation}
              className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-bold text-xs flex items-center gap-2 hover:opacity-90 shadow-md transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Launch Campus Map</span>
            </button>
            <button
              onClick={onOpenAI}
              className="px-5 py-2.5 rounded-xl bg-surface-container-high border border-outline-variant/40 text-white font-bold text-xs flex items-center gap-2 hover:bg-surface-container-highest transition-all"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Ask CampusX AI</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
