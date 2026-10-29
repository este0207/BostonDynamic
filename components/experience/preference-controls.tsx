'use client';
import { Moon, Sun } from 'lucide-react';
import { usePreferences } from './preferences';

type Labels = { language: string; theme: string; light: string; dark: string };
export function PreferenceControls({ labels }: { labels: Labels }) {
  const { locale, setLocale, theme, setTheme } = usePreferences();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const themeAction = `${labels.theme}: ${labels[nextTheme]}`;
  return <div className="preference-controls">
    <div className="language-controls" role="group" aria-label={labels.language}>
      <button type="button" lang="en" aria-label="English" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
      <button type="button" lang="fr" aria-label="Français" aria-pressed={locale === 'fr'} onClick={() => setLocale('fr')}>FR</button>
    </div>
    <button className="theme-control" type="button" onClick={() => setTheme(nextTheme)} aria-label={themeAction} title={themeAction}>
      {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  </div>;
}
