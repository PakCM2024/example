import React, { useState, useContext } from 'react';
import { ExternalLink, Calculator } from 'lucide-react';
import { SimpaModal } from './SimpaModal';
import { LanguageContext } from '../contexts/LanguageContext';

export const SimpaButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { translations, language } = useContext(LanguageContext);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 text-xs md:text-sm transition-colors"
      >
        <Calculator className="w-4 h-4" />
        {translations[language].simulatorButton}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6">
            <div className="flex justify-center mb-6">
              <img 
                src="https://simpa.guichetunique.cm/assets/images/simpagif.gif"
                alt="SIMPA Logo"
                className="h-16 w-auto"
              />
            </div>
            
            <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">
              Simulation SIMPA
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              {translations[language].simpaRedirect}
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm"
              >
                {translations[language].cancel}
              </button>
              <a
                href="https://simpa.guichetunique.cm"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1.5 text-sm"
                onClick={() => setIsModalOpen(false)}
              >
                {translations[language].accessSimpa}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};