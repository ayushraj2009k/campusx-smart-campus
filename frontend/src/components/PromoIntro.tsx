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
    { role: 'admin' as UserRole, label: 'ADMIN', icon: Shield, color: 'from-blue-600 to-blue-500', border: 'border-blue-400/60', glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]', text: 'text-blue-300' },
    { role: 'department_coordinator' as UserRole, label: 'COORDINATOR', icon: Users, color: 'from-purple-600 to-purple-500', border: 'border-purple-400/60', glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]', text: 'text-purple-300' },
    { role: 'faculty' as UserRole, label: 'FACULTY', icon: GraduationCap, color: 'from-emerald-600 to-emerald-500', border: 'border-emerald-400/60', glow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]', text: 'text-emerald-300' },
    { role: 'club' as UserRole, label: 'CLUB', icon: Trophy, color: 'from-amber-600 to-amber-500', border: 'border-amber-400/60', glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]', text: 'text-amber-300' },
    { role: 'student' as UserRole, label: 'STUDENT', icon: BookOpen, color: 'from-cyan-600 to-cyan-500', border: 'border-cyan-400/60', glow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]', text: 'text-cyan-300' },
    { role: 'participant' as UserRole, label: 'PARTICIPANT', icon: Ticket, color: 'from-fuchsia-600 to-fuchsia-500', border: 'border-fuchsia-400/60', glow: 'hover:shadow-[0_0_20px_rgba(217,70,239,0.6)]', text: 'text-fuchsia-300' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#050a18] text-white overflow-hidden select-none">
      {/* High-Tech Background Ambient Cyber Grids & Neon Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/25 via-blue-600/30 to-purple-600/25 blur-[160px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-blue-700/20 via-cyan-400/25 to-emerald-500/20 blur-[140px] pointer-events-none rounded-full" />

      {/* Top Header: IIT Bhubaneswar Logo Badge & High-Contrast Glowing Skip Button */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3.5 bg-slate-900/90 backdrop-blur-xl px-5 py-2.5 rounded-full border-2 border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.25)]">
          <img
            src="/LOGO OF IIT CAMPUS.png"
            alt="IIT Bhubaneswar Official Logo"
            onError={(e) => { (e.target as HTMLImageElement).src = '/iit-logo.png'; }}
            className="w-9 h-9 object-contain rounded-full bg-white p-0.5 shadow-sm"
          />
          <div className="text-left">
            <span className="text-xs font-black tracking-widest text-white block uppercase font-display drop-shadow-sm">
              IIT BHUBANESWAR
            </span>
            <span className="text-[10px] text-cyan-300 font-mono font-bold block tracking-wider">
              Smart Campus Management Platform
            </span>
          </div>
        </div>

        {/* High-Contrast Crystal-Clear Skip Button with Live Countdown */}
        <button
          onClick={onFinish}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-800 border-2 border-cyan-400 text-white font-extrabold text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(34,211,238,0.5)] group cursor-pointer"
        >
          <span className="tracking-wide text-white drop-shadow-sm font-sans font-black">SKIP INTRO</span>
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/30 text-cyan-300 font-mono text-xs border border-cyan-400/60 font-black">
            {timeLeft}s
          </span>
          <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Center Cinematic Stage: Official Brand Logo & Heavy Tagline */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl my-auto">
        
        {/* Animated Glowing Logo Frame */}
        <div className="relative group mb-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-3xl blur-2xl opacity-70 animate-pulse" />
          
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-transform duration-700 hover:scale-105">
            <img
              src="/campusx-logo.jpg"
              alt="CAMPUSX Brand Logo"
              onError={(e) => { (e.target as HTMLImageElement).src = '/LOGO OF IIT CAMPUS.png'; }}
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>

        {/* Project Name & Heavy Neon Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-2 font-display flex items-center justify-center gap-2">
          CAMPUS<span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.9)]">X</span>
        </h1>

        {/* Tagline Pill */}
        <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-slate-900/90 border-2 border-cyan-400/50 shadow-[0_0_25px_rgba(34,211,238,0.3)] mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-cyan-300 uppercase font-display">
            ONE CAMPUS. ONE CONNECTED EXPERIENCE.
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed font-medium mb-2 drop-shadow-sm">
          Next-generation academic orchestration: automated timetable scheduling, disruption resilience, venue knapsack allocation, and smart campus GIS.
        </p>

        {/* 6 Role Portal Badges with High Contrast and Clear Labels */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-3.5 mt-5 w-full max-w-3xl">
          {portals.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.role}
                onClick={() => {
                  onSelectRole(p.role);
                  onFinish();
                }}
                className={`flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border-2 ${p.border} ${p.glow} hover:scale-105 transition-all shadow-xl group cursor-pointer`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${p.color} flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white drop-shadow-sm" />
                </div>
                <span className="text-[11px] font-black tracking-wider text-white group-hover:text-cyan-300 transition-colors uppercase font-mono">
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Campus Navigation Pill */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={onFinish}
            className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border-2 border-cyan-300 text-xs sm:text-sm font-black text-white transition-all hover:scale-105 shadow-[0_0_25px_rgba(34,211,238,0.5)] cursor-pointer tracking-wider"
          >
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            <span>ENTER CAMPUS GIS NAVIGATION</span>
          </button>
          
          <span className="text-[10px] tracking-[0.3em] text-cyan-400 font-mono font-bold uppercase mt-1">
            IIT BHUBANESWAR &bull; SAMANTA HIGH TECH SUITE
          </span>
        </div>
      </div>

      {/* Bottom Progress Bar with Live Status */}
      <div className="relative z-10 w-full max-w-3xl px-6 pb-6">
        <div className="flex items-center justify-between text-xs text-slate-200 mb-2 font-mono font-bold">
          <span className="flex items-center gap-2 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            <span>INITIALIZING CAMPUS ORCHESTRATION ENGINE...</span>
          </span>
          <span className="text-white bg-slate-800 px-2.5 py-0.5 rounded-md border border-cyan-500/40 font-mono font-black">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-900 border-2 border-cyan-500/30 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-75 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
