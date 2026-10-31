import React, { useState } from 'react';
import { 
  Shield, Users, GraduationCap, Trophy, BookOpen, Ticket, 
  Compass, Sparkles, Building, ArrowRight, CheckCircle2, 
  MapPin, Clock, Calendar, AlertCircle, ChevronRight, Activity,
  Play, Radio, Layers, Bot, Zap, Flame, ExternalLink, ShieldAlert,
  BarChart3, Eye, TrendingUp, Search, Filter, SlidersHorizontal,
  CheckCircle, ArrowUpRight, Gauge, RefreshCw, Volume2, Cpu, Check, AlertTriangle
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
  const [queueTab, setQueueTab] = useState<'needs_action' | 'spectra' | 'exams' | 'core'>('needs_action');
  const [queueSearch, setQueueSearch] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('P4');
  const [gaugeMode, setGaugeMode] = useState<'standard' | 'spectra' | 'midsem'>('spectra');

  const queueItems = [
    {
      id: 'Q-DISRUPT-1',
      category: 'needs_action',
      title: 'CR-102 Pipe Leak & Room Closure',
      group: 'Academic Quadrangle',
      requester: 'Estate Maintenance Desk',
      time: 'P1-P9 Mon-Fri',
      venue: 'LHL-101 / LH-3',
      badge: 'PROPOSED FIX',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      action: 'Approve 14 Session Moves',
      displaced: '14 moves',
      status: 'Awaiting Admin'
    },
    {
      id: 'Q-DISRUPT-2',
      category: 'needs_action',
      title: 'Prof. F07 Leave & Monday Travel',
      group: 'CSE-1 & CSE-2',
      requester: 'Faculty Deanery',
      time: 'Mondays P1-P9',
      venue: 'LH-1',
      badge: 'FIX READY',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      action: 'Review Reassignment',
      displaced: '4 moves',
      status: 'Validated'
    },
    {
      id: 'Q-SPECTRA-1',
      category: 'spectra',
      title: 'Robotics & Drone Grand Keynote (BR-01)',
      group: 'Spectra Fest Committee',
      requester: 'Tech Club President',
      time: 'Fri 18:00 - 21:00 (P10-P13)',
      venue: 'Main Auditorium (AUD)',
      badge: 'APPROVED',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      action: 'View Venue Pack',
      displaced: '0 clashes',
      status: 'Score: 2.0 (High Priority)'
    },
    {
      id: 'Q-SPECTRA-2',
      category: 'spectra',
      title: 'AI Supercomputing Hackathon (BR-02)',
      group: 'ACM Student Chapter',
      requester: 'Aarav Patel',
      time: 'Sat 09:00 - 18:00',
      venue: 'CS-LAB-1 & CS-LAB-2',
      badge: 'APPROVED',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      action: 'View Lab Alloc',
      displaced: '0 clashes',
      status: 'Score: 3.0'
    },
    {
      id: 'Q-SPECTRA-3',
      category: 'spectra',
      title: 'Gaming LAN Arena (BR-18)',
      group: 'eSports Council',
      requester: 'Kunal Sen',
      time: 'Sat 14:00 - 18:00',
      venue: 'CR-101 (Alt Offered: LH-2)',
      badge: 'ALTERNATIVE SUGGESTED',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      action: 'Review Alt Venue',
      displaced: 'Capacity Exceeded',
      status: 'LH-2 Proposed (100 seats)'
    },
    {
      id: 'Q-EXAM-1',
      category: 'exams',
      title: 'CS301 Algorithms Midsem Exam (EX-CS301)',
      group: 'CS-Y3 (200 Students)',
      requester: 'Exam Controller',
      time: 'Mon AM (09:30 - 11:30)',
      venue: 'LH-1 & LH-2 Split',
      badge: 'SCHEDULED',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      action: 'Room Allocation Plan',
      displaced: '0 Violations',
      status: 'Midsem Week 8'
    },
    {
      id: 'Q-EXAM-2',
      category: 'exams',
      title: 'Open Elective Basket OEB-1 (EX-OE-BASKET)',
      group: 'All 3rd Year Batches (450 Students)',
      requester: 'Dean of Academics',
      time: 'Sat AM (09:30 - 11:30)',
      venue: 'AUD + LH-4 + LH-5 + LH-6',
      badge: 'CONCURRENT ROSTER',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      action: 'View Desks',
      displaced: 'Synchronized',
      status: 'Zero Student Overlap'
    },
    {
      id: 'Q-CORE-1',
      category: 'core',
      title: 'CS301 Algorithms & Complexity (CS301-L1)',
      group: 'CS-Y3 (Combined)',
      requester: 'Dr. Sunita Rao',
      time: 'Mon P4 (11:00 - 12:00)',
      venue: 'LH-4 (Lalitgiri)',
      badge: 'ACTIVE LIVE',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      action: 'Wayfinding 3D',
      displaced: 'Fixed Slot',
      status: '84/100 Seats'
    },
    {
      id: 'Q-CORE-2',
      category: 'core',
      title: 'CS391 Systems Programming Lab (CS391-LAB)',
      group: 'CS-Y3 Batch A',
      requester: 'Prof. Alok Gupta',
      time: 'Thu P6-P8 (14:00 - 17:00)',
      venue: 'CS-LAB-2',
      badge: 'CONFIRMED',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      action: 'Wayfinding 3D',
      displaced: '3-Hour Continuous',
      status: '60/60 Workstations'
    }
  ];

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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-amber-500/40 backdrop-blur-xl shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-xs font-bold text-amber-300 font-mono tracking-wide uppercase">
                CIT Semester &amp; Venue Management Platform
              </span>
            </div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-high/90 border border-secondary/40 backdrop-blur-xl shadow-lg shadow-cyan-500/10">
              <img src="/iit-logo.png" alt="IIT Crest" onError={(e) => { (e.target as HTMLImageElement).src = '/campus-gallery.png'; }} className="w-6 h-6 object-contain" />
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-white uppercase tracking-wider font-mono">Chilika Institute of Technology</span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary font-mono">1,000 Students &bull; 5 Branches</span>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 font-display leading-[1.08] drop-shadow-md">
            ONE CAMPUS.<br />
            <span className={`text-transparent bg-clip-text ${
              isBharat
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400'
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
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-extrabold shadow-amber-500/25 hover:shadow-amber-500/40'
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

      {/* 3. CYBER NEON TELEMETRY & CAREGRID OPERATIONS CONSOLE (Inspired by Image 1 & Image 2) */}
      <section className="mb-16 space-y-6">
        
        {/* --- PART A: 4 GLOWING TOP KPI TILES (IMAGE 1 SPEC) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Tile 1: Amber Glow (#ffb700) */}
          <div className="relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:scale-[1.02] border backdrop-blur-xl group cursor-pointer shadow-lg bg-[#0e1626]/90 border-amber-500/30 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(255,183,0,0.25)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                Rigor Index
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="text-4xl font-extrabold text-white font-mono tracking-tight drop-shadow-md">
              98.5%
            </div>
            <div className="text-xs font-semibold text-amber-300 mt-1">
              Schedule Stability / CP-SAT Rigor
            </div>
            <div className="mt-3 pt-2.5 border-t border-amber-500/20 flex items-center justify-between text-[11px]">
              <span className="text-surface-variant">Target: 98.0%</span>
              <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                +0.5% vs Wk 6
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-2 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" style={{ width: '98.5%' }}></div>
            </div>
          </div>

          {/* Tile 2: Royal Blue Glow (#2563eb) */}
          <div className="relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:scale-[1.02] border backdrop-blur-xl group cursor-pointer shadow-lg bg-[#0e1626]/90 border-blue-500/30 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(37,99,235,0.25)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400/90 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                Capacity Load
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-colors">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-4xl font-extrabold text-white font-mono tracking-tight drop-shadow-md">
              2 481
            </div>
            <div className="text-xs font-semibold text-blue-300 mt-1">
              Enrolled Seat Hours Scheduled
            </div>
            <div className="mt-3 pt-2.5 border-t border-blue-500/20 flex items-center justify-between text-[11px]">
              <span className="text-surface-variant">189 Sessions Active</span>
              <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                0 Clashes
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-2 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          {/* Tile 3: Electric Cyan Glow (#00e5ff) */}
          <div className="relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:scale-[1.02] border backdrop-blur-xl group cursor-pointer shadow-lg bg-[#0e1626]/90 border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,229,255,0.25)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400/90 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                GIS Spatial
              </span>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div className="text-4xl font-extrabold text-white font-mono tracking-tight drop-shadow-md">
              31 124
            </div>
            <div className="text-xs font-semibold text-cyan-300 mt-1">
              Campus GIS Footfalls & Queries
            </div>
            <div className="mt-3 pt-2.5 border-t border-cyan-500/20 flex items-center justify-between text-[11px]">
              <span className="text-surface-variant">20 Geocoded Landmarks</span>
              <span className="font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Live GPS
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-2 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>

          {/* Tile 4: Neon Magenta/Pink Glow (#ff2d78) */}
          <div className="relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:scale-[1.02] border backdrop-blur-xl group cursor-pointer shadow-lg bg-[#0e1626]/90 border-pink-500/30 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(255,45,120,0.25)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-pink-400/90 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
                Spectra Fest
              </span>
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:bg-pink-400 group-hover:text-white transition-colors">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-4xl font-extrabold text-white font-mono tracking-tight drop-shadow-md">
              21 / 25
            </div>
            <div className="text-xs font-semibold text-pink-300 mt-1">
              Spectra Tech Fest Approved Venues
            </div>
            <div className="mt-3 pt-2.5 border-t border-pink-500/20 flex items-center justify-between text-[11px]">
              <span className="text-surface-variant">4 Alt Offers Ready</span>
              <span className="font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                84% Fill
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-2 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-600 to-pink-400 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>

        </div>

        {/* --- PART B: INTERACTIVE FREQUENCY WAVEFORM & DYNAMIC RADIAL GAUGES (IMAGE 1 SPEC) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Audio-Style Waveform Frequency Chart with Interactive Period Inspector (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl p-6 bg-gradient-to-br from-[#0c1322] via-[#09101d] to-[#060c18] border border-cyan-500/20 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <h3 className="text-base font-bold text-white font-display">
                      Campus Period Acoustic &amp; Load Frequency
                    </h3>
                  </div>
                  <p className="text-xs text-surface-variant mt-0.5">
                    Click any period column (P1 &ndash; P13) to inspect live scheduled sessions and constraint compliance
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    Peak: P4 (100%)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Lunch: 0 Classes
                  </span>
                </div>
              </div>

              {/* Audio Waveform Equalizer Interactive Display */}
              <div className="h-44 flex items-end justify-between gap-1.5 sm:gap-2 px-2 pb-2 pt-6 rounded-2xl bg-black/40 border border-white/5 relative">
                {/* Background guideline grid */}
                <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none opacity-20">
                  <div className="border-b border-cyan-500 border-dashed w-full"></div>
                  <div className="border-b border-cyan-500 border-dashed w-full"></div>
                  <div className="border-b border-cyan-500 border-dashed w-full"></div>
                </div>

                {[
                  { period: 'P1', time: '08:00', height: '62%', color: 'from-blue-600 to-cyan-400', load: '62%', name: 'P1 (08:00)' },
                  { period: 'P2', time: '09:00', height: '88%', color: 'from-blue-600 to-cyan-400', load: '88%', name: 'P2 (09:00)' },
                  { period: 'P3', time: '10:00', height: '94%', color: 'from-cyan-500 to-teal-300', load: '94%', name: 'P3 (10:00)' },
                  { period: 'P4', time: '11:00', height: '100%', color: 'from-teal-400 to-emerald-300', load: '100%', name: 'P4 (11:00)' },
                  { period: 'P5', time: '12:00', height: '82%', color: 'from-blue-600 to-cyan-400', load: '82%', name: 'P5 (12:00)' },
                  { period: 'Lunch', time: '13:00', height: '14%', color: 'from-amber-500/40 to-amber-400/60', load: '0%', name: 'Lunch (13:00)' },
                  { period: 'P6', time: '14:00', height: '90%', color: 'from-blue-600 to-cyan-400', load: '90%', name: 'P6 (14:00)' },
                  { period: 'P7', time: '15:00', height: '96%', color: 'from-cyan-500 to-teal-300', load: '96%', name: 'P7 (15:00)' },
                  { period: 'P8', time: '16:00', height: '84%', color: 'from-blue-600 to-cyan-400', load: '84%', name: 'P8 (16:00)' },
                  { period: 'P9', time: '17:00', height: '68%', color: 'from-blue-600 to-cyan-400', load: '68%', name: 'P9 (17:00)' },
                  { period: 'P10', time: '18:00', height: '78%', color: 'from-pink-500 to-purple-400', load: 'Fest 78%', name: 'P10 (18:00)' },
                  { period: 'P11', time: '19:00', height: '95%', color: 'from-pink-500 to-purple-400', load: 'Fest 95%', name: 'P11 (19:00)' },
                  { period: 'P12', time: '20:00', height: '86%', color: 'from-pink-500 to-purple-400', load: 'Fest 86%', name: 'P12 (20:00)' },
                  { period: 'P13', time: '21:00', height: '64%', color: 'from-purple-600 to-indigo-400', load: 'Fest 64%', name: 'P13 (21:00)' },
                ].map((bar, i) => {
                  const isSelected = selectedPeriod === bar.period;
                  return (
                    <div 
                      key={i} 
                      onClick={() => setSelectedPeriod(bar.period)}
                      className={`flex-1 flex flex-col items-center h-full justify-end cursor-pointer group/bar relative transition-all ${
                        isSelected ? 'scale-105 z-10' : 'hover:scale-102'
                      }`}
                    >
                      {/* Active Indicator Pin */}
                      {isSelected && (
                        <div className="absolute -top-6 text-[9px] font-mono font-bold bg-cyan-400 text-slate-950 px-1 rounded shadow animate-bounce">
                          ACTIVE
                        </div>
                      )}
                      
                      {/* Waveform Column */}
                      <div 
                        className={`w-full rounded-t-sm bg-gradient-to-t ${bar.color} transition-all duration-300 ${
                          isSelected 
                            ? 'brightness-150 ring-2 ring-cyan-300 shadow-[0_0_18px_rgba(76,215,246,0.8)]' 
                            : 'group-hover/bar:brightness-125'
                        }`}
                        style={{ height: bar.height }}
                      ></div>
                      <span className={`text-[9px] font-mono mt-1 truncate max-w-full font-bold ${
                        isSelected ? 'text-cyan-300' : 'text-slate-400'
                      }`}>
                        {bar.period === 'Lunch' ? 'L' : bar.period}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Period Detail Card (Dynamic Inspector) */}
            {(() => {
              const details: Record<string, {
                title: string;
                time: string;
                load: string;
                type: string;
                badgeColor: string;
                sessions: string[];
                constraint: string;
              }> = {
                P1: {
                  title: 'Morning Academic Blocks Begin',
                  time: '08:00 - 09:00',
                  load: '62% Load (8 Core Classes)',
                  type: 'Academic Lecture Block',
                  badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
                  sessions: ['CS201 Data Structures (LH-1)', 'ME201 Thermodynamics (LH-2)', 'EE301 Network Theory (LH-3)'],
                  constraint: 'Soft Constraint S1 Checked: No faculty scheduled at avoid times'
                },
                P2: {
                  title: 'Laboratory Blocks Commencing (3-Hour Block)',
                  time: '09:00 - 10:00',
                  load: '88% Load (Labs + Lectures)',
                  type: 'Morning Lab Window (P2-P4)',
                  badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
                  sessions: ['CS391 Systems Lab (CS-LAB-1)', 'PH191 Physics Lab (PHYS-LAB)', 'EE201 Signals (LH-1)'],
                  constraint: 'Hard Constraint Enforced: 3-hour labs only allowed in P2-P4 or P6-P8'
                },
                P3: {
                  title: 'Department Core Lecture Roster',
                  time: '10:00 - 11:00',
                  load: '94% Load (14 Rooms Occupied)',
                  type: 'Academic Lecture Block',
                  badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
                  sessions: ['EC301 Digital Electronics (LH-3)', 'CS391 Systems Lab Cont. (CS-LAB-1)', 'CE201 Mechanics (LH-2)'],
                  constraint: 'Hard Constraint Enforced: Room capacity matches cohort size'
                },
                P4: {
                  title: 'CS301 Algorithms & Complexity (Peak Load)',
                  time: '11:00 - 12:00',
                  load: '100% Peak Academic Capacity',
                  type: 'Combined Lecture Session',
                  badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                  sessions: ['CS301 Combined Batch (LH-4, 200 Seats)', 'ME301 Fluid Dynamics (LH-1)', 'CS391 Final Hour (CS-LAB-1)'],
                  constraint: 'Google CP-SAT Certified: Zero clashes with combined batch students'
                },
                P5: {
                  title: 'Pre-Lunch Tutorials & Lecture Sessions',
                  time: '12:00 - 13:00',
                  load: '82% Load (Tutorial Rooms Active)',
                  type: 'Tutorial & Remedial Block',
                  badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
                  sessions: ['MA201 Discrete Math (LH-1)', 'EE202 Tutorial (CR-101)', 'ME202 Tutorial (CR-103)'],
                  constraint: 'Boundary Rule: All sessions terminate promptly before 13:00'
                },
                Lunch: {
                  title: 'MANDATORY CAMPUS LUNCH INTERVAL',
                  time: '13:00 - 14:00',
                  load: '0% Load (Strict Zero Classes)',
                  type: 'Hard Constraint Enforced',
                  badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                  sessions: ['No Teaching Sessions Permitted', 'Faculty Dining Hall Open', 'Central Student Mess Active'],
                  constraint: 'Strict Hard Constraint: No session can run across lunch (P5 & P6 interval)'
                },
                P6: {
                  title: 'Afternoon Laboratory Blocks (3-Hour Block)',
                  time: '14:00 - 15:00',
                  load: '90% Load (Labs Commencing)',
                  type: 'Afternoon Lab Window (P6-P8)',
                  badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
                  sessions: ['CS391 Systems Lab Batch B (CS-LAB-2)', 'ME291 CAD Lab (CAD-LAB)', 'CH191 Chemistry Lab'],
                  constraint: 'Hard Constraint Enforced: 3-hour afternoon lab valid in P6-P8'
                },
                P7: {
                  title: 'Open Elective Basket OEB-1 Synchronized',
                  time: '15:00 - 16:00',
                  load: '96% Load (Concurrent Slot)',
                  type: 'Elective Basket Slot',
                  badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
                  sessions: ['OE-AI (LH-1)', 'OE-FINANCE (LH-2)', 'OE-ROBOTICS (LH-3)', 'OE-ENERGY (LH-4)'],
                  constraint: 'Hard Constraint: All sessions in elective basket slot run at the same day & period'
                },
                P8: {
                  title: 'Afternoon Lab Evaluations & Vivawork',
                  time: '16:00 - 17:00',
                  load: '84% Load (Lab Evaluations)',
                  type: 'Lab Window Concluding',
                  badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
                  sessions: ['CS391 Final Hour (CS-LAB-2)', 'CAD Lab Wrap-up', 'EE302 Tutorial (CR-101)'],
                  constraint: 'Faculty Contact Constraint: Max 4 hours daily teaching respected'
                },
                P9: {
                  title: 'Final Teaching Hour of the Academic Day',
                  time: '17:00 - 18:00',
                  load: '68% Load (Doubt Clearance)',
                  type: 'Faculty Consultation',
                  badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
                  sessions: ['CS Remedial (LH-1)', 'ME Office Hours (LH-2)', 'Student Project Reviews'],
                  constraint: 'Teaching Week Conclusion: Periods P1 to P9 complete'
                },
                P10: {
                  title: 'Spectra Tech Fest Evening Window Opens',
                  time: '18:00 - 19:00',
                  load: '78% Fest Venue Allocation',
                  type: 'Events Only Window (P10-P13)',
                  badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
                  sessions: ['BR-07 Stage Play: Andha Yug (AUD)', 'BR-11 Quiz Prelims (CR-101)', 'BR-14 Sound Check (OAT)'],
                  constraint: 'Hard Constraint Enforced: Periods P10 to P13 are only for events'
                },
                P11: {
                  title: 'Prime Tech Fest Keynote & Hackathon Kickoff',
                  time: '19:00 - 20:00',
                  load: '95% Full Fest Venue Fill',
                  type: 'Major Campus Event',
                  badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
                  sessions: ['BR-01 Robotics & Drone Keynote (AUD)', 'BR-02 Hackathon 24H (CS-LAB-1 & 2)', 'BR-09 Drone Arena'],
                  constraint: 'Spectra Priority Rule: Tier 1 Tech Club President approval verified'
                },
                P12: {
                  title: 'Spectra Cultural & Acoustic Jam Night',
                  time: '20:00 - 21:00',
                  load: '86% OAT & Outdoor Venue Fill',
                  type: 'Open Air Theatre Event',
                  badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
                  sessions: ['BR-14 Acoustic Jam Night (OAT, 1,200 Capacity)', 'BR-02 Hackathon Sprint (CS-LAB-1)'],
                  constraint: 'Campus Safety & Lighting Telemetry Active'
                },
                P13: {
                  title: 'LAN Gaming Arena & Event Curfew Boundary',
                  time: '21:00 - 22:00',
                  load: '64% Final Evening Window',
                  type: 'Evening Curfew Boundary',
                  badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
                  sessions: ['BR-18 Gaming LAN Arena (LH-2 Alt Offered)', 'BR-02 Hackathon Overnight Pass'],
                  constraint: 'Alternative Proposal Rule: LH-2 offered to prevent CR-101 capacity overflow'
                }
              };

              const active = details[selectedPeriod] || details['P4'];

              return (
                <div className="mt-4 p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-sm text-cyan-300">
                        {selectedPeriod}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">({active.time})</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${active.badgeColor}`}>
                        {active.type}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">
                      {active.load}
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <div className="text-[11px] font-bold text-white mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      <span>{active.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {active.sessions.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-surface-container text-[10px] text-slate-300 border border-white/5">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{active.constraint}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="mt-4 flex items-center justify-between text-xs text-surface-variant pt-2 border-t border-white/5">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400"></span> Academic P1-P9
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-pink-400"></span> Spectra Tech Fest P10-P13
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400/60"></span> Mandatory Lunch Interval
              </span>
            </div>
          </div>

          {/* Right: Working Scenario Concentric Radial Gauges (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-6 bg-gradient-to-br from-[#0c1322] via-[#09101d] to-[#060c18] border border-blue-500/20 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-blue-400" />
                  Capacity Allocation Matrix
                </h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                  gaugeMode === 'spectra'
                    ? 'bg-pink-500/20 text-pink-300 border-pink-500/40'
                    : gaugeMode === 'midsem'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {gaugeMode === 'spectra' ? 'WEEK 7 PEAK' : gaugeMode === 'midsem' ? 'EXAM HALVED' : 'REGULAR SEM'}
                </span>
              </div>
              
              {/* 3 Scenario Mode Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-white/10 my-3 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setGaugeMode('standard')}
                  className={`py-1 px-1.5 rounded-lg text-center transition-all ${
                    gaugeMode === 'standard'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Regular Wk
                </button>
                <button
                  type="button"
                  onClick={() => setGaugeMode('spectra')}
                  className={`py-1 px-1.5 rounded-lg text-center transition-all ${
                    gaugeMode === 'spectra'
                      ? 'bg-pink-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Spectra Wk 7
                </button>
                <button
                  type="button"
                  onClick={() => setGaugeMode('midsem')}
                  className={`py-1 px-1.5 rounded-lg text-center transition-all ${
                    gaugeMode === 'midsem'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Midsem Wk 8
                </button>
              </div>
            </div>

            {/* Dynamic SVG Concentric Rings */}
            {(() => {
              const scenarios = {
                standard: {
                  aggregated: '81.4%',
                  halls: { percent: 88, offset: 51, seats: '68K Seats' },
                  labs: { percent: 76, offset: 78, hours: '33K Hours' },
                  events: { percent: 24, offset: 172, footfalls: '5.2K Guests' },
                  note: 'Normal teaching week: 189 course sessions scheduled with continuous 3-hour lab blocks and zero lunch overlap.'
                },
                spectra: {
                  aggregated: '94.8%',
                  halls: { percent: 92, offset: 34, seats: '71K Seats' },
                  labs: { percent: 89, offset: 36, hours: '39K Hours' },
                  events: { percent: 98, offset: 5, footfalls: '21K Footfalls' },
                  note: 'Week 7 Peak: Classes run concurrently with annual tech fest. 21 fest requests approved across AUD, OAT & CS Labs.'
                },
                midsem: {
                  aggregated: '89.2%',
                  halls: { percent: 96, offset: 17, seats: '34K Halved' },
                  labs: { percent: 45, offset: 179, hours: '18K Hours' },
                  events: { percent: 12, offset: 199, footfalls: '1.8K Quiet' },
                  note: 'Hard Constraint Enforced: Effective room capacity is HALVED during exams for single-desk test conditions.'
                }
              };

              const current = scenarios[gaugeMode];

              return (
                <div>
                  <div className="relative py-2 flex items-center justify-center">
                    <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 160 160">
                      {/* Background Track 1 */}
                      <circle cx="80" cy="80" r="68" fill="none" stroke="#1e293b" strokeWidth="8" />
                      {/* Outer Ring: Lecture Halls */}
                      <circle 
                        cx="80" cy="80" r="68" fill="none" stroke="#00e5ff" strokeWidth="8"
                        strokeDasharray="427" strokeDashoffset={current.halls.offset} strokeLinecap="round"
                        className="transition-all duration-700 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                      />

                      {/* Background Track 2 */}
                      <circle cx="80" cy="80" r="52" fill="none" stroke="#1e293b" strokeWidth="8" />
                      {/* Middle Ring: Labs */}
                      <circle 
                        cx="80" cy="80" r="52" fill="none" stroke="#2563eb" strokeWidth="8"
                        strokeDasharray="326" strokeDashoffset={current.labs.offset} strokeLinecap="round"
                        className="transition-all duration-700 filter drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]"
                      />

                      {/* Background Track 3 */}
                      <circle cx="80" cy="80" r="36" fill="none" stroke="#1e293b" strokeWidth="8" />
                      {/* Inner Ring: Fest / Events */}
                      <circle 
                        cx="80" cy="80" r="36" fill="none" stroke="#ff2d78" strokeWidth="8"
                        strokeDasharray="226" strokeDashoffset={current.events.offset} strokeLinecap="round"
                        className="transition-all duration-700 filter drop-shadow-[0_0_8px_rgba(255,45,120,0.6)]"
                      />
                    </svg>

                    {/* Center Metrics */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black font-mono text-white tracking-tight">
                        {current.aggregated}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        Aggregated
                      </span>
                    </div>
                  </div>

                  {/* Scenario Explanation Notice */}
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 my-2 text-[11px] text-slate-300 leading-relaxed">
                    <p className="text-surface-variant line-clamp-2">
                      <strong className="text-white">Rule Logic: </strong>{current.note}
                    </p>
                  </div>

                  {/* Legend with Dynamic Scenario Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                      <div className="text-[10px] text-cyan-300 font-semibold truncate">Lecture Halls</div>
                      <div className="text-sm font-extrabold text-white font-mono mt-0.5">
                        {current.halls.percent}%
                      </div>
                      <div className="text-[9px] text-slate-400">{current.halls.seats}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-blue-500/20">
                      <div className="text-[10px] text-blue-300 font-semibold truncate">Science Labs</div>
                      <div className="text-sm font-extrabold text-white font-mono mt-0.5">
                        {current.labs.percent}%
                      </div>
                      <div className="text-[9px] text-slate-400">{current.labs.hours}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-pink-500/20">
                      <div className="text-[10px] text-pink-300 font-semibold truncate">Event Venues</div>
                      <div className="text-sm font-extrabold text-white font-mono mt-0.5">
                        {current.events.percent}%
                      </div>
                      <div className="text-[9px] text-slate-400">{current.events.footfalls}</div>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>

        </div>

        {/* --- PART C: CIT CAMPUS OPERATIONS CONSOLE & WORK QUEUE --- */}
        <div className="rounded-3xl border border-outline-variant/30 bg-surface-container-low/90 backdrop-blur-xl shadow-2xl p-6 overflow-hidden">
          
          {/* 1. Operational Freshness Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-outline-variant/20 text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-emerald-400 font-mono uppercase tracking-wider text-[11px]">
                LIVE DISPATCH HUB
              </span>
              <span className="text-surface-variant hidden sm:inline">&bull;</span>
              <span className="text-surface-variant hidden md:inline">
                Engine updated 10:58 AM &bull; CP-SAT Solver 0 Hard Violations &bull; Spectra: 21 Approved &bull; Sensor Hub Online
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {}}
                className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/40 hover:border-secondary/40 text-[11px] font-semibold text-white transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3 h-3 text-secondary" />
                <span>Sync Telemetry</span>
              </button>
            </div>
          </div>

          {/* 2. Two CareGrid Priority Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
            <div className="p-4 rounded-2xl bg-surface-container-high/60 border border-emerald-500/30 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-display">
                    High Priority Clashes Prevented
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[10px] font-mono font-bold text-emerald-300">
                    ZERO HARD VIOLATIONS
                  </span>
                </div>
                <p className="text-xs text-surface-variant mt-1 leading-relaxed">
                  14 course sessions dynamically relocated with 0 teacher overlaps and 0 room conflicts during CR-102 maintenance.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-high/60 border border-blue-500/30 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-display">
                    Room Utilisation &amp; Capacity Density
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-[10px] font-mono font-bold text-blue-300">
                    94.8% OPTIMAL
                  </span>
                </div>
                <p className="text-xs text-surface-variant mt-1 leading-relaxed">
                  100% of scheduled sessions satisfy the &gt;40% room utilization soft constraint with zero cross-lunch breaches.
                </p>
              </div>
            </div>
          </div>

          {/* 3. CareGrid Action Table Toolbar: Search + Counter Tabs */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-4">
            {/* Search Input with Cmd+K Badge */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={queueSearch}
                onChange={(e) => setQueueSearch(e.target.value)}
                placeholder="Search priority work queue (e.g. CR-102, F07, Spectra, LH-1)..."
                className="w-full pl-9 pr-14 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-white placeholder-surface-variant/60 text-xs focus:outline-none focus:border-secondary transition-colors"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container-high text-[10px] font-mono text-surface-variant border border-outline-variant/20">
                ⌘K
              </span>
            </div>

            {/* Counter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { id: 'needs_action' as const, label: 'Needs Action', count: 4, color: 'text-amber-400' },
                { id: 'spectra' as const, label: 'Spectra Fest Requests', count: 25, color: 'text-pink-400' },
                { id: 'exams' as const, label: 'Midsem Exam Allotments', count: 14, color: 'text-blue-400' },
                { id: 'core' as const, label: 'Core Sessions', count: 189, color: 'text-cyan-400' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setQueueTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    queueTab === tab.id
                      ? 'bg-secondary text-on-secondary shadow-md shadow-secondary/20'
                      : 'bg-surface-container text-surface-variant hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    queueTab === tab.id ? 'bg-black/30 text-white' : 'bg-surface-container-high text-white'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Priority Queue Action Table */}
          <div className="rounded-2xl border border-outline-variant/20 overflow-hidden bg-surface-container-lowest/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container text-surface-variant font-mono text-[11px] uppercase border-b border-outline-variant/20">
                  <tr>
                    <th className="py-3 px-4">Item &amp; Cohort</th>
                    <th className="py-3 px-4">Requester</th>
                    <th className="py-3 px-4">Scheduled Slot</th>
                    <th className="py-3 px-4">Venue Assigned</th>
                    <th className="py-3 px-4">Rigor Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-surface-variant">
                  {queueItems
                    .filter((item) => {
                      const matchesTab = queueTab === 'core' 
                        ? item.category === 'core'
                        : queueTab === 'spectra'
                          ? item.category === 'spectra'
                          : queueTab === 'exams'
                            ? item.category === 'exams'
                            : item.category === 'needs_action';
                      const matchesSearch = !queueSearch || 
                        item.title.toLowerCase().includes(queueSearch.toLowerCase()) ||
                        item.venue.toLowerCase().includes(queueSearch.toLowerCase()) ||
                        item.requester.toLowerCase().includes(queueSearch.toLowerCase());
                      return matchesTab && matchesSearch;
                    })
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-surface-container-high/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white font-display text-sm">{item.title}</div>
                          <div className="text-[11px] text-surface-variant mt-0.5 flex items-center gap-1.5">
                            <span className="font-mono text-secondary">{item.id}</span>
                            <span>&bull;</span>
                            <span>{item.group}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-white">{item.requester}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-white">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-secondary" />
                            <span>{item.time}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-white">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{item.venue}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                          <div className="text-[10px] text-surface-variant mt-1 font-mono">
                            {item.status}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              if (item.action.includes('Wayfinding')) {
                                onOpenNavigation();
                              } else if (item.action.includes('Approve') || item.action.includes('Review')) {
                                onSelectRole('admin');
                              } else {
                                onOpenAI();
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-white font-bold text-xs transition-all inline-flex items-center gap-1.5 shadow-sm"
                          >
                            <span>{item.action}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

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
