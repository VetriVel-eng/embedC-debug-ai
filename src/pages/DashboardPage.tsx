import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Terminal,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Flame,
  ArrowRight,
  Code2,
  Calendar,
  Layers,
  ChevronRight,
  Cpu,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { profile, history, viewHistoryItem, navigateToAnalysis } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Welcome back, {profile.name}! <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your AI debugging assistant is ready. Analyze your C and Embedded C code and fix issues in seconds.
          </p>
        </div>

        <button
          onClick={() => navigateToAnalysis()}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm shadow-cyan-500/20 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Primary CTA Card: Start a New Analysis */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-[#0c1a35] via-[#091224] to-[#0d1c3a] p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-sm">
            <Terminal className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Start a new analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Paste your Embedded C code and let AI find syntax faults, undefined identifiers, pointer hazards, and register misconfigurations.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateToAnalysis()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Analysis</span>
            </button>
            <span className="text-xs text-slate-400">
              Supports ANSI C, C99, ARM Cortex-M, and AVR
            </span>
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="p-5 rounded-xl border border-slate-800 bg-[#090f1d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Total Analyses</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            {profile.totalAnalyses}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            All-time inspect sessions
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-5 rounded-xl border border-slate-800 bg-[#090f1d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Fixed Issues</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
            {profile.fixedIssues}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Resolved with AI suggestions
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-5 rounded-xl border border-slate-800 bg-[#090f1d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Issues Detected</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
            {profile.issuesDetected}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Flagged for review
          </div>
        </div>

        {/* Stat 4 */}
        <div className="p-5 rounded-xl border border-slate-800 bg-[#090f1d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Learning Streak</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums flex items-baseline gap-1.5">
            <span>{profile.learningStreak}</span>
            <span className="text-sm font-normal text-slate-400">days</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Active daily practice
          </div>
        </div>
      </div>

      {/* Motivation Motto */}
      <div className="p-3.5 rounded-xl border border-slate-800/80 bg-[#080d19] flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="italic">"Better code, brighter future."</span>
        </div>
        <span className="text-[11px] text-slate-400">Embedded C Debugging Console</span>
      </div>

      {/* Recent Analyses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Analyses</h2>
            <p className="text-xs text-slate-400">Past code inspections and detected issues</p>
          </div>
          <button
            onClick={() => navigateToAnalysis()}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            <span>Analyze New Code</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {history.length === 0 ? (
          <div className="p-8 rounded-xl border border-slate-800 bg-[#090f1d] text-center space-y-3">
            <Code2 className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm text-slate-300">No analyses recorded yet</p>
            <button
              onClick={() => navigateToAnalysis()}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300"
            >
              Analyze Your First Code
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 5).map((item) => {
              const issuesCount = item.issuesCount.errors + item.issuesCount.warnings;
              const hasErrors = item.issuesCount.errors > 0;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-800/80 bg-[#090f1d] hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        hasErrors
                          ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                          : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                      }`}
                    >
                      <Terminal className="w-4 h-4" />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                          onClick={() => viewHistoryItem(item.id)}>
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="font-mono text-cyan-400/90">{item.language}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3" />
                          {item.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800/60">
                    <div className="text-right">
                      <span
                        className={`text-xs font-semibold ${
                          hasErrors ? 'text-rose-400' : 'text-amber-400'
                        }`}
                      >
                        {issuesCount} {issuesCount === 1 ? 'issue' : 'issues'} detected
                      </span>
                    </div>

                    <button
                      onClick={() => viewHistoryItem(item.id)}
                      className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
