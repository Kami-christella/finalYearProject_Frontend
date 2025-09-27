import React, { useState } from 'react';
import { useLocalization } from '../localization/LocalizationContext';
import './styles/LanguageSwitcher.css';

const SimpleLanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLocalization();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    // { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
  };

  return (
    <div className="language-switcher">
      {/* Language Button/Icon */}
      <button className="language-button">
        <span className="language-globe">🌐</span>
        {/* <span className="language-flag">{currentLang.flag}</span> */}
        <span className="language-name">{currentLang.name}</span>
        <span className="dropdown-arrow">▼</span>
      </button>

      {/* Dropdown Menu */}
      <div className="language-dropdown">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
          >
            <span className="language-flag">{lang.flag}</span>
            <span className="language-name">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimpleLanguageSwitcher;