import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RobotDetail } from '@/components/pages/robot-detail';
import { getRobot, robots } from '@/lib/robots';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return robots.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const robot = getRobot((await params).slug);
  if (!robot) notFound();
  return { title: `${robot.name} | The Evolution of Motion`, description: robot.text.en.summary };
}

export default async function RobotPage({ params }: Props) {
  const robot = getRobot((await params).slug);
  if (!robot) notFound();
  return <RobotDetail robot={robot} />;
}
