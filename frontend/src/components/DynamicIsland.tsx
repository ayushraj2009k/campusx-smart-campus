import React, { useState } from 'react';
import { 
  Sparkles, Compass, ShieldCheck, Clock, MapPin, 
  ChevronDown, ChevronUp, Bot, ArrowRight, Zap, CheckCircle2
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
      className="fixed top-2.5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto transition-all duration-300"
    >
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`rounded-full shadow-2xl transition-all duration-300 cursor-pointer select-none border backdrop-blur-2xl ${
          isExpanded
            ? 'w-[90vw] max-w-xl rounded-3xl p-4 sm:p-5'
            : 'w-auto px-4 py-1.5'
        } ${
          pureBlack && isDark
            ? 'bg-black/95 border-cyan-500/40 text-white shadow-cyan-950/60'
            : isDark
              ? 'bg-[#0b1120]/95 border-slate-700/80 text-white shadow-black/80'
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
        }`}
      >
        {/* Collapsed State: Sleek Apple-Style Island Pill */}
        {!isExpanded ? (
          <div className="flex items-center gap-3 text-xs">
            {/* Live Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold font-mono text-[10px] uppercase text-emerald-400">
                LIVE P4
              </span>
            </div>

            <span className="text-slate-500">•</span>

            {/* Session Info */}
            <div className="flex items-center gap-1.5 text-[11px] font-medium truncate max-w-[200px] sm:max-w-xs">
              <span className="font-bold truncate">CS301 Algorithms</span>
              <span className="text-secondary font-mono text-[10px] bg-secondary/15 px-1.5 py-0.2 rounded">LH-4</span>
            </div>

            <span className="text-slate-500 hidden sm:inline">•</span>

            {/* Solver Telemetry */}
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-cyan-300 font-mono">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>0 Clashes</span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1 transition-transform" />
          </div>
        ) : (
          /* Expanded Island View: Rich Telemetry & Controls */
          <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
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
                <span className="text-[10px] font-mono text-slate-400 block">VENUE &amp; INDOOR NODE</span>
                <span className="font-bold text-secondary block truncate mt-0.5">LH-4 (Floor 2)</span>
                <span className="text-[10px] text-slate-300">Lalitgiri Lecture Complex</span>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container/60 border border-outline-variant/30 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono text-slate-400 block">CP-SAT SOLVER STATUS</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>0 Violations</span>
                </span>
                <span className="text-[10px] text-slate-300">Stability: 92.6% &bull; Spectra Safe</span>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="flex items-center justify-between pt-1">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-secondary" />
                <span>Next: <strong>CS302 Operating Systems</strong> @ 12:00 in LH-5</span>
              </div>

              <div className="flex items-center gap-2">
                {onOpenNavigation && (
                  <button
                    onClick={() => {
                      onOpenNavigation('LHL');
                      setIsExpanded(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary text-xs font-semibold flex items-center gap-1"
                  >
                    <Compass className="w-3 h-3" />
                    <span>Map LH-4</span>
                  </button>
                )}
                {onOpenAI && (
                  <button
                    onClick={() => {
                      onOpenAI();
                      setIsExpanded(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <Bot className="w-3 h-3" />
                    <span>Ask AI</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
