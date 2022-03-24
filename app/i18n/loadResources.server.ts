import * as fs from 'fs';
import { ResourceKey, ResourceLanguage } from 'i18next';
import path from 'path';
import { EntryType, walk } from 'walk-file-tree';

const loadLanguage = async (language: string): Promise<ResourceLanguage> => {
  const namespaces: ResourceLanguage = {};
  const directory = path.join('/home/nh/tnw/temp--frontend-stack/example--twitter-clone/twitter-clone--remix/app/i18n', 'resources', language);

  for await (const file of walk({ directory, maximumDepth: 1, yields: [ EntryType.files], matches: (pathName) => pathName.endsWith('.json')})) {
    const namespace = path.basename(file, '.json');

    namespaces[namespace] = JSON.parse(await fs.promises.readFile(file, { encoding: 'utf8'}));
  }

  return namespaces;
};

const loadNamespace = async (language: string, namespace: string): Promise<ResourceKey> => {
  const file = path.join('/home/nh/tnw/temp--frontend-stack/example--twitter-clone/twitter-clone--remix/app/i18n', 'resources', language, `${namespace}.json`);

  return JSON.parse(await fs.promises.readFile(file, { encoding: 'utf8'}));
};

export {
  loadLanguage,
  loadNamespace
};
