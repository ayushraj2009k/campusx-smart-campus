import React, { useState } from 'react';
import { Shield, Users, GraduationCap, Trophy, BookOpen, Ticket, X, Check, Lock, Mail, ArrowRight } from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@campusx.edu');
  const [password, setPassword] = useState('Admin@CampusX2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const demoAccounts = [
    {
      role: 'admin' as UserRole,
      title: 'Admin (Judge Account 1)',
      email: 'admin@campusx.edu',
      pass: 'Admin@CampusX2026!',
      icon: Shield,
      badge: 'Directorate / System Controller',
      color: 'border-blue-500/50 bg-blue-500/10 text-blue-400'
    },
    {
      role: 'department_coordinator' as UserRole,
      title: 'Dept Coordinator (Judge Account 2)',
      email: 'coordinator@campusx.edu',
      pass: 'Coord@CampusX2026!',
      icon: Users,
      badge: 'Dr. Rajesh Sharma (CSE)',
      color: 'border-purple-500/50 bg-purple-500/10 text-purple-400'
    },
    {
      role: 'faculty' as UserRole,
      title: 'Faculty (Judge Account 3)',
      email: 'faculty@campusx.edu',
      pass: 'Faculty@CampusX2026!',
      icon: GraduationCap,
      badge: 'Prof. Anita Roy (F01)',
      color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
    },
    {
      role: 'club' as UserRole,
      title: 'Club Representative (Judge Account 4)',
      email: 'club@campusx.edu',
      pass: 'Club@CampusX2026!',
      icon: Trophy,
      badge: 'Arjun Verma (Dramatics / Fest Lead)',
      color: 'border-amber-500/50 bg-amber-500/10 text-amber-400'
    },
    {
      role: 'student' as UserRole,
      title: 'Student (Controlled Demo)',
      email: 'student@campusx.edu',
      pass: 'Student@CampusX2026!',
      icon: BookOpen,
      badge: 'Priya Nayak (3rd Year CSE-3)',
      color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
    },
    {
      role: 'participant' as UserRole,
      title: 'Participant (Controlled Demo)',
      email: 'participant@campusx.edu',
      pass: 'Guest@CampusX2026!',
      icon: Ticket,
      badge: 'Rohan Sen (Spectra Hackathon Delegate)',
      color: 'border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-400'
    }
  ];

  const handleSelectDemo = (acc: typeof demoAccounts[0]) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
    setPassword(acc.pass);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Authentication failed');
      }

      const data = await res.json();
      onLoginSuccess(data.user);
      onClose();
    } catch (err: any) {
      // Fallback for offline demo mode
      const matched = demoAccounts.find((d) => d.email.toLowerCase() === email.toLowerCase());
      if (matched && password === matched.pass) {
        onLoginSuccess({
          email: matched.email,
          full_name: matched.badge,
          role: matched.role,
          department: 'Academic Operations',
          designation: matched.badge,
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
        });
        onClose();
      } else {
        setError(err.message || 'Login failed. Please use one of the judge demo accounts.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-2xl p-6 sm:p-8 overflow-hidden text-on-surface">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        
        {/* Modal Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center border border-secondary/30">
              <Lock className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Judge Evaluation Sign-In</h2>
              <p className="text-xs text-on-surface-variant">Select any of the 4 Judge Demo Accounts to evaluate role-specific workflows.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Demo Account Quick Selector */}
        <div className="mb-6">
          <label className="text-[11px] font-bold text-secondary uppercase tracking-wider block mb-2 font-mono">
            Click Any Demo Account (Auto-Fills Credentials)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {demoAccounts.map((acc) => {
              const Icon = acc.icon;
              const isSelected = email === acc.email;
              return (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectDemo(acc)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? `${acc.color} ring-2 ring-secondary/50 shadow-md`
                      : 'border-outline-variant/20 bg-surface-container-high/40 hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-white block truncate">{acc.title}</span>
                    <span className="text-[10px] text-on-surface-variant block truncate">{acc.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-on-surface-variant block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-sm text-white focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-on-surface-variant block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-sm text-white focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
              {error}
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-secondary text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Enter Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
