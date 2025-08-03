import { DetectionResult } from '../types';

// Simulate ML model predictions with realistic patterns
const toxicPatterns = [
  // English patterns
  /\b(hate|kill|die|stupid|loser|worthless|ugly|fat|dumb)\b/i,
  /\b(kys|kill yourself|go die)\b/i,
  /\b(f[*u]ck|sh[*i]t|damn|b[*i]tch)\b/i,
  
  // Hindi patterns (transliterated)
  /\b(maro|maar|pagal|bewakoof|gandu|chutiya)\b/i,
  /\b(tere ko|teri ma|bhag ja)\b/i,
  
  // Tamil patterns (transliterated)
  /\b(po|poda|poyi|kelu|kothadimai)\b/i,
  /\b(naaye|paithiyam|pochu)\b/i,
];

const detectLanguage = (text: string): 'tamil' | 'hindi' | 'english' | 'mixed' => {
  const tamilPattern = /[\u0B80-\u0BFF]/;
  const hindiPattern = /[\u0900-\u097F]/;
  const englishPattern = /[a-zA-Z]/;
  
  const hasTamil = tamilPattern.test(text);
  const hasHindi = hindiPattern.test(text);
  const hasEnglish = englishPattern.test(text);
  
  const scriptCount = [hasTamil, hasHindi, hasEnglish].filter(Boolean).length;
  
  if (scriptCount > 1) return 'mixed';
  if (hasTamil) return 'tamil';
  if (hasHindi) return 'hindi';
  return 'english';
};

const categorizeContent = (text: string, isToxic: boolean): string[] => {
  if (!isToxic) return ['Safe Content'];
  
  const categories = [];
  
  if (/\b(hate|racist|discrimination)\b/i.test(text)) {
    categories.push('Hate Speech');
  }
  if (/\b(kill|die|suicide|harm)\b/i.test(text)) {
    categories.push('Threats/Violence');
  }
  if (/\b(stupid|dumb|loser|worthless)\b/i.test(text)) {
    categories.push('Personal Attack');
  }
  if (/\b(ugly|fat|skinny|appearance)\b/i.test(text)) {
    categories.push('Body Shaming');
  }
  if (/\b(f[*u]ck|sh[*i]t|b[*i]tch)\b/i.test(text)) {
    categories.push('Profanity');
  }
  
  return categories.length > 0 ? categories : ['General Toxicity'];
};

export const analyzeText = async (
  text: string, 
  languageHint: 'auto' | 'tamil' | 'hindi' | 'english' = 'auto'
): Promise<DetectionResult> => {
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const detectedLanguage = languageHint === 'auto' ? detectLanguage(text) : languageHint;
  
  // Check for toxic patterns
  let isToxic = false;
  let confidence = 0.5;
  
  for (const pattern of toxicPatterns) {
    if (pattern.test(text)) {
      isToxic = true;
      confidence = Math.min(0.95, confidence + 0.2 + Math.random() * 0.1);
    }
  }
  
  // Add some randomness for non-matching patterns
  if (!isToxic) {
    // Small chance of false positive for demonstration
    if (Math.random() < 0.05) {
      isToxic = true;
      confidence = 0.5 + Math.random() * 0.2;
    } else {
      confidence = 0.8 + Math.random() * 0.15;
    }
  }
  
  // Adjust confidence based on text length and clarity
  if (text.length < 10) {
    confidence *= 0.8;
  } else if (text.length > 100) {
    confidence *= 1.1;
  }
  
  confidence = Math.min(0.99, Math.max(0.51, confidence));
  
  const categories = categorizeContent(text, isToxic);
  
  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    text,
    language: detectedLanguage,
    isToxic,
    confidence,
    timestamp: new Date(),
    categories
  };
};