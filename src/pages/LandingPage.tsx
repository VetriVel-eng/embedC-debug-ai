import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Code2,
  Terminal,
  ShieldAlert,
  Lightbulb,
  CheckCircle2,
  Cpu,
  ArrowRight,
  FileCode,
  Zap,
  BookOpen,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage, navigateToAnalysis } = useApp();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/60">
        {/* Subtle radial glow background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Specialized for C & Embedded Firmware</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Debug Smarter.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Learn Faster.
                </span>
              </h1>

              <p className="text-lg sm:text-xl font-medium text-slate-300 leading-relaxed">
                AI-powered debugging assistance for C and Embedded C developers.
              </p>

              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                Find coding issues, understand why they happen, and get clear suggestions to improve your code. Built for students, firmware engineers, and hardware tinkerers.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateToAnalysis()}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Start Debugging</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('features');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors"
                >
                  Explore Features
                </button>
              </div>

              {/* Quick Trust Attributes */}
              <div className="pt-4 flex items-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  No API key required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Bare-Metal & Standard C
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Illustration */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl border border-slate-800 bg-[#090f1d] shadow-2xl p-4 sm:p-6 overflow-hidden">
                {/* Visual Window Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-400">firmware_test.c</span>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded">
                    Embedded C
                  </div>
                </div>

                {/* Code Body with Highlighted Error */}
                <div className="font-mono text-xs sm:text-sm leading-6 text-slate-300 space-y-1 mb-6">
                  <div className="flex">
                    <span className="w-8 text-slate-400 select-none">1</span>
                    <span className="text-purple-400">#include &lt;stdio.h&gt;</span>
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-400 select-none">2</span>
                    <span>&nbsp;</span>
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-400 select-none">3</span>
                    <span><span className="text-cyan-400">int</span> <span className="text-yellow-300">main</span>() &#123;</span>
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-400 select-none">4</span>
                    <span className="pl-4"><span className="text-cyan-400">int</span> a = <span className="text-emerald-400">10</span>;</span>
                  </div>
                  {/* Highlighted Error Line */}
                  <div className="flex bg-rose-500/20 border-l-2 border-rose-500 -mx-4 px-4 py-0.5 rounded-r">
                    <span className="w-8 text-rose-400 font-bold select-none">5</span>
                    <span className="pl-4">
                      printf(<span className="text-emerald-300">"%d"</span>,{' '}
                      <span className="underline decoration-wavy decoration-rose-400 text-rose-300 font-bold">
                        ptr
                      </span>
                      );
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-400 select-none">6</span>
                    <span className="pl-4"><span className="text-purple-400">return</span> <span className="text-emerald-400">0</span>;</span>
                  </div>
                  <div className="flex">
                    <span className="w-8 text-slate-400 select-none">7</span>
                    <span>&#125;</span>
                  </div>
                </div>

                {/* AI Interactive tags */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center text-[11px] font-medium text-rose-400 flex items-center justify-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Find the error</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center text-[11px] font-medium text-amber-400 flex items-center justify-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Explain the issue</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center text-[11px] font-medium text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Suggest a fix</span>
                  </div>
                </div>

                {/* AI Diagnosis Snippet */}
                <div className="p-3.5 rounded-xl bg-[#0c1427] border border-cyan-500/30 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-semibold text-rose-400">Undefined Variable: 'ptr'</span>
                    <span className="text-[10px] text-slate-400 font-mono">Line 5</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Variable 'ptr' is referenced before declaration in this scope.
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-mono">printf("%d", a);</span>
                    <button
                      onClick={() => navigateToAnalysis()}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      Try with Live Code →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="py-20 border-b border-slate-800/60 bg-[#080d19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-cyan-400 mb-2">
              Core Capabilities
            </h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Engineered for C & Embedded Firmware
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Unlike generic web chatbots, EmbedDebug AI is tailored to understand low-level pointers, register writes, memory safety, and microcontroller constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="rounded-xl border border-slate-800/80 bg-[#0c1427] p-6 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">1. Smart Error Detection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identifies undeclared variables, missing headers, off-by-one loops, and syntax errors accurately.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-slate-800/80 bg-[#0c1427] p-6 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">2. Clear Explanations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Breaks down the root cause in plain English, explaining why the C compiler rejects or miscompiles it.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-slate-800/80 bg-[#0c1427] p-6 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">3. Suggested Fixes</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates corrected, production-safe C code ready to copy, download, or test immediately.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-xl border border-slate-800/80 bg-[#0c1427] p-6 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">4. Embedded C Focus</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hardware registers, volatile ISR flags, baud rates, bitwise masks, and bare-metal microcontroller logic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 border-b border-slate-800/60 bg-[#070b14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-cyan-400 mb-2">
              Workflow
            </h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">How It Works</h3>
            <p className="mt-3 text-sm text-slate-400">
              Four streamlined steps from broken C snippet to resolved firmware code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="relative p-6 rounded-xl border border-slate-800 bg-[#090f1d] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400">STEP 01</span>
                <h4 className="text-base font-bold text-white mt-2 mb-2">Paste Your Code</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your C or Embedded C snippet into the editor or pick from standard presets.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                C / Embedded C selector
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-xl border border-slate-800 bg-[#090f1d] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400">STEP 02</span>
                <h4 className="text-base font-bold text-white mt-2 mb-2">Analyze with AI</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our pipeline checks syntax, memory hazards, logic flags, and register configurations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                Multi-pass diagnostics
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-xl border border-slate-800 bg-[#090f1d] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400">STEP 03</span>
                <h4 className="text-base font-bold text-white mt-2 mb-2">Understand the Issue</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Review highlighted error lines, root causes, severity tags, and technical explanations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                Clear cause & action
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-xl border border-slate-800 bg-[#090f1d] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400">STEP 04</span>
                <h4 className="text-base font-bold text-white mt-2 mb-2">Apply Suggested Fix</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Inspect the side-by-side corrected code, copy the fix, or download the clean file.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                1-click copy & export
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-16 p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-[#0c1427] to-blue-950/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-white">Ready to inspect your C code?</h4>
              <p className="text-xs text-slate-300 mt-1">
                Start debugging without any sign-up or setup friction.
              </p>
            </div>
            <button
              onClick={() => navigateToAnalysis()}
              className="px-6 py-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl whitespace-nowrap shadow-lg shadow-cyan-500/20 transition-colors"
            >
              Analyze Code Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
