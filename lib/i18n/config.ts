export const locales = ['en', 'ur', 'ps', 'ar'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ur: 'rtl',
  ps: 'rtl',
  ar: 'rtl',
};

// Friendly names for the language switcher
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ur: 'اردو', // Urdu
  ps: 'پښتو', // Pashto
  ar: 'العربية', // Arabic
};
