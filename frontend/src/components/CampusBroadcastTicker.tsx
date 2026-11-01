import React from 'react';
import { Radio, AlertTriangle, Calendar, Sparkles, ShieldCheck, Cpu, Volume2, ChevronRight, Bell } from 'lucide-react';

interface CampusBroadcastTickerProps {
  onOpenDisruptionModal?: () => void;
  onOpenAI?: () => void;
}

export const CampusBroadcastTicker: React.FC<CampusBroadcastTickerProps> = ({
  onOpenDisruptionModal,
  onOpenAI,
}) => {
  const notices = [
    {
      type: 'critical',
      tag: 'WEEK 7 CONCURRENCY',
      icon: AlertTriangle,
      color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      text: 'Spectra Annual Tech Fest venue requests active across Auditorium, OAT & Computer Labs — 21 Approved, 0 Hard Clashes via CP-SAT',
    },
    {
      type: 'disruption',
      tag: 'DISRUPTION RESOLVED',
      icon: Cpu,
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      text: 'Civil Maintenance in CR-102 (Pipe Leak) — 14 course sessions dynamically relocated to LH-3 & LHL-101 with zero teacher clashes',
    },
    {
      type: 'exam',
      tag: 'MIDSEM WEEK 8 SYNC',
      icon: Calendar,
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      text: 'Midsem Exam schedule generated — Effective room capacity halved for all capacity validation checks per strict hard constraints',
    },
    {
      type: 'ai',
      tag: 'AI BOOKING DESK',
      icon: Sparkles,
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      text: 'Natural language venue requests (English & Hinglish) enabled — strictly validated by underlying constraint engine before booking',
    },
    {
      type: 'compliance',
      tag: 'SOLVER COMPLIANCE',
      icon: ShieldCheck,
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      text: 'Hard Constraints 100% Satisfied: Zero lunch overlap (P5-P6 cleared), max 4h faculty daily limit & accessibility ensured',
    },
    {
      type: 'info',
      tag: 'IIT BHUBANESWAR OPERATIONS',
      icon: Bell,
      color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      text: 'Autonomous Semester Timetable, Venue Allocation & Emergency Disruption Management for 1,000 Students across 5 Branches',
    },
  ];

  return (
    <div className="w-full bg-[#050b14] border-b border-cyan-500/20 text-slate-300 text-xs overflow-hidden relative z-30 select-none shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center h-8 sm:h-9">
        
        {/* Left Live Indicator Badge */}
        <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1 bg-gradient-to-r from-cyan-950 via-slate-900 to-transparent border-r border-cyan-500/30 shrink-0 z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="font-mono font-extrabold text-[10px] tracking-wider text-rose-300 uppercase whitespace-nowrap">
            CAMPUS DISPATCH
          </span>
        </div>

        {/* Marquee Scrolling Viewport */}
        <div className="overflow-hidden flex-1 relative h-full flex items-center">
          <div className="animate-marquee-scroll flex items-center gap-8 pl-4">
            {/* Render 2 copies for infinite smooth loop */}
            {[...notices, ...notices].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="inline-flex items-center gap-2 whitespace-nowrap hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    if (item.type === 'ai' && onOpenAI) onOpenAI();
                    if (item.type === 'disruption' && onOpenDisruptionModal) onOpenDisruptionModal();
                  }}
                >
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${item.color}`}>
                    <Icon className="w-2.5 h-2.5" />
                    <span>{item.tag}</span>
                  </span>
                  <span className="text-[11px] font-medium text-slate-200">
                    {item.text}
                  </span>
                  <span className="text-slate-600 font-bold mx-2">•</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Live Solver Metric */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-900/90 border-l border-cyan-500/20 text-[10px] font-mono shrink-0 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="text-emerald-400 font-bold">CP-SAT: 0 VIOLATIONS</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-300 font-semibold">189 SLOTS</span>
        </div>

      </div>
    </div>
  );
};
