'use client';

import { useContext } from 'react';
import { I18nContext } from '../providers/I18nProvider';

export function useTranslation() {
  const { dictionary, locale } = useContext(I18nContext);

  const t = (key: string) => {
    const value = key.split('.').reduce((obj, k) => obj?.[k], dictionary);
    return value !== undefined ? value : key;
  };

  return { t, locale };
}
