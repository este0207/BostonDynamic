import type { Metadata } from 'next';
import { RobotsContent } from '@/components/pages/robots-content';

export const metadata: Metadata = { title: 'Robots | The Evolution of Motion', description: 'Explore Spot, Atlas and Stretch: three platforms with distinct roles in inspection and material handling.' };

export default function RobotsPage() { return <RobotsContent />; }
