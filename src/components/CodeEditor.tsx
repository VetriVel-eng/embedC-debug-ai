import React, { useRef } from 'react';
import { Language } from '../types';
import { useApp } from '../context/AppContext';
import { CODE_PRESETS } from '../data/mockData';
import { Copy, Trash2, Code, ChevronDown, Check } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  highlightLine?: number;
  highlightToken?: string;
  readOnly?: boolean;
  minHeight?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  onLanguageChange,
  highlightLine,
  highlightToken = 'ptr',
  readOnly = false,
  minHeight = '360px',
}) => {
  const { showToast, settings } = useApp();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = React.useState(false);

  const lines = value.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      showToast('Code copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy code', 'error');
    }
  };

  const handleClear = () => {
    onChange('');
    showToast('Editor cleared', 'info');
  };

  const handlePresetSelect = (presetId: string) => {
    const found = CODE_PRESETS.find((p) => p.id === presetId);
    if (found) {
      onChange(found.code);
      onLanguageChange(found.language);
      showToast(`Loaded ${found.title}`, 'info');
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#090f1d] overflow-hidden flex flex-col shadow-2xl">
      {/* Editor Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-800/90 bg-[#0c1427]">
        {/* Left: Language selector & file indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="h-4 w-[1px] bg-slate-800" />

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-[#080d1a] border border-slate-700/60 rounded-md px-2.5 py-1 text-xs">
            <Code className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
              aria-label="Select Programming Language"
            >
              <option value="C" className="bg-[#0b1329] text-slate-200">
                C (Standard ANSI/C99)
              </option>
              <option value="Embedded C" className="bg-[#0b1329] text-slate-200">
                Embedded C (Bare-Metal / MCU)
              </option>
            </select>
          </div>

          {/* Quick preset loader */}
          {!readOnly && (
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-[11px] text-slate-400">Presets:</span>
              <div className="relative">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handlePresetSelect(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                  className="bg-[#080d1a] border border-slate-800 rounded text-slate-300 text-xs px-2 py-1 pr-6 cursor-pointer focus:outline-none hover:border-slate-700 appearance-none"
                  aria-label="Load Sample Template"
                >
                  <option value="" disabled>
                    Load template...
                  </option>
                  {CODE_PRESETS.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#0b1329] text-slate-200">
                      {p.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {!readOnly && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
              title="Clear editor"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded transition-colors"
            title="Copy code to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div
        className="relative flex overflow-x-auto font-mono text-xs sm:text-sm bg-[#070b14]"
        style={{ minHeight, fontSize: settings.fontSize || '14px' }}
      >
        {/* Line Numbers column */}
        {settings.showLineNumbers && (
          <div
            className="select-none py-3 px-3 text-right text-slate-400 bg-[#080d1a] border-r border-slate-800/80 shrink-0 font-mono"
            style={{ width: '44px' }}
          >
            {lines.map((_, idx) => {
              const lineNum = idx + 1;
              const isTargetLine = highlightLine === lineNum;
              return (
                <div
                  key={lineNum}
                  className={`leading-6 h-6 tabular-nums ${
                    isTargetLine ? 'text-rose-400 font-bold bg-rose-500/20 -mx-3 px-3 rounded-l' : ''
                  }`}
                >
                  {lineNum}
                </div>
              );
            })}
          </div>
        )}

        {/* Text Area & Visual Overlay */}
        <div className="relative flex-1 min-w-[500px]">
          {/* Active Highlight Line background row */}
          {highlightLine && (
            <div
              className="absolute left-0 right-0 pointer-events-none bg-rose-500/10 border-l-2 border-rose-500"
              style={{
                top: `${(highlightLine - 1) * 24 + 12}px`,
                height: '24px',
              }}
            />
          )}

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
            spellCheck={false}
            className="w-full h-full min-h-[360px] p-3 font-mono leading-6 bg-transparent text-slate-200 resize-none focus:outline-none selection:bg-cyan-500/30 whitespace-pre"
            placeholder="// Paste or write your C or Embedded C code here..."
            style={{ tabSize: 4 }}
          />
        </div>
      </div>

      {/* Editor Footer Status */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800/80 bg-[#080d19] text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span>{lines.length} lines</span>
          <span>{value.length} characters</span>
          {highlightLine && (
            <span className="text-rose-400 font-medium">Issue highlighted on line {highlightLine}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Target:</span>
          <span className="text-cyan-400 font-semibold">{language}</span>
        </div>
      </div>
    </div>
  );
};
