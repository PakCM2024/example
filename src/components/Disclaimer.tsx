import React from 'react';
import { Mail, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DisclaimerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ isOpen, onClose }) => {
  const { translations, language } = useLanguage();

  const handleEmailClick = () => {
    window.location.href = 'mailto:sc@pak.cm';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {translations[language].disclaimer}
            </h2>
          </div>

          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>{translations[language].disclaimerText.intro}</p>
            <p>{translations[language].disclaimerText.warning}</p>
            <p>{translations[language].disclaimerText.contact}</p>

            <button
              onClick={handleEmailClick}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors mt-4"
            >
              <Mail className="w-4 h-4" />
              {translations[language].contactSupport}
            </button>
          </div>

          <div className="mt-8 flex justify-end border-t dark:border-gray-700 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
            >
              {translations[language].understood}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};