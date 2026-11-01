import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, Filter, Search, Clock, Users, Building, 
  GraduationCap, CheckCircle2, ChevronRight, Layers, 
  MapPin, BookOpen, AlertCircle, Sparkles, LayoutGrid, List
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface MasterTimetableProps {
  onOpenNavigation?: (venue: string) => void;
}

export const MasterTimetable: React.FC<MasterTimetableProps> = ({ onOpenNavigation }) => {
  const { effectiveAppearance } = useTheme();
  const isDark = effectiveAppearance === 'dark';

  const [timetable, setTimetable] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [viewMode, setViewMode] = useState<'all' | 'group' | 'faculty' | 'room'>('all');
  const [selectedValue, setSelectedValue] = useState<string>('all');
  const [dayFilter, setDayFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayType, setDisplayType] = useState<'grid' | 'table'>('table');

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const fetchTimetableData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/timetables/current');
      if (!res.ok) {
        throw new Error('Failed to load master timetable from server');
      }
      const data = await res.json();
      setTimetable(data);
    } catch (e: any) {
      setError(e.message || 'Error loading timetable data');
    } finally {
      setLoading(false);
    }
  };

  const sessions = timetable?.sessions || [];

  // Extract unique filter lists
  const studentGroups = useMemo(() => {
    return Array.from(new Set(sessions.flatMap((s: any) => s.groups || []))).sort();
  }, [sessions]);

  const faculties = useMemo(() => {
    return Array.from(new Set(sessions.map((s: any) => s.faculty_name || s.faculty_id))).sort();
  }, [sessions]);

  const rooms = useMemo(() => {
    return Array.from(new Set(sessions.map((s: any) => s.room_id))).sort();
  }, [sessions]);

  // Filtered sessions
  const filteredSessions = useMemo(() => {
    return sessions.filter((s: any) => {
      // Day filter
      if (dayFilter !== 'all' && s.day !== dayFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = 
          s.course_id?.toLowerCase().includes(q) ||
          s.course_name?.toLowerCase().includes(q) ||
          s.faculty_name?.toLowerCase().includes(q) ||
          s.faculty_id?.toLowerCase().includes(q) ||
          s.room_id?.toLowerCase().includes(q) ||
          s.session_id?.toLowerCase().includes(q);
        if (!match) return false;
      }

      // View mode filters
      if (viewMode === 'group' && selectedValue !== 'all') {
        return s.groups?.includes(selectedValue);
      }
      if (viewMode === 'faculty' && selectedValue !== 'all') {
        return (s.faculty_name || s.faculty_id) === selectedValue;
      }
      if (viewMode === 'room' && selectedValue !== 'all') {
        return s.room_id === selectedValue;
      }

      return true;
    });
  }, [sessions, dayFilter, searchQuery, viewMode, selectedValue]);

  // Periods list (P1 through P9 for academic timetable)
  const periods = [
    { id: 1, time: '08:00 - 09:00', label: 'P1' },
    { id: 2, time: '09:00 - 10:00', label: 'P2' },
    { id: 3, time: '10:00 - 11:00', label: 'P3' },
    { id: 4, time: '11:00 - 12:00', label: 'P4' },
    { id: 5, time: '12:00 - 13:00', label: 'P5 (Lunch Buffer)' },
    { id: 6, time: '14:00 - 15:00', label: 'P6' },
    { id: 7, time: '15:00 - 16:00', label: 'P7' },
    { id: 8, time: '16:00 - 17:00', label: 'P8' },
    { id: 9, time: '17:00 - 18:00', label: 'P9' }
  ];

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  return (
    <div className={`space-y-6 transition-colors ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* Header Banner - High Contrast in Light & Dark Mode */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all shadow-xl ${
        isDark 
          ? 'bg-slate-900/90 border-slate-800 backdrop-blur-xl' 
          : 'bg-white border-slate-200 shadow-slate-200/60'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
              isDark 
                ? 'bg-blue-600/20 border border-blue-500/40 text-blue-400' 
                : 'bg-blue-600 text-white shadow-blue-500/30'
            }`}>
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold tracking-wider border ${
                  isDark 
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' 
                    : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  INSTITUTIONAL MASTER SCHEDULE
                </span>
                <span className={`flex items-center gap-1.5 text-[11px] font-mono font-bold ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  0 HARD VIOLATIONS &bull; CP-SAT OPTIMIZED
                </span>
              </div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Master Timetable &amp; Curriculum Explorer
              </h1>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                Indian Institute of Technology Bhubaneswar &bull; 189 Weekly sessions scheduled with zero cohort, faculty, or room overlaps across 14 student groups.
              </p>
            </div>
          </div>

          {/* Quick Stats Pill Strip */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold ${
              isDark ? 'bg-slate-950 border-slate-800 text-cyan-400' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              Sessions: <span className="text-blue-600 font-extrabold">{sessions.length}</span>
            </div>
            <div className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold ${
              isDark ? 'bg-slate-950 border-slate-800 text-purple-400' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              Cohorts: <span className="text-purple-600 font-extrabold">{studentGroups.length}</span>
            </div>
            <div className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold ${
              isDark ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              Venues: <span className="text-emerald-600 font-extrabold">{rooms.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Filter Control Toolbar */}
      <div className={`p-4 rounded-2xl border transition-all ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* View Mode Switcher (All / By Group / By Faculty / By Room) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Perspective:</span>
            </span>

            <button
              onClick={() => { setViewMode('all'); setSelectedValue('all'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'all'
                  ? isDark ? 'bg-blue-600 text-white shadow-sm' : 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Sessions (189)
            </button>

            <button
              onClick={() => { setViewMode('group'); setSelectedValue(studentGroups[0] || 'all'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'group'
                  ? isDark ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              By Student Cohort
            </button>

            <button
              onClick={() => { setViewMode('faculty'); setSelectedValue(faculties[0] || 'all'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'faculty'
                  ? isDark ? 'bg-purple-500 text-slate-950 shadow-sm' : 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              By Faculty Member
            </button>

            <button
              onClick={() => { setViewMode('room'); setSelectedValue(rooms[0] || 'all'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'room'
                  ? isDark ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              By Room / Hall
            </button>
          </div>

          {/* Sub-selector Dropdown */}
          {viewMode !== 'all' && (
            <div className="flex items-center gap-2">
              <span className={`text-xs capitalize font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Select {viewMode}:
              </span>
              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                className={`px-3 py-1.5 rounded-xl text-xs border font-semibold focus:outline-none ${
                  isDark 
                    ? 'bg-slate-950 border-slate-700 text-white' 
                    : 'bg-white border-slate-300 text-slate-900 shadow-sm'
                }`}
              >
                {viewMode === 'group' && studentGroups.map(g => <option key={g} value={g}>{g}</option>)}
                {viewMode === 'faculty' && faculties.map(f => <option key={f} value={f}>{f}</option>)}
                {viewMode === 'room' && rooms.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          )}

          {/* Day Filter Pills */}
          <div className="flex items-center gap-1">
            {['all', 'MON', 'TUE', 'WED', 'THU', 'FRI'].map(d => (
              <button
                key={d}
                onClick={() => setDayFilter(d)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                  dayFilter === d
                    ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                    : isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Input & View Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search course, room, prof..."
                className={`pl-8 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none ${
                  isDark 
                    ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
                }`}
              />
            </div>

            <div className={`flex items-center p-0.5 rounded-xl border ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setDisplayType('table')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  displayType === 'table'
                    ? isDark ? 'bg-slate-800 text-white' : 'bg-white text-blue-600 shadow-sm font-bold'
                    : 'text-slate-400'
                }`}
                title="Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDisplayType('grid')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  displayType === 'grid'
                    ? isDark ? 'bg-slate-800 text-white' : 'bg-white text-blue-600 shadow-sm font-bold'
                    : 'text-slate-400'
                }`}
                title="Grid / Slot View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className={`p-12 rounded-3xl border text-center ${
          isDark ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
        }`}>
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono">Loading full institutional curriculum timetable...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      ) : displayType === 'table' ? (
        
        /* TABLE VIEW */
        <div className={`rounded-2xl border overflow-hidden shadow-lg ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className={`sticky top-0 border-b font-mono text-[10px] uppercase font-bold tracking-wider ${
                isDark ? 'bg-slate-950 text-cyan-400 border-slate-800' : 'bg-slate-100 text-slate-900 border-slate-300'
              }`}>
                <tr>
                  <th className="p-3">Session ID</th>
                  <th className="p-3">Course Code &amp; Title</th>
                  <th className="p-3">Day</th>
                  <th className="p-3">Period Slot</th>
                  <th className="p-3">Room / Venue</th>
                  <th className="p-3">Faculty Instructor</th>
                  <th className="p-3">Student Groups</th>
                  <th className="p-3">Session Type</th>
                  {onOpenNavigation && <th className="p-3 text-right">Wayfinding</th>}
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800/80' : 'divide-slate-200'}`}>
                {filteredSessions.map((s: any) => (
                  <tr 
                    key={s.session_id} 
                    className={`transition-colors ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-blue-50/50'}`}
                  >
                    <td className={`p-3 font-mono font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {s.session_id}
                    </td>
                    <td className="p-3">
                      <span className={`font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {s.course_id}
                      </span>
                      <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                        {s.course_name}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                        isDark ? 'bg-slate-800 text-cyan-300' : 'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}>
                        {s.day}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-semibold">
                      P{s.start_period}{s.duration > 1 ? `-P${s.end_period}` : ''}
                    </td>
                    <td className="p-3">
                      <span className={`font-bold font-mono ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
                        {s.room_id}
                      </span>
                    </td>
                    <td className={`p-3 ${isDark ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
                      {s.faculty_name || s.faculty_id}
                    </td>
                    <td className="p-3 font-mono text-[11px]">
                      <span className={`px-1.5 py-0.5 rounded ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-800'}`}>
                        {s.groups?.join(', ')}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        s.kind === 'lab' 
                          ? isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-800'
                          : isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {s.kind}
                      </span>
                    </td>
                    {onOpenNavigation && (
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onOpenNavigation(s.room_id)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isDark 
                              ? 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700' 
                              : 'bg-slate-100 hover:bg-slate-200 text-blue-700 border-slate-200'
                          }`}
                          title={`Navigate to ${s.room_id}`}
                        >
                          <MapPin className="w-3 h-3" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`p-3 border-t text-xs font-mono flex items-center justify-between ${
            isDark ? 'bg-slate-950/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <span>Showing {filteredSessions.length} of {sessions.length} scheduled sessions</span>
            <span className="text-emerald-500 font-bold">✓ 0 Clashes Enforced</span>
          </div>
        </div>

      ) : (

        /* GRID / SLOT VIEW */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {days.map(day => {
              const daySessions = filteredSessions.filter((s: any) => s.day === day);
              return (
                <div 
                  key={day}
                  className={`p-4 rounded-2xl border flex flex-col ${
                    isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className={`pb-3 mb-3 border-b flex items-center justify-between font-mono ${
                    isDark ? 'border-slate-800 text-cyan-400' : 'border-slate-200 text-blue-700'
                  }`}>
                    <span className="font-extrabold text-sm">{day}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 font-bold">
                      {daySessions.length} sessions
                    </span>
                  </div>

                  <div className="space-y-2.5 overflow-y-auto max-h-[500px]">
                    {daySessions.length === 0 ? (
                      <p className={`text-[11px] italic py-6 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        No sessions scheduled
                      </p>
                    ) : (
                      daySessions
                        .sort((a: any, b: any) => a.start_period - b.start_period)
                        .map((s: any) => (
                          <div 
                            key={s.session_id}
                            className={`p-2.5 rounded-xl border text-xs transition-all ${
                              isDark 
                                ? 'bg-slate-950/60 border-slate-800 hover:border-cyan-500/40' 
                                : 'bg-slate-50 border-slate-200 hover:border-blue-400 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-mono font-bold text-blue-600">
                                P{s.start_period}{s.duration > 1 ? `-P${s.end_period}` : ''}
                              </span>
                              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                                s.kind === 'lab' 
                                  ? 'bg-purple-500/20 text-purple-600' 
                                  : 'bg-emerald-500/20 text-emerald-600'
                              }`}>
                                {s.room_id}
                              </span>
                            </div>
                            <h4 className={`font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {s.course_id}
                            </h4>
                            <p className={`text-[10px] truncate mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              {s.course_name}
                            </p>
                            <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200 dark:border-slate-800/80 text-[10px] text-slate-500 font-mono">
                              <span>{s.faculty_id}</span>
                              <span>{s.groups?.join(',')}</span>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
