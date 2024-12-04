import React, { useState, useContext } from 'react';
import { X, AlertTriangle, Loader, CheckCircle } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';
import { submitReport } from '../utils/api';

interface ReportingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportingForm: React.FC<ReportingFormProps> = ({ isOpen, onClose }) => {
  const { translations, language } = useContext(LanguageContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    description: '',
    isAnonymous: false,
    contactInfo: '',
    location: '',
    peopleInvolved: '',
    evidenceDescription: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitReport({
        ...formData,
        timestamp: new Date().toISOString(),
      });

      setSubmitStatus({
        success: result.success,
        message: result.message
      });

      if (result.success) {
        // Reset form data on successful submission
        setFormData({
          date: new Date().toISOString().split('T')[0],
          type: '',
          description: '',
          isAnonymous: false,
          contactInfo: '',
          location: '',
          peopleInvolved: '',
          evidenceDescription: '',
        });
        setTimeout(onClose, 2000);
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h2 className="text-lg font-semibold dark:text-white">{translations[language].reportForm.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {translations[language].reportForm.date}
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {translations[language].reportForm.type}
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">{translations[language].selectType}</option>
                {Object.entries(translations[language].reportTypes).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {translations[language].reportForm.description}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              rows={4}
              required
              placeholder="Décrivez en détail la situation (faits, contexte, impact)..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {translations[language].reportForm.location}
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Ex: Bureau, département, service..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {translations[language].reportForm.peopleInvolved}
            </label>
            <textarea
              value={formData.peopleInvolved}
              onChange={(e) => setFormData({ ...formData, peopleInvolved: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              rows={2}
              placeholder="Services, départements ou acteurs concernés..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description des preuves
            </label>
            <textarea
              value={formData.evidenceDescription}
              onChange={(e) => setFormData({ ...formData, evidenceDescription: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              rows={2}
              placeholder="Décrivez les preuves dont vous disposez..."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300">
                {translations[language].reportForm.anonymous}
              </label>
            </div>

            {!formData.isAnonymous && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {translations[language].reportForm.contactInfo}
                </label>
                <input
                  type="text"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Email ou numéro de téléphone"
                />
              </div>
            )}
          </div>
        </form>

        <div className="flex items-center justify-between gap-3 p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {submitStatus && (
            <div className={`flex items-center gap-2 ${
              submitStatus.success ? 'text-green-600' : 'text-red-600'
            }`}>
              {submitStatus.success ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
              <span className="text-sm">{submitStatus.message}</span>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ml-auto"
          >
            {translations[language].cancel}
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              translations[language].reportForm.submit
            )}
          </button>
        </div>
      </div>
    </div>
  );
};