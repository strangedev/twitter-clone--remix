import { i18n } from 'i18next';
import { useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import {
  json,
  Links,
  LiveReload, LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useLoaderData,
} from 'remix';
import type { MetaFunction } from "remix";
import { getSupportedLanguage } from '~/i18n/acceptLanguage.server';
import { loadLanguage } from '~/i18n/loadResources.server';
import { createI18n, initI18n } from '~/i18n/i18n';
import { RemixBackend } from './i18n/RemixBackend';
import { GlobalThemeProvider } from './styling/GlobalTheme';
import { GlobalStyle } from './styling/GlobalStyle';

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  const language = getSupportedLanguage(request);

  return json({
    language,
    resource: {
      [ language ]: await loadLanguage(language)
    }
  });
};

export default function App() {
  const { resource, language } = useLoaderData();
  const i18nInstance = useMemo((): i18n => createI18n(RemixBackend), []);

  if (!i18nInstance.isInitialized) {
    initI18n(i18nInstance, language, resource);
  }

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined"
          ? "__STYLES__"
          : null}
      </head>
      <body>
        <GlobalThemeProvider>
          <GlobalStyle />
          <I18nextProvider i18n={i18nInstance}>
            <Outlet />
          </I18nextProvider>
        </GlobalThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
