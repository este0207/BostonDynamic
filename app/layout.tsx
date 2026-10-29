import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'The Evolution of Motion | An independent robotics study',
  description: 'A cinematic journey through motion, machinery and the future of robotics. An independent interactive study featuring Spot and Atlas.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
