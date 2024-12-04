import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface KnowledgeBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ isOpen, onClose }) => {
  const { translations, language } = useLanguage();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold dark:text-white">{translations[language].knowledgeBase}</h2>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          {translations[language].knowledgeBaseRedirect}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleClose}
            className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm"
          >
            {translations[language].cancel}
          </button>
          <a
            href="https://app.vectorshift.ai/search/deployed/674f487a16ec3367af681d6a?conversation=674f4a3716ec3367af681d71"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1.5 text-sm"
            onClick={handleClose}
          >
            {translations[language].accessKnowledgeBase}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};