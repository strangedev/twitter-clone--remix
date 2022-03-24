import axios from 'axios';
import { BackendModule } from 'i18next';

const RemixBackend: BackendModule = {
  type: 'backend',
  init: () => {},
  read: (language, namespace, callback) => {
    axios.get(`/i18n?lng=${language}&ns=${namespace}`).
      then(response => callback(null, response.data)).
      catch(ex => callback(ex, null));
  },
  save: (language, namespace, data) => {
    // Intentionally left blank.
  },

  create: (languages, namespace, key, fallbackValue) => {
    // Intentionally left blank.
  }
};

export {
  RemixBackend
};
