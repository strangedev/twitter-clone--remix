import i18next, { BackendModule, i18n, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

const defaultLanguage = 'de';
const supportedLanguages = [
  'en',
  'de'
];

const createI18n = (backend: BackendModule): i18n => {
  return i18next.
    createInstance().
    use(backend).
    use(initReactI18next);
};

const initI18n = async (instance: i18n, language?: string, resources?: Resource): Promise<void> => {
  await instance.init({
    fallbackLng: defaultLanguage,
    lng: language,
    ns: [], // Prevents loading of "translation" NS
    resources,
    interpolation: {
      escapeValue: false
    },
    initImmediate: false,
    react: {
      useSuspense: false
    }
  });
}

export {
  createI18n,
  defaultLanguage,
  initI18n,
  supportedLanguages
};
