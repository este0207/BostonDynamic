'use client';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { usePreferences } from '@/components/experience/preferences';
const CompanionScene = dynamic(() => import('./companion-scene'), { ssr: false });
export function Companion() {
  const pathname = usePathname();
  const { locale } = usePreferences();
  // Home already stages the same drone in its persistent cinematic scene.
  if (pathname === '/') return null;
  return <aside className="site-companion" aria-label={locale === 'fr' ? 'Compagnon visuel indépendant' : 'Independent visual companion'}><CompanionScene /></aside>;
}
