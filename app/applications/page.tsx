import type { Metadata } from 'next';
import ApplicationsContent from '@/components/pages/applications-content';

export const metadata: Metadata = {
  title: 'Applications | The Evolution of Motion',
  description: 'Explore industrial inspection, digital twins, warehouse automation, safety and robotics research through official Boston Dynamics sources.',
};

export default function ApplicationsPage() {
  return <ApplicationsContent />;
}
