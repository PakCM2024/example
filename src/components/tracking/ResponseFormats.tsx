import React from 'react';
import { Package, AlertCircle } from 'lucide-react';

interface ResponseFormatsProps {
  response: any;
  format: 'raw' | 'parsed' | 'structured';
}

export const ResponseFormats: React.FC<ResponseFormatsProps> = ({ response, format }) => {
  if (!response) return null;

  const renderRawFormat = () => (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );

  const renderParsedFormat = () => {
    if (Array.isArray(response) && response.length > 0 && response[0].body) {
      const cleanBody = response[0].body
        .replace(/^"|"$/g, '')  // Remove surrounding quotes
        .replace(/\\"/g, '"')   // Fix escaped quotes
        .replace(/\\n/g, '\n'); // Fix newlines

      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {cleanBody}
          </p>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Status: {response[0].status}
          </div>
        </div>
      );
    }
    return <div className="text-red-500">Format invalide</div>;
  };

  const renderStructuredFormat = () => {
    if (!Array.isArray(response) || !response[0]?.body) {
      return <div className="text-red-500">Format invalide</div>;
    }

    try {
      const data = JSON.parse(response[0].body);
      return (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Information Conteneur
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {key}
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-100">
                    {String(value)}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } catch (error) {
      return (
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-5 h-5" />
          <span>Erreur de parsing JSON</span>
        </div>
      );
    }
  };

  switch (format) {
    case 'raw':
      return renderRawFormat();
    case 'parsed':
      return renderParsedFormat();
    case 'structured':
      return renderStructuredFormat();
    default:
      return null;
  }
};