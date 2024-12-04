import React from 'react';
import { Plane, Ship, Bus, Truck } from 'lucide-react';
import { BrowserWindow } from './BrowserWindow';

interface SimpaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SimulationOption {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const SimpaModal: React.FC<SimpaModalProps> = ({ isOpen, onClose }) => {
  const [showBrowser, setShowBrowser] = React.useState(false);

  const simulationOptions: SimulationOption[] = [
    {
      id: 'export',
      title: 'EXPORTATION',
      icon: <Plane className="w-8 h-8 text-orange-500" />,
      description: 'Procédures pour exporter des marchandises'
    },
    {
      id: 'import',
      title: 'IMPORTATION',
      icon: <Ship className="w-8 h-8 text-orange-500" />,
      description: 'Procédures pour importer des marchandises'
    },
    {
      id: 'transit-export',
      title: 'TRANSIT EXPORT',
      icon: <Bus className="w-8 h-8 text-orange-500" />,
      description: 'Transit pour l\'exportation'
    },
    {
      id: 'transit-import',
      title: 'TRANSIT IMPORT',
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      description: 'Transit pour l\'importation'
    }
  ];

  const handleOptionSelect = () => {
    setShowBrowser(true);
  };

  return (
    <>
      {showBrowser ? (
        <BrowserWindow
          isOpen={showBrowser}
          onClose={() => {
            setShowBrowser(false);
            onClose();
          }}
          initialUrl="https://simpa.guichetunique.cm/init-simulation"
        />
      ) : isOpen ? (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img 
                  src="https://simpa.guichetunique.cm/assets/images/logo-SimPa.png"
                  alt="SimPA Logo"
                  className="h-10 w-auto"
                />
                <h2 className="text-xl font-semibold dark:text-white">Simulation SIMPA</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {simulationOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={handleOptionSelect}
                    className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 transition-all hover:shadow-md"
                  >
                    <div className="flex flex-col items-center gap-4">
                      {option.icon}
                      <div className="text-center">
                        <h3 className="text-lg font-semibold dark:text-white mb-2">{option.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{option.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};