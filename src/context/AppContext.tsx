import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AnalysisOptions,
  AnalysisResult,
  Language,
  PageRoute,
  ToastMessage,
  UserProfile,
  UserSettings,
} from '../types';
import { INITIAL_HISTORY, INITIAL_USER_PROFILE } from '../data/mockData';
import { analyzeCode as runAnalyzeCode } from '../services/aiService';

interface AppContextType {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  // Code editor state
  code: string;
  setCode: (code: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  analysisOptions: AnalysisOptions;
  setAnalysisOptions: React.Dispatch<React.SetStateAction<AnalysisOptions>>;
  // Analysis execution
  isAnalyzing: boolean;
  analysisStep: string;
  currentResult: AnalysisResult | null;
  setCurrentResult: (result: AnalysisResult | null) => void;
  performAnalysis: (codeToAnalyze?: string, langToAnalyze?: Language) => Promise<void>;
  // History
  history: AnalysisResult[];
  deleteHistoryItem: (id: string) => void;
  viewHistoryItem: (id: string) => void;
  clearHistory: () => void;
  // Profile
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  // Settings
  settings: UserSettings;
  updateSettings: (updated: Partial<UserSettings>) => void;
  resetSettings: () => void;
  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
  // Navigation helper
  navigateToAnalysis: (presetCode?: string, presetLang?: Language) => void;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'dark',
  fontSize: '14px',
  showLineNumbers: true,
  autoSave: true,
  autoSaveHistory: true,
  defaultLanguage: 'C',
  explainErrors: true,
  suggestFixes: true,
  provideImprovedCode: true,
  embeddedFocus: true,
  analysisCompleteNotification: true,
  learningReminders: false,
  backendApiUrl: 'http://localhost:8000/api/analyze',
};

const DEFAULT_SAMPLE_CODE = `#include <stdio.h>

int main() {
    int a = 10;
    printf("%d", ptr);
    return 0;
}`;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('landing');
  const [code, setCode] = useState<string>(DEFAULT_SAMPLE_CODE);
  const [language, setLanguage] = useState<Language>('C');

