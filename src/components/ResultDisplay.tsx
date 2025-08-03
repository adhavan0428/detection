import React, { useState } from 'react';
import { DetectionResult } from '../types';
import { AlertTriangle, CheckCircle, Brain, Clock, Languages, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ResultDisplayProps {
  result: DetectionResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(result.feedback || null);

  const handleFeedback = (type: 'correct' | 'incorrect') => {
    setFeedback(type);
    // In a real app, this would send feedback to the server
    console.log(`Feedback: ${type} for result ${result.id}`);
  };

  const getLanguageDisplay = (lang: string) => {
    const langMap = {
      tamil: '🇮🇳 Tamil',
      hindi: '🇮🇳 Hindi', 
      english: '🇺🇸 English',
      mixed: '🌐 Mixed'
    };
    return langMap[lang as keyof typeof langMap] || lang;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className={`px-6 py-4 ${result.isToxic ? 'bg-red-50 border-b border-red-100' : 'bg-green-50 border-b border-green-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {result.isToxic ? (
              <AlertTriangle className="h-6 w-6 text-red-600" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-600" />
            )}
            <div>
              <h3 className={`text-lg font-semibold ${result.isToxic ? 'text-red-900' : 'text-green-900'}`}>
                {result.isToxic ? 'Toxic Content Detected' : 'Content is Clean'}
              </h3>
              <p className={`text-sm ${result.isToxic ? 'text-red-700' : 'text-green-700'}`}>
                {result.isToxic 
                  ? 'This content may contain cyberbullying or harmful language'
                  : 'No harmful content detected in this text'
                }
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
            {(result.confidence * 100).toFixed(1)}% confident
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Analyzed Text */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Analyzed Text:</h4>
          <p className="text-gray-900 leading-relaxed">{result.text}</p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Languages className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Language</p>
              <p className="text-sm text-blue-700">{getLanguageDisplay(result.language)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <Brain className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-purple-900">Model Confidence</p>
              <p className="text-sm text-purple-700">{(result.confidence * 100).toFixed(1)}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Processed</p>
              <p className="text-sm text-gray-700">
                {new Date(result.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        {result.categories.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Detected Categories:</h4>
            <div className="flex flex-wrap gap-2">
              {result.categories.map((category, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.isToxic 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Section */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Was this analysis helpful?</h4>
          <div className="flex space-x-3">
            <button
              onClick={() => handleFeedback('correct')}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                feedback === 'correct'
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-800'
              } border`}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Correct</span>
            </button>
            <button
              onClick={() => handleFeedback('incorrect')}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                feedback === 'incorrect'
                  ? 'bg-red-100 text-red-800 border-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-800'
              } border`}
            >
              <ThumbsDown className="h-4 w-4" />
              <span>Incorrect</span>
            </button>
          </div>
          {feedback && (
            <p className="text-sm text-gray-600 mt-2">
              Thank you for your feedback! This helps improve our detection system.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;