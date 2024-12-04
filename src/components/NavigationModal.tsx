import React from 'react';
import { X } from 'lucide-react';
import { SimpaModal } from './SimpaModal';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationModal: React.FC<NavigationModalProps> = ({ isOpen, onClose }) => {
  const [isSimpaOpen, setIsSimpaOpen] = React.useState(false);

  if (!isOpen) return null;

  const handleSimpaClick = () => {
    setIsSimpaOpen(true);
  };

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">Navigation Simulation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <button
              onClick={handleSimpaClick}
              className="w-full text-left p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <h3 className="text-lg font-medium dark:text-white">Simulation SIMPA</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Accédez à la simulation des procédures administratives
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <SimpaModal 
      isOpen={isSimpaOpen}
      onClose={() => setIsSimpaOpen(false)}
    />
    </>
  );
};