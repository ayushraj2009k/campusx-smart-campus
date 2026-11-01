import React from 'react';
import { RoadmapHotspot } from './CampusNavigation';

interface IITRoadmapBlueprintProps {
  hotspots: RoadmapHotspot[];
  selectedBuildingId?: string;
  selectedBuildingCode?: string;
  onSelectSpot: (spot: RoadmapHotspot) => void;
  hoveredSpot: RoadmapHotspot | null;
  onHoverSpot: (spot: RoadmapHotspot | null) => void;
  isDark: boolean;
}

export const IITRoadmapBlueprint: React.FC<IITRoadmapBlueprintProps> = ({
  hotspots,
  selectedBuildingId,
  selectedBuildingCode,
  onSelectSpot,
  hoveredSpot,
  onHoverSpot,
  isDark
}) => {
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border shadow-2xl select-none ${
      isDark ? 'bg-[#050a18] border-cyan-500/30' : 'bg-[#f0f4f9] border-slate-300'
    }`}>
      {/* HUD Coordinate Grid Header */}
      <div className={`flex items-center justify-between px-4 py-2 border-b text-[10px] font-mono tracking-wider ${
        isDark ? 'bg-slate-950/80 border-cyan-500/20 text-cyan-400' : 'bg-white border-slate-200 text-slate-700'
      }`}>
        <div className="flex items-center gap-3">
          <span className="font-extrabold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            IIT BHUBANESWAR &bull; ARGUL MASTER BLUEPRINT
          </span>
          <span className="opacity-60 hidden sm:inline">20.1482° N, 85.6765° E &bull; 936 ACRES</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded font-bold ${
            isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-blue-100 text-blue-900'
          }`}>
            VECTOR HUD v2.6
          </span>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative w-full aspect-[16/10] max-h-[580px] overflow-hidden">
        <svg
          viewBox="0 0 1000 625"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="hudGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={isDark ? "rgba(0, 229, 255, 0.05)" : "rgba(15, 23, 42, 0.04)"}
                strokeWidth="1"
              />
            </pattern>
            {/* Road Glow */}
            <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Gradient Lake */}
            <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#082f49" : "#bae6fd"} stopOpacity="0.8" />
              <stop offset="100%" stopColor={isDark ? "#0369a1" : "#7dd3fc"} stopOpacity="0.6" />
            </linearGradient>
            {/* Academic Spine Gradient */}
            <linearGradient id="spineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.25)"} />
              <stop offset="100%" stopColor={isDark ? "rgba(6, 182, 212, 0.2)" : "rgba(6, 182, 212, 0.25)"} />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <rect width="1000" height="625" fill={isDark ? "#060d1f" : "#f8fafc"} />
          <rect width="1000" height="625" fill="url(#hudGrid)" />

          {/* Campus Boundary Perimeter */}
          <polygon
            points="60,540 80,180 280,70 650,60 920,120 950,480 820,580 340,590"
            fill={isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(241, 245, 249, 0.8)"}
            stroke={isDark ? "#1e3a5f" : "#cbd5e1"}
            strokeWidth="2"
            strokeDasharray="6,4"
          />

          {/* Kansabansa Eco Lake (Campus Lake) */}
          <path
            d="M 680,180 C 720,150 780,160 810,190 C 830,220 810,260 760,280 C 710,300 660,260 650,220 Z"
            fill="url(#lakeGrad)"
            stroke={isDark ? "#38bdf8" : "#0284c7"}
            strokeWidth="1.5"
          />
          <text x="735" y="225" fill={isDark ? "#7dd3fc" : "#0369a1"} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            KANSABANSA CAMPUS LAKE
          </text>

          {/* Central Academic Green Spine */}
          <rect
            x="360"
            y="200"
            width="340"
            height="150"
            rx="20"
            fill="url(#spineGrad)"
            stroke={isDark ? "rgba(16, 185, 129, 0.4)" : "rgba(16, 185, 129, 0.5)"}
            strokeWidth="1.5"
          />
          <text x="530" y="278" fill={isDark ? "rgba(52, 211, 153, 0.7)" : "#047857"} fontSize="12" fontFamily="monospace" fontWeight="bold" letterSpacing="4" textAnchor="middle">
            CENTRAL ACADEMIC SPINE &bull; GREEN QUADRANGLE
          </text>

          {/* ROADS NETWORK */}
          {/* Main Highway / Khordha-Jatni Road */}
          <path
            d="M 40,560 Q 250,540 500,550 T 960,570"
            fill="none"
            stroke={isDark ? "#334155" : "#94a3b8"}
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M 40,560 Q 250,540 500,550 T 960,570"
            fill="none"
            stroke={isDark ? "#0284c7" : "#3b82f6"}
            strokeWidth="2"
            strokeDasharray="10,6"
          />
          <text x="180" y="585" fill={isDark ? "#94a3b8" : "#475569"} fontSize="9" fontFamily="monospace" fontWeight="bold">
            KHORDHA - JATNI STATE HIGHWAY (MAIN ACCESS)
          </text>

          {/* Main Entrance Driveway & Security Gate Circle */}
          <path
            d="M 130,550 L 130,470 L 220,400"
            fill="none"
            stroke={isDark ? "#475569" : "#cbd5e1"}
            strokeWidth="10"
            strokeLinejoin="round"
          />

          {/* Outer Campus 4-Lane Ring Road */}
          <path
            d="M 220,400 C 180,300 200,180 340,120 C 480,80 680,80 820,140 C 900,200 900,380 820,460 C 740,520 400,500 220,400 Z"
            fill="none"
            stroke={isDark ? "#1e293b" : "#cbd5e1"}
            strokeWidth="14"
            strokeLinejoin="round"
          />
          <path
            d="M 220,400 C 180,300 200,180 340,120 C 480,80 680,80 820,140 C 900,200 900,380 820,460 C 740,520 400,500 220,400 Z"
            fill="none"
            stroke={isDark ? "#38bdf8" : "#2563eb"}
            strokeWidth="2.5"
            strokeDasharray="12,6"
          />
          <text x="830" y="320" fill={isDark ? "#38bdf8" : "#1d4ed8"} fontSize="9" fontFamily="monospace" fontWeight="bold" transform="rotate(75, 830, 320)">
            ARGUL 4-LANE CAMPUS RING ROAD
          </text>

          {/* Inner Connecting Avenues */}
          <line x1="220" y1="400" x2="440" y2="400" stroke={isDark ? "#334155" : "#cbd5e1"} strokeWidth="8" />
          <line x1="440" y1="400" x2="760" y2="400" stroke={isDark ? "#334155" : "#cbd5e1"} strokeWidth="8" />
          <line x1="440" y1="400" x2="440" y2="200" stroke={isDark ? "#334155" : "#cbd5e1"} strokeWidth="8" />
          <line x1="560" y1="350" x2="560" y2="140" stroke={isDark ? "#334155" : "#cbd5e1"} strokeWidth="8" />
          <line x1="680" y1="400" x2="680" y2="220" stroke={isDark ? "#334155" : "#cbd5e1"} strokeWidth="8" />

          {/* Pedestrian Pathways (Spine) */}
          <line x1="380" y1="280" x2="680" y2="280" stroke={isDark ? "#06b6d4" : "#0284c7"} strokeWidth="3" strokeDasharray="4,4" />

          {/* BUILDING SILHOUETTES & LABELS */}

          {/* 1. Main Security Gate (South Gate) */}
          <rect x="110" y="460" width="40" height="25" rx="4" fill={isDark ? "#0e7490" : "#0284c7"} stroke="#38bdf8" strokeWidth="1.5" />
          <text x="130" y="476" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">GATE</text>

          {/* 2. Student Activity Centre (SAC) */}
          <rect x="235" y="365" width="55" height="40" rx="6" fill={isDark ? "#047857" : "#059669"} stroke="#34d399" strokeWidth="1.5" />
          <text x="262" y="388" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SAC</text>

          {/* 3. Athletics Stadium & Turf Ground */}
          <rect x="170" y="280" width="70" height="50" rx="15" fill={isDark ? "rgba(16, 185, 129, 0.25)" : "rgba(16, 185, 129, 0.35)"} stroke="#10b981" strokeWidth="2" />
          <circle cx="205" cy="305" r="16" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="205" y="309" fill={isDark ? "#6ee7b7" : "#065f46"} fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">STADIUM</text>

          {/* 4. Main Campus Auditorium (AUD) */}
          <polygon points="340,335 385,335 395,375 330,375" fill={isDark ? "#9d174d" : "#db2777"} stroke="#f472b6" strokeWidth="2" />
          <text x="362" y="360" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">AUD</text>

          {/* 5. Administrative Main Secretariat (ADM) */}
          <rect x="420" y="375" width="55" height="45" rx="6" fill={isDark ? "#6b21a8" : "#7c3aed"} stroke="#c084fc" strokeWidth="2" />
          <text x="447" y="402" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">ADM</text>

          {/* 6. School of Electrical Sciences (SES - CSE/ECE/Labs) */}
          <rect x="375" y="250" width="60" height="45" rx="6" fill={isDark ? "#0369a1" : "#0284c7"} stroke="#38bdf8" strokeWidth="2" />
          <text x="405" y="277" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SES</text>

          {/* 7. School of Basic Sciences (SBS - Physics/Chemistry) */}
          <rect x="455" y="215" width="55" height="40" rx="6" fill={isDark ? "#0284c7" : "#0ea5e9"} stroke="#38bdf8" strokeWidth="1.5" />
          <text x="482" y="239" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SBS</text>

          {/* 8. Lalitgiri Hall of Learning (LHL - Lecture Theatres LH-1 to LH-4) */}
          <rect x="495" y="275" width="65" height="48" rx="8" fill={isDark ? "#0284c7" : "#2563eb"} stroke="#60a5fa" strokeWidth="2.5" />
          <text x="527" y="303" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">LHL</text>

          {/* 9. School of Humanities & Management (SHSSM) */}
          <rect x="520" y="190" width="50" height="35" rx="5" fill={isDark ? "#0e7490" : "#0891b2"} stroke="#22d3ee" strokeWidth="1.5" />
          <text x="545" y="212" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SHSSM</text>

          {/* 10. School of Minerals & Materials (SMMME) */}
          <rect x="580" y="180" width="55" height="38" rx="5" fill={isDark ? "#0369a1" : "#0284c7"} stroke="#38bdf8" strokeWidth="1.5" />
          <text x="607" y="203" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SMMME</text>

          {/* 11. School of Infrastructure (SIF - Civil Engineering) */}
          <rect x="615" y="225" width="55" height="40" rx="6" fill={isDark ? "#0284c7" : "#0284c7"} stroke="#38bdf8" strokeWidth="1.5" />
          <text x="642" y="249" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SIF</text>

          {/* 12. School of Mechanical Sciences & Workshop (SMS) */}
          <rect x="645" y="270" width="60" height="42" rx="6" fill={isDark ? "#0f766e" : "#0d9488"} stroke="#2dd4bf" strokeWidth="1.5" />
          <text x="675" y="295" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SMS</text>

          {/* 13. School of Earth, Ocean & Climate (SEOCS) */}
          <rect x="715" y="245" width="55" height="40" rx="6" fill={isDark ? "#0284c7" : "#0284c7"} stroke="#38bdf8" strokeWidth="1.5" />
          <text x="742" y="269" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SEOCS</text>

          {/* 14. Brahmaputra Hall of Residence (BHR) */}
          <rect x="735" y="365" width="55" height="45" rx="6" fill={isDark ? "#b45309" : "#d97706"} stroke="#fde047" strokeWidth="2" />
          <text x="762" y="392" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">BHR</text>

          {/* 15. Rushikulya Hall of Residence (RHR) */}
          <rect x="805" y="340" width="55" height="45" rx="6" fill={isDark ? "#b45309" : "#d97706"} stroke="#fde047" strokeWidth="2" />
          <text x="832" y="367" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">RHR</text>

          {/* 16. Mahanadi Hall of Residence (MHR) */}
          <rect x="775" y="420" width="55" height="45" rx="6" fill={isDark ? "#9a3412" : "#ea580c"} stroke="#fdba74" strokeWidth="2" />
          <text x="802" y="447" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">MHR</text>

          {/* Compass Rose at Top-Left */}
          <g transform="translate(110, 110)">
            <circle cx="0" cy="0" r="28" fill={isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)"} stroke={isDark ? "#00e5ff" : "#0284c7"} strokeWidth="1.5" />
            <polygon points="0,-22 5,-4 0,0" fill="#ef4444" />
            <polygon points="0,-22 -5,-4 0,0" fill="#dc2626" />
            <polygon points="0,22 5,4 0,0" fill={isDark ? "#94a3b8" : "#64748b"} />
            <polygon points="0,22 -5,4 0,0" fill={isDark ? "#64748b" : "#475569"} />
            <polygon points="22,0 4,5 0,0" fill={isDark ? "#94a3b8" : "#64748b"} />
            <polygon points="-22,0 -4,5 0,0" fill={isDark ? "#94a3b8" : "#64748b"} />
            <text x="0" y="-12" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">N</text>
            <text x="12" y="3" fill={isDark ? "#94a3b8" : "#475569"} fontSize="7" fontWeight="bold" fontFamily="monospace">E</text>
            <text x="0" y="18" fill={isDark ? "#94a3b8" : "#475569"} fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">S</text>
            <text x="-14" y="3" fill={isDark ? "#94a3b8" : "#475569"} fontSize="7" fontWeight="bold" fontFamily="monospace">W</text>
          </g>

          {/* Scale Indicator */}
          <g transform="translate(80, 500)">
            <line x1="0" y1="0" x2="100" y2="0" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="2" />
            <line x1="0" y1="-4" x2="0" y2="4" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="2" />
            <line x1="50" y1="-2" x2="50" y2="2" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
            <line x1="100" y1="-4" x2="100" y2="4" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="2" />
            <text x="50" y="-8" fill={isDark ? "#94a3b8" : "#475569"} fontSize="8" fontFamily="monospace" textAnchor="middle">200 METERS</text>
          </g>
        </svg>

        {/* Interactive Pulsing Hotspot Pins (Overlayed precisely on SVG coordinates) */}
        {hotspots.map((spot) => {
          const isSelected = selectedBuildingId === spot.id || selectedBuildingCode === spot.code;
          const isHovered = hoveredSpot?.id === spot.id;

          const colorClass = 
            spot.category === 'academic' ? 'bg-cyan-500 border-cyan-300 text-slate-950' :
            spot.category === 'administrative' ? 'bg-purple-500 border-purple-300 text-white' :
            spot.category === 'cultural' ? 'bg-pink-500 border-pink-300 text-white' :
            spot.category === 'hostel' ? 'bg-amber-500 border-amber-300 text-slate-950' :
            'bg-emerald-500 border-emerald-300 text-slate-950';

          return (
            <div
              key={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              onMouseEnter={() => onHoverSpot(spot)}
              onMouseLeave={() => onHoverSpot(null)}
            >
              {/* Pulsing beacon if selected */}
              {isSelected && (
                <span className="absolute -inset-2 rounded-full bg-cyan-400 opacity-75 animate-ping" />
              )}

              {/* Pin Button */}
              <button
                onClick={() => onSelectSpot(spot)}
                className={`relative flex items-center justify-center rounded-full p-1.5 border-2 shadow-lg transition-all duration-200 ${
                  isSelected 
                    ? 'scale-125 ring-4 ring-cyan-400/80 shadow-cyan-500/60' 
                    : 'hover:scale-115 hover:shadow-cyan-500/30'
                } ${colorClass}`}
              >
                <span className="font-mono text-[9px] font-black px-1 leading-none">{spot.code}</span>
              </button>

              {/* Tooltip Pill */}
              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 rounded-xl border shadow-2xl pointer-events-none transition-all duration-200 z-30 ${
                isDark 
                  ? 'bg-slate-950/95 border-cyan-500/40 text-white' 
                  : 'bg-white border-slate-300 text-slate-900 shadow-xl'
              } ${
                isHovered || isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}>
                <div className="flex items-center justify-between mb-1 pb-1 border-b border-white/10">
                  <span className={`text-[10px] font-mono font-bold uppercase ${
                    isDark ? 'text-secondary' : 'text-blue-600'
                  }`}>{spot.code}</span>
                  <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded uppercase font-semibold ${
                    isDark ? 'bg-surface-container text-surface-variant' : 'bg-slate-100 text-slate-700'
                  }`}>{spot.category}</span>
                </div>
                <p className={`text-xs font-bold leading-tight mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{spot.name}</p>
                <p className={`text-[10px] leading-tight ${isDark ? 'text-surface-variant' : 'text-slate-600'}`}>{spot.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
