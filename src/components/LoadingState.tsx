import React from 'react';
import { useApp } from '../context/AppContext';
import { Loader2, CheckCircle2, Terminal, Cpu } from 'lucide-react';

export const LoadingState: React.FC = () => {
  const { isAnalyzing, analysisStep } = useApp();

  if (!isAnalyzing) return null;

  const steps = [
    'Reading source code',
    'Checking syntax',
    'Checking possible logic issues',
    'Checking C / Embedded C patterns',
    'Preparing debugging suggestions',
  ];

  const currentIdx = steps.indexOf(analysisStep);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-[#090f1d] p-6 shadow-2xl shadow-cyan-950/40 text-left">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Analyzing your code...</h3>
            <p className="text-xs text-slate-400">Inspecting C and Embedded C source</p>
          </div>
        </div>

        {/* Step list */}
        <div className="space-y-3 mb-6">
          {steps.map((s, idx) => {
            const isCompleted = currentIdx > idx || currentIdx === steps.length - 1 && idx === steps.length - 1;
            const isCurrent = currentIdx === idx;
            const isPending = currentIdx < idx;

            return (
              <div
                key={s}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all ${
                  isCurrent
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold'
                    : isCompleted
                    ? 'text-slate-300 bg-slate-900/50'
                    : 'text-slate-400 opacity-60'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span>{s}</span>
              </div>
            );
          })}
        </div>

        {/* Console indicator */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI debugging assistant</span>
          </div>
          <span className="text-cyan-400 font-mono">In progress...</span>
        </div>
      </div>
    </div>
  );
};
