'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { Menu, ArrowUpRight } from 'lucide-react';
import { usePreferences } from '@/components/experience/preferences';
import { PreferenceControls } from '@/components/experience/preference-controls';
import { copy } from '@/lib/copy';

import { navigation } from '@/lib/navigation';

export function SiteHeader() {
  const { locale } = usePreferences();
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const current = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(`${href}/`) || pathname === href;
  const links = navigation.map((item) => <Link key={item.href} href={item.href} aria-current={current(item.href) ? 'page' : undefined} onClick={() => { if (menu.current) menu.current.open = false; }}>{item[locale]}<ArrowUpRight size={13} aria-hidden="true" /></Link>);
  return <header className="site-header global-header">
    <a className="skip-link" href={pathname === '/' ? '#story' : '#page-content'}>{locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}</a>
    <Link href="/" className="wordmark" aria-label={copy[locale].ui.home}><span className="brand-symbol" aria-hidden="true">✳</span><span>EVOLUTION<br />OF MOTION<span className="wordmark-dot">.</span></span></Link>
    <nav className="desktop-navigation" aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'}>{links}</nav>
    <div className="global-header-actions">
      <PreferenceControls labels={copy[locale].ui} />
      <details className="mobile-navigation" ref={menu} onKeyDown={(event) => { if (event.key === 'Escape' && menu.current?.open) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); } }}>
        <summary aria-label={locale === 'fr' ? 'Menu de navigation' : 'Navigation menu'}><Menu size={19} aria-hidden="true" /></summary>
        <nav aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'}>{links}</nav>
      </details>
    </div>
  </header>;
}
