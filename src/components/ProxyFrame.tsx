import React, { useState } from 'react';
import { X, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';
import { ProxyFrame } from './ProxyFrame';

interface BrowserWindowProps {
  isOpen: boolean;
  onClose: () => void;
  initialUrl: string;
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({ isOpen, onClose, initialUrl }) => {
  const [url, setUrl] = useState(initialUrl);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const handleNavigate = (newUrl: string) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newUrl);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setUrl(newUrl);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUrl(history[currentIndex - 1]);
    }
  };

  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUrl(history[currentIndex + 1]);
    }
  };

  const handleRefresh = () => {
    setUrl(url); // This will trigger a reload of the ProxyFrame
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 transition-transform duration-200">
        {/* Browser Chrome */}
        <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors"
                onClick={onClose}
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-2">
              <img 
                src="https://simpa.guichetunique.cm/assets/images/logo-SimPa.png"
                alt="SIMPA Logo"
                className="h-6 w-auto"
              <img 
                src="https://simpa.guichetunique.cm/assets/images/logo-SimPa.png"
                alt="SIMPA Logo"
                className="h-6 w-auto"
              />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Simulation</span>
            </div>
            <div className="w-16" /> {/* Spacer for alignment */}
          </div>
          
          {/* Navigation Bar */}
          <div className="flex items-center px-4 py-3 space-x-4">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleForward}
              disabled={currentIndex === history.length - 1}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 flex items-center shadow-sm">
              <div className="w-4 h-4 mr-2">
                <img 
                  src="https://simpa.guichetunique.cm/favicon.ico"
                  alt=""
                  className="w-full h-full rounded"
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{url}</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-800">
          <ProxyFrame url={url} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};