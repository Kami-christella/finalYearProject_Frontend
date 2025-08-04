// // import React from 'react';
// // import { useTranslation } from 'react-i18next';
// // import './styles/LanguageSwitcher.css';

// // const LanguageSwitcher = () => {
// //   const { i18n } = useTranslation();

// //   const languages = [
// //     // { code: 'en', name: 'English', flag: '🇺🇸' },
// //     // { code: 'fr', name: 'Français', flag: '🇫🇷' },
// //       { code: 'en', name: 'English'},
// //      { code: 'fr', name: 'Français'},
// //   ];

// //   const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

// //   const changeLanguage = (languageCode) => {
// //     // Force the exact language code
// //     i18n.changeLanguage(languageCode);
// //     // Clear any existing language detection cache
// //     localStorage.removeItem('i18nextLng');
// //     localStorage.setItem('i18nextLng', languageCode);
// //     // Force reload
// //     window.location.reload();
// //   };

// //   return (
// //     <div className="language-switcher">
// //       <div className="language-dropdown">
// //         <button className="language-button" aria-label="Select Language">
// //           <span className="flag">{currentLanguage.flag}</span>
// //           <span className="language-name">{currentLanguage.name}</span>
// //           <span className="dropdown-arrow">▼</span>
// //         </button>
        
// //         <div className="language-dropdown-content">
// //           {languages.map((language) => (
// //             <button
// //               key={language.code}
// //               className={`language-option ${i18n.language === language.code ? 'active' : ''}`}
// //               onClick={() => changeLanguage(language.code)}
// //               aria-label={`Switch to ${language.name}`}
// //             >
// //               <span className="flag">{language.flag}</span>
// //               <span className="language-name">{language.name}</span>
// //               {i18n.language === language.code && (
// //                 <span className="checkmark">✓</span>
// //               )}
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LanguageSwitcher;


// import React from 'react';
// import { useLocalization } from '../localization/LocalizationContext';

// const SimpleLanguageSwitcher = () => {
//   const { currentLanguage, changeLanguage } = useLocalization();

//   const languages = [
//     { code: 'en', name: 'English', flag: '🇺🇸' },
//     { code: 'fr', name: 'Français', flag: '🇫🇷' },
//     { code: 'es', name: 'Español', flag: '🇪🇸' },
//   ];

//   return (
//     <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//       {languages.map((lang) => (
//         <button
//           key={lang.code}
//           onClick={() => changeLanguage(lang.code)}
//           style={{
//             padding: '5px 10px',
//             border: currentLanguage === lang.code ? '2px solid #007bff' : '1px solid #ccc',
//             borderRadius: '5px',
//             background: currentLanguage === lang.code ? '#007bff' : 'white',
//             color: currentLanguage === lang.code ? 'white' : 'black',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '5px'
//           }}
//         >
//           <span>{lang.flag}</span>
//           <span>{lang.name}</span>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default SimpleLanguageSwitcher;

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