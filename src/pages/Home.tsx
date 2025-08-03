import React, { useState } from 'react';
import TextAnalyzer from '../components/TextAnalyzer';
import ResultDisplay from '../components/ResultDisplay';
import LanguageSelector from '../components/LanguageSelector';
import { DetectionResult } from '../types';
import { analyzeText } from '../utils/mlModel';

interface HomeProps {
  onDetectionResult: (result: DetectionResult) => void;
}

const Home: React.FC<HomeProps> = ({ onDetectionResult }) => {
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'auto' | 'tamil' | 'hindi' | 'english'>('auto');

  const handleAnalyze = async (text: string) => {
    const result = await analyzeText(text, selectedLanguage);
    setCurrentResult(result);
    onDetectionResult(result);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          <span>AI-Powered Detection</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Multilingual <span className="text-blue-600">Cyberbullying</span> Detection
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Advanced AI system supporting Tamil, Hindi, and English to identify and prevent online harassment
        </p>
      </div>

      {/* Language Selector */}
      <LanguageSelector 
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      {/* Text Analyzer */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8">
          <TextAnalyzer onAnalyze={handleAnalyze} />
        </div>
      </div>

      {/* Results */}
      {currentResult && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <ResultDisplay result={currentResult} />
        </div>
      )}

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-16">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">த</span>
          </div>
          <h3 ClassName="text-lg font-semibold text-gray-900 mb-2">Tamil Support</h3>
          <p className="text-gray-600">Advanced detection for Tamil text including mixed-language content</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">हि</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Hindi Support</h3>
          <p className="text-gray-600">Comprehensive analysis for Devanagari script and Hinglish content</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">En</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">English Support</h3>
          <p className="text-gray-600">State-of-the-art detection for English cyberbullying patterns</p>
        </div>
      </div>
    </div>
  );
};

export default Home;