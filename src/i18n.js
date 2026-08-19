import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import faTranslation from './locales/fa/translation.json';
import enTranslation from './locales/en/translation.json';

// Read saved language from localStorage, default to Persian
let savedLanguage = localStorage.getItem('language');
if (!savedLanguage) {
  savedLanguage = 'fa';
}

i18n.use(initReactI18next).init({
  resources: {
    fa: { translation: faTranslation },
    en: { translation: enTranslation },
  },
  lng: savedLanguage,
  fallbackLng: 'fa',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
