import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Plus,
  Trash2,
  Eye,
  Calendar,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Terminal,
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { history, deleteHistoryItem, viewHistoryItem, navigateToAnalysis } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'All' | 'C' | 'Embedded C' | 'Errors' | 'Fixed'>('All');

  const filteredHistory = history.filter((item) => {
    // Search match
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Filter match
    if (filter === 'All') return true;
    if (filter === 'C') return item.language === 'C';
    if (filter === 'Embedded C') return item.language === 'Embedded C';
    if (filter === 'Errors') return item.issuesCount.errors > 0;
    if (filter === 'Fixed') return item.issuesCount.errors === 0;

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Analysis History
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            View and manage your previous code analyses.
          </p>
        </div>

        <button
          onClick={() => navigateToAnalysis()}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-[#090f1d]">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search analysis history..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#060a12] border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'C', 'Embedded C', 'Errors', 'Fixed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                filter === tab
                  ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* History Items List / Table */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 rounded-xl border border-slate-800 bg-[#090f1d] text-center space-y-3">
          <Code2 className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-sm font-bold text-white">No Matching Analyses</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or filter, or start a new analysis.
          </p>
          <button
            onClick={() => navigateToAnalysis()}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg"
          >
            Start New Analysis
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => {
            const totalIssues = item.issuesCount.errors + item.issuesCount.warnings;
            const hasErrors = item.issuesCount.errors > 0;

            // Short code preview from original code
            const cleanCode = item.originalCode?.trim() || '';
            const firstLine = cleanCode.split('\n').find((l) => l.trim().length > 0) || cleanCode;
            const codePreview = firstLine.trim().slice(0, 75);

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-800/80 bg-[#090f1d] hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Icon & Details */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      hasErrors
                        ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                    }`}
                  >
                    <Terminal className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        onClick={() => viewHistoryItem(item.id)}
                        className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 cursor-pointer transition-colors truncate"
                      >
                        {item.name}
                      </h3>
                      <span className="font-mono text-cyan-400 font-medium text-xs">
                        ({item.language})
                      </span>
                    </div>

                    {/* Date and time & Result summary */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
                        <Calendar className="w-3 h-3 text-cyan-400/80" />
                        {item.timestamp}
                      </span>
                      <span>·</span>
                      <span className="text-slate-300 truncate max-w-sm">
                        {item.summary}
                      </span>
                    </div>

                    {/* Short code preview */}
                    {codePreview && (
                      <div className="mt-2 py-1 px-2.5 rounded bg-[#060a12] border border-slate-800 font-mono text-[11px] text-slate-300 flex items-center gap-1.5 max-w-xl overflow-hidden">
                        <span className="text-cyan-400 select-none font-bold">&gt;</span>
                        <span className="truncate">{codePreview}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Issues count & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/60 shrink-0">
                  <div className="text-left md:text-right space-y-0.5">
                    <span
                      className={`text-xs font-semibold flex items-center md:justify-end gap-1.5 ${
                        hasErrors ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          hasErrors ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                      />
                      {totalIssues} {totalIssues === 1 ? 'issue' : 'issues'} detected
                    </span>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      Analysis Result:{' '}
                      <span className={hasErrors ? 'text-rose-300 font-semibold' : 'text-emerald-300 font-semibold'}>
                        {hasErrors ? 'Errors Detected' : 'Verified Clean'}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewHistoryItem(item.id)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors flex items-center gap-1.5"
                      title="View analysis report"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <button
                      onClick={() => deleteHistoryItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete from history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
