import React, { useState, useEffect } from 'react';
import { PromoIntro } from './components/PromoIntro';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { CampusNavigation } from './components/CampusNavigation';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { ThemeModal } from './components/ThemeModal';
import { DynamicIsland } from './components/DynamicIsland';
import { CampusBroadcastTicker } from './components/CampusBroadcastTicker';
import { PortalHub } from './components/PortalHub';
import { MasterTimetable } from './components/MasterTimetable';

// Portal views
import { AdminPortal } from './components/portals/AdminPortal';
import { CoordinatorPortal } from './components/portals/CoordinatorPortal';
import { FacultyPortal } from './components/portals/FacultyPortal';
import { ClubPortal } from './components/portals/ClubPortal';
import { StudentPortal } from './components/portals/StudentPortal';
import { ParticipantPortal } from './components/portals/ParticipantPortal';

import { ErrorBoundary } from './components/ErrorBoundary';
import { UserProfile, UserRole } from './types';
import { Shield, ArrowLeft, LogOut, RefreshCw, KeyRound, CheckCircle2 } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [showPromo, setShowPromo] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('campusx_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState<boolean>(false);
  const [selectedBuildingForNav, setSelectedBuildingForNav] = useState<string | null>(null);
  const [selectedPortalForLogin, setSelectedPortalForLogin] = useState<UserRole | null>(null);

  // Sync user changes to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('campusx_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('campusx_user');
      localStorage.removeItem('campusx_token');
    }
  }, [currentUser]);

  // Validate active token on mount
  useEffect(() => {
    const token = localStorage.getItem('campusx_token');
    if (token && currentUser) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (!res.ok) {
          // Token expired or invalid
          console.warn('Session verification notice: updating local state');
        }
      })
      .catch(() => {});
    }
  }, []);

  const handleFinishPromo = () => {
    setShowPromo(false);
  };

  // Direct 1-Click Judge Demo Login: instantly activates authenticated demo account & opens workspace
  const handleDirectDemoLogin = (role: UserRole) => {
    setShowPromo(false);

    // High-availability verified judge demo profiles
    const fallbackProfiles: Record<UserRole, UserProfile> = {
      admin: {
        id: 'usr-admin-01',
        email: 'admin@campusx.edu',
        username: 'admin',
        full_name: 'Chief Campus Administrator',
        role: 'admin',
        department: 'Central Administration',
        designation: 'System Controller, Directorate',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        is_demo_account: true
      },
      department_coordinator: {
        id: 'usr-coord-01',
        email: 'coordinator@campusx.edu',
        username: 'coordinator',
        full_name: 'Dr. Rajesh Sharma',
        role: 'department_coordinator',
        department: 'Computer Science & Engineering',
        designation: 'Department Timetable Coordinator',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
        is_demo_account: true
      },
      faculty: {
        id: 'usr-fac-01',
        email: 'faculty@campusx.edu',
        username: 'faculty',
        full_name: 'Prof. Anita Roy (F01)',
        role: 'faculty',
        department: 'School of Electrical Sciences',
        designation: 'Associate Professor',
        avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
        is_demo_account: true
      },
      club: {
        id: 'usr-club-01',
        email: 'club@campusx.edu',
        username: 'club',
        full_name: 'Arjun Verma',
        role: 'club',
        department: 'Student Activity Centre (SAC)',
        designation: 'Dramatics Society Lead & Spectra Fest Convenor',
        avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
        is_demo_account: true
      },
      student: {
        id: 'usr-stud-01',
        email: 'student@campusx.edu',
        username: 'student',
        full_name: 'Priya Nayak',
        role: 'student',
        department: 'Computer Science & Engineering',
        designation: 'B.Tech Student (Year 3, CSE-3)',
        avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
        is_demo_account: true
      },
      participant: {
        id: 'usr-part-01',
        email: 'participant@campusx.edu',
        username: 'participant',
        full_name: 'Rohan Sen',
        role: 'participant',
        department: 'External College Delegate',
        designation: 'Spectra Fest 2026 Hackathon Hacker',
        avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
        is_demo_account: true
      }
    };

    // Instant zero-lag activation of verified demo profile & transition to portal
    const profile = fallbackProfiles[role] || fallbackProfiles.admin;
    setCurrentUser(profile);
    setSelectedPortalForLogin(null);
    setActiveTab('portal');

    // Concurrently authenticate against FastAPI backend and sync security token
    fetch(`/api/auth/demo-login/${role}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.token) {
          localStorage.setItem('campusx_token', data.token);
        }
        if (data?.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(err => {
        console.warn('Demo login background token sync notice:', err);
      });
  };

  // Opens the dedicated sign-in/login screen for the selected portal role
  const handleOpenPortalLogin = (role: UserRole) => {
    setShowPromo(false);
    setSelectedPortalForLogin(role);
    setCurrentUser(null);
    setActiveTab('portal');
  };

  const handleLogout = () => {
    const token = localStorage.getItem('campusx_token');
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      }).catch(() => {});
    }
    setCurrentUser(null);
    setSelectedPortalForLogin(null);
    setActiveTab('overview');
  };

  const handleOpenNavigationWithTarget = (target: string) => {
    setSelectedBuildingForNav(target);
    setActiveTab('navigation');
  };

  // Render the active portal according to the authenticated user's role
  const renderActivePortal = () => {
    if (!currentUser || !currentUser.role) {
      return (
        <PortalHub
          initialPortal={selectedPortalForLogin}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setSelectedPortalForLogin(null);
          }}
          onBackToOverview={() => {
            setSelectedPortalForLogin(null);
            setActiveTab('overview');
          }}
        />
      );
    }

    const renderRoleContent = () => {
      switch (currentUser.role) {
        case 'admin':
          return <AdminPortal />;
        case 'department_coordinator':
          return <CoordinatorPortal />;
        case 'faculty':
          return <FacultyPortal onOpenNavigation={handleOpenNavigationWithTarget} />;
        case 'club':
          return <ClubPortal />;
        case 'student':
          return <StudentPortal onOpenNavigation={handleOpenNavigationWithTarget} />;
        case 'participant':
          return <ParticipantPortal onOpenNavigation={handleOpenNavigationWithTarget} />;
        default:
          return <StudentPortal onOpenNavigation={handleOpenNavigationWithTarget} />;
      }
    };

    return (
      <ErrorBoundary 
        fallbackTitle={`${currentUser.role?.replace('_', ' ') || 'Workspace'} View Safeguard`}
        onReset={() => {
          setSelectedPortalForLogin(null);
          setActiveTab('overview');
        }}
      >
        {renderRoleContent()}
      </ErrorBoundary>
    );
  };

  const { effectiveAppearance } = useTheme();
  const isDark = effectiveAppearance === 'dark';

  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-[#070e1f] text-[#dce2fa]' 
        : 'bg-slate-50 text-slate-900'
    } flex flex-col transition-colors duration-200`}>
      
      {/* 5-Second Cinematic Promo Launch Experience */}
      {showPromo && (
        <PromoIntro
          durationSeconds={5}
          onFinish={handleFinishPromo}
          onSelectRole={handleOpenPortalLogin}
        />
      )}

      {/* High-Tech Campus Live Broadcast Ticker */}
      <CampusBroadcastTicker
        onOpenAI={() => setAiDrawerOpen(true)}
      />

      {/* Apple-Style Live Status Dynamic Island */}
      <DynamicIsland
        onOpenNavigation={handleOpenNavigationWithTarget}
        onOpenAI={() => setAiDrawerOpen(true)}
        onOpenTimetable={() => setActiveTab('timetable')}
      />

      {/* Global Navigation Bar */}
      <Navbar
        user={currentUser}
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'portal' && !currentUser) {
            setSelectedPortalForLogin(null);
          }
          setActiveTab(tab);
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onSelectRole={handleOpenPortalLogin}
        onToggleAI={() => setAiDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* TAB 1: OVERVIEW & LANDING PAGE */}
        {activeTab === 'overview' && (
          <LandingPage
            currentUser={currentUser}
            onSelectRole={handleOpenPortalLogin}
            onOpenLoginPortal={handleOpenPortalLogin}
            onOpenNavigation={() => setActiveTab('navigation')}
            onOpenAI={() => setAiDrawerOpen(true)}
            onOpenPortalWorkspace={() => setActiveTab('portal')}
          />
        )}

        {/* TAB 2: CAMPUS GIS & NAVIGATION */}
        {activeTab === 'navigation' && (
          <CampusNavigation initialBuilding={selectedBuildingForNav} />
        )}

        {/* TAB 3: ROLE WORKSPACE (PORTAL SELECTION HUB OR AUTHENTICATED DASHBOARD) */}
        {activeTab === 'portal' && (
          !currentUser ? (
            <PortalHub
              initialPortal={selectedPortalForLogin}
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                setSelectedPortalForLogin(null);
              }}
              onBackToOverview={() => {
                setSelectedPortalForLogin(null);
                setActiveTab('overview');
              }}
            />
          ) : (
            <div className="space-y-6">
              
              {/* Prominent Judge DEMO MODE Status Bar */}
              <div className={`p-4 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md ${
                isDark 
                  ? 'bg-slate-900/95 border-amber-500/40 text-amber-200' 
                  : 'bg-amber-50 border-amber-300 text-amber-950 shadow-sm'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black font-mono text-[10px] tracking-wider animate-pulse shadow-sm">
                    DEMO MODE
                  </span>
                  <div className="text-xs">
                    <span className="font-extrabold">{currentUser?.full_name || 'Authorized User'}</span>
                    <span className="opacity-80"> ({currentUser?.email || 'Logged In'}) &bull; Active Portal: </span>
                    <span className="uppercase font-mono font-bold text-amber-600 dark:text-amber-400">
                      {currentUser?.role ? currentUser.role.replace('_', ' ') : 'AUTHORIZED WORKSPACE'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentUser(null);
                      setSelectedPortalForLogin(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                      isDark 
                        ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' 
                        : 'bg-white hover:bg-slate-100 border-amber-300 text-amber-900 shadow-sm'
                    }`}
                  >
                    Switch Portal
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Authorized Dashboard View */}
              {renderActivePortal()}
            </div>
          )
        )}

        {/* TAB 4: MASTER TIMETABLE EXPLORER (High-Contrast, All 189 Sessions) */}
        {activeTab === 'timetable' && (
          <MasterTimetable onOpenNavigation={handleOpenNavigationWithTarget} />
        )}

        {/* TAB 5: CAMPUS FACILITIES */}
        {activeTab === 'facilities' && (
          <CampusNavigation initialBuilding="LHL" />
        )}

      </main>

      {/* Global Footer */}
      <footer className={`mt-auto border-t py-8 px-4 sm:px-6 transition-colors ${
        isDark ? 'border-slate-800/80 bg-slate-950/80 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl overflow-hidden bg-surface-container flex items-center justify-center p-0.5">
              <img src="/campusx-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <span className={`font-bold tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>CAMPUSX</span> &mdash; ONE CAMPUS. ONE CONNECTED EXPERIENCE.
              <p className="text-[10px] text-slate-400">Indian Institute of Technology Bhubaneswar &bull; Smart Campus Management 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Argul 936-Acre Topology</span>
            <span>&bull;</span>
            <span>0 Hard Violations</span>
            <span>&bull;</span>
            <button
              onClick={() => {
                setSelectedPortalForLogin(null);
                setCurrentUser(null);
                setActiveTab('portal');
              }}
              className="text-blue-500 hover:underline font-bold"
            >
              Judge Portals
            </button>
          </div>
        </div>
      </footer>

      {/* Global Modals & Drawers */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setActiveTab('portal');
        }}
      />

      <ThemeModal />

      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        currentUser={currentUser}
        onNavigateToBuilding={handleOpenNavigationWithTarget}
        onSwitchTab={(tab) => {
          setActiveTab(tab);
          setAiDrawerOpen(false);
        }}
        onSelectRole={(role) => {
          handleOpenPortalLogin(role);
          setAiDrawerOpen(false);
        }}
      />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary fallbackTitle="CAMPUSX Platform Recovery">
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
