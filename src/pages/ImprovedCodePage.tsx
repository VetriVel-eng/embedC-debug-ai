import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Copy,
  Download,
  Check,
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  Code2,
  Terminal,
  Sparkles,
} from 'lucide-react';

export const ImprovedCodePage: React.FC = () => {
  const { currentResult, history, setCurrentPage, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'suggestedOnly' | 'split'>('suggestedOnly');

  // Use the actual analysis result, or fall back to the most recent from history if refreshed
  const activeResult = currentResult || (history.length > 0 ? history[0] : null);

  if (!activeResult) {
    return (
      <div className="p-12 rounded-2xl border border-slate-800 bg-[#090f1d] text-center space-y-4">
        <Code2 className="w-10 h-10 text-cyan-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Active Analysis Found</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Please run an analysis on your C or Embedded C code first to view the improved code.
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeResult.improvedCode);
      setCopied(true);
      showToast('Corrected code copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy code', 'error');
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([activeResult.improvedCode], { type: 'text/x-csrc' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `improved_${activeResult.language.toLowerCase().replace(/\s+/g, '_')}.c`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Corrected code downloaded successfully!', 'success');
    } catch {
      showToast('Download failed', 'error');
    }
  };

  const originalLines = activeResult.originalCode.split('\n');
  const improvedLines = activeResult.improvedCode.split('\n');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Title & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Improved Code
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Corrected version returned from the {activeResult.language} analysis ({activeResult.timestamp}).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCurrentPage('results')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Analysis</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .c</span>
          </button>
        </div>
      </div>

      {/* View Mode Toggle Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">View Mode:</span>
          <div className="inline-flex rounded-lg border border-slate-800 p-0.5 bg-[#090f1d]">
            <button
              onClick={() => setViewMode('suggestedOnly')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                viewMode === 'suggestedOnly'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Corrected Code Only
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                viewMode === 'split'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Side-by-Side Split
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-md">
            {activeResult.language}
          </span>
        </div>
      </div>

      {/* Clear Code Block View */}
      {viewMode === 'suggestedOnly' ? (
        <div className="rounded-xl border border-cyan-500/30 bg-[#090f1d] overflow-hidden flex flex-col shadow-xl shadow-cyan-950/20">
          {/* Header with Title and Copy Code button */}
          <div className="px-4 py-2.5 border-b border-slate-800 bg-[#0c1427] flex items-center justify-between text-xs">
            <span className="font-semibold text-emerald-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Corrected Code Block</span>
            </span>

            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-mono text-[11px]">
                {improvedLines.length} lines
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-md transition-colors"
                title="Copy corrected code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Monospace Code Body */}
          <div className="p-4 font-mono text-xs sm:text-sm bg-[#060a12] overflow-x-auto min-h-[340px] leading-6">
            {improvedLines.map((line, idx) => (
              <div key={idx} className="flex hover:bg-slate-900/40 px-1 rounded">
                <span className="w-9 text-slate-600 select-none text-right pr-3 font-mono shrink-0">
                  {idx + 1}
                </span>
                <span className="text-emerald-300/90 whitespace-pre font-medium">{line}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Side-by-Side Split View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Original Code */}
          <div className="rounded-xl border border-slate-800 bg-[#090f1d] overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 border-b border-slate-800 bg-[#0c1427] flex items-center justify-between text-xs">
              <span className="font-semibold text-rose-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                Original Analyzed Code
              </span>
              <span className="text-slate-400 font-mono text-[11px]">{originalLines.length} lines</span>
            </div>

            <div className="p-4 font-mono text-xs sm:text-sm bg-[#060a12] overflow-x-auto flex-1 min-h-[320px] leading-6">
              {originalLines.map((line, idx) => (
                <div key={idx} className="flex hover:bg-slate-900/40 px-1 rounded">
                  <span className="w-8 text-slate-600 select-none text-right pr-3 font-mono shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-300 whitespace-pre">{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Corrected Code */}
          <div className="rounded-xl border border-cyan-500/30 bg-[#090f1d] overflow-hidden flex flex-col shadow-lg shadow-cyan-950/20">
            <div className="px-4 py-2.5 border-b border-slate-800 bg-[#0c1427] flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Corrected Code
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono text-[11px]">{improvedLines.length} lines</span>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 font-mono text-xs sm:text-sm bg-[#060a12] overflow-x-auto flex-1 min-h-[320px] leading-6">
              {improvedLines.map((line, idx) => (
                <div key={idx} className="flex hover:bg-slate-900/40 px-1 rounded">
                  <span className="w-8 text-emerald-500/70 select-none text-right pr-3 font-mono shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-emerald-300/90 whitespace-pre font-medium">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Short Explanation of What Was Changed */}
      <div className="rounded-xl border border-slate-800 bg-[#090f1d] p-5 space-y-2.5">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Lightbulb className="w-4 h-4 text-cyan-400" />
          <span>Short Explanation of What Was Changed</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {activeResult.diffExplanation || 'Applied corrections to eliminate compile-time errors and conform to standard C guidelines.'}
        </p>
      </div>

      {/* Engineering Tip Card */}
      {activeResult.tip && (
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold text-white">Best Practice Tip:</span>
            <p className="text-xs text-slate-300 leading-relaxed">{activeResult.tip}</p>
          </div>
        </div>
      )}

      {/* Production Disclaimer */}
      <div className="p-3.5 rounded-lg border border-slate-800/80 bg-[#070b14] flex items-center gap-2.5 text-slate-400 text-[11px]">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          AI-generated suggestions should be reviewed and tested before use in production systems.
        </span>
      </div>
    </div>
  );
};
