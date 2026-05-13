/* eslint-disable import/named */
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { en, PluralCategory, vi } from "make-plural/plurals";
import { ReactNode, useEffect, useState } from "react";

import { DEFAULT_LOCALE, SupportedLocale } from "@/helpers/locales";

type LocalePlural = {
  [key in SupportedLocale]: (n: number, ordinal?: boolean) => PluralCategory;
};

const plurals: LocalePlural = {
  "en-US": en,
  "vi-VN": vi,
  pseudo: en,
};

export async function dynamicActivate(locale: SupportedLocale) {
  i18n.loadLocaleData(locale, { plurals: plurals[locale] });
  try {
    const catalog = await import(`../locales/${locale}`);

    i18n.load(locale, catalog.messages || catalog.default.messages);
  } catch (e) {
    console.error(`[i18n] Failed to load locale: ${locale}`, e);
  }
  i18n.activate(locale);
}

interface ProviderProps {
  locale: SupportedLocale;
  onActivate?: (locale: SupportedLocale) => void;
  children: ReactNode;
}

export function ExI18nProvider({
  locale,
  onActivate,
  children,
}: ProviderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dynamicActivate(locale)
      .then(() => {
        onActivate?.(locale);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to activate locale", locale, error);
        setLoading(false);
      });
  }, [locale, onActivate]);

  if (loading) {
    return <div></div>;
  }

  if (i18n.locale === undefined && locale === DEFAULT_LOCALE) {
    i18n.loadLocaleData(DEFAULT_LOCALE, {
      plurals: plurals[DEFAULT_LOCALE],
    });
    i18n.load(DEFAULT_LOCALE, {});
    i18n.activate(DEFAULT_LOCALE);
  }

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
