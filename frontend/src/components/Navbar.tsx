import React from 'react';
import { 
  Shield, Users, GraduationCap, Trophy, BookOpen, Ticket, 
  Compass, Sparkles, LogOut, ChevronDown, Bell, Building2, Calendar
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onSelectRole: (role: UserRole) => void;
  onToggleAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  onTabChange,
  onOpenAuth,
  onLogout,
  onSelectRole,
  onToggleAI,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  const roles = [
    { role: 'admin' as UserRole, label: 'Admin', icon: Shield, color: 'text-blue-400' },
    { role: 'department_coordinator' as UserRole, label: 'Coordinator', icon: Users, color: 'text-purple-400' },
    { role: 'faculty' as UserRole, label: 'Faculty', icon: GraduationCap, color: 'text-emerald-400' },
    { role: 'club' as UserRole, label: 'Club Rep', icon: Trophy, color: 'text-amber-400' },
    { role: 'student' as UserRole, label: 'Student', icon: BookOpen, color: 'text-cyan-400' },
    { role: 'participant' as UserRole, label: 'Participant', icon: Ticket, color: 'text-fuchsia-400' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Crest */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('overview')}>
          <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-secondary/50 via-primary-container to-tertiary/40 shadow-sm flex items-center justify-center">
            <img src="/campusx-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-[10px]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white font-display flex items-center gap-1">
              CAMPUS<span className="text-secondary">X</span>
            </span>
            <span className="text-[9px] text-secondary font-mono tracking-wider hidden sm:block uppercase">
              IIT Bhubaneswar
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => onTabChange('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-secondary/15 text-secondary border border-secondary/30'
                : 'text-on-surface-variant hover:text-white hover:bg-surface-container-high'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => onTabChange('portal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'portal'
                ? 'bg-secondary/15 text-secondary border border-secondary/30'
                : 'text-on-surface-variant hover:text-white hover:bg-surface-container-high'
            }`}
          >
            {user ? `${user.role.replace('_', ' ').toUpperCase()} PORTAL` : 'Role Portals'}
          </button>

          <button
            onClick={() => onTabChange('navigation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'navigation'
                ? 'bg-secondary/15 text-secondary border border-secondary/30'
                : 'text-on-surface-variant hover:text-white hover:bg-surface-container-high'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-secondary" />
            <span>Campus Map</span>
          </button>

          <button
            onClick={() => onTabChange('timetable')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'timetable'
                ? 'bg-secondary/15 text-secondary border border-secondary/30'
                : 'text-on-surface-variant hover:text-white hover:bg-surface-container-high'
            }`}
          >
            Timetable
          </button>

          <button
            onClick={() => onTabChange('exams')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'exams'
                ? 'bg-secondary/15 text-secondary border border-secondary/30'
                : 'text-on-surface-variant hover:text-white hover:bg-surface-container-high'
            }`}
          >
            Exams
          </button>

          <button
            onClick={() => onTabChange('bookings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'bookings'
                ? 'bg-secondary/15 text-secondary border border-secondary/30'
                : 'text-on-surface-variant hover:text-white hover:bg-surface-container-high'
            }`}
          >
            Spectra Fest
          </button>

          <button
            onClick={() => onTabChange('facilities')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'facilities'
                ? 'bg-secondary/15 text-secondary border border-secondary/30'
                : 'text-on-surface-variant hover:text-white hover:bg-surface-container-high'
            }`}
          >
            Facilities
          </button>
        </nav>

        {/* Right Actions: AI Assistant, Role Switcher & Auth */}
        <div className="flex items-center gap-2.5">
          {/* AI Assistant Toggle Button */}
          <button
            onClick={onToggleAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-secondary/40 text-secondary hover:bg-secondary/20 transition-all text-xs font-medium shadow-sm hover:scale-105 active:scale-95"
            title="Open CampusX AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span className="hidden sm:inline">AI Agent</span>
          </button>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-xs font-semibold text-on-surface transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="capitalize">{user ? user.role.replace('_', ' ') : 'Select Role'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-2xl py-2 z-50">
                <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-secondary uppercase border-b border-outline-variant/20 mb-1">
                  Four Primary Judge Roles
                </div>
                {roles.map((r) => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.role}
                      onClick={() => {
                        onSelectRole(r.role);
                        setRoleMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left hover:bg-surface-container transition-colors"
                    >
                      <Icon className={`w-4 h-4 ${r.color}`} />
                      <span className="text-on-surface">{r.label}</span>
                      {user?.role === r.role && (
                        <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-secondary/20 text-secondary font-mono">
                          ACTIVE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Profile or Login */}
          {user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-outline-variant/30">
              <img
                src={user.avatar_url}
                alt={user.full_name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-secondary/50"
              />
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-on-surface-variant hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary-container to-secondary text-white text-xs font-semibold shadow-md shadow-secondary/10 hover:scale-105 active:scale-95 transition-all"
            >
              Judge Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
