import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en';

i18n.use(LanguageDetector).init({
    resources: {
        en,
    },
    fallbackLng: 'en',
});

export default i18n;
