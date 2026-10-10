import React from 'react';
import { useApp } from '../context/AppContext';
import { Code2, Heart, Shield, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="border-t border-slate-800/80 bg-[#060a12] text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-md bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                EmbedDebug <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Debug Smarter. Learn Faster. AI-assisted debugging for C and Embedded C developers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-300">
            <button
              onClick={() => setCurrentPage('landing')}
              className="hover:text-cyan-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="hover:text-cyan-400 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('analyze')}
              className="hover:text-cyan-400 transition-colors"
            >
              Code Analysis
            </button>
            <button
              onClick={() => setCurrentPage('learning')}
              className="hover:text-cyan-400 transition-colors"
            >
              Learning Resources
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className="hover:text-cyan-400 transition-colors"
            >
              About
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} EmbedDebug AI. Built for C & Embedded developers.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Bare-Metal & Standard C
            </span>
            <span>·</span>
            <span>Educational Tool</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
