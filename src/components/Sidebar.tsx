import React, { useState } from 'react';
import { Home, Calculator, Layout, Library } from 'lucide-react';
import { NavigationModal } from './NavigationModal';

interface SidebarProps {
  onNavigate?: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <>
      <div className="w-64 bg-gray-900 text-gray-300 h-screen flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-semibold text-white">Camara</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
            <Home className="w-5 h-5" />
            <span>Accueil</span>
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 text-left"
          >
            <Calculator className="w-5 h-5" />
            <span>Simulateur de coût</span>
          </button>
          <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
            <Layout className="w-5 h-5" />
            <span>Découvrir</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800">
            <Library className="w-5 h-5" />
            <span>Bibliothèque</span>
          </a>
        </nav>
      </div>
      <NavigationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};