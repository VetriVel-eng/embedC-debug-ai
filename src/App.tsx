import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { LoadingState } from './components/LoadingState';

// 10 Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CodeAnalysisPage } from './pages/CodeAnalysisPage';
import { AnalysisResultsPage } from './pages/AnalysisResultsPage';
import { ImprovedCodePage } from './pages/ImprovedCodePage';
import { HistoryPage } from './pages/HistoryPage';
import { LearningResourcesPage } from './pages/LearningResourcesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';

const MainLayout: React.FC = () => {
  const { currentPage } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isLanding = currentPage === 'landing';

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-cyan-200">
      {/* Global Top Navbar */}
      <Navbar />

      {/* Global Loading Overlay */}
      <LoadingState />

      {/* Global Toasts */}
      <ToastContainer />

      {/* Landing View: Full Width Canvas */}
      {isLanding ? (
        <main className="flex-1">
          <LandingPage />
        </main>
      ) : (
        /* Workspace Views: Sidebar + Main Content */
        <div className="flex-1 flex w-full">
          {/* Collapsible Workspace Sidebar */}
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* Main Content Viewport */}
          <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {currentPage === 'dashboard' && <DashboardPage />}
            {currentPage === 'analyze' && <CodeAnalysisPage />}
            {currentPage === 'results' && <AnalysisResultsPage />}
            {currentPage === 'improved' && <ImprovedCodePage />}
            {currentPage === 'history' && <HistoryPage />}
            {currentPage === 'learning' && <LearningResourcesPage />}
            {currentPage === 'profile' && <ProfilePage />}
            {currentPage === 'settings' && <SettingsPage />}
            {currentPage === 'about' && <AboutPage />}
          </main>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
