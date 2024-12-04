import React from 'react';
import { X, RotateCcw, Download } from 'lucide-react';
import { LogEntry } from '../types/logs';

interface LogsViewerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: LogEntry[];
  onClear: () => void;
}

export const LogsViewer: React.FC<LogsViewerProps> = ({ isOpen, onClose, logs, onClear }) => {
  if (!isOpen) return null;

  const handleExport = () => {
    const logsText = logs
      .map(log => `[${log.timestamp.toISOString()}] ${log.type}: ${JSON.stringify(log.data)}`)
      .join('\n');
    
    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold dark:text-white">Logs système</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onClear}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="Effacer les logs"
            >
              <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={handleExport}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="Exporter les logs"
            >
              <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
          {logs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center mt-4">
              Aucun log disponible
            </p>
          ) : (
            <div className="space-y-2">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    log.type === 'error'
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : log.direction === 'outgoing'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : log.direction === 'incoming'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <span className="opacity-75">
                    [{log.timestamp.toLocaleTimeString()}]
                  </span>{' '}
                  {log.direction && (
                    <span className={`text-xs font-medium ${
                      log.direction === 'outgoing' ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      [{log.direction.toUpperCase()}]
                    </span>
                  )}{' '}
                  <span className="font-semibold">{log.type}</span>
                  {log.endpoint && (
                    <span className="text-xs ml-1">({log.endpoint})</span>
                  )}
                  {log.status && (
                    <span className={`text-xs ml-1 ${
                      log.status >= 200 && log.status < 300 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      [{log.status}]
                    </span>
                  )}
                  {log.data && typeof log.data === 'object' && 'type' in log.data && (
                    <span className="text-xs ml-1">({(log.data as any).type})</span>
                  )}:{' '}
                  <span className="break-all">
                    <pre className="whitespace-pre-wrap">
                      {typeof log.data === 'string' 
                        ? log.data 
                        : JSON.stringify(log.data, null, 2)}
                    </pre>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};