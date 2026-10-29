import type { Metadata } from 'next';
import AboutContent from '@/components/pages/about-content';

export const metadata: Metadata = {
  title: 'About | The Evolution of Motion',
  description: 'An independent WebGL and front-end study: project approach, technology, sources and 3D model credits.',
};

export default function AboutPage() {
  return <AboutContent />;
}
