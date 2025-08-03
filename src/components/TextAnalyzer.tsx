import React, { useState } from 'react';
import { Send, Loader2, Type } from 'lucide-react';

interface TextAnalyzerProps {
  onAnalyze: (text: string) => void;
}

const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ onAnalyze }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isAnalyzing) {
      setIsAnalyzing(true);
      
      // Simulate API delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      onAnalyze(text.trim());
      setIsAnalyzing(false);
    }
  };

  const exampleTexts = [
    "You are so stupid and worthless",
    "आप बहुत अच्छे व्यक्ति हैं",
    "நீங்கள் மிகவும் நல்லவர்",
    "I hate you so much, go kill yourself",
    "Great job on your presentation!"
  ];

  const handleExampleClick = (example: string) => {
    setText(example);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <Type className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Text Analysis</h2>
          <p className="text-gray-600 text-sm">Enter text to detect potential cyberbullying content</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text in Tamil, Hindi, or English..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
            disabled={isAnalyzing}
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-400">
            {text.length}/1000
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-600">
            Supports multilingual content detection
          </div>
          <button
            type="submit"
            disabled={!text.trim() || isAnalyzing}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Analyze Text</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Example Texts */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Try these examples:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {exampleTexts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 text-sm"
              disabled={isAnalyzing}
            >
              <span className="text-gray-700 line-clamp-2">{example}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextAnalyzer;