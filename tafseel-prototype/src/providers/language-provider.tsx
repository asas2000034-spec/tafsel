'use client';

import ar from '@/locales/ar.json';
import en from '@/locales/en.json';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Language = 'ar' | 'en';

type Messages = typeof en;

type LanguageContextValue = {
  language: Language;
  dir: 'rtl' | 'ltr';
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  messages: Messages;
};

const dictionaries: Record<Language, Messages> = {
  ar,
  en,
};

function getMessage(dictionary: Messages, key: string): string {
  return key
    .split('.')
    .reduce<unknown>((acc, segment) => {
      if (acc && typeof acc === 'object' && segment in acc) {
        return (acc as Record<string, unknown>)[segment];
      }
      return undefined;
    }, dictionary) as string | undefined ?? key;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(
      'tafseel-language',
    ) as Language | null;
    if (stored === 'ar' || stored === 'en') {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('tafseel-language', language);
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const translate = useCallback(
    (key: string) => getMessage(dictionaries[language], key),
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      dir: language === 'ar' ? 'rtl' : 'ltr',
      toggleLanguage,
      setLanguage,
      t: translate,
      messages: dictionaries[language],
    }),
    [language, toggleLanguage, translate],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage يجب استخدامه داخل LanguageProvider');
  }
  return context;
}
