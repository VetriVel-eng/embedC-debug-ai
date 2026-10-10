import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CodeEditor } from '../components/CodeEditor';
import { Play, RotateCcw, Sliders, CheckSquare, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeCode } from '../services/aiService';

export const CodeAnalysisPage: React.FC = () => {
  const {
    code,
    setCode,
    language,
    setLanguage,
    analysisOptions,
    setAnalysisOptions,
    setCurrentResult,
    setCurrentPage,
    showToast,
  } = useApp();

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleOptionToggle = (key: keyof typeof analysisOptions) => {
    setAnalysisOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleClearCode = () => {
    setCode('');
  };

  const handleAnalyzeClick = async () => {
    if (!code.trim()) {
      showToast('Please enter some C or Embedded C code before analyzing.', 'error');
      return;
    }

    setIsAnalyzing(true);

    try {
      // 1. Show a short loading state: "Analyzing your code..."
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 2. Use the existing mock AI analysis service
      const result = await analyzeCode(code, language, analysisOptions);

      // Automatically save the completed analysis to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('embeddebug_history') || '[]');
        const updated = [result, ...existing.filter((h: { id: string }) => h.id !== result.id)];
        localStorage.setItem('embeddebug_history', JSON.stringify(updated));
      } catch {
        // ignore
      }

      // 3 & 4. Pass the analyzed code and results to the Results page and navigate
      setCurrentResult(result);
      setCurrentPage('results');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to analyze the code. Please try again.';
      showToast(msg, 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Find if ptr is in code to visually highlight line 5
  const lines = code.split('\n');
  const errorLineIndex = lines.findIndex((l) => l.includes('ptr') && !l.includes('*ptr') && !l.includes('int ptr'));
  const highlightLine = errorLineIndex !== -1 ? errorLineIndex + 1 : undefined;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Analyze Your Code
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Paste your C or Embedded C code below and let EmbedDebug AI analyze it.
        </p>
      </div>

      {/* Main Code Editor */}
      <div className="space-y-2">
        <CodeEditor
          value={code}
          onChange={setCode}
          language={language}
          onLanguageChange={setLanguage}
          highlightLine={highlightLine}
          highlightToken="ptr"
          minHeight="420px"
        />
        {highlightLine && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Visual hint: Notice the reference to undeclared identifier 'ptr' on line {highlightLine}.</span>
          </div>
        )}
      </div>

      {/* Analysis Options Section */}
      <div className="p-5 rounded-xl border border-slate-800 bg-[#090f1d] space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>Analysis Options</span>
          <span className="text-[11px] text-slate-400 font-normal">
            (Select diagnostic passes)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Option 1 */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-2 rounded-lg bg-[#070b14] border border-slate-800/80 hover:border-slate-700 transition-colors select-none">
            <input
              type="checkbox"
              checked={analysisOptions.checkSyntax}
              onChange={() => handleOptionToggle('checkSyntax')}
              className="accent-cyan-400 rounded cursor-pointer"
            />
            <span className="truncate">Syntax Issues</span>
          </label>

          {/* Option 2 */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-2 rounded-lg bg-[#070b14] border border-slate-800/80 hover:border-slate-700 transition-colors select-none">
            <input
              type="checkbox"
              checked={analysisOptions.checkLogic}
              onChange={() => handleOptionToggle('checkLogic')}
              className="accent-cyan-400 rounded cursor-pointer"
            />
            <span className="truncate">Logic Issues</span>
          </label>

          {/* Option 3 */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-2 rounded-lg bg-[#070b14] border border-slate-800/80 hover:border-slate-700 transition-colors select-none">
            <input
              type="checkbox"
              checked={analysisOptions.checkMemory}
              onChange={() => handleOptionToggle('checkMemory')}
              className="accent-cyan-400 rounded cursor-pointer"
            />
            <span className="truncate">Pointer & Memory</span>
          </label>

          {/* Option 4 */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-2 rounded-lg bg-[#070b14] border border-slate-800/80 hover:border-slate-700 transition-colors select-none">
            <input
              type="checkbox"
              checked={analysisOptions.checkEmbedded}
              onChange={() => handleOptionToggle('checkEmbedded')}
              className="accent-cyan-400 rounded cursor-pointer"
            />
            <span className="truncate">Embedded C / MMIO</span>
          </label>

          {/* Option 5 */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-2 rounded-lg bg-[#070b14] border border-slate-800/80 hover:border-slate-700 transition-colors select-none">
            <input
              type="checkbox"
              checked={analysisOptions.checkQuality}
              onChange={() => handleOptionToggle('checkQuality')}
              className="accent-cyan-400 rounded cursor-pointer"
            />
            <span className="truncate">Code Quality</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          onClick={handleClearCode}
          disabled={isAnalyzing || !code}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Clear Editor</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAnalyzeClick}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-80 disabled:cursor-wait"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Analyzing your code...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
