import React from 'react';

interface SimpaSimulationProps {
  type: string;
  onBack: () => void;
}

export const SimpaSimulation: React.FC<SimpaSimulationProps> = ({ type, onBack }) => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    country: '',
    documents: [] as string[],
    description: '',
    value: ''
  });

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-orange-500 hover:text-orange-600 flex items-center gap-2"
      >
        ← Retour
      </button>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold dark:text-white">
              {type === 'export' ? 'Exportation' :
               type === 'import' ? 'Importation' :
               type === 'transit-export' ? 'Transit Export' : 'Transit Import'}
            </h2>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-3 h-3 rounded-full ${
                    s === step ? 'bg-orange-500' :
                    s < step ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium dark:text-white">Informations Générales</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pays de destination
              </label>
              <select 
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              >
                <option value="">Sélectionnez un pays</option>
                <option value="CM">Cameroun</option>
                <option value="FR">France</option>
                <option value="US">États-Unis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description des marchandises
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
        </div>
        
        {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium dark:text-white">Documents Requis</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 border rounded-md dark:bg-gray-600 dark:border-gray-500">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={formData.documents.includes('invoice')}
                onChange={(e) => {
                  const docs = e.target.checked
                    ? [...formData.documents, 'invoice']
                    : formData.documents.filter(d => d !== 'invoice');
                  setFormData({ ...formData, documents: docs });
                }}
              />
              <span className="text-sm text-gray-700">Facture commerciale</span>
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-md dark:bg-gray-600 dark:border-gray-500">
              <input type="checkbox" className="h-4 w-4" />
              <span className="text-sm text-gray-700">Certificat d'origine</span>
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-md dark:bg-gray-600 dark:border-gray-500">
              <input type="checkbox" className="h-4 w-4" />
              <span className="text-sm text-gray-700">Déclaration en douane</span>
            </div>
          </div>
        </div>
        )}

        {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium dark:text-white">Récapitulatif</h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>Type d'opération:</strong> {type}</p>
            <p><strong>Pays:</strong> {formData.country}</p>
            <p><strong>Description:</strong> {formData.description}</p>
            <p><strong>Documents:</strong> {formData.documents.join(', ')}</p>
          </div>
        </div>
        )}
      
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Précédent
            </button>
          )}
          <button
            onClick={() => step < 3 ? setStep(step + 1) : onBack()}
            className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors ml-auto"
          >
            {step === 3 ? 'Terminer' : 'Continuer'}
          </button>
        </div>
      </div>
    </div>
  );
};