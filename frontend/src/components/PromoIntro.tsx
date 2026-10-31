import React, { useState, useEffect } from 'react';
import { Shield, Users, GraduationCap, Trophy, BookOpen, Ticket, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

interface PromoIntroProps {
  durationSeconds?: number;
  onFinish: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const PromoIntro: React.FC<PromoIntroProps> = ({
  durationSeconds = 5,
  onFinish,
  onSelectRole,
}) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(durationSeconds);

  useEffect(() => {
    const startTime = Date.now();
    const totalMs = durationSeconds * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / totalMs) * 100);
      setProgress(pct);
      const remaining = Math.max(0, Math.ceil((totalMs - elapsed) / 1000));
      setTimeLeft(remaining);

      if (elapsed >= totalMs) {
        clearInterval(interval);
        onFinish();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [durationSeconds, onFinish]);

  const portals = [
    { role: 'admin' as UserRole, label: 'ADMIN', icon: Shield, color: 'from-blue-600/30 to-blue-500/10', border: 'border-blue-500/40', text: 'text-blue-400' },
    { role: 'department_coordinator' as UserRole, label: 'COORDINATOR', icon: Users, color: 'from-purple-600/30 to-purple-500/10', border: 'border-purple-500/40', text: 'text-purple-400' },
    { role: 'faculty' as UserRole, label: 'FACULTY', icon: GraduationCap, color: 'from-emerald-600/30 to-emerald-500/10', border: 'border-emerald-500/40', text: 'text-emerald-400' },
    { role: 'club' as UserRole, label: 'CLUB', icon: Trophy, color: 'from-amber-600/30 to-amber-500/10', border: 'border-amber-500/40', text: 'text-amber-400' },
    { role: 'student' as UserRole, label: 'STUDENT', icon: BookOpen, color: 'from-cyan-600/30 to-cyan-500/10', border: 'border-cyan-500/40', text: 'text-cyan-400' },
    { role: 'participant' as UserRole, label: 'PARTICIPANT', icon: Ticket, color: 'from-fuchsia-600/30 to-fuchsia-500/10', border: 'border-fuchsia-500/40', text: 'text-fuchsia-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#070e1f] text-on-surface overflow-hidden select-none">
      {/* Background Neon Ambient Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-secondary/20 via-primary-container/25 to-tertiary/20 blur-[140px] pointer-events-none rounded-full animate-pulse-slow"></div>
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-700/15 via-cyan-500/20 to-purple-600/15 blur-[120px] pointer-events-none rounded-full"></div>

      {/* Top Header: IIT Bhubaneswar Logo Badge & Skip Button */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-surface-container-low/70 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/30 shadow-lg">
          <img
            src="/iit-logo.png"
            alt="IIT Bhubaneswar Official Logo"
            onError={(e) => { (e.target as HTMLImageElement).src = '/iit-crest.png'; }}
            className="w-8 h-8 object-contain"
          />
          <div className="text-left">
            <span className="text-[11px] font-bold tracking-widest text-secondary block uppercase">
              IIT Bhubaneswar
            </span>
            <span className="text-[9px] text-on-surface-variant block tracking-wider">
              Smart Campus Management Platform
            </span>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest border border-outline-variant/40 text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-md"
        >
          <span>Skip</span>
          <span className="text-xs text-secondary font-mono">({timeLeft}s)</span>
          <ArrowRight className="w-4 h-4 text-secondary" />
        </button>
      </div>

      {/* Center Cinematic Stage: Official Brand Logo & Tagline */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl my-auto">
        {/* Animated Glow Halo */}
        <div className="relative group mb-5">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-primary-container/30 to-tertiary/30 rounded-3xl blur-2xl scale-95 animate-pulse"></div>
          
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden p-1 bg-gradient-to-b from-secondary/60 via-primary-container to-tertiary/40 shadow-2xl shadow-cyan-500/20 transition-transform duration-700 hover:scale-105">
            <img
              src="/campusx-logo.jpg"
              alt="CAMPUSX Brand Logo"
              onError={(e) => { (e.target as HTMLImageElement).src = '/iit-crest.png'; }}
              className="w-full h-full object-cover rounded-[22px]"
            />
          </div>
        </div>

        {/* Project Name & Subtitle */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 font-display flex items-center justify-center gap-2">
          CAMPUS<span className="text-secondary drop-shadow-[0_0_15px_rgba(76,215,246,0.8)]">X</span>
        </h1>

        {/* Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-surface-container-high/90 border border-secondary/30 shadow-[0_0_20px_rgba(76,215,246,0.15)] mb-4">
          <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-secondary uppercase font-display">
            ONE CAMPUS. ONE CONNECTED EXPERIENCE.
          </span>
        </div>

        <p className="text-sm text-on-surface-variant max-w-lg mx-auto leading-relaxed">
          The next-generation enterprise orchestration system for timetables, venues, smart navigation, and academic operations.
        </p>

        {/* 6 Role Portal Badges (Direct launch preview matching promo image) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3 mt-6 w-full max-w-3xl">
          {portals.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.role}
                onClick={() => {
                  onSelectRole(p.role);
                  onFinish();
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-low/90 backdrop-blur-md border ${p.border} hover:scale-105 transition-all shadow-md group`}
              >
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-b ${p.color} flex items-center justify-center mb-1.5 group-hover:shadow-[0_0_12px_rgba(76,215,246,0.4)]`}>
                  <Icon className={`w-5 h-5 ${p.text}`} />
                </div>
                <span className="text-[10px] font-bold tracking-wider text-on-surface">
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Campus Navigation Pill & Explore Slogan */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <button
            onClick={onFinish}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600/40 via-cyan-500/30 to-purple-600/40 border border-secondary/50 text-xs sm:text-sm font-semibold text-secondary hover:bg-secondary/20 transition-all hover:scale-105 shadow-[0_0_15px_rgba(76,215,246,0.25)]"
          >
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
            <span>CAMPUS NAVIGATION</span>
          </button>
          
          <span className="text-[10px] tracking-[0.25em] text-on-surface-variant/80 uppercase font-mono">
            EXPLORE · CONNECT · ACHIEVE
          </span>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="relative z-10 w-full max-w-3xl px-6 pb-6">
        <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1 font-mono">
          <span>Initializing Campus Grid...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-container via-secondary to-tertiary transition-all duration-75 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
