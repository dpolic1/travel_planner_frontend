import React, { createContext, useContext, useState } from 'react';
import enTranslations from './localization/en.json';
import hrTranslations from './localization/hr.json';

const LocalizationContext = createContext();

export const useLocalization = () => {
  return useContext(LocalizationContext);
};

export const LocalizationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is English

  const translations = {
    en: enTranslations,
    hr: hrTranslations,
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};