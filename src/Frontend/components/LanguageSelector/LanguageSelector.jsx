import React, { useState, useEffect } from 'react';
import './LanguageSelector.css';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSelector = ({ onLanguageChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const { texts, changeLanguage} = useLanguage();
  useEffect(() => {
    // Recuperar el idioma guardado en localStorage si existe
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, [currentLanguage]);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    localStorage.setItem('language', lang);
    setCurrentLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };
  return (
    <div className="language-selector">
      <span 
        className={`language-option ${currentLanguage === 'es' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('es')}
        title="Español"
      >
        🇪🇸
      </span>
      <span 
        className={`language-option ${currentLanguage === 'en' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('en')}
        title="English"
      >
        🇺🇸
      </span>
    </div>
  );
};

export default LanguageSelector;