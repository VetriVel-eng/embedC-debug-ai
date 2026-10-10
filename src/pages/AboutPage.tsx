import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Code2,
  Target,
  Sparkles,
  Cpu,
  Layers,
  ArrowRight,
  Terminal,
  ShieldAlert,
  Server,
  FileCheck,
  Zap,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateToAnalysis } = useApp();

  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* Title & Lead Paragraph */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Independent Developer Tool</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About EmbedDebug AI
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          EmbedDebug AI is an AI-assisted debugging platform designed to help students and developers understand C and Embedded C programming issues. We combine smart code analysis with clear root-cause explanations so developers can write safer, higher-quality firmware.
        </p>
      </div>

      {/* Mission & Impact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-xl border border-slate-800 bg-[#090f1d] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Our Mission</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Make debugging easier to understand and help developers learn from their coding mistakes rather than staring at cryptic compiler logs.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-slate-800 bg-[#090f1d] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Our Focus</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Helping developers write clean, reliable C and Embedded C code with focused diagnostic feedback and guidance.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-slate-800 bg-[#090f1d] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Our Impact</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Accelerating the learning curve for students, hobbyists, and developers learning C and Embedded C programming.
          </p>
        </div>
      </div>

      {/* What We Focus On */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#090f1d] space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">What We Focus On</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {[
            {
              title: 'C Programming',
              desc: 'Core syntax, variables, pointers, data types, control flow, and standard functions.',
            },
            {
              title: 'Embedded C',
              desc: 'Embedded concepts such as volatile variables, delay loops, and microcontroller conventions.',
            },
            {
              title: 'Code Analysis',
              desc: 'Checking common syntax errors, logic problems, pointer safety, and code quality.',
            },
            {
              title: 'Error Explanations',
              desc: 'Clear, plain-language explanations of why an issue happens and how to resolve it.',
            },
            {
              title: 'AI-Assisted Debugging',
              desc: 'Practical code suggestions to help fix detected problems and improve code reliability.',
            },
            {
              title: 'Learning & Practice',
              desc: 'Helping developers learn from their coding mistakes and build better debugging skills.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#060a12] border border-slate-800/80 space-y-1.5"
            >
              <h4 className="text-xs font-bold text-cyan-300">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture / How It Works Diagram */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#090f1d] space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">How It Works</h2>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end data pipeline from raw source code to structured developer remedies:
          </p>
        </div>

        {/* Visual Pipeline Flow */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2">
          {[
            { step: '01', title: 'User Code', desc: 'C / Embedded C' },
            { step: '02', title: 'Backend Proxy', desc: 'Secure Server-side' },
            { step: '03', title: 'AI Model', desc: 'Token Factory' },
            { step: '04', title: 'Code Analysis', desc: 'Syntax & Logic' },
            { step: '05', title: 'Explanation', desc: 'Root Cause & Fix' },
            { step: '06', title: 'Suggested Code', desc: 'Ready to Deploy' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#060a12] border border-slate-800 text-center space-y-1 relative"
            >
              <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                {item.step}
              </span>
              <h4 className="text-xs font-bold text-white">{item.title}</h4>
              <span className="text-[11px] text-slate-400 block">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Future Roadmap / Vision (clearly marked as planned) */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#090f1d] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">Future Vision & Roadmap</h2>
          <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2.5 py-0.5 rounded">
            In Active Planning
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Planned extensions for subsequent releases of EmbedDebug AI:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {[
            {
              title: 'Microcontroller-Specific Profiles',
              desc: 'Target STM32, ESP32, AVR ATmega, PIC, and RP2040 datasheet register maps.',
            },
            {
              title: 'Hardware Protocol Analysis',
              desc: 'UART, SPI, and I2C timing diagram verification and ring-buffer deadlock analysis.',
            },
            {
              title: 'Pointer & Memory Tracker',
              desc: 'Static tracking of dangling pointers, memory leaks, and buffer boundary hazards.',
            },
            {
              title: 'Static MISRA-C Compliance',
              desc: 'Automated warnings for automotive and aerospace embedded coding standards.',
            },
            {
              title: 'Serial Log & Crash Analysis',
              desc: 'Paste UART terminal output or HardFault dumps to pinpoint line of panic.',
            },
            {
              title: 'Multi-File Firmware Projects',
              desc: 'Support linking headers (.h) and source files (.c) simultaneously.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#060a12] border border-slate-800/80 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Banner */}
      <div className="p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 to-[#090f1d] text-center space-y-4">
        <p className="text-base sm:text-lg italic text-slate-200 font-medium">
          "Because every developer deserves a debugger that actually understands their code."
        </p>
        <button
          onClick={() => navigateToAnalysis()}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-md transition-colors"
        >
          <Terminal className="w-4 h-4" />
          <span>Launch Code Analysis</span>
        </button>
      </div>
    </div>
  );
};
