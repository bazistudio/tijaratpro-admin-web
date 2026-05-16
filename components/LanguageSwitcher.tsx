'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { locales, localeNames, Locale } from '../lib/i18n/config';
import { useTranslation } from '../hooks/useTranslation';

export default function LanguageSwitcher() {
  const { locale } = useTranslation();
  const router = useRouter();

  const handleLanguageChange = (newLocale: Locale) => {
    Cookies.set('NEXT_LOCALE', newLocale, { expires: 365, path: '/' });
    // Force a hard refresh to re-run Server Components and update `dir` in <html>
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value as Locale)}
        className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-transparent dark:text-white"
      >
        {locales.map((l) => (
          <option key={l} value={l} className="text-black">
            {localeNames[l]}
          </option>
        ))}
      </select>
    </div>
  );
}
