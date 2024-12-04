import React from 'react';
import { Package } from 'lucide-react';
import { ContainerInfo } from '../../types/tracking';

interface TrackingMessageProps {
  containerInfo: ContainerInfo;
  timestamp: Date;
}

export const TrackingMessage: React.FC<TrackingMessageProps> = ({ containerInfo, timestamp }) => {
  return (
    <div className="flex justify-start mb-4 px-4">
      <div className="flex items-start max-w-[80%] flex-row">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 mr-2">
          <Package className="w-4 h-4 text-white" />
        </div>
        <div className="px-4 py-2 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Conteneur {containerInfo.containerNumber}
            </p>
            <div className="space-y-1 text-sm">
              <p>📅 Terminal: {containerInfo.terminalExit}</p>
              <p>🚢 Port: {containerInfo.portDate}</p>
              <p>📦 Chargement: {containerInfo.loadingDate}</p>
              <p>📄 Connaissement: {containerInfo.billOfLading}</p>
              <p>🛃 Statut douane: {containerInfo.customsStatus}</p>
              <p>⚠️ Blocages:</p>
              <ul className="ml-4">
                <li>Port: {containerInfo.blockageInfo.port}</li>
                <li>Douane: {containerInfo.blockageInfo.customs}</li>
              </ul>
            </div>
          </div>
          <span className="text-xs opacity-75 mt-2 block">
            {timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};