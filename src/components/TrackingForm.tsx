import React, { useState, useCallback } from 'react';
import { Search, Loader, Package } from 'lucide-react';
import { TrackingResponse } from '../types/tracking';
import { validateContainerNumber, fetchContainerInfo } from '../utils/tracking'; 

interface TrackingFormProps {
  onResult: (result: TrackingResponse) => void;
}

export const TrackingForm: React.FC<TrackingFormProps> = ({ onResult }) => {
  const [containerNumber, setContainerNumber] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<TrackingResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateContainerNumber(containerNumber);
    if (error) {
      setValidationError(error);
      onResult({
        status: 'error',
        message: error
      });
      return;
    }

    if (isSubmitting) return;

    setValidationError('');
    setIsSubmitting(true);
    setResult(null);

    try {
      const result = await fetchContainerInfo(containerNumber);
      if (result.status === 'success') {
        setResult(result);
        onResult(result);
      } else {
        const errorResult = {
          status: 'error',
          message: result.message
        };
        setResult(errorResult);
        onResult(errorResult);
      }
    } catch (error) {
      console.error('Tracking error:', error);
      const errorResult = {
        status: 'error',
        message: 'Une erreur est survenue lors de la recherche. Veuillez réessayer.'
      };
      onResult(errorResult);
      setResult(errorResult);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="containerNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Numéro de conteneur (11 caractères)
          </label>
          <div className="relative">
            <input
              type="text"
              autoComplete="off"
              id="containerNumber"
              value={containerNumber}
              onChange={(e) => setContainerNumber(e.target.value.toUpperCase())}
              placeholder="Ex: HPCU4368383"
              className={`w-full px-4 py-2 border ${
                validationError ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200`}
              maxLength={11}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-blue-500"
            >
              {isSubmitting ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
          {validationError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationError}</p>
          )}
        </div>
      </form>
      
      {result && (
        <div className="space-y-4">
          <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {result.message}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};