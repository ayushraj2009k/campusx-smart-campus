import React from 'react';
import { 
  Moon, Sun, Check, Sparkles, Monitor, Palette, Type, Layout, 
  Flag, ShieldCheck, Flame, Compass, ChevronRight, X
} from 'lucide-react';
import { useTheme, UIMode, Appearance, ColorTheme, Typography } from '../context/ThemeContext';

export const ThemeModal: React.FC = () => {
  const {
    uiMode,
    appearance,
    effectiveAppearance,
    colorTheme,
    typography,
    isAppearanceModalOpen,
    setUiMode,
    setAppearance,
    setColorTheme,
    setTypography,
    closeAppearanceModal,
    completeFirstTimeSetup,
  } = useTheme();

  if (!isAppearanceModalOpen) return null;

  const isBharat = uiMode === 'bharat';
  const isDark = effectiveAppearance === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl transition-all my-auto ${
        isDark 
          ? 'bg-[#0b1120] border border-slate-700/80 text-white shadow-cyan-950/50' 
          : 'bg-[#ffffff] border border-orange-200 text-slate-900 shadow-2xl'
      }`}>
        
        {/* Shimmer / Accent Ribbon */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl ${
          isBharat 
            ? 'bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-600' 
            : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600'
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

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border shadow-sm">
            {isBharat ? (
              <span className="flex items-center gap-1.5 text-orange-400 bg-orange-500/10 border-orange-500/30">
                <Flag className="w-3.5 h-3.5 text-orange-500" />
                Bharat Innovation Challenge 2026
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-cyan-400 bg-cyan-500/10 border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Liquid Glass Cinematic Edition
              </span>
            )}
          </div>

          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Personalize Your CAMPUSX Experience
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-lg mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Select your preferred UI design style, appearance mode, theme palette, and typography. You can change this anytime from the navigation bar.
          </p>
        </div>

        {/* Customization Grid */}
        <div className="space-y-6">

          {/* SECTION 1: UI DESIGN MODE */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <Layout className="w-4 h-4 text-orange-500" />
                <span>1. UI Design Mode</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {uiMode === 'bharat' ? 'Bharat National Hackathon' : 'Liquid Glass OS'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option A: Bharat Innovation Challenge */}
              <button
                type="button"
                onClick={() => setUiMode('bharat')}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  uiMode === 'bharat'
                    ? 'border-orange-500 ring-2 ring-orange-500/40 bg-orange-500/10 shadow-lg shadow-orange-500/10'
                    : isDark ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xs border border-orange-500/30">
                      🇮🇳
                    </div>
                    <div>
                      <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Bharat Innovation Mode
                      </span>
                      <span className="text-[10px] text-orange-400 font-medium font-mono">
                        Official Hackathon Edition
                      </span>
                    </div>
                  </div>
                  {uiMode === 'bharat' && (
                    <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Inspired by the national innovation challenge: warm Saffron/Tricolor accents, top official ribbon, high-contrast badges, and bold Indian institutional styling.
                </p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#f97316]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffffff] border border-slate-300" />
                  <span className="w-3 h-3 rounded-full bg-[#16a34a]" />
                  <span className="text-[10px] text-slate-400 ml-1">Saffron • Ivory • India Green</span>
                </div>
              </button>

              {/* Option B: Liquid Glass Style */}
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
                        Liquid Glass Mode
                      </span>
                      <span className="text-[10px] text-cyan-400 font-medium font-mono">
                        Cyber Obsidian & Glow
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
                  Translucent frosted glass cards, deep pure black/obsidian canvas, neon cyan and electric indigo glow, Apple iOS style floating docks.
                </p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#06b6d4]" />
                  <span className="w-3 h-3 rounded-full bg-[#6366f1]" />
                  <span className="w-3 h-3 rounded-full bg-[#0b1120] border border-cyan-500/40" />
                  <span className="text-[10px] text-slate-400 ml-1">Electric Cyan • Indigo • Obsidian</span>
                </div>
              </button>

            </div>
          </div>

          {/* SECTION 2: APPEARANCE (Dark, Light, System) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <Sun className="w-4 h-4 text-amber-500" />
                <span>2. Appearance Mode</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono capitalize">
                {appearance} Mode
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              
              {/* Dark */}
              <button
                type="button"
                onClick={() => setAppearance('dark')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  appearance === 'dark'
                    ? 'border-cyan-400 bg-cyan-500/15 ring-2 ring-cyan-400/30'
                    : isDark ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center mx-auto mb-1 text-cyan-400">
                  <Moon className="w-4 h-4" />
                </div>
                <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>Dark</span>
                <span className="text-[9px] text-slate-400">Deep Space</span>
              </button>

              {/* Light */}
              <button
                type="button"
                onClick={() => setAppearance('light')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  appearance === 'light'
                    ? 'border-orange-500 bg-orange-500/15 ring-2 ring-orange-500/30'
                    : isDark ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center mx-auto mb-1 text-amber-500">
                  <Sun className="w-4 h-4" />
                </div>
                <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>Light</span>
                <span className="text-[9px] text-slate-400">Crisp Ivory</span>
              </button>

              {/* System */}
              <button
                type="button"
                onClick={() => setAppearance('system')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  appearance === 'system'
                    ? 'border-purple-400 bg-purple-500/15 ring-2 ring-purple-400/30'
                    : isDark ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center mx-auto mb-1 text-purple-400">
                  <Monitor className="w-4 h-4" />
                </div>
                <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>System</span>
                <span className="text-[9px] text-slate-400">Auto Sync</span>
              </button>

            </div>
          </div>

          {/* SECTION 3: COLOR PALETTE & TYPOGRAPHY ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Color Palette */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <Palette className="w-3.5 h-3.5 text-secondary" />
                  <span>3. Color Theme</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                
                {/* Bharat Saffron */}
                <button
                  type="button"
                  onClick={() => setColorTheme('bharat_saffron')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    colorTheme === 'bharat_saffron'
                      ? 'border-orange-500 bg-orange-500/15 ring-2 ring-orange-500/30'
                      : isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-3 h-3 rounded-full bg-orange-500 shadow-sm" />
                    {colorTheme === 'bharat_saffron' && <Check className="w-3 h-3 text-orange-400" />}
                  </div>
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Bharat Saffron
                  </span>
                  <span className="text-[10px] text-slate-400">Warm Orange & Gold</span>
                </button>

                {/* Cyber Nexus */}
                <button
                  type="button"
                  onClick={() => setColorTheme('cyber_nexus')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    colorTheme === 'cyber_nexus'
                      ? 'border-cyan-400 bg-cyan-500/15 ring-2 ring-cyan-400/30'
                      : isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm" />
                    {colorTheme === 'cyber_nexus' && <Check className="w-3 h-3 text-cyan-400" />}
                  </div>
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Cyber Nexus
                  </span>
                  <span className="text-[10px] text-slate-400">Electric Cyan & Indigo</span>
                </button>

              </div>
            </div>

            {/* Typography Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <Type className="w-3.5 h-3.5 text-secondary" />
                  <span>4. Typography Style</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                
                {/* Modern Tech Sans */}
                <button
                  type="button"
                  onClick={() => setTypography('tech_sans')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    typography === 'tech_sans'
                      ? 'border-cyan-400 bg-cyan-500/15 ring-2 ring-cyan-400/30'
                      : isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono font-bold text-cyan-400">Aa Sans</span>
                    {typography === 'tech_sans' && <Check className="w-3 h-3 text-cyan-400" />}
                  </div>
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Tech Sans
                  </span>
                  <span className="text-[10px] text-slate-400">Jakarta & Inter</span>
                </button>

                {/* Indian Classic Serif */}
                <button
                  type="button"
                  onClick={() => setTypography('classic_serif')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    typography === 'classic_serif'
                      ? 'border-orange-500 bg-orange-500/15 ring-2 ring-orange-500/30'
                      : isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-serif font-bold text-orange-400">अ/A Serif</span>
                    {typography === 'classic_serif' && <Check className="w-3 h-3 text-orange-400" />}
                  </div>
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Classic Serif
                  </span>
                  <span className="text-[10px] text-slate-400">Devanagari & Serif</span>
                </button>

              </div>
            </div>

          </div>

          {/* LIVE PREVIEW BANNER */}
          <div className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/80 border-slate-700/60' : 'bg-slate-100 border-slate-200'
          }`}>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
              Live Preview
            </span>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-md ${
                  isBharat 
                    ? 'bg-gradient-to-tr from-orange-500 to-amber-600 text-white' 
                    : 'bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950'
                }`}>
                  CX
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {typography === 'classic_serif' 
                      ? 'आईआईटी भुवनेश्वर • CIT Smart Campus' 
                      : 'IIT Bhubaneswar • CIT Smart Campus'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Mode: <strong className={isBharat ? 'text-orange-400' : 'text-cyan-400'}>{uiMode === 'bharat' ? 'Bharat Hackathon' : 'Liquid Glass'}</strong> &bull; {colorTheme} &bull; {typography}
                  </p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                isBharat 
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
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
              <span>Save & Continue to CAMPUSX</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
