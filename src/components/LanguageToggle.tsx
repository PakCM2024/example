import React from 'react';
import { Language } from '../utils/i18n';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      <button
        onClick={() => onToggle('fr')}
        className={`px-2 py-1 rounded ${
          currentLang === 'fr' 
            ? 'bg-blue-500 text-white' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => onToggle('en')}
        className={`px-2 py-1 rounded ${
          currentLang === 'en' 
            ? 'bg-blue-500 text-white' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        EN
      </button>
    </div>
  );
};