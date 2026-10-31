import React from 'react';
import { 
  Moon, Sun, Check, Sparkles, Monitor, Palette, Type, Layout, 
  Flag, ShieldCheck, Flame, Compass, ChevronRight, X, Smartphone,
  Radio, Sliders, ToggleLeft, ToggleRight, Cpu
} from 'lucide-react';
import { useTheme, UIMode, Appearance, ColorTheme, Typography, NavStyle } from '../context/ThemeContext';

export const ThemeModal: React.FC = () => {
  const {
    uiMode,
    appearance,
    effectiveAppearance,
    colorTheme,
    typography,
    pureBlack,
    navStyle,
    dynamicIsland,
    isAppearanceModalOpen,
    setUiMode,
    setAppearance,
    setColorTheme,
    setTypography,
    setPureBlack,
    setNavStyle,
    setDynamicIsland,
    closeAppearanceModal,
    completeFirstTimeSetup,
  } = useTheme();

  if (!isAppearanceModalOpen) return null;

  const isBharat = uiMode === 'bharat';
  const isDark = effectiveAppearance === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl transition-all my-auto max-h-[90vh] overflow-y-auto ${
        pureBlack && isDark
          ? 'bg-[#000000] border border-slate-800 text-white shadow-2xl shadow-cyan-950/40'
          : isDark 
            ? 'bg-[#0b1120] border border-slate-700/80 text-white shadow-2xl shadow-cyan-950/50' 
            : 'bg-[#ffffff] border border-slate-200 text-slate-900 shadow-2xl'
      }`}>
        
        {/* Shimmer / Accent Ribbon */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl ${
          isBharat 
            ? 'bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-600' 
            : 'bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400'
        }`} />

        {/* Close Button */}
        <button
          onClick={closeAppearanceModal}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-all ${
            isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header (Styled faithfully like WhatsApp Appearance Screen) */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border shadow-sm">
            {isBharat ? (
              <span className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 border-amber-500/30">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                CAMPUSX Command Center Architecture
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-cyan-400 bg-cyan-500/10 border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Cyber Neon &amp; Liquid Glass Edition
              </span>
            )}
          </div>

          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Screen &amp; Appearance Settings
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-lg mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Customize UI modes, Linotte / Sans / Serif fonts, Apple navigation bar, and OLED black theme.
          </p>
        </div>

        {/* Customization Grid */}
        <div className="space-y-6">

          {/* SECTION 1: APPEARANCE & DISPLAY MODE (Light vs Dark vs System) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <Sun className="w-4 h-4 text-amber-500" />
                <span>1. Color &amp; Appearance Theme</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-secondary">
                {appearance === 'light' ? 'Light Theme (Clean White & Slate)' : appearance === 'dark' ? 'Dark Theme (Cyber & Navy Glow)' : 'System Default (Matches OS)'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option: Light Mode */}
              <button
                type="button"
                onClick={() => setAppearance('light')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  appearance === 'light'
                    ? 'border-amber-500 ring-2 ring-amber-500/40 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                    : isDark ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Light Mode
                      </span>
                      <span className="text-[9px] text-amber-500 font-medium font-mono">
                        Clean White &amp; Slate
                      </span>
                    </div>
                  </div>
                  {appearance === 'light' && (
                    <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className={`text-[10px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Ultra-clean white card backgrounds with high-contrast slate text &amp; clear borders.
                </p>
              </button>

              {/* Option: Dark Mode */}
              <button
                type="button"
                onClick={() => setAppearance('dark')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  appearance === 'dark'
                    ? 'border-cyan-400 ring-2 ring-cyan-400/40 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                    : isDark ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-500/30">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Dark Mode
                      </span>
                      <span className="text-[9px] text-cyan-400 font-medium font-mono">
                        Cyber &amp; Navy Glow
                      </span>
                    </div>
                  </div>
                  {appearance === 'dark' && (
                    <div className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className={`text-[10px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Cinematic deep navy, dark glassmorphism, and glowing neon status accents.
                </p>
              </button>

              {/* Option: Auto System */}
              <button
                type="button"
                onClick={() => setAppearance('system')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  appearance === 'system'
                    ? 'border-purple-400 ring-2 ring-purple-400/40 bg-purple-500/10 shadow-lg shadow-purple-500/10'
                    : isDark ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs border border-purple-500/30">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        System Default
                      </span>
                      <span className="text-[9px] text-purple-400 font-medium font-mono">
                        Matches Device OS
                      </span>
                    </div>
                  </div>
                  {appearance === 'system' && (
                    <div className="w-4 h-4 rounded-full bg-purple-400 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className={`text-[10px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Automatically follows your device operating system preference.
                </p>
              </button>
            </div>
          </div>

          {/* SECTION 2: UI DESIGN ARCHITECTURE (Image 1 vs Image 2) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <Layout className="w-4 h-4 text-amber-400" />
                <span>2. UI Design Architecture</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {uiMode === 'bharat' ? 'Enterprise Operations Console' : 'Cyber Neon Ops Matrix'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option A: Enterprise Operations Console */}
              <button
                type="button"
                onClick={() => setUiMode('bharat')}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  uiMode === 'bharat'
                    ? 'border-amber-500 ring-2 ring-amber-500/40 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                    : isDark ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Enterprise Operations Mode
                      </span>
                      <span className="text-[10px] text-amber-400 font-medium font-mono">
                        Structured Operations &amp; Work Queue
                      </span>
                    </div>
                  </div>
                  {uiMode === 'bharat' && (
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Inspired by modern enterprise command centers: data freshness status bar, priority work queue tabs (Needs Action, Spectra Week, Exams, Core), counter badges ([4], [25], [14], [189]), and high-density telemetry.
                </p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] font-mono font-bold">WORK QUEUE</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[9px] font-mono font-bold">DATA FRESHNESS</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold">ONLINE</span>
                </div>
              </button>

              {/* Option B: Cyber Neon Telemetry / Liquid Glass */}
              <button
                type="button"
                onClick={() => setUiMode('liquid_glass')}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  uiMode === 'liquid_glass'
                    ? 'border-cyan-400 ring-2 ring-cyan-400/40 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                    : isDark ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-500/30">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Cyber Neon Ops Mode
                      </span>
                      <span className="text-[10px] text-cyan-400 font-medium font-mono">
                        Futuristic Waveforms &amp; Gauges
                      </span>
                    </div>
                  </div>
                  {uiMode === 'liquid_glass' && (
                    <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Inspired by futuristic neon analytics dashboards: glowing 4-color top KPI metric tiles (98.5% yellow, blue, cyan, magenta), audio waveform charts, concentric circular gauges, and frosted glass.
                </p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ffb700]" title="Yellow 98.5%" />
                  <span className="w-3 h-3 rounded-full bg-[#00e5ff]" title="Cyan" />
                  <span className="w-3 h-3 rounded-full bg-[#ff2d78]" title="Magenta" />
                  <span className="w-3 h-3 rounded-full bg-[#6366f1]" title="Indigo" />
                  <span className="text-[10px] text-slate-400 ml-1">4-Color Neon Palette</span>
                </div>
              </button>

            </div>
          </div>

          {/* SECTION 2: TYPOGRAPHY / FONT SELECTION (Linotte, Tech Sans, Classic Serif) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <Type className="w-4 h-4 text-secondary" />
                <span>3. Typography Style</span>
              </span>
              <span className="text-[11px] text-secondary font-mono font-bold capitalize">
                {typography === 'linotte' ? 'Linotte (Soft Rounded Quicksand)' : typography === 'tech_sans' ? 'Tech Sans (Plus Jakarta & Inter)' : 'Classic Serif (Devanagari & Serif)'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              
              {/* Option A: Linotte (From WhatsApp screenshot) */}
              <button
                type="button"
                onClick={() => setTypography('linotte')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  typography === 'linotte'
                    ? 'border-cyan-400 bg-cyan-500/15 ring-2 ring-cyan-400/40 shadow-md shadow-cyan-500/15'
                    : isDark ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-cyan-400 font-mono">Linotte</span>
                  {typography === 'linotte' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Soft Rounded
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Quicksand &amp; Nunito (App Reference)
                </span>
              </button>

              {/* Option B: Modern Tech Sans */}
              <button
                type="button"
                onClick={() => setTypography('tech_sans')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  typography === 'tech_sans'
                    ? 'border-cyan-400 bg-cyan-500/15 ring-2 ring-cyan-400/40 shadow-md shadow-cyan-500/15'
                    : isDark ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-secondary font-mono">Tech Sans</span>
                  {typography === 'tech_sans' && <Check className="w-3.5 h-3.5 text-secondary" />}
                </div>
                <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Modern Grotesk
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Plus Jakarta Sans &amp; Inter
                </span>
              </button>

              {/* Option C: Indian Classic Serif */}
              <button
                type="button"
                onClick={() => setTypography('classic_serif')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  typography === 'classic_serif'
                    ? 'border-orange-500 bg-orange-500/15 ring-2 ring-orange-500/40 shadow-md shadow-orange-500/15'
                    : isDark ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-orange-400 font-mono">अ/A Serif</span>
                  {typography === 'classic_serif' && <Check className="w-3.5 h-3.5 text-orange-400" />}
                </div>
                <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Classic Serif
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Noto Serif Devanagari &amp; Merriweather
                </span>
              </button>

            </div>
          </div>

          {/* SECTION 4: SYSTEM TOGGLES (Pure Black, Dynamic Island, Apple Nav) */}
          <div className="p-4 rounded-2xl border bg-surface-container/50 border-outline-variant/30 space-y-3.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
              4. Interface Switches &amp; Navigation
            </span>

            {/* Toggle 1: Pure Black OLED */}
            <div className="flex items-center justify-between py-1">
              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Pure Black OLED (#000000)
                </span>
                <span className="text-[11px] text-slate-400">
                  True deep black background for OLED/AMOLED displays
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPureBlack(!pureBlack)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  pureBlack ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  pureBlack ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Toggle 2: Navigation Bar Style (Apple vs Classic) */}
            <div className="flex items-center justify-between py-1 border-t border-outline-variant/20 pt-2.5">
              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Navigation Bar Style: {navStyle === 'apple' ? 'Apple Floating Pill' : 'Classic Top Bar'}
                </span>
                <span className="text-[11px] text-slate-400">
                  Select between a floating frosted glass pill island or a traditional sticky header
                </span>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-high p-1 rounded-xl border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setNavStyle('apple')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                    navStyle === 'apple' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Apple
                </button>
                <button
                  type="button"
                  onClick={() => setNavStyle('classic')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                    navStyle === 'classic' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Classic
                </button>
              </div>
            </div>

            {/* Toggle 3: Enable Dynamic Island */}
            <div className="flex items-center justify-between py-1 border-t border-outline-variant/20 pt-2.5">
              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Enable Dynamic Island Status Pill
                </span>
                <span className="text-[11px] text-slate-400">
                  Shows compact real-time lecture &amp; solver status island at the top
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDynamicIsland(!dynamicIsland)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  dynamicIsland ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  dynamicIsland ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

          </div>

          {/* LIVE PREVIEW BANNER */}
          <div className={`p-4 rounded-2xl border transition-all ${
            pureBlack && isDark
              ? 'bg-[#000000] border-cyan-500/30'
              : isDark ? 'bg-slate-900/80 border-slate-700/60' : 'bg-slate-100 border-slate-200'
          }`}>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
              Live Preview &bull; Typography: {typography.toUpperCase()}
            </span>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-md ${
                  isBharat 
                    ? 'bg-gradient-to-tr from-orange-500 to-amber-600 text-white' 
                    : 'bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-blue-600 text-slate-950'
                }`}>
                  CX
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {typography === 'classic_serif' 
                      ? 'आईआईटी भुवनेश्वर • CIT Smart Campus' 
                      : typography === 'linotte'
                        ? 'CAMPUSX • IIT Bhubaneswar (Linotte Style)'
                        : 'CAMPUSX • IIT Bhubaneswar (Tech Sans)'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Mode: <strong className={isBharat ? 'text-amber-400' : 'text-cyan-400'}>
                      {uiMode === 'bharat' ? 'Enterprise Operations' : 'Cyber Neon'}
                    </strong> &bull; Nav: {navStyle} &bull; OLED: {pureBlack ? 'ON' : 'OFF'}
                  </p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                isBharat 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}>
                Active
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={completeFirstTimeSetup}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
                isBharat 
                  ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/25' 
                  : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:opacity-95 text-slate-950 shadow-cyan-500/25'
              }`}
            >
              <span>Save &amp; Apply Preferences</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
