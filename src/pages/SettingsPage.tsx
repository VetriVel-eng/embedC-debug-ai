import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Language, UserSettings } from '../types';
import { testBackendConnection } from '../services/aiService';
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  Monitor,
  Code2,
  Sliders,
  Bell,
  Cpu,
  RotateCcw,
  Check,
  Server,
  Shield,
  Zap,
  Trash2,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings, showToast, history, clearHistory } = useApp();
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiTestResult, setApiTestResult] = useState<string | null>(null);
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);

  // Keep localSettings in sync with app settings
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleToggle = (key: keyof UserSettings) => {
    const updated = {
      ...localSettings,
      [key]: !localSettings[key],
    };
    setLocalSettings(updated);
    updateSettings({ [key]: updated[key] });
  };

  const handleThemeSelect = (theme: UserSettings['theme']) => {
    setLocalSettings((prev) => ({ ...prev, theme }));
    updateSettings({ theme });
  };

  const handleFontSizeChange = (fontSize: UserSettings['fontSize']) => {
    setLocalSettings((prev) => ({ ...prev, fontSize }));
    updateSettings({ fontSize });
  };

  const handleSaveAll = () => {
    updateSettings(localSettings);
    // Explicitly guarantee all preferences in localStorage
    try {
      localStorage.setItem('embeddebug_settings', JSON.stringify(localSettings));
      localStorage.setItem('embeddebug_theme', localSettings.theme);
      localStorage.setItem('embeddebug_font_size', localSettings.fontSize);
      localStorage.setItem('embeddebug_auto_save_history', String(localSettings.autoSaveHistory !== false));
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    resetSettings();
    setConfirmClearHistory(false);
  };

  const handleClearAllHistory = () => {
    if (history.length === 0) {
      showToast('Analysis history is already empty', 'info');
      return;
    }
    if (!confirmClearHistory) {
      setConfirmClearHistory(true);
      setTimeout(() => setConfirmClearHistory(false), 4500);
      return;
    }
    clearHistory();
    setConfirmClearHistory(false);
  };

  const handleTestBackend = async () => {
    setIsTestingApi(true);
    setApiTestResult(null);
    try {
      const res = await testBackendConnection(localSettings.backendApiUrl);
      setApiTestResult(res.message);
      showToast(res.message, res.success ? 'success' : 'info');
    } catch {
      setApiTestResult('Connection failed. Defaulting to Mock AI Engine.');
      showToast('Connection failed', 'error');
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Customize your editor preferences, AI diagnostics, and backend integration.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Appearance */}
        <div className="rounded-xl border border-slate-800 bg-[#090f1d] p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Sun className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
              Appearance & Theme
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'dark', label: 'Dark Mode', icon: <Moon className="w-4 h-4" /> },
              { id: 'light', label: 'Light Mode', icon: <Sun className="w-4 h-4" /> },
              { id: 'system', label: 'System Default', icon: <Monitor className="w-4 h-4" /> },
            ].map((themeOpt) => {
              const isSelected = localSettings.theme === themeOpt.id;
              return (
                <button
                  key={themeOpt.id}
                  type="button"
                  onClick={() => handleThemeSelect(themeOpt.id as UserSettings['theme'])}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                      : 'bg-[#060a12] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {themeOpt.icon}
                  <span>{themeOpt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Code Editor */}
        <div className="rounded-xl border border-slate-800 bg-[#090f1d] p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
              Code Editor Preferences
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Font Size */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Editor Font Size</label>
              <select
                value={localSettings.fontSize}
                onChange={(e) => handleFontSizeChange(e.target.value as UserSettings['fontSize'])}
                className="w-full p-2 bg-[#060a12] border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="12px">12px (Compact)</option>
                <option value="14px">14px (Standard)</option>
                <option value="16px">16px (Medium)</option>
                <option value="18px">18px (Large)</option>
              </select>
            </div>

            {/* Default Language */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Default Language</label>
              <select
                value={localSettings.defaultLanguage}
                onChange={(e) => {
                  const lang = e.target.value as Language;
                  setLocalSettings((prev) => ({ ...prev, defaultLanguage: lang }));
                  updateSettings({ defaultLanguage: lang });
                }}
                className="w-full p-2 bg-[#060a12] border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="C">C (Standard C99)</option>
                <option value="Embedded C">Embedded C (Bare-Metal)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800/80 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Show Line Numbers</span>
                <span className="text-[11px] text-slate-400">Display left-hand gutter in code editor</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.showLineNumbers}
                onChange={() => handleToggle('showLineNumbers')}
                className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800/80 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Auto-Save Sessions</span>
                <span className="text-[11px] text-slate-400">Preserve editor code in local browser storage</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.autoSave}
                onChange={() => handleToggle('autoSave')}
                className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
              />
            </label>

            {/* Auto-Save Analysis History */}
            <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800/80 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Auto-Save Analysis History</span>
                <span className="text-[11px] text-slate-400">Automatically save completed code analyses to history &amp; localStorage</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.autoSaveHistory !== false}
                onChange={() => handleToggle('autoSaveHistory')}
                className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Section 3: History & Storage Management */}
        <div className="rounded-xl border border-slate-800 bg-[#090f1d] p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Trash2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
              History &amp; Storage Management
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-[#060a12] border border-slate-800/80">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">Clear All Analysis History</span>
              <span className="text-[11px] text-slate-400">
                Permanently erase all saved analyses from localStorage ({history.length} {history.length === 1 ? 'item' : 'items'} currently saved)
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearAllHistory}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer ${
                confirmClearHistory
                  ? 'bg-rose-500 text-white hover:bg-rose-600 border border-rose-600'
                  : 'text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{confirmClearHistory ? 'Confirm Clear All?' : 'Clear All History'}</span>
            </button>
          </div>
        </div>

        {/* Section 4: AI Preferences */}
        <div className="rounded-xl border border-slate-800 bg-[#090f1d] p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
              AI Analysis Preferences
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800/80 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Explain Errors</span>
                <span className="text-[11px] text-slate-400">Provide detailed breakdown of why compiler rejects code</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.explainErrors}
                onChange={() => handleToggle('explainErrors')}
                className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800/80 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Suggest Fixes</span>
                <span className="text-[11px] text-slate-400">Output recommended action and replacement lines</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.suggestFixes}
                onChange={() => handleToggle('suggestFixes')}
                className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800/80 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Provide Improved Code</span>
                <span className="text-[11px] text-slate-400">Synthesize clean side-by-side corrected code snippet</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.provideImprovedCode}
                onChange={() => handleToggle('provideImprovedCode')}
                className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800/80 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Embedded C Focus</span>
                <span className="text-[11px] text-slate-400">Prioritize hardware registers, ISR flags, and MMIO pointers</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.embeddedFocus}
                onChange={() => handleToggle('embeddedFocus')}
                className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Section 5: Notifications */}
        <div className="rounded-xl border border-slate-800 bg-[#090f1d] p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Bell className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
              Notifications
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800/80 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Analysis Complete</span>
                <span className="text-[11px] text-slate-400">Show toast notification upon diagnostics completion</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.analysisCompleteNotification}
                onChange={() => handleToggle('analysisCompleteNotification')}
                className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800/80 cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Learning Reminders</span>
                <span className="text-[11px] text-slate-400">Daily streak notifications to practice embedded concepts</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.learningReminders}
                onChange={() => handleToggle('learningReminders')}
                className="accent-cyan-400 rounded w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Section 6: API & Backend Integration */}
        <div className="rounded-xl border border-slate-800 bg-[#090f1d] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
                API & Backend Integration
              </h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
              Mock AI Engine Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#060a12] border border-slate-800/80">
              <div>
                <span className="font-semibold text-slate-200 block">AI Provider: Backend API</span>
                <span className="text-slate-400 text-[11px]">
                  Configured for Python Proxy &rarr; Nebius Token Factory &rarr; Open-Source Model
                </span>
              </div>
              <span className="text-amber-400 font-mono text-xs">
                Status: Not Connected
              </span>
            </div>

            {/* Architecture Explainer */}
            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Zero-Secret Frontend Architecture</span>
              </div>
              <p>
                As required by security guidelines, API keys (such as Nebius or cloud credentials) are never stored or exposed in client frontend code. All requests flow via the backend proxy.
              </p>
            </div>

            {/* Backend Proxy URL Input */}
            <div className="space-y-1.5 pt-1">
              <label className="text-slate-300 font-medium block">
                Backend Proxy Endpoint URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={localSettings.backendApiUrl}
                  onChange={(e) =>
                    setLocalSettings((prev) => ({ ...prev, backendApiUrl: e.target.value }))
                  }
                  placeholder="http://localhost:8000/api/analyze"
                  className="flex-1 px-3 py-2 bg-[#060a12] border border-slate-700 rounded-lg text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={handleTestBackend}
                  disabled={isTestingApi}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
                >
                  {isTestingApi ? 'Pinging...' : 'Test Connection'}
                </button>
              </div>
              {apiTestResult && (
                <p className="text-[11px] text-cyan-400 font-mono pt-1">
                  &gt; {apiTestResult}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Settings</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

