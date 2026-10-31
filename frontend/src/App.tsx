import React, { useState, useEffect } from 'react';
import { PromoIntro } from './components/PromoIntro';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { CampusNavigation } from './components/CampusNavigation';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { ThemeModal } from './components/ThemeModal';

// Portal views
import { AdminPortal } from './components/portals/AdminPortal';
import { CoordinatorPortal } from './components/portals/CoordinatorPortal';
import { FacultyPortal } from './components/portals/FacultyPortal';
import { ClubPortal } from './components/portals/ClubPortal';
import { StudentPortal } from './components/portals/StudentPortal';
import { ParticipantPortal } from './components/portals/ParticipantPortal';

import { UserProfile, UserRole } from './types';
import { Bot, Sparkles, Compass, Shield, Users, GraduationCap, Trophy, BookOpen, Ticket, Layers } from 'lucide-react';

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


  // Sync user changes to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('campusx_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('campusx_user');
    }
  }, [currentUser]);

  const handleFinishPromo = () => {
    setShowPromo(false);
  };

  const handleSelectRoleFromLandingOrPromo = (role: UserRole) => {
    setShowPromo(false);
    // Find matching demo account and log in or open Auth modal
    const demoAccounts: Record<UserRole, UserProfile> = {
      admin: {
        id: 'usr-admin-01',
        email: 'admin@campusx.edu',
        role: 'admin',
        full_name: 'Campus Director (Admin)',
        created_at: new Date().toISOString()
      },
      department_coordinator: {
        id: 'usr-coord-01',
        email: 'coordinator@campusx.edu',
        role: 'department_coordinator',
        full_name: 'Dr. Rajesh Sharma',
        department_id: 'CSE',
        created_at: new Date().toISOString()
      },
      faculty: {
        id: 'usr-fac-01',
        email: 'faculty@campusx.edu',
        role: 'faculty',
        full_name: 'Prof. Anita Roy',
        faculty_id: 'F01',
        department_id: 'CSE',
        created_at: new Date().toISOString()
      },
      club: {
        id: 'usr-club-01',
        email: 'club@campusx.edu',
        role: 'club',
        full_name: 'Aarav Patel (Robotics & Tech Club)',
        club_id: 'CLUB-TECH',
        created_at: new Date().toISOString()
      },
      student: {
        id: 'usr-stud-01',
        email: 'student@campusx.edu',
        role: 'student',
        full_name: 'Priya Verma',
        student_group_id: 'CS-Y3',
        department_id: 'CSE',
        created_at: new Date().toISOString()
      },
      participant: {
        id: 'usr-part-01',
        email: 'participant@campusx.edu',
        role: 'participant',
        full_name: 'Rohan Sen (Tech Fest Participant)',
        created_at: new Date().toISOString()
      }
    };

    const targetUser = demoAccounts[role];
    if (targetUser) {
      setCurrentUser(targetUser);
      setActiveTab('portal');
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('overview');
  };

  const handleOpenNavigationWithTarget = (target: string) => {
    setSelectedBuildingForNav(target);
    setActiveTab('navigation');
  };

  // Render the active portal according to the authenticated user's role
  const renderActivePortal = () => {
    if (!currentUser) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center mb-4 text-secondary">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Authentication Required</h2>
          <p className="text-surface-variant max-w-md mt-2 text-sm">
            Please log in using one of the four Judge Demo accounts or student profiles to access role-authorized portals.
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-primary-container text-on-secondary font-bold text-sm shadow-lg shadow-secondary/20 hover:opacity-90 transition-all"
          >
            Open Demo Sign In
          </button>
        </div>
      );
    }

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

  const { effectiveAppearance, uiMode } = useTheme();
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
          onSelectRole={handleSelectRoleFromLandingOrPromo}
        />
      )}

      {/* Global Navigation Bar */}
      <Navbar
        user={currentUser}
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'portal' && !currentUser) {
            setAuthModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onSelectRole={handleSelectRoleFromLandingOrPromo}
        onToggleAI={() => setAiDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'overview' && (
          <LandingPage
            onSelectRole={handleSelectRoleFromLandingOrPromo}
            onOpenNavigation={() => setActiveTab('navigation')}
            onOpenAI={() => setAiDrawerOpen(true)}
          />
        )}

        {activeTab === 'navigation' && (
          <CampusNavigation initialBuilding={selectedBuildingForNav} />
        )}

        {activeTab === 'portal' && renderActivePortal()}

        {activeTab === 'timetable' && (
          <div className="space-y-6">
            <div className="bg-surface-container-high/60 backdrop-blur-xl border border-outline-variant/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div>
                <h1 className="text-2xl font-extrabold text-white font-display">Campus Academic Schedule Explorer</h1>
                <p className="text-surface-variant text-sm mt-1">
                  189 weekly sessions validated against zero conflicts via Google OR-Tools CP-SAT
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSelectRoleFromLandingOrPromo('student')}
                  className="px-4 py-2 rounded-xl bg-surface-container border border-outline-variant/40 hover:border-secondary/40 text-xs font-semibold text-white transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  Student View
                </button>
                <button
                  onClick={() => handleSelectRoleFromLandingOrPromo('admin')}
                  className="px-4 py-2 rounded-xl bg-secondary/20 border border-secondary/40 hover:bg-secondary/30 text-xs font-bold text-secondary transition-all flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-secondary" />
                  Admin Directorate Matrix
                </button>
              </div>
            </div>
            {/* Show Student Portal Schedule or Admin Matrix based on login */}
            {currentUser?.role === 'admin' ? <AdminPortal /> : <StudentPortal onOpenNavigation={handleOpenNavigationWithTarget} />}
          </div>
        )}

        {activeTab === 'facilities' && (
          <CampusNavigation initialBuilding="LHL" />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-outline-variant/20 bg-surface-container-lowest/80 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-surface-variant">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl overflow-hidden bg-surface-container flex items-center justify-center p-0.5">
              <img src="/campusx-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <span className="font-bold text-white tracking-wide">CAMPUSX</span> &mdash; ONE CAMPUS. ONE CONNECTED EXPERIENCE.
              <p className="text-[10px] text-surface-variant/80">Chilika Institute of Technology (CIT Public v1) &bull; IIT Bhubaneswar Hackathon 2026</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/30 text-secondary font-mono">
              Google OR-Tools CP-SAT
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/30 text-purple-400 font-mono">
              FastAPI + PostGIS
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/30 text-emerald-400 font-mono">
              Supabase PostgreSQL
            </span>
          </div>

          <div className="text-right text-[11px] text-surface-variant">
            &copy; 2026 IIT Bhubaneswar Smart Campus Initiative.
          </div>
        </div>
      </footer>

      {/* Floating CampusX AI Assistant Trigger Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setAiDrawerOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-secondary via-primary-container to-tertiary shadow-xl shadow-secondary/25 hover:shadow-secondary/40 text-on-secondary font-bold text-sm transition-all transform hover:scale-105 active:scale-95"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping absolute -top-1 -right-1" />
          <Bot className="w-5 h-5" />
          <span className="font-display tracking-tight">Ask CampusX AI</span>
        </button>
      </div>

      {/* 1-Click Judge Demo Switcher Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setActiveTab('portal');
        }}
      />

      {/* Slide-over CampusX AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        currentUser={currentUser}
        onNavigateToBuilding={(bId) => {
          setSelectedBuildingForNav(bId);
          setActiveTab('navigation');
        }}
        onSwitchTab={(tab) => setActiveTab(tab)}
      />

      {/* Comprehensive UI Design Mode, Appearance, Color Theme & Typography Modal */}
      <ThemeModal />

    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

