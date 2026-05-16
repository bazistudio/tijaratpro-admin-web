'use client';

import React, { createContext, useState, useEffect } from 'react';
import { Locale, defaultLocale } from '../lib/i18n/config';

interface I18nContextType {
  locale: Locale;
  dictionary: Record<string, any>;
}

export const I18nContext = createContext<I18nContextType>({
  locale: defaultLocale,
  dictionary: {},
});

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [dictionary, setDictionary] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await import(`../locales/${initialLocale}/common.json`);
        setDictionary(dict.default || dict);
      } catch (error) {
        console.error(`Failed to load dictionary for ${initialLocale}`, error);
      }
    };
    
    loadDictionary();
  }, [initialLocale]);

  return (
    <I18nContext.Provider value={{ locale: initialLocale, dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}
