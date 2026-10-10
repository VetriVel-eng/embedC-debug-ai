import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Code2,
  Copy,
  ChevronRight,
  ShieldCheck,
  Check,
  Terminal,
  FileCode,
  Sparkles,
} from 'lucide-react';

export const AnalysisResultsPage: React.FC = () => {
  const { currentResult, setCurrentPage, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'issues' | 'improved'>('all');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [copiedImprovedCode, setCopiedImprovedCode] = useState(false);

  // If no active analysis, show clear fallback
  if (!currentResult) {
    return (
      <div className="p-12 rounded-2xl border border-slate-800 bg-[#090f1d] text-center space-y-4">
        <Code2 className="w-10 h-10 text-cyan-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Active Analysis</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Please run an analysis on your C or Embedded C code to review detected issues and suggested fixes.
        </p>
        <button
          onClick={() => setCurrentPage('analyze')}
          className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
        >
          Go to Code Editor
        </button>
      </div>
    );
  }

  const errors = currentResult.issues.filter((i) => i.severity === 'error');
  const warnings = currentResult.issues.filter((i) => i.severity === 'warning');
  const suggestions = currentResult.issues.filter((i) => i.severity === 'suggestion');

  const handleCopySnippet = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(id);
    showToast('Problematic snippet copied to clipboard', 'success');
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleCopyImprovedCode = () => {
    navigator.clipboard.writeText(currentResult.improvedCode);
    setCopiedImprovedCode(true);
    showToast('Improved code copied to clipboard!', 'success');
    setTimeout(() => setCopiedImprovedCode(false), 2000);
  };

  const improvedLines = currentResult.improvedCode.split('\n');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Analysis Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dynamic diagnostic report for {currentResult.language} snippet ({currentResult.timestamp}).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('analyze')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Editor</span>
          </button>
          <button
            onClick={() => setCurrentPage('improved')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors"
          >
            <span>Side-by-Side View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Success Status Banner */}
      <div className="p-4 sm:p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-900/40 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Analysis Complete</span>
              <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                {currentResult.language}
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {currentResult.summary}
            </p>
          </div>
        </div>

        {/* Quick summary stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-center sm:text-right">
            <span className="text-slate-400 text-[11px] block">Errors</span>
            <span className="font-bold text-rose-400">{currentResult.issuesCount.errors}</span>
          </div>
          <div className="text-center sm:text-right">
            <span className="text-slate-400 text-[11px] block">Warnings</span>
            <span className="font-bold text-amber-400">{currentResult.issuesCount.warnings}</span>
          </div>
          <div className="text-center sm:text-right">
            <span className="text-slate-400 text-[11px] block">Suggestions</span>
            <span className="font-bold text-cyan-400">{currentResult.issuesCount.suggestions}</span>
          </div>
        </div>
      </div>

      {/* Segmented Filter Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-[#090f1d] border border-slate-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Sections
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'issues'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Detected Issues</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300">
            {currentResult.issues.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('improved')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'improved'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Improved Code</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
        </button>
      </div>

      {/* Main Analysis Sections */}
      <div className="space-y-6">
        {/* Section 1 to 4: Detected Issues (with Explanation, Possible Cause, and Suggested Fix) */}
        {(activeTab === 'all' || activeTab === 'issues') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Detected Issues & Explanations ({currentResult.issues.length})
              </h2>
              <span className="text-xs text-slate-400">
                Generated from analyzed source
              </span>
            </div>

            {currentResult.issues.length === 0 ? (
              <div className="p-8 rounded-xl border border-slate-800 bg-[#090f1d] text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-sm font-bold text-white">No Issues Detected</h3>
                <p className="text-xs text-slate-400">
                  Your code complies with standard syntax and memory checks.
                </p>
              </div>
            ) : (
              currentResult.issues.map((issue, idx) => {
                const isError = issue.severity === 'error';
                const isWarning = issue.severity === 'warning';

                return (
                  <div
                    key={issue.id || idx}
                    className="rounded-xl border border-slate-800/80 bg-[#090f1d] p-5 sm:p-6 space-y-5 hover:border-slate-700 transition-colors shadow-lg"
                  >
                    {/* 1. SECTION: Detected Issue */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        <span>Section 1: Detected Issue</span>
                        <span className="text-xs font-mono text-slate-400 normal-case">
                          Line {issue.line}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                            isError
                              ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                              : isWarning
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          }`}
                        >
                          {issue.severity}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {issue.type}
                        </h3>
                      </div>

                      {/* Problematic Code Snippet (if available) */}
                      {issue.codeSnippet && (
                        <div className="mt-3 rounded-lg bg-[#060a12] border border-slate-800 p-3 font-mono text-xs flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3 overflow-x-auto">
                            <span className="text-rose-400 font-bold select-none shrink-0">
                              L{issue.line}:
                            </span>
                            <code className="text-rose-200">{issue.codeSnippet}</code>
                          </div>
                          <button
                            onClick={() => handleCopySnippet(issue.codeSnippet!, issue.id)}
                            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors shrink-0"
                            title="Copy problematic line"
                          >
                            {copiedSnippet === issue.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 border-t border-slate-800/60">
                      {/* 2. SECTION: Explanation */}
                      <div className="space-y-1.5 p-3.5 rounded-lg bg-[#070c17] border border-slate-800/60">
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                          Explanation
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {issue.message}
                        </p>
                      </div>

                      {/* 3. SECTION: Possible Cause */}
                      <div className="space-y-1.5 p-3.5 rounded-lg bg-[#070c17] border border-slate-800/60">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                          Possible Cause
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {issue.cause}
                        </p>
                      </div>

                      {/* 4. SECTION: Suggested Fix */}
                      <div className="space-y-1.5 p-3.5 rounded-lg bg-[#070c17] border border-emerald-500/20">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                          Suggested Fix
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {issue.suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* 5. SECTION: Improved Code */}
        {(activeTab === 'all' || activeTab === 'improved') && (
          <div className="rounded-xl border border-cyan-500/30 bg-[#090f1d] p-5 sm:p-6 space-y-4 shadow-xl shadow-cyan-950/20">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h2 className="text-base font-bold text-white">
                  Section 5: Improved Code
                </h2>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                  Suggested Fix
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">
                  {improvedLines.length} lines
                </span>
                <button
                  onClick={handleCopyImprovedCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
                >
                  {copiedImprovedCode ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedImprovedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
            </div>

            {/* Code Box */}
            <div className="rounded-lg bg-[#060a12] border border-slate-800 overflow-x-auto p-4 font-mono text-xs sm:text-sm text-emerald-300/90 leading-6 max-h-[380px] overflow-y-auto">
              {improvedLines.map((line, idx) => (
                <div key={idx} className="flex">
                  <span className="w-9 text-slate-500 select-none text-right pr-3 font-mono shrink-0">
                    {idx + 1}
                  </span>
                  <span className="whitespace-pre">{line}</span>
                </div>
              ))}
            </div>

            {/* Explanation of changes */}
            {currentResult.diffExplanation && (
              <div className="p-3.5 rounded-lg bg-[#070c17] border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400 font-semibold block">Summary of Changes:</span>
                <p className="text-slate-300 leading-relaxed">
                  {currentResult.diffExplanation}
                </p>
              </div>
            )}

            {/* Tip */}
            {currentResult.tip && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>{currentResult.tip}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
