import React from 'react';
import { 
  Shield, Users, GraduationCap, Trophy, BookOpen, Ticket, 
  Compass, Sparkles, LogOut, ChevronDown, Bell, Building2, Calendar,
  Sun, Moon
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
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  onTabChange,
  onOpenAuth,
  onLogout,
  onSelectRole,
  onToggleAI,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  const roles = [
    { role: 'admin' as UserRole, label: 'Admin (Dean)', icon: Shield, color: 'text-blue-400' },
    { role: 'department_coordinator' as UserRole, label: 'Coordinator (CSE)', icon: Users, color: 'text-purple-400' },
    { role: 'faculty' as UserRole, label: 'Faculty (F01)', icon: GraduationCap, color: 'text-emerald-400' },
    { role: 'club' as UserRole, label: 'Club Rep (Tech)', icon: Trophy, color: 'text-amber-400' },
    { role: 'student' as UserRole, label: 'Student (CS-Y3)', icon: BookOpen, color: 'text-cyan-400' },
    { role: 'participant' as UserRole, label: 'Participant (Spectra)', icon: Ticket, color: 'text-fuchsia-400' },
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
                : 'text-surface-variant hover:text-white hover:bg-surface-container-high'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => onTabChange('portal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'portal'
                ? 'bg-secondary/15 text-secondary border border-secondary/30'
                : 'text-surface-variant hover:text-white hover:bg-surface-container-high'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Role Workspace</span>
          </button>

          <button
            onClick={() => onTabChange('navigation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'navigation'
                ? 'bg-secondary/15 text-secondary border border-secondary/30'
                : 'text-surface-variant hover:text-white hover:bg-surface-container-high'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Campus GIS</span>
          </button>

          <button
            onClick={() => onTabChange('timetable')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'timetable'
                ? 'bg-secondary/15 text-secondary border border-secondary/30'
                : 'text-surface-variant hover:text-white hover:bg-surface-container-high'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Master Timetables</span>
          </button>
        </nav>

        {/* Right Actions: Theme Toggle, AI Assistant, Role Switcher & Auth */}
        <div className="flex items-center gap-2">
          
          {/* Light / Dark Mode Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-surface-variant hover:text-white transition-all"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-400" />
              )}
            </button>
          )}

          {/* AI Assistant Toggle Button */}
          <button
            onClick={onToggleAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-purple-600/30 border border-secondary/40 text-secondary hover:bg-secondary/20 transition-all text-xs font-medium shadow-sm hover:scale-105 active:scale-95"
            title="Open CampusX AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 text-xs font-semibold text-white transition-all shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="capitalize">{user ? user.role.replace('_', ' ') : 'Judge Demo Roles'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-surface-variant" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-secondary uppercase border-b border-outline-variant/20 mb-1">
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
                      <span className="text-white">{r.label}</span>
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
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-surface-variant hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary-container to-secondary text-slate-950 text-xs font-bold shadow-md shadow-secondary/10 hover:scale-105 active:scale-95 transition-all"
            >
              Sign In
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