  const [analysisOptions, setAnalysisOptions] = useState<AnalysisOptions>({
    checkSyntax: true,
    checkLogic: true,
    checkMemory: true,
    checkEmbedded: true,
    checkQuality: true,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('Analyzing your code...');
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);

  // Load history from localStorage or fallback to INITIAL_HISTORY
  const [history, setHistory] = useState<AnalysisResult[]>(() => {
    try {
      const stored = localStorage.getItem('embeddebug_history');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return INITIAL_HISTORY;
  });

  // Settings
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const stored = localStorage.getItem('embeddebug_settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          autoSaveHistory: parsed.autoSaveHistory !== undefined ? parsed.autoSaveHistory : true,
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  });

  // Profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('embeddebug_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Clear old fake hardcoded mock statistics or old skill tags
        const hasOldSkills = parsed.skills?.some((s: string) =>
          ['STM32 Bare-Metal', 'UART & I2C', 'IoT', 'Microcontrollers'].includes(s)
        );

        if (
          parsed.totalAnalyses === 12 ||
          parsed.totalAnalyses === 13 ||
          parsed.fixedIssues === 9 ||
          parsed.fixedIssues === 10 ||
          parsed.learningStreak === 3 ||
          parsed.issuesDetected === undefined ||
          hasOldSkills
        ) {
          return {
            ...parsed,
            name: parsed.name === 'Vetri Vel' ? 'Demo Developer' : parsed.name,
            avatarInitials: parsed.name === 'Vetri Vel' ? 'D' : parsed.avatarInitials,
            totalAnalyses: 0,
            issuesDetected: 0,
            fixedIssues: 0,
            learningStreak: 0,
            skills: INITIAL_USER_PROFILE.skills,
          };
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_USER_PROFILE;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('embeddebug_history', JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  // Automatically save each completed code analysis to history & localStorage if enabled
  useEffect(() => {
    if (currentResult && settings.autoSaveHistory !== false) {
      setHistory((prev) => {
        const alreadyExists = prev.some((h) => h.id === currentResult.id);
        if (alreadyExists) return prev;
        const updated = [currentResult, ...prev];
        try {
          localStorage.setItem('embeddebug_history', JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    }
  }, [currentResult, settings.autoSaveHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('embeddebug_settings', JSON.stringify(settings));
      localStorage.setItem('embeddebug_theme', settings.theme);
      localStorage.setItem('embeddebug_font_size', settings.fontSize);
      localStorage.setItem('embeddebug_auto_save_history', String(settings.autoSaveHistory !== false));
    } catch {
      // ignore
    }

    // Apply theme to document element
    const isLight =
      settings.theme === 'light' ||
      (settings.theme === 'system' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: light)').matches);

    if (isLight) {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('embeddebug_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const showToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const performAnalysis = async (codeToAnalyze?: string, langToAnalyze?: Language) => {
    const targetCode = codeToAnalyze ?? code;
    const targetLang = langToAnalyze ?? language;

    if (!targetCode.trim()) {
      showToast('Please enter some C or Embedded C code before analyzing.', 'error');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep('Analyzing your code...');

    try {
      // Sequential progress simulation to match the UX specifications:
      // "Analyzing your code..." -> "Checking syntax..." -> "Checking logic..." -> "Checking Embedded C issues..." -> "Preparing suggestions..."
      await new Promise((r) => setTimeout(r, 450));
      setAnalysisStep('Checking syntax...');
      await new Promise((r) => setTimeout(r, 500));
      setAnalysisStep('Checking logic...');
      await new Promise((r) => setTimeout(r, 450));
      setAnalysisStep('Checking Embedded C issues...');
      await new Promise((r) => setTimeout(r, 500));
      setAnalysisStep('Preparing suggestions...');
      await new Promise((r) => setTimeout(r, 400));

      const result = await runAnalyzeCode(targetCode, targetLang, analysisOptions);

      setCurrentResult(result);
      if (settings.autoSaveHistory !== false) {
        setHistory((prev) => [result, ...prev]);
      }

      // Update user stats
      const detectedInRun = result.issuesCount.errors + result.issuesCount.warnings;
      setProfile((prev) => ({
        ...prev,
        totalAnalyses: prev.totalAnalyses + 1,
        issuesDetected: (prev.issuesDetected ?? 0) + detectedInRun,
        fixedIssues: prev.fixedIssues + (result.issuesCount.errors > 0 ? 1 : 0),
        learningStreak: prev.learningStreak === 0 ? 1 : prev.learningStreak,
      }));

      if (settings.analysisCompleteNotification) {
        showToast('Analysis completed successfully!', 'success');
      }

      setCurrentPage('results');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to analyze the code. Please try again.';
      showToast(msg, 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const deleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    showToast('Analysis removed from history', 'info');
  };

  const viewHistoryItem = (id: string) => {
    const found = history.find((h) => h.id === id);
    if (found) {
      setCurrentResult(found);
      setCode(found.originalCode);
      setLanguage(found.language);
      setCurrentPage('results');
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.setItem('embeddebug_history', JSON.stringify([]));
      localStorage.removeItem('embeddebug_history');
    } catch {
      // ignore
    }
    showToast('All analysis history cleared', 'info');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    showToast('Profile updated successfully', 'success');
  };

  const updateSettings = (updated: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
    showToast('Settings saved successfully', 'success');
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    showToast('Settings reset to default', 'info');
  };

  const navigateToAnalysis = (presetCode?: string, presetLang?: Language) => {
    if (presetCode) {
      setCode(presetCode);
    }
    if (presetLang) {
      setLanguage(presetLang);
    }
    setCurrentPage('analyze');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        code,
        setCode,
        language,
        setLanguage,
        analysisOptions,
        setAnalysisOptions,
        isAnalyzing,
        analysisStep,
        currentResult,
        setCurrentResult,
        performAnalysis,
        history,
        deleteHistoryItem,
        viewHistoryItem,
        clearHistory,
        profile,
        updateProfile,
        settings,
        updateSettings,
        resetSettings,
        toasts,
        showToast,
        dismissToast,
        navigateToAnalysis,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
