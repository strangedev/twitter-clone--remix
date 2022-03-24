import { json, LoaderFunction } from 'remix';
import { loadNamespace } from '~/i18n/loadResources.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const language = url.searchParams.get("lng")
  const namespace = url.searchParams.get("ns");

  return json(await loadNamespace(language!, namespace!));
};
