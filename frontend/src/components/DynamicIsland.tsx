import React, { useState } from 'react';
import { 
  Sparkles, Compass, ShieldCheck, Clock, MapPin, 
  ChevronDown, ChevronUp, Bot, ArrowRight, Zap, CheckCircle2,
  Calendar, Layers, Activity
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DynamicIslandProps {
  onOpenNavigation?: (buildingId?: string) => void;
  onOpenAI?: () => void;
  onOpenTimetable?: () => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  onOpenNavigation,
  onOpenAI,
  onOpenTimetable,
}) => {
  const { dynamicIsland, pureBlack, effectiveAppearance } = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!dynamicIsland) return null;

  const isDark = effectiveAppearance === 'dark';

  return (
    <aside 
      aria-label="Campus Live Status Dynamic Island"
      className="fixed top-10 sm:top-11 left-1/2 -translate-x-1/2 z-40 pointer-events-auto transition-all duration-300"
    >
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`rounded-full shadow-2xl transition-all duration-300 cursor-pointer select-none border backdrop-blur-2xl ${
          isExpanded
            ? 'w-[92vw] max-w-xl rounded-3xl p-4 sm:p-5'
            : 'w-auto px-3 py-1'
        } ${
          pureBlack && isDark
            ? 'bg-black/95 border-cyan-500/40 text-white shadow-cyan-950/60'
            : isDark
              ? 'bg-[#091120]/95 border-slate-700/80 text-white shadow-black/80'
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
        } hover:border-cyan-500/50`}
      >
        {/* Collapsed State: Sleek Apple-Style Island Pill */}
        {!isExpanded ? (
          <div className="flex items-center gap-2.5 text-[11px]">
            {/* Live Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold font-mono text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                LIVE P4
              </span>
            </div>

            <span className="text-slate-600 font-bold">•</span>

            {/* Session Info */}
            <div className="flex items-center gap-1.5 truncate max-w-[180px] sm:max-w-xs">
              <span className="font-semibold text-white truncate text-[11px]">
                CS301 Algorithms
              </span>
              <span className="font-mono text-[9px] font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-1.5 py-0.2 rounded">
                LH-4
              </span>
            </div>

            <span className="text-slate-600 font-bold hidden sm:inline">•</span>

            {/* Solver Telemetry */}
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>0 Clashes</span>
            </div>

            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5 transition-transform" />
          </div>
        ) : (
          /* Expanded Island View: Rich Telemetry & Controls */
          <div className="space-y-3.5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold font-display uppercase tracking-wider text-emerald-400">
                  Campus Real-Time Status &bull; Period 4 (11:00 &ndash; 12:00)
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
                title="Collapse"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-surface-container/60 border border-outline-variant/30">
                <span className="text-[10px] font-mono text-slate-400 block">ACTIVE SESSION</span>
                <span className="font-bold text-white block truncate mt-0.5">CS301 Algorithms</span>
                <span className="text-[10px] text-cyan-300">Dr. Sunita Rao &bull; Group CSE-3</span>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container/60 border border-outline-variant/30">
                <span className="text-[10px] font-mono text-slate-400 block">CURRENT VENUE</span>
                <span className="font-bold text-white block truncate mt-0.5">LH-4 (Lalitgiri)</span>
                <span className="text-[10px] text-emerald-300">Capacity: 84 / 100 Seats</span>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container/60 border border-outline-variant/30 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono text-slate-400 block">SOLVER INTEGRITY</span>
                <div className="flex items-center gap-1 mt-0.5 text-emerald-400 font-bold font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>0 Violations</span>
                </div>
                <span className="text-[10px] text-surface-variant">Google CP-SAT Certified</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Next Slot: <strong>P5 (12:00 &ndash; 13:00)</strong> CS302 Database Systems in LH-2</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">Lunch Follows at 13:00</span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-outline-variant/20 text-xs">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  if (onOpenNavigation) onOpenNavigation('LHL');
                }}
                className="flex-1 py-1.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-highest text-white font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Wayfind to LH-4</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  if (onOpenTimetable) onOpenTimetable();
                }}
                className="flex-1 py-1.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-highest text-white font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-secondary" />
                <span>Weekly Schedule</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  if (onOpenAI) onOpenAI();
                }}
                className="flex-1 py-1.5 px-3 rounded-xl bg-secondary text-on-secondary font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Prompt</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
