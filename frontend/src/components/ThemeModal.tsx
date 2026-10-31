import React from 'react';
import { Moon, Sun, Check, Sparkles, Monitor } from 'lucide-react';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: 'dark' | 'light';
  onSelectTheme: (theme: 'dark' | 'light') => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0c1324] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl text-white">
        
        {/* Shimmer Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display">
            Welcome to CAMPUSX
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Choose your preferred workspace display mode. You can toggle this anytime from the navigation bar.
          </p>
        </div>

        {/* Theme Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          
          {/* Dark Mode */}
          <button
            type="button"
            onClick={() => onSelectTheme('dark')}
            className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
              currentTheme === 'dark'
                ? 'bg-[#181f31] border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg shadow-cyan-500/20'
                : 'bg-[#141b2d] border-slate-700/60 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Moon className="w-5 h-5" />
              </div>
              {currentTheme === 'dark' && (
                <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </div>
            <div>
              <span className="text-sm font-bold block text-white">Dark Mode</span>
              <span className="text-[11px] text-slate-400">Cinematic Nexus (Recommended)</span>
            </div>
          </button>

          {/* Light Mode */}
          <button
            type="button"
            onClick={() => onSelectTheme('light')}
            className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
              currentTheme === 'light'
                ? 'bg-slate-100 border-blue-500 ring-2 ring-blue-400/30 shadow-lg text-slate-900'
                : 'bg-white/5 border-slate-700/60 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Sun className="w-5 h-5" />
              </div>
              {currentTheme === 'light' && (
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </div>
            <div>
              <span className={`text-sm font-bold block ${currentTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Light Mode
              </span>
              <span className="text-[11px] text-slate-400">Clean Academic Ivory</span>
            </div>
          </button>

        </div>

        {/* Confirm Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-all"
        >
          Enter Campus Experience
        </button>

      </div>
    </div>
  );
};
