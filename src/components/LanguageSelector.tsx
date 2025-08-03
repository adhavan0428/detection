import React from 'react';
import { Globe, Zap } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: 'auto' | 'tamil' | 'hindi' | 'english';
  onLanguageChange: (language: 'auto' | 'tamil' | 'hindi' | 'english') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  const languages = [
    { key: 'auto', label: 'Auto Detect', icon: '🤖', description: 'Automatically detect language' },
    { key: 'tamil', label: 'Tamil', icon: 'த', description: 'Tamil language detection' },
    { key: 'hindi', label: 'Hindi', icon: 'हि', description: 'Hindi language detection' },
    { key: 'english', label: 'English', icon: 'En', description: 'English language detection' }
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <Globe className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Language Selection</h3>
          <p className="text-gray-600 text-sm">Choose your preferred detection mode</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {languages.map(({ key, label, icon, description }) => (
          <button
            key={key}
            onClick={() => onLanguageChange(key)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              selectedLanguage === key
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="text-center space-y-2">
              <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center text-lg font-bold ${
                selectedLanguage === key
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {key === 'auto' ? <Zap className="h-6 w-6" /> : icon}
              </div>
              <div>
                <p className={`font-medium ${
                  selectedLanguage === key ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {label}
                </p>
                <p className={`text-xs ${
                  selectedLanguage === key ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedLanguage !== 'auto' && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Manual mode:</strong> Detection optimized specifically for {
              languages.find(l => l.key === selectedLanguage)?.label
            } language patterns and context.
          </p>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;