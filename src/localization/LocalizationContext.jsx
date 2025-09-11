import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from './translations';

// Create context
const LocalizationContext = createContext();

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within LocalizationProvider');
  }
  return context;
};

// Localization Provider component
export const LocalizationProvider = ({ children }) => {
  // Get language from localStorage or default to 'en'
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  // Translation function (like PHP's __() function)
  const t = (key, fallback = key) => {
    const translation = translations[currentLanguage]?.[key] || translations['en']?.[key] || fallback;
    return translation;
  };

  // Change language function
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  // Get available languages
  const getAvailableLanguages = () => {
    return Object.keys(translations);
  };

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    // Also set HTML lang attribute
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const value = {
    currentLanguage,
    changeLanguage,
    t, // This is your translation function
    getAvailableLanguages,
    isRTL: currentLanguage === 'ar' || currentLanguage === 'he', // For RTL languages
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationContext;