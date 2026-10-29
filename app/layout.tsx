import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'The Evolution of Motion | An independent robotics study',
  description: 'A cinematic journey through motion, machinery and the future of robotics. An independent interactive study featuring Spot and Atlas.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Browser extensions can inject attributes on html before React hydrates.
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
