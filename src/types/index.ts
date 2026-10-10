export type Language = 'C' | 'Embedded C';

export type IssueSeverity = 'error' | 'warning' | 'suggestion';

export interface AnalysisIssue {
  id: string;
  type: string;
  severity: IssueSeverity;
  line: number;
  message: string;
  cause: string;
  suggestion: string;
  codeSnippet?: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  name: string;
  language: Language;
  summary: string;
  status: 'error' | 'warning' | 'clean';
  issuesCount: {
    errors: number;
    warnings: number;
    suggestions: number;
  };
  issues: AnalysisIssue[];
  originalCode: string;
  improvedCode: string;
  diffExplanation: string;
  tip?: string;
}

export interface AnalysisOptions {
  checkSyntax: boolean;
  checkLogic: boolean;
  checkMemory: boolean;
  checkEmbedded: boolean;
  checkQuality: boolean;
}

export interface UserSettings {
  theme: 'dark' | 'light' | 'system';
  fontSize: '12px' | '14px' | '16px' | '18px';
  showLineNumbers: boolean;
  autoSave: boolean;
  autoSaveHistory: boolean;
  defaultLanguage: Language;
  explainErrors: boolean;
  suggestFixes: boolean;
  provideImprovedCode: boolean;
  embeddedFocus: boolean;
  analysisCompleteNotification: boolean;
  learningReminders: boolean;
  backendApiUrl: string;
}

export interface UserProfile {
  name: string;
  role: string;
  bio: string;
  avatarInitials: string;
  totalAnalyses: number;
  issuesDetected: number;
  fixedIssues: number;
  learningStreak: number;
  skills: string[];
  achievements: {
    id: string;
    title: string;
    description: string;
    date: string;
    unlocked: boolean;
    icon: string;
  }[];
}

export interface LearningResource {
  id: string;
  title: string;
  category: 'C Programming' | 'Embedded C' | 'Debugging' | 'Hardware Protocols' | 'Microcontrollers';
  shortDesc: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  readTime: string;
  overview: string;
  codeExample: string;
  commonPitfalls: string[];
  bestPractices: string[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error' | 'warning';
  message: string;
}

export type PageRoute =
  | 'landing'
  | 'dashboard'
  | 'analyze'
  | 'results'
  | 'improved'
  | 'history'
  | 'learning'
  | 'profile'
  | 'settings'
  | 'about';
