import React from 'react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';
import {
  LayoutDashboard,
  TerminalSquare,
  History,
  GraduationCap,
  User,
  Settings,
  Info,
  Flame,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggleCollapse }) => {
  const { currentPage, setCurrentPage, navigateToAnalysis, profile } = useApp();

  const navItems: { label: string; page: PageRoute; icon: React.ReactNode; isAction?: boolean }[] = [
    {
      label: 'Dashboard',
      page: 'dashboard',
      icon: <LayoutDashboard className="w-4 h-4 shrink-0" />,
    },
    {
      label: 'New Analysis',
      page: 'analyze',
      icon: <TerminalSquare className="w-4 h-4 shrink-0 text-cyan-400" />,
      isAction: true,
    },
    {
      label: 'History',
      page: 'history',
      icon: <History className="w-4 h-4 shrink-0" />,
    },
    {
      label: 'Learning',
      page: 'learning',
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
    },
    {
      label: 'Profile',
      page: 'profile',
      icon: <User className="w-4 h-4 shrink-0" />,
    },
    {
      label: 'Settings',
      page: 'settings',
      icon: <Settings className="w-4 h-4 shrink-0" />,
    },
    {
      label: 'About',
      page: 'about',
      icon: <Info className="w-4 h-4 shrink-0" />,
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-slate-800/80 bg-[#090f1d] transition-all duration-200 shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Top Header / Collapse Button */}
      <div className="p-3 border-b border-slate-800/60 flex items-center justify-between">
        {!collapsed && (
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">
            Workspace
          </span>
        )}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar width"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Nav List */}
      <nav className="p-2 space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;

          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.isAction) {
                  navigateToAnalysis();
                } else {
                  setCurrentPage(item.page);
                }
              }}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              } ${collapsed ? 'justify-center px-0' : ''}`}
            >
              {item.icon}
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom streak & footer badge */}
      {!collapsed && (
        <div className="p-3 m-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>{profile.learningStreak}-Day Debug Streak</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Keep analyzing C code daily to strengthen firmware skills.
          </p>
        </div>
      )}
    </aside>
  );
};
