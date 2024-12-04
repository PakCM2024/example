import React, { createContext, useContext } from 'react';
import { Language, translations } from '../utils/i18n';

interface LanguageContextType {
  language: Language;
  translations: typeof translations;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  translations,
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);