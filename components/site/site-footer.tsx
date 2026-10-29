'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePreferences } from '@/components/experience/preferences';
import { copy } from '@/lib/copy';
export function SiteFooter() {
  const pathname = usePathname();
  const { locale } = usePreferences();
  if (pathname === '/') return null;
  return <footer className="editorial-footer"><span>THE EVOLUTION OF MOTION</span><p>{copy[locale].footer.disclaimer}</p><Link href="/about#credits">{copy[locale].ui.credits}</Link><a href="https://bostondynamics.com/">Boston Dynamics ↗</a></footer>;
}
