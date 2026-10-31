import React from 'react';
import { 
  Shield, Users, GraduationCap, Trophy, BookOpen, Ticket, 
  Compass, Sparkles, Building, ArrowRight, CheckCircle2, 
  MapPin, Clock, Calendar, AlertCircle, ChevronRight, Activity
} from 'lucide-react';
import { UserRole } from '../types';

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
  const portalCards = [
    {
      role: 'admin' as UserRole,
      title: 'Admin Portal',
      subtitle: 'Enterprise Campus Management',
      desc: 'Orchestrate timetables, manage venues, run CP-SAT solvers, approve disruptions, and oversee campus security.',
      icon: Shield,
      gradient: 'from-blue-600/30 via-primary-container/20 to-transparent',
      border: 'hover:border-blue-500/60',
      badge: 'Directorate Control',
      badgeColor: 'bg-blue-500/20 text-blue-400'
    },
    {
      role: 'department_coordinator' as UserRole,
      title: 'Department Coordinator',
      subtitle: 'Academic Scheduling Desk',
      desc: 'Review branch timetables, monitor faculty daily workloads, allocate specialized labs, and manage extra sessions.',
      icon: Users,
      gradient: 'from-purple-600/30 via-tertiary-container/20 to-transparent',
      border: 'hover:border-purple-500/60',
      badge: 'School Level',
      badgeColor: 'bg-purple-500/20 text-purple-400'
    },
    {
      role: 'faculty' as UserRole,
      title: 'Faculty Portal',
      subtitle: 'Instruction & Availability',
      desc: 'View personal weekly lecture calendars, declare leave or unavailability, and request schedule modifications via AI.',
      icon: GraduationCap,
      gradient: 'from-emerald-600/30 via-emerald-800/20 to-transparent',
      border: 'hover:border-emerald-500/60',
      badge: 'Academic Staff',
      badgeColor: 'bg-emerald-500/20 text-emerald-400'
    },
    {
      role: 'club' as UserRole,
      title: 'Club Representative',
      subtitle: 'Spectra Week Venue Desk',
      desc: 'Submit natural-language venue requests, track booking decisions, receive alternative room offers, and manage festival logistics.',
      icon: Trophy,
      gradient: 'from-amber-600/30 via-amber-800/20 to-transparent',
      border: 'hover:border-amber-500/60',
      badge: 'Student Societies',
      badgeColor: 'bg-amber-500/20 text-amber-400'
    },
    {
      role: 'student' as UserRole,
      title: 'Student Portal',
      subtitle: 'Timetables & Classroom Finder',
      desc: 'Personalized course timetable, live room indicators, midsem examination schedules, and room change alerts.',
      icon: BookOpen,
      gradient: 'from-cyan-600/30 via-secondary-container/20 to-transparent',
      border: 'hover:border-cyan-500/60',
      badge: 'Enrolled Cohort',
      badgeColor: 'bg-cyan-500/20 text-cyan-400'
    },
    {
      role: 'participant' as UserRole,
      title: 'Participant Portal',
      subtitle: 'Digital Badge & Turnstile Pass',
      desc: 'Instant QR event entry pass, workshop schedules, turnstile scanner, campus wayfinding, and digital certificate verification.',
      icon: Ticket,
      gradient: 'from-fuchsia-600/30 via-fuchsia-800/20 to-transparent',
      border: 'hover:border-fuchsia-500/60',
      badge: 'Fest Delegate',
      badgeColor: 'bg-fuchsia-500/20 text-fuchsia-400'
    }
  ];

  const campusGalleries = [
    { title: 'Academic Core & Lalitgiri Complex', image: '/Lalitgiri-Hall-of-Learning-scaled.jpg', desc: 'Lecture halls LH-1 to LH-6 with acoustic treatment.' },
    { title: 'Main Administration Building', image: '/main-building IIT.jpg', desc: 'Central administrative headquarters and Director secretariat.' },
    { title: 'Community Centre & Auditorium', image: '/Auditorium-1.png', desc: 'Acoustically engineered auditorium seating 500-800 delegates.' },
    { title: 'School of Basic Sciences', image: '/School-of-Basic-Science-scaled.jpg', desc: 'Physics and Chemistry advanced laboratory suites.' },
    { title: 'School of Infrastructure', image: '/School-of-Infrastructure-scaled.jpg', desc: 'Civil engineering structural analysis and GIS laboratories.' },
    { title: 'Sanjeevan Health Centre', image: '/Sanjeevan-Health-Center-scaled.jpg', desc: '24/7 campus medical hospital with trauma care and ambulances.' },
  ];

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-secondary/15 via-primary-container/20 to-tertiary/15 blur-[140px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Institution Header Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-high/80 border border-outline-variant/30 backdrop-blur-md mb-6 shadow-sm">
            <img src="/iit-logo.png" alt="IIT Crest" className="w-5 h-5 object-contain" />
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase font-mono">
              Indian Institute of Technology Bhubaneswar
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-display leading-[1.1]">
            ONE CAMPUS.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-purple-400">
              ONE CONNECTED EXPERIENCE.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            CAMPUSX is the state-of-the-art intelligent campus management system unifying mathematical timetable optimization, multi-floor indoor navigation, natural language venue bookings, and multi-role operations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a
              href="#portals"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-container via-blue-600 to-secondary text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Explore 6 Role Portals</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenNavigation}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 text-on-surface font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4 text-secondary" />
              <span>Campus Navigation Map</span>
            </button>
          </div>

          {/* Live Operational Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-14 pt-8 border-t border-outline-variant/20">
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 text-left">
              <span className="text-2xl font-bold text-white block">18,400+</span>
              <span className="text-xs text-on-surface-variant">Active Campus Cohort</span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 text-left">
              <span className="text-2xl font-bold text-cyan-400 block">94.8%</span>
              <span className="text-xs text-on-surface-variant">Room Utilization Efficiency</span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 text-left">
              <span className="text-2xl font-bold text-emerald-400 block">0</span>
              <span className="text-xs text-on-surface-variant">Schedule Clashes (CP-SAT)</span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 text-left">
              <span className="text-2xl font-bold text-purple-400 block">24/7</span>
              <span className="text-xs text-on-surface-variant">Realtime AI Wayfinding</span>
            </div>
          </div>
        </div>
      </section>

      {/* Six Role Portals Section */}
      <section id="portals" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Unified Role Orchestration
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mb-4">
            Select Your Dedicated Portal
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            CAMPUSX dynamically adapts its interface, permissions, and tools based on verified user identity. Select any role below to launch its workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portalCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.role}
                onClick={() => onSelectRole(card.role)}
                className={`group relative rounded-2xl p-6 bg-surface-container-low border border-outline-variant/30 ${card.border} transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${card.gradient} rounded-bl-full pointer-events-none transition-all group-hover:scale-125`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-1 group-hover:text-secondary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-medium text-secondary/80 mb-3 font-mono">
                    {card.subtitle}
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-secondary">
                  <span>Enter Role Dashboard</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campus Photographs & Facility Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest font-mono">
                Verified Campus Infrastructure
              </span>
              <h2 className="text-3xl font-bold text-white font-display mt-2">
                IIT Bhubaneswar Campus Facilities
              </h2>
            </div>
            <button
              onClick={onOpenNavigation}
              className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-semibold text-secondary hover:underline"
            >
              <span>Explore Interactive 2D/3D Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusGalleries.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/30 hover:border-secondary/50 transition-all shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs font-bold text-white block drop-shadow-md">
                      {item.title}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-surface border-t border-outline-variant/20 text-xs text-on-surface-variant">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/iit-logo.png" alt="IIT Crest" className="w-8 h-8 object-contain" />
            <div>
              <span className="font-bold text-white block">CAMPUSX Management Platform</span>
              <span>Indian Institute of Technology Bhubaneswar, Argul, Jatni, Odisha - 752050</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-secondary cursor-pointer">Privacy Policy</span>
            <span className="hover:text-secondary cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-secondary cursor-pointer">Emergency Helplines</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
