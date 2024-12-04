import React from 'react';
import { ContainerInfo as ContainerInfoType } from '../../types/tracking';

interface ContainerInfoProps {
  info: ContainerInfoType;
  onCopy: (text: string) => void;
}

export const ContainerInfo: React.FC<ContainerInfoProps> = ({ info, onCopy }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
      Information du conteneur{' '}
      <span 
        className="cursor-pointer hover:text-blue-500 transition-colors duration-200"
        onClick={() => onCopy(info.containerNumber)}
        title="Cliquez pour copier"
      >
        {info.containerNumber}
      </span>
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Date sortie terminal:</span><br />
          {info.terminalExit}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Date entrée/sortie port:</span><br />
          {info.portDate}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Date de chargement:</span><br />
          {info.loadingDate}
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Connaissement:</span><br />
          <span 
            className="cursor-pointer hover:text-blue-500 transition-colors duration-200"
            onClick={() => onCopy(info.billOfLading)}
            title="Cliquez pour copier"
          >
            {info.billOfLading}
          </span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Statut douane:</span><br />
          <span className="text-green-600 dark:text-green-400 font-medium">
            {info.customsStatus}
          </span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Blocage:</span><br />
          <span className={info.blockageInfo.port === 'Non' ? 'text-green-600' : 'text-red-600'}>
            Capitainerie: {info.blockageInfo.port}
          </span>
          <br />
          <span className={info.blockageInfo.customs === 'Non' ? 'text-green-600' : 'text-red-600'}>
            Douane: {info.blockageInfo.customs}
          </span>
        </p>
      </div>
    </div>
  </div>
);