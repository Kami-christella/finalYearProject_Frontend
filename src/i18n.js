

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    
    // Critical: This makes en-US use en translations
    load: 'languageOnly',
    
    interpolation: {
      escapeValue: false,
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    // Add these to help with language detection
    supportedLngs: ['en', 'fr'],
    nonExplicitSupportedLngs: true,
    
    // Add fallback for missing keys
    returnEmptyString: false,
    returnNull: false,
    returnObjects: false,
  });

export default i18n;