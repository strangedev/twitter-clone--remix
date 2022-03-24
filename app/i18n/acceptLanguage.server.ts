import Accept from '@hapi/accept';
import { defaultLanguage, supportedLanguages } from './i18n';

const getSupportedLanguage = (request: Request) => Accept.language(request.headers.get('accept-language') ?? defaultLanguage, supportedLanguages);

export {
  getSupportedLanguage
};
