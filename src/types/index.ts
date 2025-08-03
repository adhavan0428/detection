export interface DetectionResult {
  id: string;
  text: string;
  language: 'tamil' | 'hindi' | 'english' | 'mixed';
  isToxic: boolean;
  confidence: number;
  timestamp: Date;
  categories: string[];
  feedback?: 'correct' | 'incorrect';
}

export interface LanguageStats {
  tamil: number;
  hindi: number;
  english: number;
  mixed: number;
}

export interface AdminStats {
  totalAnalyzed: number;
  toxicDetected: number;
  cleanMessages: number;
  languageBreakdown: LanguageStats;
  avgConfidence: number;
}