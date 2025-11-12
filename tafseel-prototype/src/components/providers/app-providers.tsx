'use client';

import { LanguageProvider } from '@/providers/language-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LanguageProvider>
  );
}
