import type { Metadata } from 'next';
import './globals.css';
import './themes.css';
import './content.css';
import './pages.css';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { Companion } from '@/components/site/companion';
import { PreferencesProvider } from '@/components/experience/preferences';
export const metadata: Metadata = {
  title: 'The Evolution of Motion | An independent robotics study',
  description: 'A cinematic journey through motion, machinery and the future of robotics. An independent interactive study featuring Spot and Atlas.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Browser extensions can inject attributes on html before React hydrates.
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('evolution-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){}` }} /></head><body><PreferencesProvider><SiteHeader />{children}<SiteFooter /><Companion /></PreferencesProvider></body></html>;
}
