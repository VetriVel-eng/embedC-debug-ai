import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';
import { Code2, Menu, X, Plus, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, profile, navigateToAnalysis } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = currentPage === 'landing';

  const navLinks: { label: string; page: PageRoute }[] = isLanding
    ? [
        { label: 'Home', page: 'landing' },
        { label: 'Dashboard', page: 'dashboard' },
        { label: 'Code Analysis', page: 'analyze' },
        { label: 'Learning', page: 'learning' },
        { label: 'About', page: 'about' },
      ]
    : [
        { label: 'Dashboard', page: 'dashboard' },
        { label: 'Analysis', page: 'analyze' },
        { label: 'History', page: 'history' },
        { label: 'Learning', page: 'learning' },
        { label: 'About', page: 'about' },
      ];

  const handleNavClick = (page: PageRoute) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors shadow-sm shadow-cyan-950">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              EmbedDebug <span className="text-cyan-400 font-semibold">AI</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`transition-colors whitespace-nowrap relative py-1 ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & User Avatar */}
        <div className="flex items-center gap-3">
          {isLanding ? (
            <>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="hidden sm:inline-flex text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigateToAnalysis()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm shadow-cyan-500/20 transition-colors whitespace-nowrap"
              >
                <Terminal className="w-3.5 h-3.5" />
                Start Debugging
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigateToAnalysis()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                New Analysis
              </button>

              {/* Profile Avatar */}
              <button
                onClick={() => handleNavClick('profile')}
                className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${
                  currentPage === 'profile'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-300 ring-2 ring-cyan-400/30'
                    : 'bg-blue-600/20 text-cyan-300 border-blue-500/40 hover:border-cyan-400'
                }`}
                title={`Profile: ${profile.name}`}
              >
                {profile.avatarInitials}
              </button>
            </>
          )}

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090f1d] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'bg-cyan-950/60 text-cyan-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('settings')}
              className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-md"
            >
              Settings
            </button>
            <button
              onClick={() => handleNavClick('profile')}
              className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-md flex items-center justify-between"
            >
              <span>My Profile ({profile.name})</span>
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">
                {profile.avatarInitials}
              </span>
            </button>
            <button
              onClick={() => {
                navigateToAnalysis();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-3 py-2 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md mt-1"
            >
              + Start New Analysis
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
