'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Locale = 'en' | 'fr';
export type Theme = 'dark' | 'light';
type Preferences = {
  locale: Locale;
  theme: Theme;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
};
const PreferencesContext = createContext<Preferences | null>(null);

function remember(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Preferences still work when storage is unavailable. */ }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  // The first client render matches the English, dark server output.
  const [locale, updateLocale] = useState<Locale>('en');
  const [theme, updateTheme] = useState<Theme>('dark');
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let savedLocale: Locale = 'en';
      let savedTheme: Theme = 'dark';
      try {
        if (localStorage.getItem('evolution-locale') === 'fr') savedLocale = 'fr';
        if (localStorage.getItem('evolution-theme') === 'light') savedTheme = 'light';
      } catch { /* Keep the defaults without blocking the experience. */ }
      updateLocale(savedLocale);
      updateTheme(savedTheme);
      document.documentElement.lang = savedLocale;
      document.documentElement.dataset.theme = savedTheme;
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const setLocale = useCallback((value: Locale) => {
    updateLocale(value);
    document.documentElement.lang = value;
    remember('evolution-locale', value);
  }, []);
  const setTheme = useCallback((value: Theme) => {
    updateTheme(value);
    document.documentElement.dataset.theme = value;
    remember('evolution-theme', value);
  }, []);
  const preferences = useMemo(() => ({ locale, theme, setLocale, setTheme }), [locale, theme, setLocale, setTheme]);
  return <PreferencesContext.Provider value={preferences}>{children}</PreferencesContext.Provider>;
}
export function usePreferences() {
  const preferences = useContext(PreferencesContext);
  if (!preferences) throw new Error('usePreferences requires PreferencesProvider');
  return preferences;
}
