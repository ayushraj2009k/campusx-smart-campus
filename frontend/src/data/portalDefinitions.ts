import React from 'react';
import { Shield, Users, GraduationCap, Trophy, BookOpen, Ticket } from 'lucide-react';
import { UserRole } from '../types';

export interface PortalDefinition {
  role: UserRole;
  title: string;
  subtitle: string;
  category: 'core' | 'extended';
  judgeTag: string;
  defaultUsername: string;
  defaultEmail: string;
  defaultPass: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeColor: string;
  gradient: string;
  borderGlow: string;
  description: string;
  responsibilities: string[];
}

export const PORTAL_DEFINITIONS: PortalDefinition[] = [
  {
    role: 'admin',
    title: 'Admin Directorate',
    subtitle: "Directorate & Dean's Control Center",
    category: 'core',
    judgeTag: 'JUDGE DEMO CORE 1',
    defaultUsername: 'admin@',
    defaultEmail: 'admin@campusx.edu',
    defaultPass: 'admin@123',
    icon: Shield,
    accentColor: 'text-blue-500',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    gradient: 'from-blue-950/40 via-slate-900/60 to-slate-950',
    borderGlow: 'hover:border-blue-500/50 hover:shadow-blue-500/20',
    description: 'Full administrative command, Google OR-Tools CP-SAT solver, disruption rescheduling approvals, Spectra knapsack decisions, and demo reset.',
    responsibilities: [
      'Load starter-pack dataset & run CP-SAT solver',
      'Review & approve timetable disruption proposals',
      'Spectra Week venue knapsack allocation audit',
      'Download schedule.json & schedule_after.json',
      'Reset demo data to pristine evaluation state'
    ]
  },
  {
    role: 'department_coordinator',
    title: 'Department Coordinator',
    subtitle: 'Dr. Rajesh Sharma &bull; CSE Curriculum',
    category: 'core',
    judgeTag: 'JUDGE DEMO CORE 2',
    defaultUsername: 'coordinator@',
    defaultEmail: 'coordinator@campusx.edu',
    defaultPass: 'coordinator@123',
    icon: Users,
    accentColor: 'text-purple-500',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    gradient: 'from-purple-950/40 via-slate-900/60 to-slate-950',
    borderGlow: 'hover:border-purple-500/50 hover:shadow-purple-500/20',
    description: 'Departmental timetable coordinator, CS-LAB-1/2 continuous blocks monitoring, faculty workload balance, and lab change requests.',
    responsibilities: [
      'View department-wide course & lab timetable',
      'Monitor faculty teaching load (max 4.2h/day)',
      'Manage specialized computer lab allocations',
      'Submit schedule change & venue requests',
      'Inspect scheduling conflicts & warnings'
    ]
  },
  {
    role: 'faculty',
    title: 'Faculty Member',
    subtitle: 'Prof. Anita Roy (F01) &bull; SES',
    category: 'core',
    judgeTag: 'JUDGE DEMO CORE 3',
    defaultUsername: 'faculty@',
    defaultEmail: 'faculty@campusx.edu',
    defaultPass: 'faculty@123',
    icon: GraduationCap,
    accentColor: 'text-emerald-500',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    gradient: 'from-emerald-950/40 via-slate-900/60 to-slate-950',
    borderGlow: 'hover:border-emerald-500/50 hover:shadow-emerald-500/20',
    description: 'Personalized weekly teaching agenda, mark unavailability, submit natural language reschedule proposals, and check assignment rationales.',
    responsibilities: [
      'View personal weekly teaching timetable',
      'Report travel absence & mark unavailability',
      'Submit natural language reschedule requests',
      'Inspect room assignments & accessibility',
      'View AI-assisted schedule justifications'
    ]
  },
  {
    role: 'club',
    title: 'Club Representative',
    subtitle: 'Arjun Verma &bull; Dramatics & Fest Lead',
    category: 'core',
    judgeTag: 'JUDGE DEMO CORE 4',
    defaultUsername: 'club@',
    defaultEmail: 'club@campusx.edu',
    defaultPass: 'club@123',
    icon: Trophy,
    accentColor: 'text-amber-500',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    gradient: 'from-amber-950/40 via-slate-900/60 to-slate-950',
    borderGlow: 'hover:border-amber-500/50 hover:shadow-amber-500/20',
    description: 'Spectra Week venue booking desk, natural language venue request parser, edit requests before submission, and track live knapsack approval.',
    responsibilities: [
      'Submit Spectra Week venue requests in natural English/Hinglish',
      'Review automatically parsed attendance & equipment needs',
      'Track live knapsack approval/rejection status',
      'Inspect suggested alternative slots and justifications',
      'Avoid booking conflicts with regular academic classes'
    ]
  },
  {
    role: 'student',
    title: 'Student Portal',
    subtitle: 'Priya Nayak &bull; 3rd Year CSE-3',
    category: 'extended',
    judgeTag: 'CAMPUSX ECOSYSTEM',
    defaultUsername: 'student@',
    defaultEmail: 'student@campusx.edu',
    defaultPass: 'student@123',
    icon: BookOpen,
    accentColor: 'text-cyan-500',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    gradient: 'from-cyan-950/40 via-slate-900/60 to-slate-950',
    borderGlow: 'hover:border-cyan-500/50 hover:shadow-cyan-500/20',
    description: 'Personalized student schedule, midsem examination countdown, seat allocations with 50% spacing, and digital RFID student pass.',
    responsibilities: [
      'View personalized cohort weekly timetable',
      'Midsem examination countdown & hall desk locator',
      'Digital student pass with real QR code scanner',
      'Campus indoor navigation to lecture halls'
    ]
  },
  {
    role: 'participant',
    title: 'Participant Portal',
    subtitle: 'Rohan Sen &bull; Spectra Hackathon Delegate',
    category: 'extended',
    judgeTag: 'CAMPUSX ECOSYSTEM',
    defaultUsername: 'participant@',
    defaultEmail: 'participant@campusx.edu',
    defaultPass: 'participant@123',
    icon: Ticket,
    accentColor: 'text-fuchsia-500',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/40',
    gradient: 'from-fuchsia-950/40 via-slate-900/60 to-slate-950',
    borderGlow: 'hover:border-fuchsia-500/50 hover:shadow-fuchsia-500/20',
    description: 'Spectra Tech Fest delegate desk, digital entry pass, turnstile gate access, event schedule, and venue wayfinding.',
    responsibilities: [
      'Digital gate pass with scan-verified QR turnstile',
      'Spectra Week events schedule & venue locator',
      'Campus navigation to AUD, SAC, and OAT',
      'Participation certificate verification desk'
    ]
  }
];
